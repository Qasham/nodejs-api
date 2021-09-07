import mongoose from 'mongoose';

const messageSchema = mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true },
  text: { type: String, required: true },
});

export default mongoose.model('Message', messageSchema);
