import mongoose from "mongoose";

const instrumentSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
});

export default mongoose.model("Instrument", instrumentSchema);
