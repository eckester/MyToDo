import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },

  { collection: "users" }
);

const users = mongoose.model("users", userSchema);

export default users;
