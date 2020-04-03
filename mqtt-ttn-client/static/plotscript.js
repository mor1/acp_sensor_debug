function drawLineChart() {
  
  var selecteddate = document.getElementById("myForm.date").value;
  var sensor = document.getElementById("myForm.sensor").value;
  var feature = document.getElementById("myForm.feature").value;
  var url = 'http://localhost:5000?date='+selecteddate+'&sensor='+sensor+'&feature='+feature
  var jsonData = $.ajax({
    url: url,
    dataType: 'json',
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

    // // Get the context of the canvas element we want to select
    var ctx = document.getElementById("myChart");

    if(myNewChart){
      myNewChart.destroy();
    }

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