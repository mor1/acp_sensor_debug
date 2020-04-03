This project demonstrates the visualization of data streams received from multiple sensors over MQTT through The Things Network. (Could be modified to serve other MQTT brokers too.)

## Features
### TTN Server
+ Subscribes to MQTT topic
+ forwards the received messages to the client using websockets

### Historical Data Server
+ reads the historical data
+ provides an API to retrieve the historical data


### Client
+ real-time data visualization with a multi-series line chart
+ historical data visualization

## Getting Started

### Prerequisites

Before you run the client, be sure you have these downloaded/installed on your machine:

+ node.js
+ npm
+ python3.6
+ python-flask and python-flask_cors (use python-pip)
+ have the feedmqtt.ttn secrets file

### Installing

To get started with this project, follow the installation steps described here,


## 1. mqtt-ttn-server

Create a config.json file like this,

```
{
    "username": "user",
    "password": "pwd",
    "hostname": "mqtt://hostname",
    "mqttTopic": "topic",
    "sensor": "sens"
}
```
Navigate inside the root folder and run,

```
npm install
npm start
```

this will install the dependencies and start the express server locally on port 3000.

## 2. historical-data-server
Navigate inside the root folder and run,

```
python history_server.py
```

this will start the server locally on port 5000


## 2. client

Open a new terminal window and navigate inside the root folder of the client application, then run:

```
npm install
npm start
```

After compilation, you will see the link in the terminal *(e.g. http://localhost:8080)* where the application is currently running. Use your browser to navigate to that link. You could update the config/index.js to change the address.

Currently temperature, co2, light and humidity data are supported. To view the specific feature data go to *http://localhost:8080/feature* or use the navigation bar. The default is temperature. Note that not all sensors have all features and in those cases a blank chart would be seen.

In order to view historical charts, go to *http://localhost:8080/static/historical.html*. Fill the form and click update.

## Known Issues
There are some known issues which have listed in the issues of the repository and the related fixes also provided.

## Work in Progress
+ A component to localize all sensors on map


## Built With


### Server
* [Express.js](https://github.com/expressjs/express) - minimalist web framework for node.
* [Socket.io](https://github.com/socketio/socket.io) - real-time bidirectional event-based communication using websockets
* [MQTT.js](https://github.com/mqttjs/MQTT.js) - MQTT client for Node.js and the browser
* [python-flask](https://flask.palletsprojects.com/en/1.1.x/) - Python web development

### Client
* [Vue.js](https://github.com/vuejs/vue) - JavaScript framework for building UI on the web.
* [Rickshaw.js](https://github.com/shutterstock/rickshaw) - JavaScript toolkit for creating interactive real-time graphs
* [Chart.js](https://www.chartjs.org/) - Javascript tool for charts
* [Socket.io-client](https://github.com/socketio/socket.io) - real-time bidirectional event-based communication using websockets (client)
* [Bootstrap](https://github.com/twbs/bootstrap) - HTML, CSS, and JavaScript framework for developing responsive, mobile first projects on the web.



## Authors

* **Rohit Verma** - [GitHub](https://github.com/rv355)

## Acknowledgement

* **Nick Jokic** for JavaScript: Real-time visualization of high-frequency streams (https://itnext.io/javascript-real-time-visualization-of-high-frequency-streams-d6533c774794)

