/** Evaluations API */
'use strict';

const express = require('express');
const coursesRouter = express.Router();
const models = require('../models');

coursesRouter.get('/:courseId', (req, res) => {

	const id = req.params.courseId;

	if (!id) {
		return res.status(400).json({
			status: 400,
			statusText: 'You are missing the cid.'
		});
	}

	models.Course.find({
		where: { id },
		include: [models.Professor]
	}).then((result) => {
		return res.status(200).send(result);
	}).catch(err => {
		console.log(err);
		return res.status(500).send('Unable to find course questions.');
	})
});

coursesRouter.post('/', (req, res) => {

	if (!req.body.name || !req.body.code || !req.body.questions) {
		return res.status(400).json({
			status: 400,
			statusText: 'You are missing the name, course code, or question set.'
		});
	}

	const questions = JSON.stringify(req.body.questions);

	models.Course.create({
		name: req.body.name,
		code: req.body.code,
		questions: questions // must be stringfied
	}).then(() => {
		res.status(201).json({
			status: 201,
			statusText: `Question '${req.body.name}' was created.`
		});
	}).catch((err) => {
		res.status(500).send(err);
	});

});

module.exports = coursesRouter;
