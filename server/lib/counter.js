function counter(req_no, input_type, data){
	var out = data + 1;
	return ({
		'type': input_type,
		'req_no': req_no,
		'output': {
			'Input': data,
			'Output' : out
		}
	});
}

exports.counter = counter;