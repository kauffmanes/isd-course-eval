/** Evaluations API */
'use strict';

const express = require('express');
const questionsRouter = express.Router();
const models = require('../models');

questionsRouter.post('/', (req, res) => {

	if (!req.body.name) {
		return res.status(400).json({
			status: 400,
			statusText: 'A question set name is required.'
		});
	}

	models.QuestionSet.create({
		name: req.body.name,
		questions: req.body.questions // must be stringfied
	}).then(() => {
		res.status(201).json({
			status: 201,
			statusText: `Question '${req.body.name}' was created.`
		});
	}).catch((err) => {
		res.status(500).send(err);
	});

});

questionsRouter.get('/', (req, res) => {
	models.QuestionSet.findAll().then((questions) => {
		res.status(200).send(questions);
	}).catch(((err) => {
		res.status(500).send(err);
	}))
	
});

module.exports = questionsRouter;
