const serverless = require('serverless-http');
const app = require('../server'); // Imports your main Express app

module.exports.handler = serverless(app);