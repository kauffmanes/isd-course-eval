/** Evaluations API */
'use strict';

const express = require('express');
const evalsRouter = express.Router();
const models = require('../models');

evalsRouter.post('/', (req, res) => {

	if (!req.body.name) {
		return res.status(400).json({
			status: 400,
			statusText: 'A course evaluation name is required.'
		});
	}

	models.Evaluation.create({
		name: req.body.name,
		questions: req.body.questions // must be stringfied
	}).then(() => {
		res.status(201).json({
			status: 201,
			statusText: `Evaluation '${req.body.name}' was created.`
		});
	}).catch((err) => {
		res.status(500).send(err);
	});

});

evalsRouter.get('/', (req, res) => {

	models.Evaluation.findAll().then((evals) => {
		res.status(200).send(evals);
	}).catch(((err) => {
		res.status(500).send(err);
	}))
	
});

module.exports = evalsRouter;
