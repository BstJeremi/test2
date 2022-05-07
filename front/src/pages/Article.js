import React from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Article.css';
import { FaTrashAlt } from 'react-icons/fa';

const Article = () => {
	const Admin = () => {
		const adminId = '1';
		const id = localStorage['Id'];
		console.log(adminId);
		console.log(id);
		if (adminId !== id) {
			return null;
		}
		return (
			<div className="btn_suppr" onClick={deleteArticle}>
				<FaTrashAlt />
			</div>
		);
	};

	const updateForm = () => {
		<button onClick={updateForm} />;
		return (
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
					<button name="submit" type="submit" onClick={updatePost}>
						modifier
					</button>
				</form>
			</div>
		);
	};

	// On recuperer l'ID du post grace a useParams
	const { id } = useParams();

	useEffect(() => {
		getArticle();
	});
	// On defini un etat pour l'article
	const [ article, setArticle ] = useState([]);
	//Logique de recuperation de l'article
	const getArticle = async () => {
		try {
			const res = await axios.get('http://localhost:3000/api/posts/' + id);
			console.log(res.data.data);
			setArticle(res.data.data);
		} catch (error) {
			alert(`Vous n'avez pas accès a cette page, veuillez vous connecter.`);
			window.location = '/';
		}
	};
	// Gestion de la logique de supression d'un article
	const deleteArticle = async () => {
		window.confirm(`La supression d'un article est irreversible, êtes-vous sur ?`);
		try {
			const res = await axios.delete('http://localhost:3000/api/posts/' + id);
			console.log(`L'article ${id} à été suprimé`);
			setArticle(res.data.data);
			window.location = '/Feed';
		} catch (error) {
			alert(`Vous n'avez pas accès a cette page, veuillez vous connecter.`);
			window.location = '/';
		}
	};
	// Gestion de la logique de supression d'un User
	const deleteProfil = async () => {
		// On recupere l'Id de l'utilisateur dans le local storage
		console.log(localStorage['Id']);
		const id = localStorage['Id'];

		try {
			// On declanche la supression, on clear le local storage et on redirige l'utilisateur
			window.confirm(`La supression de votre est irreversible, êtes-vous sur ?`);
			await axios.delete('http://localhost:3000/api/user/' + id);
			console.log(`L'user ${id} à été suprimé`);
			localStorage.clear();
			window.location = '/Register';
		} catch (error) {
			alert(`Vous n'avez pas accès a cette page, veuillez vous connecter.`);
			window.location = '/';
		}
	};

	// Gestion de la modification post
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
	const updatePost = async (e) => {
		const data = new FormData();
		data.append('title', title);
		data.append('content', content);
		data.append('attachment', prevPicture);
		console.log(data);
		e.preventDefault();
		// Appel a l'API de la route updatePost
		const res = await axios({
			method: 'put',
			url: 'http://localhost:3000/api/posts/' + id,
			data: { title, content, attachment }
		});
		setArticle(res.data.data);
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
					<p className="creez">Modifier l'article</p>
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
					<button name="submit" type="submit" onClick={updatePost}>
						Modifier
					</button>
				</form>
			</div>
			<div key={article.id} className="container_article">
				<button onClick={updateForm} />
				<Admin />
				<div className="square_article">
					<img src={article.attachment} className="mask_article" alt="img" />
					<div className="h1_article">{article.title}</div>
					<p className="text_article">{article.content}</p>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Article;
