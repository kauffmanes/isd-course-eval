'use strict';

const express = require('express');
// const verifyToken = require('../utils').verifyToken;

// routers
const evalsRouter = require('./evaluations');

// Create new router to handle all api calls
const apiRouter = express.Router();

// REST API
apiRouter
	
	// bind routes to handlers
	.get('/', (req, res) => { res.send('API is up and running.'); })
	.use('/evaluations', evalsRouter);

module.exports = apiRouter;