"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const roomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

const roomModel = mongoose.model("rooms", roomSchema);

export default roomModel;
