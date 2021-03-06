# ACP Sensor Debug

This project demonstrates the visualization of data streams received from multiple sensors over MQTT through The Things Network and local sensors.

## Architecture

ACP Sensor Debug has three key elements:

1. Providing a restful API allowing access to the sensor data on the platform.

2. Providing a simple templated web serving capability, used for serving web pages that:
    1. enable selection of a data source
    1. enable selection of a sensor from that source
    1. enable selection of a JSON property for a data value from each data reading, and a property
    (default acp_ts) for a time value from the same data reading
    1. providing a graph for the data given the above parameters
    1. allowing the user to navigate backwards and forwards in time in the above graph.

3. Supporting real-time update of data into the served pages.

## Technology choices (currently candidates, as we refine the design)

1. Restful API

    Python / Flask, as below

2. Templated web server

    Suggestion for now: also use Python / Flask with the `render_template()` function

3. Real-time web-page update

    This should be a templated web page which opens web sockets to
    [acp_server/RTMonitor](https://github.com/AdaptiveCity/acp_server/tree/master/src/main/java/acp_server/rtmonitor)

    A testing webpage for RTMonitor-connecting web pages is [RTClient](https://github.com/ijl20/rtclient)

## Features
### TTN Server
+ Subscribes to MQTT topic
+ forwards the received messages to the client using websockets


### TTN Client
+ real-time data visualization with a multi-series line chart

### Historical Chart Server
+ reads the historical data
+ provides an API to retrieve the historical data
+ displays the historical charts based on user inputs

## Getting Started

### Prerequisites

Before you run the client, be sure you have these downloaded/installed on your machine:

+ node.js
+ npm
+ python3.6
+ python-flask (use python-pip)
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


## 2. client

Open a new terminal window and navigate inside the root folder of the client application, then run:

```
npm install
npm start
```

After compilation, you will see the link in the terminal *(e.g. http://localhost:8080)* where the application is currently running. Use your browser to navigate to that link. You could update the config/index.js to change the address.

Currently temperature, co2, light and humidity data are supported. To view the specific feature data go to *http://localhost:8080/feature* or use the navigation bar. The default is temperature. Note that not all sensors have all features and in those cases a blank chart would be seen.

## 2. historical-data-server
Navigate inside the root folder and run,

```
python history_server.py
```

this will start the server locally on port 5000

In order to view historical charts, go to *http://localhost:5000/history*. Fill the form and click update.

## Known Issues
### Internal watch fails with nodemon
* Issue: Sometimes the server fails with the error

"Internal watch failed: watch /mqtt-ttn-chart/mqtt-ttn-server ENOSPC"
npm ERR! Linux 5.3.0-40-generic
npm ERR! argv "/usr/bin/node" "/usr/bin/npm" "start"
npm ERR! node v8.10.0
npm ERR! npm v3.5.2
npm ERR! code ELIFECYCLE
npm ERR! server@1.0.0 start: ./node_modules/nodemon/bin/nodemon.js src/app.js
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the server@1.0.0 start script './node_modules/nodemon/bin/nodemon.js src/app.js'.

* Solution:
Run the following to resolve the above issue;

sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p

This increases the watches allowed for a user which could be low by default.

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
