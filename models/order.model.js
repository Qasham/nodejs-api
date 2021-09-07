import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  count: { type: Number },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
});
const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now() },
  status: { type: Boolean, default: false },
  items: [{ type: orderItemSchema }],
});

export default mongoose.model('Order', orderSchema);
