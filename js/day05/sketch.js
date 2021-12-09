let data;
let test;

function preload() {
	test = loadStrings('./test.txt');
	data = loadStrings('./data.txt');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
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
  let marked = new Map;
  for (let [p, q] of lines) {
    let points = interpolate(p, q);
    for (let point of points) {
      let value = marked.get(String(point)) | 0;
      marked.set(String(point), value + 1);
    }
  }
  const overlaps = new Map([...marked].filter(([k, v]) => v > 1));
  console.log(overlaps);
  return overlaps.size;
}

function interpolate(p, q) {
  // Interpolate between two points.
  p = createVector(p[0], p[1]);
  q = createVector(q[0], q[1]);

  // Deal with zero-length lines.
  if (p.equals(q)) {
    return Array(p);
  }

  // Chebyshev distance, L_inf norm.
  let v = p.copy().sub(q);
  let chebyshev = max(v.array().map(abs));

  // Interpolate.
  let points = new Array;
  for (i = 0; i <= chebyshev; i++) {
    let x = lerp(p.x, q.x, i/chebyshev);
    let y = lerp(p.y, q.y, i/chebyshev);
    points.push([x, y]);
  }
  return points;
}
