//fichier comprenant les fonctions de vérification des inputs des users
module.exports = {
	validPassword: function(value) {
		//8 caractères dont au minimum une majuscule, une minuscule, un caractère numérique et un caractère spécial
		const regexPassword = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/;
		return regexPassword.test(value);
	},
	validUsername: function(value) {
		const usernameRegex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
		return usernameRegex.test(value);
	}
};
