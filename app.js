const express = require("express");
const cors = require("cors");
const user = require("./routes/authRouter.js");
const people = require("./routes/peopleRouter");

require('dotenv').config();

require("env-cmd");

const app = express();

let corsOption = {
  origin: "*",
};

app.use(cors(corsOption));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", user);
app.use("/api", people);
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.json({ message: "Hello api!!", app:"trip service api" });
});

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server runing on ${PORT} mode`);
});
// app.listen(PORT, () => {
//   console.log(`server running on port: ${PORT}`);
// });

process.on("unhandledRejection", (req, res,err) => {
 
  console.log(`Error: ${req}`);
 // res.json({mess: err.message}) ;
  // console.log("Server shutting down due to unhandle promise rejection");
  // server.close(() => {
  //   process.exit(1);
  // });
});

server

