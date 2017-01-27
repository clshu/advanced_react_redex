const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const favicon = require('serve-favicon');
const models = require('./models');
const cors = require('cors');


// DB Setup
// {force:true} drops the table everytime the server starts.
models.sequelize.sync({force:true}) 

// App Setup

app.use(morgan('combined'));
app.use(cors());
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.json({ type: '*/*'}));

router(app);

// Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);

server.listen(port);
console.log('server listening on port ' + port);

