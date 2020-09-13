import webpackMiddleware from 'webpack-dev-middleware';

import bodyParser from 'body-parser';
import express from 'express';
import favicon from 'serve-favicon';
import mongoose from 'mongoose';
import path from 'path';
import webpack from 'webpack';
import Courts from './models/Courts';
import config from './webpack.prod';

const compiler = webpack(config);
const app = express();

mongoose
  .connect(
    `mongodb://${process.env.TENNIS_USERNAME}:${process.env.TENNIS_PASSWORD}@ds153652.mlab.com:53652/tennis`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('DB Connected!'))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });

// favicon
app.use(favicon(path.join(__dirname, 'static', 'favicon.ico')));
app.get('/courts', (req, res) =>
  Courts.find((err, courts) => {
    if (err) {
      console.log('error getting courts ', err);
    }
    res.json(courts);
  })
);

app.use(
  webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Listening at http://localhost:3000');
});
