const { User } = require('../db/sequelize');
const bcrypt = require('bcrypt');

module.exports = (app) => {
	app.post('/api/register', (req, res) => {
		bcrypt
			.hash(req.body.password, 10)
			.then((hash) =>
				User.create({ id: req.body.id, username: req.body.username, password: hash, isAdmin: false })
			)
			.then((user) => console.log(user.toJSON()));
		res
			.status(200)
			.json({
				message: 'Utilisateur crée',
				id: req.body.id,
				username: req.body.username,
				password: req.body.password,
				isAdmin: false
			});
	});
};
