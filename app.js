var express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require('./routes/auth');
const noteRoutes = require('./routes/notes');
const cors = require("cors");
var app = express();
var PORT = 3000;

//middlewares
app.use(bodyParser.json());
app.use(cors());

//DB COnnection
mongoose
  .connect("mongodb://localhost:27017/noteapp", {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB CONNCETED");
  })
  .catch((err) => {
    console.log("DB Error", err);
  });

//routes
app.get("/", (req, res) => {
  res.send("APP is Running !!");
});

//routes
app.use("/api",authRoutes);
app.use("/api",noteRoutes);

//app listen 
app.listen(PORT, () => {
  console.log("App is listening " + PORT);
});
