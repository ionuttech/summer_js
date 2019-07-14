const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');
const deviceController = require('../controllers/DeviceController');
const dataController = require('../controllers/DataController');

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

router.get('/devices', userController.checkSession, deviceController.getUserDevices);
router.get('/device/:device_id', userController.checkSession, deviceController.getDeviceById);

router.get('/create-device', userController.checkSession, function(req, res) {
	res.render('create-device', { title: 'Create a new device' });
});

router.post('/create-device', userController.checkSession, deviceController.createDevice);

router.post('/save-data', dataController.saveData);
router.post('/update-device-status', deviceController.updateDeviceStatus);

module.exports = router;
