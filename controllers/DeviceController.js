const mongoose = require('mongoose');
const Device = mongoose.model('Device');
const Data = mongoose.model('Data');

module.exports.createDevice = function(req, res) {
	const deviceData = req.body;
	const device = new Device({
		name: deviceData.name,
		description: deviceData.description,
		owner: req.session.user._id,
		type: deviceData.type,
		status: 0,
	});

	device.save().then(function(device) {
		if (device) {
			res.redirect('/devices');
		}
	});
};

module.exports.getUserDevices = function(req, res) {
	Device.find({ owner: req.session.user._id }).then(function(devices) {
		res.render('devices', { title: 'Your devices', devices: devices });
	});
};

module.exports.getDeviceById = function(req, res) {
	const id = req.params.device_id;

	Device.findById(id).then(function(device) {
		if (device) {
			res.render('device', { title: device.name, device: device });
		} else {
			res.redirect('/devices');
		}
	});
};

module.exports.updateDeviceStatus = function(req, res) {
	const device_id = req.body.device_id;
	const status = req.body.status;

	Device.findOneAndUpdate({ id: device_id }, { status }).then(function(device) {
		if (device) {
			res.redirect('back');
		}
	});
};
