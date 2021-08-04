import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  basket: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});

export default mongoose.model('User', userSchema);
