import mongoose from "mongoose";

const composerSchema = mongoose.Schema({
  id: { type: String },
  fullname: { type: String, required: true },
  job: { type: String, required: true },
  description: { type: String, required: true },
  photo_url: { type: String, required: true },
  country: { type: String, required: true },
});

export default mongoose.model("Composer", composerSchema);
