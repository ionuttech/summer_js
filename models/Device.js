const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	owner: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	description: {
		type: String,
	},
	type: {
		type: String,
	},
	status: {
		type: Number,
		default: 0,
	},
});

DeviceSchema.virtual('data', {
	ref: 'Data',
	localField: '_id',
	foreignField: 'device',
});

function autopopulate(next) {
	this.populate('data');
	next();
}
DeviceSchema.set('toObject', { virtuals: true });
DeviceSchema.set('toJSON', { virtuals: true });
DeviceSchema.pre('find', autopopulate);
DeviceSchema.pre('findOne', autopopulate);
DeviceSchema.pre('findById', autopopulate);

module.exports = mongoose.model('Device', DeviceSchema);
