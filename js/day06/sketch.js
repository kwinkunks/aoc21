let data;
let test;

function preload() {
	test = loadStrings('./test.txt');
	data = loadStrings('./data.txt');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
  test = test.map(x => x.split(',').map(Number))[0];
  data = data.map(x => x.split(',').map(Number))[0];
	part1(test, data);
  part2(test, data);
}

function draw() {
	background(100);
}

function part1(test, data) {
  console.assert(solve(test, 17) == 26);
  console.log(solve(test, 17));
  console.assert(solve(test, 79) == 5934);
  console.log(`Part 1: ${solve(data, 79)}`);
  return;
}

function part2(test, data) {
  console.assert(solve(test, 255) == 26984457539);
  // console.log(`Part 2: ${solve(data, 79)}`);
  return;
}

function solve(shoal, days) {
  for (i = days; i >= 0; i--) {
    shoal = addDay(shoal);
  }
  return shoal.length;
}

function addDay(shoal) {
  let newShoal = new Array;
  for (let fish of shoal) {
    if (fish > 0) {
      newShoal.push(fish - 1);
    } else if (fish == 0) {
      newShoal.push(6);
      newShoal.push(8);
    }
  }
  return newShoal;
}
