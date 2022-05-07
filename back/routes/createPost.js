const { Post } = require('../db/sequelize');
const upload = require('../utils/multer-config');
const multer = require('../utils/multer-config');
const auth = require('../auth/auth');

module.exports = (app) => {
	app.post('/api/posts', auth, (req, res) => {
		console.log(req.file);
		Post.create(req.body).then((post) => {
			const message = `Le post ${req.body.title} a bien été crée.`;
			res.json({ message, data: post });
		});
	});
};
