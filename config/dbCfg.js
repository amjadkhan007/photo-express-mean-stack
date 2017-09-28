var mongoose = require('mongoose');
exports.mongoose = mongoose;

var mongoUri = 'mongodb://localhost:27017/photo-express';

mongoose.connect(mongoUri, function (err) {
	if (err) {
		console.log ('ERROR connecting to: ' + mongoUri + ' : ' + err);
	} else {
		console.log ('Successfully connected to: ' + mongoUri);
	}
});