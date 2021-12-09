let data;
let test;

function preload() {
    test = loadStrings('./test.txt');
    data = loadStrings('./data.txt');
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    test = test.map(x => x.split('')).slice(0, -1);
    data = data.map(x => x.split('')).slice(0, -1);
    part1(test, data);
    part2(test, data);
}

function draw() {
    background(100);
}

function part1(test, data) {
    console.assert(powerConsumption(test) == 198);
    console.log(`Part 1: ${powerConsumption(data)}`);
    return;
}

function part2(test, data) {
    console.assert(gasRating(test, gas='oxygen') == 23);
    console.assert(gasRating(test, gas='co2') == 10);
    console.log(`Part 2: ${gasRating(data, gas='oxygen') * gasRating(data, gas='co2')}`);
    return;
}

function powerConsumption (data) {
    const common = commonBits(data);
    const gamma = parseInt(common.map(x => +x).join(''), 2);
    const epsilon = parseInt(common.map(x => +(!x)).join(''), 2);
    return gamma * epsilon
}

function gasRating (data, gas='oxygen') {
    const flip = gas == 'oxygen' ? false : true;
    let i = 0;
    let common;
    while (data.length > 1) {
        common = commonBits(data);
        data = data.filter(x => x[i] == common[i]^flip);
        i++;
    }
    return parseInt(data[0].join(''), 2);
}

function commonBits(arr) {
    // Takes array of arrays of strings of '1', '0'.
    // Returns array of booleans.
    const transpose = m => m[0].map((x, i) => m.map(x => x[i]));
    const replacer = x => x.replace('0', '-1')
    const reducer = (p, n) => Number(p) + Number(n);
    return transpose(arr)
           .map(x => x.map(replacer)
           .reduce(reducer))
           .map(x => x >= 0);  
}
