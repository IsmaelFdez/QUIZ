var models = require('../models/models.js')

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else { next(new Error('No existe quizId=' + quizId)); }
		}
	).catch(function(error) { next(error);});
};

// GET /quizes
exports.index = function(req, res) {
	if (req.query.search) {
		models.Quiz.findAll({where: ["pregunta like ?", '%' +
									req.query.search.replace(/\s/g, '%') +
									'%']}).then(
			function(quizes) {	
				res.render('quizes/index.ejs', {quizes: quizes});
			}
		).catch(function(error) { next(error);});
	} else {
		models.Quiz.findAll().then(
			function(quizes) {	
				res.render('quizes/index.ejs', {quizes: quizes});
			}
		).catch(function(error) { next(error);});
	}
};

// GET /quizes/:id
exports.show = function(req, res) {
	res.render('quizes/show', {quiz: req.quiz});
};

// Get /quizes/:id/answer
exports.answer = function(req, res) {
	var re = new RegExp('\^' +
							req.quiz.respuesta
								.replace(/á/ig,'[a,á]')
								.replace(/é/ig,'[e,é]')
								.replace(/í/ig,'[i,í]')
								.replace(/ó/ig,'[o,ó]')
								.replace(/ú/ig,'[u,ú]') + '\$', 'i');
	var resultado = 'Incorrecto';
	if (req.query.respuesta.match(re)) {
		resultado = 'Correcto';
	}
	res.render( 'quizes/answer',
				{quiz: req.quiz, respuesta: resultado});
};