// Daniel Shiffman
// http://codingtra.in
// https://youtu.be/CKeyIbT3vXI

class Firework {
  constructor(x, y, city, cx, cy) {
    this.city = city;
    this.cx = cx;
    this.cy = cy;
    this.hu = random(255);
    this.firework = new Particle(x, y, this.hu, true);
    this.exploded = false;
    this.particles = [];
    this.fade = 1;
  }

  done() {
    if (this.exploded && this.particles.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  update() {
    let gravity = createVector(0, 0.2);
    if (!this.exploded) {
      this.firework.applyForce(gravity);
      this.firework.update();

      if (this.firework.vel.y >= 0) {
        this.exploded = true;
        this.explode();
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].applyForce(gravity);
      this.particles[i].update();

      if (this.particles[i].done()) {
        this.particles.splice(i, 1);
      }
    }
  }

  explode() {
    for (let i = 0; i < 500; i++) {
      const p = new Particle(
        this.firework.pos.x,
        this.firework.pos.y,
        this.hu,
        false
      );
      this.particles.push(p);
    }
  }

  show() {
    if (!this.exploded) {
      this.firework.show();
    }
    noStroke();
    this.fade -= 0.1;
    textSize(16);
    textFont("Courier");
    textAlign(LEFT, CENTER);
    fill(this.hu, 255, 50, this.fade);
    text(this.city, this.cx + 25, this.cy);
    for (var i = 0; i < this.particles.length; i++) {
      this.particles[i].show();
    }
  }
}
