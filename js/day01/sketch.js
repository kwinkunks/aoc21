let data;
let test;

function preload() {
	// These are asynchronous and can't be used yet.
	// These load strings.
	test = loadStrings('test.txt');
	data = loadStrings('data.txt');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	part1(test.map(Number), data.map(Number));
	part2(test.map(Number), data.map(Number));
}

function draw() {
	background(100, 100, 100);
}

function part1(test, data) {
	const kernel = [1];
	console.assert(posDiffLength(test, kernel) == 7);
	console.log(`Part 1 solution: ${posDiffLength(data, kernel)}`);
	return;
}

function part2(test, data) {
	const kernel = [1, 1, 1];
	console.assert(posDiffLength(test, kernel) == 5);
	console.log(`Part 2 solution: ${posDiffLength(data, kernel)}`);
	return;
}

function posDiffLength(data, kernel) {
	let sum = convolve(data, kernel, mode='valid');
	let diff = sum.map((x, i, d) => x - d[i-1]);
	let posDiff = diff.filter(x => x > 0);
    return posDiff.length
}
