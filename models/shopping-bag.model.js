import mongoose from 'mongoose';

const shoppingBagSchema = mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});
export default mongoose.model('ShoppingBag', shoppingBagSchema);
