"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

// USER {
//   "id": "uuid",
//   "nickname": "AresFan42",
//   “password”: “17864201”,
//   "createdAt": "2024-11-28T12:00:00Z",
//   "characters": ["char1", "char2"]
//   }

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  chars: {
    type: [String],
    required: false,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
