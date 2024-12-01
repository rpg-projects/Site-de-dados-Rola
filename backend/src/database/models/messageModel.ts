"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  room_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  roll_id: {
    type: String,
    required: false,
  },
  text: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

const messageModel = mongoose.model("messages", messageSchema);

export default messageModel;
