const { Post } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
	app.get('/api/posts', auth, (req, res) => {
		Post.findAll().then((posts) => {
			res.json({ data: posts });
		});
	});
};
