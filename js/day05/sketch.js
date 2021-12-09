let data;
let test;

function preload() {
	// These are asynchronous and can't be used yet.
	// These load strings.
	test = loadStrings('./test.txt');
	data = loadStrings('./data.txt');
}

function setup() {
	createCanvas(windowWidth, windowHeight);

  // Get the points out.
  test = test.slice(0, -1).map(x => x.split(' -> ').map(y => y.split(',').map(Number)));
  data = data.slice(0, -1).map(x => x.split(' -> ').map(y => y.split(',').map(Number)));
	part1(test, data);
  part2(test, data);
}

function draw() {
	background(100);
}

function part1(test, data) {
  console.assert(countOverlapsHV(test) == 5);
  console.log(`Part 1: ${countOverlapsHV(data)}`);
  return;
}

function part2(test, data) {
  console.assert(countOverlaps(test) == 12);
  console.log(`Part 2: ${countOverlaps(data)}`);
  return;
}

function countOverlapsHV(lines) {
  let horizontals = lines.filter(x => (x[0][1] == x[1][1]));
  let verticals = lines.filter(x => (x[0][0] == x[1][0]));
  return countOverlaps(horizontals.concat(verticals));
}

function countOverlaps(lines) {
  // Well, this is a bit of a mess.
  // Reverting to my first non-elegant solution.
  // Making it adaptive.
  let marked = new Map;
  let z;
  for (let [a, b] of lines) {

    if (a[0] > b[0]) {
      [a, b] = [b, a];
      z = 0;
    } else if (a[0] == b[0]) {
      z = 1;
      if (a[1] > b[1]) {
        [a, b] = [b, a];
      }
    } else {
      z = 0;
    }

    j = a[1-z]
    for (let i = a[z]; i <= b[z]; i++) {
      if (z == 0) {
        let v = marked.get(String([i, j])) || 0;
        marked.set(String([i, j]), v + 1);
      } else {
        let v = marked.get(String([j, i])) || 0;
        marked.set(String([j, i]), v + 1);
      }
      if (a[1-z] < b[1-z]) {
        j++;
      } else if (a[1-z] > b[1-z]) {
        j--;
      } else {
        // Do nothing
      }

    }
  }

  const overlaps = new Map([...marked].filter(([k, v]) => v > 1));
  return overlaps.size;
}
