import express from "express";
import userRoute from "./routes/user.route.js";
import composerRoute from "./routes/composer.route.js";
import productRoute from "./routes/product.route.js";

import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// ROUTES
app.use("/user", userRoute);
app.use("/composer", composerRoute);
app.use("/product", productRoute);

app.get("/", (req, res) => {
  res.send("Hello from home page");
});

// START listening to the server
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
