const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('/', function(req, res) {
	res.render('index', { title: 'Homepage' });
});

router.get('/register', userController.checkLoggedOut, function(req, res) {
	res.render('register', { title: 'Register', styleFile: 'register.css' });
});

router.post('/register', userController.validateRegister, userController.registerUser, function(req, res) {
	res.send('User registered');
});

router.get('/login', userController.checkLoggedOut, function(req, res) {
	res.render('login', { title: 'Login' });
});

router.post('/login', userController.login);

router.get('/signout', userController.signout);

router.get('/account', userController.checkSession, function(req, res) {
	res.render('account', { title: 'User account' });
});

router.get('/boards', function(req, res) {
	res.render('boards', { title: 'Boards' });
});

module.exports = router;
