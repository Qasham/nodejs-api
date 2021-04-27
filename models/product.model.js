import mongoose from "mongoose";
import { composerSchema } from "./composer.model.js";

const productSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  composers: [composerSchema],
  //   genre: { type: String, required: true },
  //   description: { type: String, required: true },
  //   audio_url: { type: String, require: true },
  //   price: { type: Number, required: true },
  //   instruments: { type: String, required: true },
  //   pages: { type: Number, required: true },
  //   release_date: { type: Date, default: Date.now() },
  //   band: { type: String, required: true },
});

export default mongoose.model("Product", productSchema);
