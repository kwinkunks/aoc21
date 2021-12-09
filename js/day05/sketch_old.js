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
  console.assert(countOver(test) == 5);
  console.log(`Part 1: ${countOver(data)}`);
  return;
}

function part2(test, data) {
  console.assert(countOverlaps(test) == 12);
  console.log(`Part 2: ${countOverlaps(data)}`);
  return;
}

function countOver(data) {
  let horizontals = data.filter(x => (x[0][1] == x[1][1]));
  let verticals = data.filter(x => (x[0][0] == x[1][0]));
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

function countOverlapsHV(lines) {
  // Only horizontal or vertical.
  let horizontals = lines.filter(x => (x[0][1] == x[1][1]));
  let verticals = lines.filter(x => (x[0][0] == x[1][0]));

  let marked = new Map;
  for (let hline of horizontals) {
    let a = hline[0];
    let b = hline[1];
    if (a[0] > b[0]) {
      [a, b] = [b, a];
    }
    for (let i = a[0]; i <= b[0]; i++) {
      // Gross: seem to have to use String.
      // Also tried: Array, p5 vector, Complex;
      // none seem to compare equal.
      let v = marked.get(String([i, a[1]])) | 0;
      marked.set(String([i, a[1]]), v + 1);
    }
  }
  for (let vline of verticals) {
    let a = vline[0];
    let b = vline[1];
    if (a[1] > b[1]) {
      [a, b] = [b, a];
    }
    for (let i = a[1]; i <= b[1]; i++) {
      let v = marked.get(String([a[0], i])) | 0;
      marked.set(String([a[0], i]), v + 1);
    }
  }

  const overlaps = new Map([...marked].filter(([k, v]) => v > 1));
  return overlaps.size;
}
