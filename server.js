const express = require('express');
const helmet = require('helmet');

// Projects/Actions Router
const projectsRouter = require('./projects/projectsRouter.js');
const actionsRouter = require('./projects/actionsRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/projects', logger, projectsRouter);
server.use('/api/actions', logger, actionsRouter);

server.get('/', greeter, (req, res) => {
  res.send(`<h2> API Sprint Challenge for ${req.cohort}! </h2>`);
});

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} Request to ${req.originalUrl}`
  );
  next();
}

function greeter(req, res, next) {
  req.cohort = 'Web 28';
  next();
}

module.exports = server;