import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema({
  id: { type: String },
  isVideo: { type: Boolean, default: false },
  thumbnail: { type: String },
  url: { type: String, required: true, default: null },
});
const priceSchema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  price: { type: Number },
});
const productSchema = mongoose.Schema({
  id: { type: String },
  name: {
    type: String,
    required: true,
    unique: [true],
  },
  composers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Composer' }],
  genre: { type: String, required: true, default: null },
  description: { type: String, required: true, default: null },
  audio_url: { type: String, required: true, default: null },
  youtube_url: { type: String, default: null },
  photo_url: { type: String, required: false, default: null },
  media_list: [{ type: mediaSchema, required: true }],
  price: {
    type: Number,
    required: [true, "'{PATH}' is required!"],
    default: null,
  },
  price_list: [{ type: priceSchema }],
  instruments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Instrument' }],
  pages: { type: Number, required: true, default: null },
  release_date: { type: Date, default: Date.now(), required: true },
});

export default mongoose.model('Product', productSchema);
