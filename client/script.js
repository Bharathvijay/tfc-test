var process_html_output = function(data){
	var str = '<div>' + "request (#" + data.req_no + ") -- " + data.type + "<br />" +
				'<table class="out-table" border="1">'+
					'<tr>';
	for (out in data.output) {
		str = str + '<th class="tb-header">' + out + '</th>';
	}

	str = str + '</tr> <tr>';

	for (val in data.output) {
		str = str + '<td>' + data.output[val] + '</td>';
		console.log(data.output[val]);
	}

	str = str + '</tr></table></div><br />';
	$("#result").append(str);
}


var main = function() {
	$('#form-submit').click(function(event){
		console.log("I am clicked");
		var opt = $("select").val();
		var value = $('input[name=val]').val();
		var route = 'http://localhost:8000/api/' + opt;

		var formData = {
			'option' : opt,
			'val' : value
		};

		$.ajax({
			type: 'POST',
			url: route,
			data: formData,
			dataType: 'json',
			encode: true
		})
		.done(function(data) {
			var out = '';
		 	switch (data.type){
		 		case 'hash':
		 			process_html_output(data);
		 			//console.log(data.output);
		 			break;
		 		case 'counter':
		 			process_html_output(data);
		 			//console.log(data);
		 			break;
		 		case 'global-counter':
		 			process_html_output(data);
		 			//console.log(data.output)
		 			break;
		 	}
		})
		.then(function(){
			$('input').val('');
		});

		event.preventDefault();
	});
};

$(document).ready(main);

