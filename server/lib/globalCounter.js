function globalCounter(req_no, input_type, old_count, data){
	var output = data + old_count;
	return ({
		'type': input_type,
		'req_no': req_no,
		'output': {
			'Input': data,
			'PreviousCounter': old_count,
			'Output': output
		}
	});
}

exports.globalCounter = globalCounter;