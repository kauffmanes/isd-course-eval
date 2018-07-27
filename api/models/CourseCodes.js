/**
 * CourseCode.js
 * This has a reference to the junction table of professorcourses instead of courses.
 * This is because a set of course codes for the class are associated with a particular
 * instance of the class, instead of that class all the time.
 * 
 * There would be one row in this table for every student in a class, for every class.
 */
module.exports = (sequelize, DataTypes) => {

	const CourseCode = sequelize.define('CourseCode', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		accessCode: { type: DataTypes.TEXT, allowNull: false },
		isDeleted: { type: DataTypes.INTEGER, defaultValue: 0 },
		pcId: DataTypes.INTEGER //pk of professorcourse table
	});

	CourseCode.associate = models => {
		models.CourseCode.belongsTo(models.ProfessorCourses, { foreignKey: 'pcId', targetId: 'id' });
	};

	return CourseCode;
};