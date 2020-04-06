function getSensor(){
  var source = document.getElementById("source").value
  const url = 'http://localhost:5000/sensors?source='+source;

  var jsonData1 = $.ajax({
      url: url,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      async: true,
      headers: {"Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "x-requested-with"},
      crossDomain: true
    }).done(function (results) {
      var data=[];
      results["data"].forEach(function(packet) {
        data.push(packet.sensor);
      });
      
      var opt = '';
      for (var i = 0; i < data.length; i++){
        console.log(data[i]);
        opt += '<option value= "' + data[i] + '">' + data[i] + '</option>';
      }
      $('#sensor').html(opt);
        
    });
    
}

function getFeature(){
  var date = document.getElementById("date").value
  var source = document.getElementById("source").value
  var sensor = document.getElementById("sensor").value
  const url = 'http://localhost:5000/features?date='+date+'&source='+source+'&sensor='+sensor;

  var jsonData2 = $.ajax({
      url: url,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      async: true,
      headers: {"Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "x-requested-with"},
      crossDomain: true
    }).done(function (results) {
      var data=[];
      results["data"].forEach(function(packet) {
        data.push(packet.feature);
      });
      
      var opt = '';
      for (var i = 0; i < data.length; i++){
        console.log(data[i]);
        opt += '<option value= "' + data[i] + '">' + data[i] + '</option>';
      }
      $('#feature').html(opt);
        
    });
    
}

function drawLineChart() {

  var selecteddate = document.getElementById("date").value;
  var source = document.getElementById("source").value;
  var sensor = document.getElementById("sensor").value;
  var feature = document.getElementById("feature").value;
  var url = 'http://localhost:5000?date='+selecteddate+'&source='+source+'&sensor='+sensor+'&feature='+feature
  var jsonData = $.ajax({
    url: url,
    dataType: 'json',
    async: true,
    headers: {"Access-Control-Allow-Origin": "*"},
  }).done(function (results) {

    // Split timestamp and data into separate arrays
    var labels = [], data=[];
    results["data"].forEach(function(packet) {
      //labels.push(new Date(packet.ts).formatMMDDYYYY());
      var date = new Date(parseFloat(packet.ts) * 1000);
      var hours = date.getHours();
      labels.push(hours)
      data.push(parseFloat(packet.val));
    });    

    // // Get the context of the canvas element we want to select
    var ctx = document.getElementById("myChart");

    var updateButton = document.getElementById('updateButton');
    updateButton.addEventListener("click", function(){
      myNewChart.destroy();
    });    

    // Create the chart.js data structure using 'labels' and 'data'
    var tempData = {
      labels : labels,
      datasets : [{
          fillColor             : "rgba(151,187,205,0.2)",
          strokeColor           : "rgba(151,187,205,1)",
          pointColor            : "rgba(151,187,205,1)",
          pointStrokeColor      : "#fff",
          pointHighlightFill    : "#fff",
          pointHighlightStroke  : "rgba(151,187,205,1)",
          data                  : data
      }]
    };

    // // // Instantiate a new chart
    var myNewChart = new Chart(ctx , {
      type: "line",
      data: tempData,
      options: {
        title: {
          display: true,
          text: 'Date: ' + selecteddate+', Sensor: '+sensor+', Feature: '+feature,
          fontSize: 15

        },
        fill: false,
        showLines: false,        
        legend: {
          display: false
        },
        scales: {
          xAxes : [{
               gridLines : {
                    display : false,
               },
               ticks: {
                userCallback: function(item, index) {
                  if (!(index % 11)) return item;
                }
               },
               scaleLabel: {
                display: true,
                labelString: 'Hour of the day',
                fontStyle: 'bold',
                fontSize: 13
               }
          }]
        }
      }
    });
  });
}

drawLineChart();