const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./db/sequelize');
const path = require('path');
require('dotenv').config();

// CORS
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});

app.use(bodyParser.json());

// Lancement datatbase
sequelize.initDb();

// Endpoints
require('./routes/findAllPost')(app);
require('./routes/findPostByPk')(app);
require('./routes/createPost')(app);
require('./routes/updatePost')(app);
require('./routes/deletePost')(app);
require('./routes/login')(app);
require('./routes/register')(app);
require('./routes/deleteUser')(app);
require('./routes/findUserbyPk')(app);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
