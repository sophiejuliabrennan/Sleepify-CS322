const mongoose = require("mongoose");

// create a mongoose schema for staff
const SignUpSchema = mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});
// export the model to our app
module.exports = mongoose.model("SignUp", SignUpSchema, "sign_up");
