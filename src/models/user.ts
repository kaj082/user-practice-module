import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: String,
    email: String,
    isAuthehticated: Boolean,
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
