import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

function Header() {
	return (
		<header>
			<div>
				<Link to="/Feed">
					<img className="logo" src="./img/icon-left-font-monochrome-white.png" alt="Groupomania" />
				</Link>
			</div>
		</header>
	);
}

export default Header;
