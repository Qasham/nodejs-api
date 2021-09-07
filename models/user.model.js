import mongoose from 'mongoose';

const basketSchema = new mongoose.Schema({
  count: { type: Number },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
});

const addressSchema = new mongoose.Schema({
  address_line_1: { type: String, default: '' },
  address_line_2: { type: String, default: '' },
  post_code: { type: String, default: '' },
  phone_number: { type: String, default: '' },
  country: { type: String, default: 'Azerbaijan' },
  city: { type: String, default: 'Baku' },
});

const userSchema = mongoose.Schema({
  id: { type: String },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: [true] },
  password: { type: String, required: true },
  basket: [{ type: basketSchema }],
  address: { type: addressSchema, default: {} },
  token: { type: String },
});

// userSchema.pre(/^find/, function (next) {
//   console.log('pre find');
//   this.populate({
//     path: 'basket',
//     populate: {
//       path: 'product',
//       select: 'name price media_list instruments',
//       populate: {
//         path: 'instruments',
//       },
//     },
//   });
//   next();
// });

export default mongoose.model('User', userSchema);
