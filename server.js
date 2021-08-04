import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import bodyParser from 'body-parser';
import {
  ComposerRoute,
  ProductRoute,
  AuthRoute,
  UserRoute,
} from './routes/index.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use('/api/v1/auth', AuthRoute);
app.use('/api/v1/user', UserRoute);
app.use('/api/v1/composer', ComposerRoute);
app.use('/api/v1/product', ProductRoute);

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
