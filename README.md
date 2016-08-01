Arduino Hacking Web
===================

Web server working as a part of eMan IoT workshop apps stack (see Related) sending color sequences from user's phones to Arduino Uno via MQTT broker.

Features
--------

1. Websocket server (via [express](https://expressjs.com/) & [express-ws](https://github.com/HenningM/express-ws)) and MQTT client (via [mqttjs](https://github.com/mqttjs/MQTT.js)) in one environment
2. Forwards received Websocket messages (typically from a web browser) to the MQTT broker

Installation
---------------------------

* Run `npm install` to download all the dependencies.
* Open `app.js` and fill in your broker's hostname/port and the login credentials.
* Launch the app from your terminal (`node app.js`).
* You can now navigate to the site in your browser (typically `http://localhost:8001`).


Related
-------

* [Arduino Hacking - Arduino](https://github.com/eManPrague/arduino-hacking-arduino)
* [Arduino Hacking - iOS and watchOS ](https://github.com/eManPrague/arduino-hacking-ios)


License
-------

Arduino Hacking Web is released under the [MIT License](http://www.opensource.org/licenses/MIT).
