import React from 'react';
import './styles.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Feed from './pages/Feed';
import Register from './pages/Register';
import Article from './pages/Article';
import axios from 'axios';

// Recuperation du token JWT dans le local storage
const token = localStorage.getItem('token');
// On utilise cette methode pour soumettre notre token a toute les routes qui en on besoin pour etre affichée
axios.interceptors.request.use(
	(config) => {
		config.headers.authorization = `${token}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

//Logique de routing de l'application
const App = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/Register" element={<Register />} />
				<Route path="/Feed" element={<Feed />} />
				<Route path="/:id" element={<Article />} />
			</Routes>
		</Router>
	);
};

export default App;
