require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sanitizeHTML = require('sanitize-html');
var bodyParser = require('body-parser');
var fs = require('file-system');
var mongoose = require('mongoose');
//Blog = require("./models/blog")
var User = require('./models/User');
var Teacher = require('./models/Teacher');
//got controller setup, no need for the routes and the folder
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

//dotenv setup confirmation
console.log({Girl: process.env.Alexis_Texas, Port: process.env.DB_Port});

//connection to mongodb server
mongoose.connect('mongodb://localhost:27017/express_app', { useNewUrlParser: true, useUnifiedTopology: true },function() {
	console.log('Connection to mongodb has been made.');
})
.catch(err => {
	console.error('App starting error: ', err.stack);
	process.exit(1);
})

//Include controllers
fs.readdirSync('controllers').forEach(function(file){
	if(file.substr(-3) == '.js') {
		const route = require('./controllers/' + file)
		route.controller(app)
	}
})

//Playing around with a teacher mock document

// var teacher_resource = {
// 	name: 'lupux lynx2222222',
// 	email: 'fnbdesign@gmail.com',
// 	subjects: [
// 	{
// 		name: "Chemistry",
// 		syllabi: ["IBDP", "A-level", "IGCSE", "ISEB", "AP", "SATII"]
// 	},
// 	{
// 		name: "Science",
// 		syllabi: ["IBMPY", "IGCSE", "ISEB"]
// 	},
// 	{
// 		name: "Non Verbal Reasoning",
// 		syllabi: ["ISEB", "CEM"]
// 	},
// 	{
// 		name: "Verbal Reasoning",
// 		syllabi: ["ISEB", "CEM"]
// 	}]
// }

// Teacher.create(teacher_resource, (err, createdTeacher) => {
// 	if (err) {console.log(err)}
// 	console.log(createdTeacher)
// })


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3000, function() {console.log('listening on 3000')})

module.exports = app;
