var path = require('path');

// Postgres DATABASE_URL = postgres://user:password@host:port/database
// SQLite DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name = (url[6]||null);
var user = (url[2]||null);
var pwd = (url[3]||null);
var protocol = (url[1]||null);
var dialect = (url[1]||null);
var port = (url[5]||null);
var host = (url[4]||null);
var storage = process.env.DATABASE_STORAGE;

// Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
var sequelize = new Sequelize(DB_name, user, pwd,
					{	dialect: protocol,
						protocol: protocol,
						port: port,
						host: host,
						storage: storage,	// solo SQLite (.env)
						omitNull: true		//	solo Postgres
					});

// Importar la definición de la tabla Quiz
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

exports.Quiz = Quiz; // esportar definición de tabla Quiz

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function() {
	Quiz.count().then(function (count) {
		if(count === 0) {
			Quiz.create({	pregunta: '¿Cuál es la capital de Italia?',
							respuesta: 'Roma',
							tema: 'geo'
						});

			Quiz.create({	pregunta: '¿Cuál es la capital de Portugal?',
							respuesta: 'Lisboa',
							tema: 'geo'
						})

			Quiz.create({	pregunta: '¿Cuál es la fórmula química del agua?',
							respuesta: 'H2O',
							tema: 'quim'
						})

			Quiz.create({	pregunta: '¿A qué orden de insectos pertenecen los gusanos de seda?',
							respuesta: 'Lepidópteros',
							tema: 'bio'
						})

			Quiz.create({	pregunta: '¿Cuál es el planeta más cercano al Sol?',
							respuesta: 'Mercurio',
							tema: 'ast'
						})

			.then(function(){console.log('Base de datos inicializada')});
		};
	});
});

	 	
	
	 	
	
	 	
	
	 	
	
	 