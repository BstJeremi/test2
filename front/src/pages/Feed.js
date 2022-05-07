import './Feed.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from '../components/Header.js';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Posts = () => {
	// On innitialise la recuperation des posts en BDD
	useEffect(() => {
		getPosts();
	});

	//On defini l'etat des posts
	const [ posts, setPosts ] = useState([]);

	//Appel a l'API pour recuperer les posts
	const getPosts = async () => {
		try {
			const res = await axios.get('http://localhost:3000/api/posts');
			setPosts(res.data.data);
		} catch (error) {
			alert(`Vous n'avez pas accès a cette page, veuillez vous connecter.`);
			window.location = '/';
		}
	};
	// Gestion de la soumission d'un nouveau post
	// On ecoute les champs de creation d'un post
	const [ title, setTitle ] = useState('');
	const [ content, setContent ] = useState('');
	const [ attachment, setAttachment ] = useState('');
	const [ prevPicture, setPrevPictture ] = useState('');

	// Gestion de la previsualisation et de la soumission d'une photo
	const handlePicture = (e) => {
		setPrevPictture(URL.createObjectURL(e.target.files[0]));
		setAttachment(URL.createObjectURL(e.target.files[0]));
	};
	// On ecoute le bouton de soumission et on declanche la logique
	const handlePost = async (e) => {
		const data = new FormData();
		data.append('title', title);
		data.append('content', content);
		data.append('attachment', prevPicture);
		console.log(data);
		e.preventDefault();
		// Appel a l'API de la route CreatePost
		axios({
			method: 'post',
			url: 'http://localhost:3000/api/posts',
			data: { title, content, attachment }
		});
	};
	// Gestion de la logique de supression d'un User
	const deleteProfil = async () => {
		// On recupere l'Id de l'utilisateur dans le local storage
		console.log(localStorage['Id']);
		const id = localStorage['Id'];

		try {
			// On declanche la supression, on clear le local storage et on redirige l'utilisateur
			window.confirm(`La supression de votre profil est irreversible, êtes-vous sur ?`);
			await axios.delete('http://localhost:3000/api/user/' + id);
			console.log(`L'user ${id} à été suprimé`);
			localStorage.clear();
			window.location = '/Register';
		} catch (error) {
			alert(error.message);
		}
	};
	return (
		<div>
			<Header>
				<div>
					<Link to="/Feed">
						<img className="logo" src="./images/icon-left-font-monochrome-white.png" alt="Groupomania" />
					</Link>
				</div>
				<div>
					<a className="delete_profil" onClick={deleteProfil} href="http://localhost:3001/Register">
						Suprimer mon profil
					</a>
				</div>
				<div>
					<a className="login_button" onClick={() => localStorage.clear()} href="http://localhost:3001/">
						Déconnexion
					</a>
				</div>
			</Header>
			<div className="container">
				<form id="contact" action="/api/posts" method="POST" encType="multipart/form-data">
					<p className="creez">Creez et partager un article avec vos collaborateurs</p>
					<textarea
						name="title"
						id="message"
						placeholder="Donnez un titre a votre article"
						onChange={(e) => setTitle(e.target.value)}
						value={title}
						className="textareatitle"
					/>
					<textarea
						name="content"
						id="message"
						placeholder="Ecrivez un article !"
						onChange={(e) => setContent(e.target.value)}
						value={content}
						className="textAreaContent"
					/>
					<div className="parent-div">
						<button className="btn-upload">Ajoutez une photo</button>
						<input name="attachment" type="file" id="attachment" onChange={(e) => handlePicture(e)} />
						<div>
							<img src={prevPicture} alt="img" />
						</div>
					</div>
					<button name="submit" type="submit" onClick={handlePost}>
						Envoyer
					</button>
				</form>
			</div>

			{posts.slice(0).reverse().map((post) => (
				<Link to={`/${post.id}`} key={post.id} className="container">
					<div className="square">
						<img src={post.attachment} className="mask" alt="img" />
						<div className="h1">{post.title}</div>
						<p className="text_article">{post.content}</p>
					</div>
				</Link>
			))}
			<Footer />
		</div>
	);
};

export default Posts;
