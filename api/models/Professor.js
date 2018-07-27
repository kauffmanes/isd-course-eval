/** Professor model */
module.exports = (sequelize, DataTypes) => {

	const Professor = sequelize.define('Professor', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: { type: DataTypes.TEXT, allowNull: false, unique: true },
		title: { type: DataTypes.TEXT }
	});

	Professor.associate = models => {
        models.Professor.belongsToMany(models.Course, {
            through: { model: 'ProfessorCourses' },
            foreignKey: 'pid'
        });
	};
	
	return Professor;
};