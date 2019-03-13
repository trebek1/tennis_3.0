import bodyParser from "body-parser";
import express from "express";
import favicon from "serve-favicon";
import mongoose from "mongoose";
import path from "path";
import session from "express-session";
import webpack from "webpack";

import config from "./webpack.config";
import Courts from "./models/Courts.js";

const app = express();
const compiler = webpack(config);
const MongoStore = require("connect-mongo")(session);

mongoose.connect(
  `mongodb://${process.env.TENNIS_USERNAME}:${
    process.env.TENNIS_PASSWORD
  }@ds153652.mlab.com:53652/tennis`,
  { useMongoClient: true }
);

mongoose.connection.on(
  "error",
  console.error.bind(console, "# MongoDB - Connection Error: ")
);

// favicon
app.use(favicon(path.join(__dirname, "static", "favicon.ico")));
app.get("/courts", (req, res) =>
  Courts.find((err, courts) => {
    if (err) {
      console.log("error getting courts ", err);
    }
    res.json(courts);
  })
);

app.use(
  require("webpack-dev-middleware")(compiler, {
    publicPath: config.output.publicPath
  })
);
app.use(require("webpack-hot-middleware")(compiler));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("*", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

app.listen(process.env.PORT || 3000, err => {
  if (err) {
    return console.error(err);
  }
  console.log("Listening at http://localhost:3000/");
});
