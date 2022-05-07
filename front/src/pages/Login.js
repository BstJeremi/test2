import React from 'react';
import './Login.css';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header.js';
import Footer from '../components/Footer';

const Login = () => {
	// Ecoute des champs du formulaire
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	// Ecoute du bouton de soumission du formulaire
	const handleLogin = (e) => {
		e.preventDefault();
		const emailError = document.querySelector('.username.error');
		const passwordError = document.querySelector('.password.error');
		//Appel de la route login
		axios({
			method: 'post',
			url: 'http://localhost:3000/api/login',
			data: {
				username,
				password
			}
		})
			.then((res) => {
				console.log(res);
				// On stock le JWT token et l'ID utilisateur dans le local storage
				localStorage.setItem('token', 'Bearer ' + res.data.token);
				localStorage.setItem('Id', res.data.data.id);

				if (res.data.errors) {
					emailError.innerHTML = res.data.errors.username;
					passwordError.innerHTML = res.data.errors.password;
				} else {
					// Regirection du la page Feed
					window.location = '/Feed';
				}
			})
			.catch((err) => {
				alert(`Nom d'utilisateur ou mot de passe incorect`);
				console.log(err);
			});
	};

	return (
		<div className="loginPage">
			<Header />
			<div className="container_all">
				<div className="container_form">
					<div className="form">
						<div className="message2">Connexion </div>
						<form action="" onSubmit={handleLogin} id="sign-up-form" className="login-form">
							<label htmlFor="username" />
							<input
								type="text"
								name="username"
								id="username"
								placeholder="Nom d'utilisateur"
								onChange={(e) => setUsername(e.target.value)}
								value={username}
							/>
							<label htmlFor="password" />
							<input
								type="password"
								name="password"
								id="password"
								placeholder="Mot de passe"
								onChange={(e) => setPassword(e.target.value)}
								value={password}
							/>
							<button type="submit" href="/Feed">
								Connexion
							</button>
							<p className="message">
								Pas encore inscrit ? <Link to="/Register">Créez un compte</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Login;
