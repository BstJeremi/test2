const { Sequelize, DataTypes } = require('sequelize');
const UserModel = require('../models/user');
const PostModel = require('../models/post');
const posts = require('./importPost');
const bcrypt = require('bcrypt');

// Connecion de l'API avec la base de donnée
const sequelize = new Sequelize('groupomaniadb', 'root', '', {
	host: 'localhost',
	dialect: 'mariadb',
	dialectOptions: {
		timezone: 'Etc/GMT-2'
	},
	logging: false
});

// Importation des models
const User = UserModel(sequelize, DataTypes);
const Post = PostModel(sequelize, DataTypes);

// Creation de la fonction d'initialisation de la db + creation des messages
const initDb = async () => {
	const _ = await sequelize.sync({ force: true });
	posts.map((post) => {
		Post.create({
			title: post.title,
			content: post.content,
			attachment: post.attachment
		}).then((post_1) => console.log(post_1.toJSON()));
	});
	bcrypt
		.hash('Admin', 10)
		.then((hash) => User.create({ username: 'Admin', password: hash, isAdmin: true }))
		.then((user) => console.log(user.toJSON()));
	console.log('La base de donnée a bien été initialisée !');
};

module.exports = {
	initDb,
	User,
	Post
};
