/** Model.js */
'use strict';

const fs 	    = require('fs');
const path		= require('path');
const Sequelize	= require('sequelize');
const basename	= path.basename(__filename);
const db		= {};

const sequelize = new Sequelize('isd', null, null, {
	dialect: 'sqlite',
	operatorsAliases: Sequelize.Op,
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	storage: path.resolve(__dirname, '../db/isd.db')
});

fs
	.readdirSync(__dirname)
	.filter(file => {
		return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
	})
	.forEach(file => {
		const model = sequelize.import(path.join(__dirname, file));
		db[model.name] = model;
	});

Object.keys(db).forEach(modelName => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;