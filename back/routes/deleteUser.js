const { User } = require('../db/sequelize');

module.exports = (app) => {
	app.delete('/api/user/:id', (req, res) => {
		User.findByPk(req.params.id).then((user) => {
			const UserDeleted = user;
			User.destroy({
				where: { id: user.id }
			}).then((_) => {
				const message = `Le compte n°${UserDeleted.id} a bien été supprimé.`;
				res.json({ message, data: UserDeleted });
			});
		});
	});
};
