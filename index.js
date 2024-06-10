const express = require("express");
const app = express();
const todoRoutes = require("./routes/todos");
const user = require("./routes/user");
const cors = require("cors");

require("dotenv").config();

const passport = require("passport");

// load from env file
const PORT = process.env.PORT || 4000;

// midleware to parse the json request body
app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(cors({ origin: "*", credentials: true }));

// import routesfor TODO API

// mount the api routes
app.use("/api/v1", todoRoutes);

app.use("/api/v1", user);

// start server
app.listen(PORT, () => {
  console.log(`server started successfully at ${PORT}`);
});

// connect to yhe database
const dbConnect = require("./config/database");
dbConnect();

// default route
app.get("/", (req, res) => {
  res.send(`<h1> this is homepage<h1>`);
});

// mO2ETWuYGrSCbT9E
//  gj262002


// iimDO63pw2U1fxEm
// mongodb+srv://gj262002:iimDO63pw2U1fxEm@cluster0.pkfl866.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0