/** Evaluations API */
'use strict';

const express = require('express');
const evalsRouter = express.Router();
const models = require('../models');

evalsRouter.post('/pcId/:pcId', (req, res) => {

	const _pcId = req.params.pcId;

	if (!req.body.courseId || !req.body.answers || !_pcId) {
		return res.status(400).json({
			status: 400,
			statusText: 'A pcId, course ID, and set of answers is required.'
		});
	}

	models.Evaluation.create({
		courseId: req.body.courseId,
		answers: req.body.answers
	}).then(() => {
		models.CourseCode.update(
			{ isDeleted: 1 },
			{ where: { pcId: _pcId } })
		.then(() => {
			return res.status(201).json({
				status: 201,
				statusText: `Evaluation set was created.`
			});
		}).catch(err => {
			console.log(err);
			return res.status(400).send('Could not save survey. Access code not updated.');
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
