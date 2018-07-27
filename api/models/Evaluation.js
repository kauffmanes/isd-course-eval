/** Evaluation model */
module.exports = (sequelize, DataTypes) => {

	const Evaluation = sequelize.define('Evaluation', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		answers: { type: DataTypes.TEXT, allowNull: false },
		courseId: DataTypes.INTEGER
	});

	Evaluation.associate = models => {
		models.Evaluation.belongsTo(models.Course, { foreignKey: 'courseId', targetId: 'id' });
	};

	return Evaluation;
};