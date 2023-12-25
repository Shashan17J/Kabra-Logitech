const express = require("express");
const app = express();

const dotenv = require("dotenv");

const database = require("./config/database");

const cors = require("cors");

const fileUpload = require("express-fileupload");

const productRoutes = require("./routes/Products");

const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

dotenv.config();
const PORT = process.env.PORT || 4000;

database.connect();

// Middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use("/api/v1/product", productRoutes);

// default route
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Welcome to the API",
  });
});

app.listen(PORT, () => {
  console.log(`App is running at ${PORT}`);
});
