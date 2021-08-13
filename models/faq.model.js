import mongoose from 'mongoose';

const faqSchema = mongoose.Schema({
  answer: { type: String, required: true },
  question: { type: String, required: true },
});

export default mongoose.model('Faq', faqSchema);
