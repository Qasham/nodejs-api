import mongoose from "mongoose";
import express from "express";
import { ComposerRoute, ProductRoute, UserRoute } from "./routes/index.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// ROUTES
app.use("/api/v1/composer", ComposerRoute);
app.use("/api/v1/product", ProductRoute);
app.use("/api/v1/auth", UserRoute);

app.get("/", (req, res) => {
  res.status(200).send("Hello world");
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
