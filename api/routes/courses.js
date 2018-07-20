/** Evaluations API */
'use strict';

const express = require('express');
const coursesRouter = express.Router();
const models = require('../models');

coursesRouter.post('/', (req, res) => {

	if (!req.body.name) {
		return res.status(400).json({
			status: 400,
			statusText: 'A question set name is required.'
		});
	}

	models.Course.create({
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

coursesRouter.get('/', (req, res) => {
	models.Course.findAll().then((questions) => {
		res.status(200).send(questions);
	}).catch(((err) => {
		res.status(500).send(err);
	}))
	
});

module.exports = coursesRouter;
