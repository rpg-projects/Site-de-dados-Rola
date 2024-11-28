"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

// ROOM { "id": "uuid",
//   "name": "Aulas",
//   "description": "Aula de não sei o que",
//   "createdAt": "2024-11-28T12:00:00Z" }

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const roomModel = mongoose.model("rooms", roomSchema);

export default roomModel;
