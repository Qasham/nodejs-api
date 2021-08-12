import mongoose from 'mongoose';

const offerItemSchema = new mongoose.Schema({
  count: { type: Number },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
});
const offerSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now() },
  status: { type: Boolean, default: false },
  items: [{ type: offerItemSchema }],
});

export default mongoose.model('Offer', offerSchema);
