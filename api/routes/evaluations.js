/** Evaluations API */
'use strict';

const express = require('express');
const evalsRouter = express.Router();
const models = require('../models');

evalsRouter.post('/', (req, res) => {

	if (!req.body.courseId || !req.body.answers) {
		return res.status(400).json({
			status: 400,
			statusText: 'A course ID and set of answers is required.'
		});
	}

	models.Evaluation.create({
		courseId: req.body.courseId,
		answers: req.body.answers
	}).then(() => {
		return res.status(201).json({
			status: 201,
			statusText: `Evaluation set was created.`
		});
	}).catch((err) => {
		console.log(err);
		return res.status(500).send(err);
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
