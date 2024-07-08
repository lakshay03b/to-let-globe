import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"

import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const generateAccessAndRefreshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken =  user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken  
        await user.save({ validateBeforeSave: false })  

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refresh and access token")
    }
}



const registerUser = asyncHandler(async (req, res) => {
    

    const {name,username,email,password} = req.body
    console.log("Email: ",email)

    if([name,email,username,password].some((field)=> field?.trim() === "")){
        

        throw new ApiError(400,"All fileds are required")

    }
    
   const existedUser= await User.findOne({
       $or:[{username},{email}]
   })
    
    if(existedUser){
        throw new ApiError(409,"User already exists with the same username and email") 
    }
    
    
const user=await User.create({   
    name,
    
    email,
    password,
    username:username,
})

 const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"  //ye krne se ye two fields select hoke ni aygi
 )
 if(!createdUser){
    throw new ApiError(500,"something went wrong while registering the user")
 }

 return res.status(201).json(new ApiResponse(200,createdUser,"User registered successfully"))
})

const loginUser= asyncHandler(async(req,res)=>{
    

    const {username,password}=req.body
    
    if( !username){
        throw new ApiError(400," username is required")
    }

    const user = await User.findOne({ username });

     if(!user){
        throw new ApiError(404,"User doesnt exist")
     }

   const isPasswordValid=  await user.isPasswordCorrect(password)
     
   if(!isPasswordValid){
    throw new ApiError(401,"Invalid user credentials")
 }


  const{accessToken, refreshToken}=await generateAccessAndRefreshTokens(user._id) 

  const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
  
  const options = {
    httpOnly: true,
    secure: true
}

return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )

})

export {registerUser,loginUser}