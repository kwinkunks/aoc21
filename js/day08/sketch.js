let data;
let test;

function preload() {
	test = loadStrings('./test.txt');
	data = loadStrings('./data.txt');
}

function setup() {
	createCanvas(windowWidth, windowHeight);

  test = test.slice(0, -1).map(x => x.split('|').map(y => y.split(' ')));
  data = data.slice(0, -1).map(x => x.split('|').map(y => y.split(' ')));

  test = test.map(x => [x[0].slice(0, -1), x[1].slice(1)])
  data = data.map(x => [x[0].slice(0, -1), x[1].slice(1)])

	part1(test, data);
  part2(test, data);
}

function draw() {
	background(100);
}

function part1(test, data) {
  console.assert(countSimple(test) == 26);
  console.log(`Part 1: ${countSimple(data)}`);
  return;
}

function part2(test, data) {
  console.assert(sumOutputs(test) == 61229);
  console.log(`Part 2: ${sumOutputs(data)}`);
  return;
}

function sumOutputs(data) {
  return;
}

function countSimple(data) {
  lengths = data.map(x => x[1].map(y => y.length))
  simple = lengths.flat().map(x => [2, 3, 4, 7].includes(x));
  return simple.reduce((a, b) => a + b);
}
