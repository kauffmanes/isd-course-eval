'use strict';

const express = require('express');

// routers
const evalsRouter = require('./evaluations');
const coursesRouter = require('./courses');
const questionsRouter = require('./questions');
const codesRouter = require('./codes');
const professorsRouter = require('./professors');

// Create new router to handle all api calls
const apiRouter = express.Router();

// REST API
apiRouter
	
	// bind routes to handlers
	.get('/', (req, res) => { res.send('API is up and running.'); })
	.use('/evaluations', evalsRouter)
	.use('/courses', coursesRouter)
	.use('/questions', questionsRouter)
	.use('/codes', codesRouter)
	.use('/professors', professorsRouter);

module.exports = apiRouter;