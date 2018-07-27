/** Codes API */
'use strict';

const express = require('express');
const professorsRouter = express.Router();
const models = require('../models');

professorsRouter.post('/', (req, res) => {

	if (!req.body.name) {
		return res.status(400).json({
			status: 400,
			statusText: 'A name is required.'
		});
	}

	models.Professor.create({
        name: req.body.name,
        title: req.body.title
	}).then(() => {
		res.status(201).json({
			status: 201,
			statusText: `Professor '${req.body.name}' was created.`
		});
	}).catch((err) => {
        console.log(err);
		res.status(500).send(err);
	});

});

professorsRouter.post('/course', (req, res) => {

    const course = {
        semester: req.body.semester,
        year: req.body.year,
        pid: req.body.professorId,
        cid: req.body.courseId
    };

    if (!course.semester || !course.year || !course.pid || !course.cid) {
        return res.status(400).send('A course ID, professor ID, year, and semester are required.');
    }

    models.ProfessorCourses.create(course).then(() => {
        return res.status(201).send('Successfully created.');
    }).catch(err => {
        console.log(err);
		return res.status(500).send(err);
    });
});

module.exports = professorsRouter;
