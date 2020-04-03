const config = require('./config.json');
const express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    opt = {username: config.username, password: config.password},
    mqtt = require('mqtt'),
    mqttClient = mqtt.connect(config.hostname, opt),
    mqttTopic = config.mqttTopic,
    sensor = config.sensor
    server = require('http').createServer(app),
    io = require('socket.io').listen(server);

var streamInterval;

/* 
Subscribe to MQTT topic
*/
mqttClient.on('connect', () => {
    console.log('Mqtt connected.')
    mqttClient.subscribe(mqttTopic);
})

mqttClient.on('offline', () => {
    console.log('Mqtt offline.')
    mqttClient.unsubscribe(mqttTopic);
    clearInterval(streamInterval);
})

/* 
Message event fires, when new messages
arrive on the subscribed topic
*/
mqttClient.on('message', function (topic, message) {
    /* console.log('Received: ' + message.toString() + ' from topic: ' + topic.toString()); */
    let parsedMessage = JSON.parse(message);
    //console.log(parsedMessage)
    if ((parsedMessage.dev_id).includes(sensor)){
        console.log(parsedMessage)
        io.emit('ttnData', parsedMessage);
    }        
})

io.on('connection', (client) => {
    console.log("Socket connected.")
})

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.get('/', function (req, res) {
    res.send(
    [{
            title: "Hi, I'm the express server!",
            description: "Start the client application to see the action!"
    }]
    )
});

server.listen(3000, function () {
    console.log('App listening on port 3000!');
});
