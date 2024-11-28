"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

// CHAR {
//   "id": "uuid",
//   "name": "Hercules",
//   "userId": "user1"
//   }

const charSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const charModel = mongoose.model("chars", charSchema);

export default charModel;
