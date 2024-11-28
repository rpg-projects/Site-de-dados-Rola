"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

// ROLL {"id": "roll1",
//   "userId": "user1",
//   "charId": "char1",
//   "roomId": "room1",
//   "dice": "d20",
//   "modifier": "+3",
//   "result": 20,
//   "createdAt": "2024-11-28T12:14:00Z"}

const rollSchema = new Schema({
  room_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  char_id: {
    type: String,
    required: false,
  },
  dice: {
    type: Number,
    required: true,
  },
  mod: {
    type: Number,
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const rollModel = mongoose.model("rolls", rollSchema);

export default rollModel;
