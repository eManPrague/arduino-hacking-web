var connection;
var connectionTryouts = 0;

function connect() {
	connection = new WebSocket("ws://" + location.host);
}

function connectAndSend(callback) {
	if (connection && connection.readyState === 1) {
		callback();
	} else {
		connect();
		connectionTryouts++;
		setTimeout(function(){
			if (!connection || connection.readyState !== 1) {
				if (connectionTryouts === 3) {
					alert('Cannot connect to webserver.');
					connectionTryouts = 0;
				} else {
					connectAndSend(callback);
				}
			} else {
				callback();
			}
		}, 2000);
	}
}

// DOM
$(document).ready(function(){
	connect();
})

$('[data-color]').on('click', function(event){
	event.stopPropagation();
	event.preventDefault();
	var $this = $(this);
	if ($this.data('color')) {
		var $inp = $('.form input');
		$inp.val($inp.val() + $this.data('color'));
	}
})

$('#send').on('click', function(){
	var $inp = $('.form input');
	connectAndSend(function() {
		connection.send($inp.val());
		$inp.val('');
	});
});
