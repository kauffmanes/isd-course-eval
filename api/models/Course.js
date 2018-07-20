/** Course model */
module.exports = (sequelize, DataTypes) => {

	const Course = sequelize.define('Course', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: { type: DataTypes.TEXT, allowNull: false, unique: true }
	});

	return Course;
};