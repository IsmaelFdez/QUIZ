var models = require('../models/models.js')

// GET /quizes/question
exports.question = function(req, res) {
	models.Quiz.findAll().success(function(quiz) {
		res.render('quizes/question', {pregunta: quiz[0].pregunta});
	})
};

// Get /quizes/answer
exports.answer = function(req, res) {
	models.Quiz.findAll().success(function(quiz) {
		var re = new RegExp(quiz[0].respuesta, 'i')
		if (req.query.respuesta.match(re)) {
			res.render('quizes/answer', {respuesta: 'Correcto'});
		} else {
			res.render('quizes/answer', {respuesta: 'Incorrecto'});
		}
	})
};