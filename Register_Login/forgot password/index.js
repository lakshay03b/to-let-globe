    // index.js
require("dotenv").config();
const express = require("express");
const app = express();
const connection = require("./db");
const { User, validate } = require("./models/user");
const { Token } = require("./models/token");
const sendEmail = require("./utils/sendEmail");

app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));

connection();

// routes/users.js
const express = require("express");
const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).send("User not found");

  const token = await Token.findOne({ userId: user._id });
  if (!token) {
    const newToken = new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await newToken.save();
    token = newToken;
  }

  const link = `${process.env.BASE_URL}/reset-password/${token.token}`;
  const subject = "Password Reset";
  const text = `Click on this link to reset your password: ${link}`;
  await sendEmail(user.email, subject, text);

  res.send("Password reset link sent to your email");
});

router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  const tokenDoc = await Token.findOne({ token });
  if (!tokenDoc) return res.status(404).send("Invalid token");

  const user = await User.findById(tokenDoc.userId);
  if (!user) return res.status(404).send("User not found");

  if (password !== confirmPassword)
    return res.status(400).send("Passwords do not match");

  user.password = password;
  await user.save();

  await tokenDoc.remove();

  res.send("Password reset successfully");
});

module.exports = router;