/** Course model */
module.exports = (sequelize, DataTypes) => {

	const Course = sequelize.define('Course', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: { type: DataTypes.TEXT, allowNull: false, unique: true }, //ex. iteractive system design
		code: { type: DataTypes.TEXT, allowNull: false, unique: true }, //ex. INFSCI 2470
		questions: { type: DataTypes.TEXT, allowNull: false }
	});

	Course.associate = models => {
		models.Course.belongsToMany(models.Professor, {
			through: { model: 'ProfessorCourses' },
            foreignKey: 'cid'
		});
	};

	return Course;
};