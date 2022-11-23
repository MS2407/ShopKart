const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
    maxLength: [25, "Name cannot excced 25 Characters"],
    minLength: [5, "Name should be atleast 5 Characters"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Name"],
    validate: [validator.isEmail, "Please Enter valid Email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    minLength: [8, "password should be atleast 8 Characters"],
    select: false,
   
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//JWT Token
userSchema.methods.getJWTtoken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE
  })
}

userSchema.methods.comparePassword = async function(enteredPassword){
  return bcrypt.compare(enteredPassword,this.password);
}

userSchema.methods.getResetPasswordToken = function(){
  //Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and adding resetToken to userSchema
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

  this.resetPasswordExpire = Date.now() + 15*60*1000;
  
  return resetToken;

}


userSchema.pre("save", async function (next) {
  if(!this.isModified("password")){
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
