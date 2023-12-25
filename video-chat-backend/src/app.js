const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors())

require('dotenv').config();

require('./sockets/socketHandler');

module.exports = app