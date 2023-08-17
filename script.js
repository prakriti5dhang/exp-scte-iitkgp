// Parameters
const numDataPoints = 10;
const numRBFNodes = 1;
const beta = 1.0;

// Generate random data points
const data = generateData(numDataPoints);

// Generate RBF node centers
const rbfCenters = generateRBFNodes(numRBFNodes);

// Calculate RBF activations
const rbfActivations = calculateRBFActivations(data, rbfCenters, beta);

// Create traces for data points, RBF node centers, and activations
const dataTrace = {
    x: data.map(point => point.x),
    y: data.map(point => point.y),
    mode: 'markers',
    type: 'scatter',
    name: 'Data Points'
};

const rbfCenterTrace = {
    x: rbfCenters.map(center => center.x),
    y: rbfCenters.map(center => center.y),
    mode: 'markers',
    type: 'scatter',
    name: 'RBF Node Centers'
};

const rbfActivationTraces = [];
for (let i = 0; i < numRBFNodes; i++) {
    const trace = {
        x: data.map(point => calculatePhi(point, rbfCenters[i], beta)),
        y: rbfActivations.map(activation => activation[i]),
        mode: 'lines',
        type: 'scatter',
        name: `RBF Node ${i + 1}`
    };
    rbfActivationTraces.push(trace);
}

// Plot the graph using Plotly.js
const layout = {
    title: 'RBF Network Graph',
    xaxis: { title: 'Phi * Distance' },
    yaxis: { title: 'Activation' }
};

const traces = [dataTrace, rbfCenterTrace, ...rbfActivationTraces];
Plotly.newPlot('graph', traces, layout);

// Functions for generating data and calculating RBF activations
function generateData(numPoints) {
    const data = [];
    for (let i = 0; i < numPoints; i++) {
        const x = Math.random();
        const y = Math.random();
        data.push({ x, y });
    }
    return data;
}

function generateRBFNodes(numNodes) {
    const centers = [];
    for (let i = 0; i < numNodes; i++) {
        const x = Math.random();
        const y = Math.random();
        centers.push({ x, y });
    }
    return centers;
}

function calculatePhi(x, c, beta) {
    const distanceSquared = (x.x - c.x) ** 2 + (x.y - c.y) ** 2;
    return Math.exp(-beta * distanceSquared) * Math.sqrt(distanceSquared);
}

function calculateRBFActivations(data, centers, beta) {
    const activations = [];
    for (const point of data) {
        const activation = [];
        for (const center of centers) {
            const phi = calculatePhi(point, center, beta);
            activation.push(phi);
        }
        activations.push(activation);
    }
    return activations;
}
