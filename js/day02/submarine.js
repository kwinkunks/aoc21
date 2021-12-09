class Submarine {

  constructor(course) {
    let x = 0;
    let y = height / 2;
    this.pos = createVector(x, y);
    this.vel = createVector();
    this.course = course;
  }

updatePrev() {
    this.prevPos = this.pos.copy();
  }

  update(vel) {
    this.vel = vel;
    this.updatePrev();
    this.pos.add(this.vel);
  }

  render() {
    stroke(255);
    strokeWeight(4);
    point(this.pos.x, this.pos.y);
    line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  }

}
