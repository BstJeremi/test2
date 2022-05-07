const { Post } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
	app.get('/api/posts/:id', auth, (req, res) => {
		Post.findByPk(req.params.id).then((post) => {
			const message = 'Un post a bien été trouvé.';
			res.json({ message, data: post });
		});
	});
};
