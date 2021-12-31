// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

class Particle {
  constructor(x, y, hu, firework) {
    this.pos = createVector(x, y);
    this.firework = firework;
    this.lifespan = 1.0;
    this.hu = hu;
    this.acc = createVector(0, 0);
    if (this.firework) {
      this.vel = createVector(0, random(-3, -1));
    } else {
      this.vel = p5.Vector.random2D();
      this.vel.mult(random(2, 6));
    }
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    if (!this.firework) {
      this.vel.mult(0.85);
    }
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifespan -= 0.1;
  }

  done() {
    if (this.lifespan < 0) {
      return true;
    } else {
      return false;
    }
  }

  show() {
    colorMode(HSB);

    if (!this.firework) {
      strokeWeight(2);
      stroke(this.hu, 255, 50, this.lifespan);
    } else {
      strokeWeight(4);
      stroke(this.hu, 255, 50);
      text;
    }

    point(this.pos.x, this.pos.y);
  }
}
