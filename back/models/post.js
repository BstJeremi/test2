module.exports = (sequelize, DataTypes) => {
	return sequelize.define(
		'Post',
		{
			id: {
				allowNull: false,
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false
			},
			content: {
				type: DataTypes.STRING,
				allowNull: false
			},
			attachment: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			timestamps: true,
			createdAt: 'created',
			updatedAt: false
		}
	);
};
