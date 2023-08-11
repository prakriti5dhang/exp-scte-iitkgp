var ctx1;
var gcanvas1;
var pointSize = 2;
var arr = [];
var quotient1, quotient2;
var tabrowindex = 0;
var xyz = new Array();
var cell;
var table;
var counter = 0;
var x, y;
var count1 = 0;
var coordinates1 = new Array();
var coordinates2 = new Array();
var classes = new Array();
var xCo = new Array();
var yCo = new Array();
var transX, transY;
var temp1, temp2;
var i = 0;
var tabrowindex = 0;
var points = []; //points to draw stoke
var dataPointsg=[]; // for chart
var chart;

$(document).ready(function () {
    $("#mycanvas1").click(function (e) {
        getPosition1(e);
    });
});

function canvas11() {
    gcanvas1 = document.getElementById("mycanvas1"),
        ctx1 = gcanvas1.getContext('2d'),
        transX = gcanvas1.width * 0, //21
        transY = gcanvas1.height * 1; //399
    ctx1.translate(transX, transY);
    ctx1.fillRect(0, -transY, 1, gcanvas1.height); //vertical Axis
    ctx1.fillRect(- transX, 0, gcanvas1.width, 1); //Horizantal Axis
    gcanvas1.onmousemove = function (e) {
        var pos1 = getMousePos1(gcanvas1, e);
        //out.innerHTML = 'X:' + pos1.x + ' Y:' + pos1.y;
    }

    chart = new CanvasJS.Chart("ChartContainer", {
        animationEnabled: true,
            title: {
                text: "RBF Prediction",
            },
           
            data: [{
                    type: "spline",
                    dataPoints: dataPointsg
                }]
        });
    
        chart.render();
    
       
       
};
var coordinates = new Array();
function getPosition1(event) {
    var rect = gcanvas1.getBoundingClientRect();
    x = event.clientX - rect.left - transX;
    y = event.clientY - rect.top - transY;
    drawCoordinates(x, y);
    tabled();
}


function getMousePos1(gcanvas1, evt) {
    var rect = gcanvas1.getBoundingClientRect();
    return {
        x: evt.clientX - (rect.left + 0.5) - transX,
        y: evt.clientY - rect.top - transY
    };
}

function drawCoordinates(x, y) {
    xCo.push(x); yCo.push(y);
    points.push({ x, y });
    if (counter < 100) {
        ctx1 = document.getElementById("mycanvas1").getContext("2d");
        ctx1.beginPath();
        ctx1.arc(x, y, pointSize, 0, Math.PI * 2, true);
        ctx1.lineWidth = 1;
        ctx1.strokeStyle = "blue";
        ctx1.fillStyle = "blue";
        ctx1.fill();
        ctx1.stroke();

        /* f ((x>= 0 && x <= 225) && (y >= -400 && y <= -200)){
        classes.push(1);
    } else if ((x >= 225 && x <= 450) && (y >= -400 && y <= -200)) {
        classes.push(2);
    } else if ((x >=0 && x <= 225) && (y >= -200 && y <= 0)) {
        classes.push(3);
    } else {
        //alert(isPoint1 +"   "+isPoint2);
        if(is_in_triangle(x,y,225,-200,220,0,450,0)) classes.push(3);
        if(is_in_triangle(x,y,225,-200,450,-200,450,0)) classes.push(2);
    } */
    }
    //alert(classes);
    temp1 = Math.abs(x);
    temp2 = Math.abs(y);
    quotient1 = parseFloat(temp1 / 49).toPrecision(6); // 11
    quotient2 = parseFloat(temp2 / 52).toPrecision(6); // 3
    var cord = quotient1 + "|" + quotient2;
    xyz.push(cord);
    //alert("cord");
    coordinates1[count1] = quotient1;
    coordinates2[count1] = quotient2;
    count1++;
}



function tabled() {
    table = document.getElementById("mytable");

    arr[0] = tabrowindex + 1;
    arr[1] = quotient1;//x
    arr[2] = quotient2;//y


    if (table.rows.length <= 100) {
        var row = table.insertRow(++tabrowindex); // Row increment
        for (var q = 0; q < 3; q++) {
            cell = row.insertCell(q);
            cell.innerHTML = arr[q];
            document.getElementById("tpdata").innerHTML = "Added training point " + arr[0] + " at ( " + arr[1] + " , " + arr[2] + " )";
        }
    }
}


function reset() {
    ctx1.fillStyle = "black";
    ctx1.clearRect(0, -200, gcanvas1.width, gcanvas1.height);
    //ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx1.fillRect(0, -transY, 1, gcanvas1.height); //vertical Axis
    ctx1.fillRect(- transX, 0, gcanvas1.width, 1); //Horizantal Axis
    var rowCount = table.rows.length;
    for (var j = rowCount - 1; j >= 1; j--) {
        table.deleteRow(j);
        points.pop();
        dataPointsg.pop();
    }
    tabrowindex = 0;
    i = 0;
    document.getElementById("tpdata").innerHTML = "";
    //console.log(xyz);
    xyz = [];
    classes = [];
    clearChart();
}

/************************ Function for draw strokes ***************************/
function drawStroke(ctx, x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}
/**************************** redraw button **********************************/
function redraw() {
    // Draw strokes between points
    ctx1.strokeStyle = 'red';
    for (let i = 0; i < points.length - 1; i++) {
        drawStroke(ctx1, points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
    }
}

function go(){
var centers=document.getElementById("centernum").value;
// Gaussian Radial Basis Function
function radialBasisFunction(input, center, width) {
    var distance = Math.abs(input - center);
    return Math.exp(-0.5 * (distance / width) ** 2);
  }
  
  // RBF Network Prediction
  function rbfNetworkPrediction(input, centers, weights, widths) {
    if (centers.length !== weights.length || centers.length !== widths.length) {
      throw new Error("The number of centers, weights, and widths should be the same.");
    }
  
    let output = 0;
    for (let i = 0; i < centers.length; i++) {
      var rbfValue = radialBasisFunction(input, centers[i], widths[i]);
      output += rbfValue * weights[i];
    }
  
    return output;
  }
  
  // Function to read data from the table and prepare arrays
  function getDataFromTable(mytable) {
    var table = document.getElementById(mytable);
    var rows = table.getElementsByTagName("tr");
  
    // Initialize arrays to hold data
    var inputs = [];
    var outputs = [];
  
    // Skip the first row (header)
    for (let i = 1; i < rows.length; i++) {
      var cells = rows[i].getElementsByTagName("td");
      var input = parseFloat(cells[1].innerText);
      var output = parseFloat(cells[2].innerText);
  
      inputs.push(input);
      outputs.push(output);
    }
  
    return { inputs, outputs };
  }
  
  // Example usage:
  var mytable = "mytable";
  var { inputs, outputs } = getDataFromTable(mytable);
  
  // Assuming you have the centers, weights, and widths arrays from your trained RBF network
  var centers = [ 2.0]; // Example centers array
  var weights = [ 0.5]; // Example weights array
  var widths = [ 1 ]; // Example widths array
  
  // Calculate predictions for each input in the table
  for (let i = 0; i < inputs.length; i++) {
    var input = inputs[i];
    var prediction = rbfNetworkPrediction(input, centers, weights, widths);
    console.log("Prediction for input " +input +" , " + prediction);
    dataPointsg.push({x:input, y:prediction});
  }
  
   
  showgraph();


}


function showgraph(){
    chart = new CanvasJS.Chart("ChartContainer", {
        animationEnabled: true,
            title: {
                text: "RBF Prediction",
            },
            axisX:{
                gridColor: "lightblue" ,
                gridThickness: 1       
              },
            data: [{
                    type: "spline",
                    dataPoints: dataPointsg
                }]
        });
    
        chart.render();
    
       
        console.log(dataPointsg);
    }
    
    
    function clearChart() {
        chart.options.data.forEach((series) => {
            series.dataPoints = [];
          });
        chart.render();
      }
    




//var dataPoints=[];
/*
function euclideanDistance(x1, x2) {
    return Math.abs(x1 - x2);
}
function radialBasisFunction(x, center, gamma) {
    const distance = euclideanDistance(x, center);
    return Math.sin(gamma * distance);
}
function calculateRBFOutputs(input, centers, gamma) {
    return centers.map((center) => radialBasisFunction(input, center, gamma));
}
function calculateWeights(inputs, outputs, centers, gamma) {
    const phiMatrix = inputs.map((input) => calculateRBFOutputs(input, centers, gamma));
    //alert(phiMatrix);
    const phiTranspose = math.transpose(phiMatrix);
    const weights = math.multiply(math.multiply(math.inv(math.multiply(phiTranspose, phiMatrix)), phiTranspose), outputs);
    return weights;
}

var dataPointsg = [];
function plotRBFGraph(points, centers, gamma, weights) {
    const inputs = points.map((point) => point.x);
    const rbfOutputs = inputs.map((input) => calculateRBFOutputs(input, centers, gamma));
    const predictions = math.multiply(rbfOutputs, weights) ;

    dataPointsg = inputs.map((input, index) => ({
        x: input ,
        y: predictions[index] *(-1) ,
    }));
}







function calculate() {
    const gamma = 1;
    const centers = points.map((point) => point.x);
    const weights = calculateWeights(points.map((point) => point.x), points.map((point) => point.y), centers, gamma);
    plotRBFGraph(points, centers, gamma, weights);


}






function go() {
    calculate();

    showgraph();


    

}






 function showgraph(){
    chart = new CanvasJS.Chart("ChartContainer", {
        animationEnabled: true,
            title: {
                text: "RBF Prediction",
            },
            axisX:{
                gridColor: "lightblue" ,
                gridThickness: 1       
              },
            data: [{
                    type: "spline",
                    dataPoints: dataPointsg
                }]
        });
    
        chart.render();
    
       
        console.log(dataPointsg);
    } 
    


*/


