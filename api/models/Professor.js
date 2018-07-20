/** Professor model */
module.exports = (sequelize, DataTypes) => {

	const Professor = sequelize.define('Professor', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
        name: { type: DataTypes.TEXT, allowNull: false, unique: true }
	});

	return Professor;
};