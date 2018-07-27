/** Codes API */
'use strict';

const express = require('express');
const codesRouter = express.Router();
const models = require('../models');

codesRouter.post('/', (req, res) => {

	if (!req.body.accessCode || !req.body.pcId) {
		return res.status(400).json({
			status: 400,
			statusText: 'An access code is required.'
		});
	}

	models.CourseCode.create({
        accessCode: req.body.accessCode,
        pcId: req.body.pcId
	}).then(() => {
		res.status(201).send(`Access code '${req.body.accessCode}' was created.`);
	}).catch((err) => {
        console.log(err);
		res.status(500).send(err);
	});

});

codesRouter.post('/authorize', (req, res) => {

    const accessCode = req.body.accessCode;
    
	if (!accessCode) {
        return res.status(400).send('An access code is required.');
    }
	
	models.CourseCode.findOne({
		includes: ['accessCode'],
		where: { accessCode, isDeleted: 0 }
	}).then(code => {
        console.log(code);
		if (code) {
			const pcId = code.pcId;
			models.ProfessorCourses.find({
				where: { id: pcId }
			}).then(course => {
				if (course) {
					return res.status(200).send(course)
				} else {
					return res.status(200).send({});
				}
			}).catch(err => {
				return res.status(500).send(err);
			});
		} else {
			return res.status(200).send({});
		}

	}).catch(err => {
		res.status(500).send(err);
	});

});

module.exports = codesRouter;
