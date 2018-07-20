/** QuestionSet model */
module.exports = (sequelize, DataTypes) => {

	const QuestionSet = sequelize.define('QuestionSet', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: { type: DataTypes.TEXT, allowNull: false, unique: true },
		questions: { type: DataTypes.TEXT, allowNull: false }
	});

	return QuestionSet;
};