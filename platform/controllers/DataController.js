const mongoose = require('mongoose');
const Device = mongoose.model('Device');
const Data = mongoose.model('Data');

module.exports.saveData = function(req, res) {
	const device_id = req.query.device_id;
	const value = req.query.value;

	Device.findById(device_id).then(function(device) {
		if (!device) {
			res.status(404);
		}
	});

	const dataDevice = new Data({
		value: value,
		device: device_id,
	});

	dataDevice.save().then(function(dataDevice) {
		if (dataDevice) {
			res.send('OK').status(200);
		}
	});
};
