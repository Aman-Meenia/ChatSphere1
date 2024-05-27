import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullname is required"],
      trim: true,
    },
    userName: {
      type: String,
      required: [true, "username is required"],
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
      validate: {
        validator: validator.isEmail,
        message: "Email is not valid",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be of length 6"],
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: [true, "Gender is required"],
      message: "Gender is not valid",
    },
    profilePic: {
      type: String,
      default: "",
    },
    refreshToken: {
      type: String,
    },
    socketId: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// <-------------------Hash password ------------------->

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// <------------------Compare Password -------------------->

userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);

  return isMatch;
};

// <------------------- Generate Access Token ------------------------>

// userSchema.methods.generateAccessToken = async function () {
//   return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
//     expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
//   });
// };
userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this.id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    },
  );
};

// <------------------- Generate Refresh Token ------------------------>

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    },
  );
};

const User = mongoose.model("User", userSchema);

export default User;
