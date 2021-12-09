let data;
let test;
let sub;

function preload() {
	// These are asynchronous and can't be used yet.
	// These load strings.
	test = loadStrings('./test.txt');
	data = loadStrings('./data.txt');
}

function setup() {
	createCanvas(windowWidth, windowHeight);

  // Always get extra line
  test = test.map(x => x.split(' ')).slice(0, -1);
  data = data.map(x => x.split(' ')).slice(0, -1);
  console.log(test);

  sub = new Submarine(data);

	part1(test, data);
  part2(test, data);
}

function draw() {
	background(100);
  sub.update();
  sub.render();
}

function part1(test, data) {
  position = travel(test);
  console.assert(position.x * position.y == 150);
  position = travel(data);
  console.log(`Part 1: ${position.x * position.y}`);
	return;
}

function part2(test, data) {
  position = travelAim(test);
  console.assert(position.x * position.y == 900);
  position = travelAim(data);
  console.log(`Part 2: ${position.x * position.y}`);
	return;
}

function travel(course) {
  let position = createVector(0, 0);
  for (const [dir, vel] of course) {
    if (dir === 'forward'){
      position.add(createVector(Number(vel), 0));
    } else if (dir === 'up') {
      position.add(createVector(0, -Number(vel)));
    } else if (dir === 'down') {
      position.add(createVector(0, Number(vel)));
    }
  }
  return position;
}

function travelAim(course) {
  let position = createVector(0, 0);
  let aim = 0;
  for (const [dir, vel] of course) {
    if (dir === 'forward'){
      position.add(createVector(Number(vel), aim * Number(vel)));
    } else if (dir === 'up') {
      aim -= Number(vel);
    } else if (dir === 'down') {
      aim += Number(vel);
    }
  }
  return position;
}
