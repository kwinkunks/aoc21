class Line {

  constructor (a, b) {
  }

  render() {
    stroke(255);
    strokeWeight(4);
    line(a.pos.x, a.pos.y, b.prevPos.x, b.prevPos.y);
  }

}

class Point {

  constructor (x, y) {
    this.pos = createVector(x, y);
  }

  render() {
  }

}
