"use strict";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const charSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
});

const charModel = mongoose.model("chars", charSchema);

export default charModel;
