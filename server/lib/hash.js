function hash(req_no, input_type, data) {
	var md5 = require('md5');
	var hash_op = md5(data);
	return ({
		'type': input_type,
		'req_no': req_no,
		'output': {
			'Input': data,
			'Output': hash_op
		} 
	});
}

exports.hasher = hash;