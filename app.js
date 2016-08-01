var mqtt      = require('mqtt');
var express   = require('express');
var app       = express();
var appWs     = require('express-ws')(app);

/*
  IMPORTANT: Fill in your environment config
*/
var mqttConfig = {
  server: '', // typically http://localhost:1883
  username: '', // user
  password: '' // password
}

var channel = 'arduino/arduino-uno/stream';

/* MQQT client */
var mqttClient  = mqtt.connect(mqttConfig.server, {
	username: mqttConfig.username,
	password: mqttConfig.password,
});

// 1) connect and subscribe to stream topic
mqttClient.on('connect', function () {
  mqttClient.subscribe(channel);
});

// 2) when receive a message from the broker, just print it
mqttClient.on('message', function (topic, message) {
  console.log(message.toString());
});


/* HTTP server */
app.listen(8001, function () {
  console.log('Server listening on port 8001...');
});

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});

app.use('/js', express.static('js'));
app.use('/css', express.static('css'));

/* Websocket server using current HTTP server */
app.ws('/', function(ws, req) {
  // when message received via Websocket, publish it to the MQTT broker
  ws.on('message', function(message) {
		mqttClient.publish(channel, message);
	});
});
