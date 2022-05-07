import React from 'react';
import './Login.css';
import axios from 'axios';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Register = () => {
	// Ecoute des champs du formulaire
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	// Ecoute du bouton de soumission du formulaire
	const handleRegister = (e) => {
		e.preventDefault();
		const emailError = document.querySelector('.username.error');
		const passwordError = document.querySelector('.password.error');
		//Appel de la route login
		axios({
			method: 'post',
			url: 'http://localhost:3000/api/register',
			withCredentials: false,
			data: {
				username,
				password
			}
		})
			.then((res) => {
				console.log(res);
				if (res.data.errors) {
					emailError.innerHTML = res.data.errors.username;
					passwordError.innerHTML = res.data.errors.password;
				} else {
					// Regirection du la page Feed
					window.location = '/';
					alert(`Votre profil a été crée avec succès !`);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};
	return (
		<div className="loginPage">
			<Header />
			<div className="container_all">
				<div className="container_form">
					<div className="form">
						<div className="message2">Inscription </div>
						<form action="" onSubmit={handleRegister} id="sign-up-form" className="login-form">
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
								Inscription
							</button>
							<p className="message">
								Vous avez deja un compte ? <Link to="/">Connectez vous</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Register;
