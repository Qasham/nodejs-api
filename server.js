import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import {
  ComposerRoute,
  ProductRoute,
  AuthRoute,
  UserRoute,
  OfferRoute,
  FaqRoute,
} from './routes/index.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/composer', ComposerRoute);
app.use('/product', ProductRoute);
app.use('/offer', OfferRoute);
app.use('/faq', FaqRoute);

app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});

// START listening to the server
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    );
  })
  .catch((error) => console.log(`${error} did not connect`));

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message, '| Unhandled Rejection!');
  process.exit(1);
});
