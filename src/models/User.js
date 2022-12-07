import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, max: 100 },  
  email: { type: String, required: true, max: 100 },
  password: { type: String, required: true, max: 100 },
  telefono: { type: String, required: true, max: 100 },
  edad: { type: String, required: true, max: 100 },
  image: { type: String, required: true, max: 100 },
  direccion: { type: String, required: true, max: 100 },
});

export default mongoose.model("User", UserSchema);
