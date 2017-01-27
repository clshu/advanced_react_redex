const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
mongoose.Promise = Promise; // mpromise is deprecated
const favicon = require('serve-favicon');


// DB Setup
let MONGODB = process.env.MONGODB_URI || "mongodb://localhost:auth/auth";
mongoose.connect(MONGODB);

// App Setup

app.use(morgan('combined'));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json({ type: '*/*'}));

router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('server listening on port ' + port);

