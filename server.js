import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import express from 'express';
import {
  ComposerRoute,
  ProductRoute,
  AuthRoute,
  UserRoute,
  OrderRoute,
  FaqRoute,
  InstrumentRoute,
  SettingsRoute,
} from './routes/index.js';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.options('*', cors());
// ROUTES
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/composer', ComposerRoute);
app.use('/product', ProductRoute);
app.use('/order', OrderRoute);
app.use('/faq', FaqRoute);
app.use('/settings', SettingsRoute);
app.use('/instrument', InstrumentRoute);

app.get('/', (req, res) => {
  res.status(200).send('Welcome JustForHorns Api App');
});

// START listening to the server

const DB = process.env.CONNECTION_URL;
mongoose
  .connect(DB, {
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

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message, '| 💥 Unhandled Rejection!');
  process.exit(1);
});
