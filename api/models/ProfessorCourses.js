/*
 * ProfessorCourses.js
 * 
 * This is a junction table between Professors and Courses.
 * This is needed because multiple professors can teach multiple courses,
 * and multiple courses can be taught by multiple people.
 * 
 * This table can also be thought of a reference to the specific instance of a class during
 * a particular semester and a year.
*/
module.exports = (sequelize, DataTypes) => {

	const ProfessorCourses = sequelize.define('ProfessorCourses', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
        },
        semester: { type: DataTypes.TEXT, allowNull: false },
        year: { type: DataTypes.INTEGER, allowNull: false },
        pid: { type: DataTypes.INTEGER, allowNull: false },
        cid: { type: DataTypes.INTEGER, allowNull: false }
    });

	return ProfessorCourses;
};