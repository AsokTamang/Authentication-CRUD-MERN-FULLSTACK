import { userModel } from "../models/user.model.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_TOKEN = process.env.SECRET_KEY;
const expiry = process.env.EXPIRY;

export const SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(500)
        .json({ sucess: false, message: "Please fill up all the fields." });
    }
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      const error = new Error("User doesnot exist");
      res.status(400).json({ message:error.message });
      return;
    }
    const validPW = await bcrypt.compare(password, existingUser.password); //here we are checking the entered password and the actual password of the user using bcrypt.
    if (!validPW) {
      const error = new Error("Invalid password");
      res.status(400).json({ message:error.message });
      return;
    }
    //if all of the conditions are false then  we proceed with verifying the token
    const token = jwt.sign({ userId: existingUser._id }, JWT_TOKEN, {
      expiresIn: expiry,
    });

    //then if the token is verified then we send the response of successful sign in
    return res
      .status(200)
      .json({ success: true, message: "Succesful signin", token,user:existingUser });
  } catch (Err) {
    res.status(500).json({ success: false, message: Err.message });
  }
};

export const SignUp = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { name, email, password } = req.body; //here we are destructuring name,email and password from the request body.
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(500)
        .json({
          success: false,
          message: "This email is already taken by another user.",
        });
    }
    const salt = await bcrypt.genSalt(10);
    const hassedPW = await bcrypt.hash(password, salt);
    const newUser = await userModel.create(
      [{ name, email, password: hassedPW }],
      { session }
    );
    //after creating a new user we assign them a token
    const token = jwt.sign({ userId: newUser[0]._id }, JWT_TOKEN, {
      expiresIn: expiry,
    }); //here we are assigning the token with userId,secretkey and the expiresIn date
    //after signing up then we provide the response
    await session.commitTransaction();
    await session.endSession();
    res
      .status(200)
      .json({ success: true, message: "Successful signUp", token ,user:newUser[0]});
  } catch (Err) {
    session.abortTransaction();
    session.endSession();
    res.status(200).json({ success: false, message: Err.message});
  }
};
