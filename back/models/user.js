module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'User',
		{
			id: {
				allowNull: false,
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false
			},
			isAdmin: {
				type: DataTypes.BOOLEAN,
				default: false
			}
		},
		{
			timestamps: true,
			createdAt: 'created',
			updatedAt: false
		}
	);
};
