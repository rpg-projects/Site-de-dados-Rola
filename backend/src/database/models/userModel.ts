"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  player_id: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  activeChar: {
    type: String,
    required: false,
  },
});

const userModel = mongoose.model("users", userSchema);

export default userModel;
