import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlenght: 10,
    required: [true, "Enter a valid name"],
  },
  email: {
    type: String,
    match: /\S+@.\S+/,
    required: [true, "Enter a valid email"],
  },
  password: {
    type: String,
    minlength: 8,
    required: [true, "Enter a valid password"],
  },
});

export const userModel = mongoose.model("User", userSchema);
