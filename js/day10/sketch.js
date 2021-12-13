let data;
let test;
let points;
let openers;

function preload() {
	test = loadStrings('./test.txt');
	data = loadStrings('./data.txt');
}

function setup() {
	createCanvas(windowWidth, windowHeight);

	points = {")": 3, "]": 57, "}": 1197, ">": 25137};
	value = {"(": 1, "[": 2, "{": 3, "<": 4};
    openers = ["(", "[", "{", "<"];
	
	part1(test, data);
    part2(test, data);
}

function draw() {
	background(100);
}

function part1(test, data) {
  corrupted = countSimple(test);
  console.assert(corrupted.reduce((a, b) => a + b, 0) == 26397);
  corrupted = countSimple(data);
  console.log(`Part 1: ${corrupted.reduce((a, b) => a + b, 0)}`);
  return;
}

function part2(test, data) {
	corrupted = countSimple(test);
	console.log(corrupted);

	incomplete = test.filter(x => !corrupted.includes(x));
	console.log(incomplete);
	console.assert(complete(incomplete) == 288957);

	// incomplete = countSimple(data);
	// incomplete = data.filter(x => !corrupted.includes(x));
    // console.log(`Part 2: ${complete(incomplete)}`);
    return;
}

function complete(data) {
	let todo = [];
	for (let line of data) {
		let stack = [];
		let tocomplete = [];
		for (let char of line) {
			if (openers.includes(char)) {
				stack.push(char);
			} else {
				let _ = stack.pop();
			}
		}
        todo.push(score(stack));
		console.log(score(stack));
	}
	return median(todo);
}

function median(arr) {
	const len = arr.length;
	const arrSort = arr.sort();
	const mid = Math.ceil(len / 2);
	return len % 2 == 0 ? (arrSort[mid] + arrSort[mid - 1]) / 2 : arrSort[mid - 1];
}

function score(seq) {
	let score = 0;
	for (let char of seq.reverse()) {
		score = 5 * score + value[char];
	}
	return score;
}


function countSimple(data) {
	let corrupted = [];
	for (let line of data) {
		let stack = [];
		for (let char of line) {
			if (openers.includes(char)) {
				stack.push(char);
			} else if (char == ")") {
				if (stack.pop() != "(") {
					corrupted.push(points[char]);
					break;
				}
			} else if (char == "]") {
				if (stack.pop() != "[") {
					corrupted.push(points[char]);
					break;
				}
			} else if (char == "}") {
				if (stack.pop() != "{") {
					corrupted.push(points[char]);
					break;
				}
			} else if (char == ">") {
				if (stack.pop() != "<") {
					corrupted.push(points[char]);
					break;
				}
			}
		}
	}
	return corrupted;
}
