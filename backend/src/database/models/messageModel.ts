"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

// MESSAGE {"id": "uuid",
//   "roomId": "room1",
//   "userId": "user1",
//   "text": "Minha rolagem foi incrível!",
//   "rollId": "roll1",
//   "createdAt": "2024-11-28T12:15:00Z"}

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
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const messageModel = mongoose.model("messages", messageSchema);

export default messageModel;
