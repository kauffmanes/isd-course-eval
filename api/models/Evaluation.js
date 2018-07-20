/** Evaluation model */
module.exports = (sequelize, DataTypes) => {

	const Evaluation = sequelize.define('Evaluation', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: { type: DataTypes.TEXT, allowNull: false, unique: true },
		answers: { type: DataTypes.TEXT, allowNull: false }
	});

	return Evaluation;
};