require('dotenv').config()
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/task.routes")
// const filePath = require("path");

//craete express app
const app = express();

//setup server port
const PORT = process.env.PORT || 3001;
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json({ limit: "10mb" })); // define in ENV eventually.

// app.use(express.static(filePath.join(__dirname + "./public/")));

app.get("/", (req, res) => {
  res.send({
    result: {
      Status: "Ok! let's go",
    },
  });
});


app.get("/testRoute", (req, res) => {
  res.json({ message: "Hello from server!" });
});


//create routes(middleware)
app.use('/task/v1', taskRoutes)

// mongoose connect
const CONNECTION_URL = process.env.MONGO_CONNECTION_URL;
// console.log(CONNECTION_URL)
// const CONNECTION_URL = "mongodb://localhost:27017/Task";

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((error) => console.log("something went wrong", error));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
