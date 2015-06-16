// Autorización de accesos HTTP restringidos
exports.loginRequired = function(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		res.redirect('/login');
	}
};

// GET /login	Formulario de login
exports.new = function(req, res) {
	var errors = req.session.errors || {};
	req.session.errors = {};

	res.render('sessions/new', {errors: errors});
};

// POST /login	Crear sesión
exports.create = function(req, res) {
	var login = req.body.login;
	var password = req.body.password;

	var userController = require('./user_controller');
	userController.autenticar(login, password, function(error, user) {

		if (error) {	// si hay error retornamos mensajes de error
			req.session.errors = [{"message": 'Se ha producido un error: '+ error}];
			res.redirect("/login");
			return;
		}

		// Crear req.session.user y guarda campos id y username
		// Sesión definida por existencia de req.session.user
		req.session.user = {id:user.id, username: user.username};

		res.redirect(req.session.redir.toString()); // redirección
	});
};

// DELETE /logout	Destruir sesión
exports.destroy = function(req, res) {
	delete req.session.user;
	res.redirect(req.session.redir.toString());
};