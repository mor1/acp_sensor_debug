<template>
    <div>
        <div class="container-fluid">
            <div class="row text-center">
                <div class="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-4">
                    <h3>Status: {{connStatus}}</h3>
                    
                    <!-- Panel div start -->
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <h3 class="panel-title">Humidity</h3>
                        </div>
                        <div class="panel-body">
                            <!-- Chart container -->
                            <div id="chart_container" >
                                <div id="y_axis"></div>
                                <div id="demo_chart" ref="panel"></div>
                            </div>
                            <!-- End of chart container -->
                        </div>
                        <div class="panel-footer">
                            <p v-if="displayedValues.length > 0">
                                <small>
                                    <span v-bind:style="{ color: dvColors.v1}">{{displayedValues[0].payload_fields.humidity}} </span>
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import io from 'socket.io-client'
    import Rickshaw from 'rickshaw'
    import 'rickshaw/rickshaw.min.css'
    import 'bootstrap/dist/css/bootstrap.css'
    var socket = io.connect("http://localhost:3000");
    var magnitudeChart;

    export default {
        name: 'humidity',
        data() {
            return {
                messageSeries: [],
                renderEveryNth: 1,
                updateInterval: 20,
                streamFrequency: 50,
                connStatus: "Disconnected",
                messageIndex: 0,
                displayedValues: [],
                dvColors: {
                    v1: "#cb503a",
                    v2: "#72c039",
                    v3: "#65b9ac"
                },
            }
        },
        mounted() {
            this.initChart();
            this.openSocketListeners();
        },
        watch: {
            renderEveryNth: function() {
                this.messageSeries = [];
                this.messageIndex = 0;
            }
        },
        methods: {
            /* Rickshaw.js initialization */
            initChart() {
                magnitudeChart = new Rickshaw.Graph({
                    element: document.querySelector("#demo_chart"),
                    width: "500",
                    height: "300",
                    renderer: "scatterplot",
                    min: 10,
                    max: 40,
                    series: new Rickshaw.Series.FixedDuration([{
                        name: 'ttnData',
                        color: '#EC644B'
                    }], undefined, {
                        timeInterval: this.updateInterval,
                        maxDataPoints: 100,
                        timeBase: new Date().getTime() / 1000

                    })
                });

                var y_axis = new Rickshaw.Graph.Axis.Y({
                    graph: magnitudeChart,
                    orientation: 'left',
                    tickFormat: function(y) {
                        return y.toFixed(1);
                    },
                    ticks: 5,
                    element: document.getElementById('y_axis'),
                });

                this.resizeChart(magnitudeChart);

                window.addEventListener('resize', () => {
                    this.resizeChart(magnitudeChart)
                });

            },
            resizeChart(chart) {
                chart.configure({
                    width: this.$refs.panel.clientWidth,
                });
                chart.render();
            },
            /* Insert received datapoints into the chart */
            insertDatapoints(messages, chart) {
                for (let i = 0; i < messages.length; i++) {
                    let ttnData = {
                        Magnitude1: messages[i].payload_fields.humidity
                    };
                    chart.series.addData(ttnData);
                }
                chart.render();
            },
            /* Update displayed values every second on average */
            updateDisplayedValues() {
                if (this.messageIndex == this.streamFrequency) {
                    this.messageIndex = 0;
                    this.displayedValues = this.messageSeries;
                } else if (this.messageIndex == 0) {
                    this.displayedValues = this.messageSeries;
                    this.messageIndex++;
                } else {
                    this.messageIndex++;
                }
            },
            openSocketListeners() {
                socket.on('connect', () => {
                    this.connStatus = "Connected";
                });

                socket.on('disconnect', () => {
                    this.connStatus = "Disconnected";
                });

                /* Update chart after every #renderEveryNth message */
                socket.on('ttnData', (message) => {

                    /* Check if displayed values have to be updated */
                    this.updateDisplayedValues();

                    /* Push stream data to current series, if it's not yet render-time */
                    if (this.messageSeries.length < this.renderEveryNth) {
                        this.messageSeries.push(message);
                    }

                    /* Render-time! */
                    if (this.messageSeries.length == this.renderEveryNth) {
                        this.insertDatapoints(this.messageSeries, magnitudeChart);
                        this.messageSeries = [];
                    }
                });
            }
        }
    }

</script>

<style scoped>
    #chart_container {
        padding-right: 40px;
        padding-bottom: 20px;
        margin-top: 20px;
        position: relative;
    }
    
    #demo_chart {
        position: relative;
        left: 40px;
    }
    
    #y_axis {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 40px;
    }
    
    .footy {
        position: relative;
        width: 100%;
        margin-top: 50px;
        height: 60px;
        opacity: 0.2;
    }
    
    .glyphicon {
        color: #8E44AD;
        font-weight: bold;
    }

    .filters {
    width: 800px;
    margin: 0 auto;
    }

    .filter {
    text-align: left;
    }

    .result {
    margin-top: 30px;
    text-align: left;
    }

    label {
    display: block;
    }


</style>
