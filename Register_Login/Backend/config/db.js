import mongoose from 'mongoose' 

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://lakshaybansal43f:Lakshay25@cluster0.xfbadcs.mongodb.net/to-let_globe', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
