const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Particle {
    constructor(x, y, radius, color, velocity) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
    }

    draw() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    update() {
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}

let particles = [];

function spawnParticles() {
    const radius = 30;
    let x = radius;
    let y = radius;
    const color = 'green';
    const velocity = {
        x: 0,
        y: 0
    };

    for (let i = 0; i < 2; i++) {
        x = Math.random() * canvas.width;
        y = Math.random() * canvas.height;
        particles.push(new Particle(x, y, radius, color, velocity));
    }
}

function addGravity() {
    const G = 0.005;
    particles.forEach((particle) => {
        particle.velocity.y += G;
    });
}

function detectCollision() {
    for (let particle of particles) {
        if (particle.y + particle.radius >= canvas.height) {
            particle.velocity.y = -particle.velocity.y;
            particle.color = 'red';
        }
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle) => {
        particle.update();
    });

    detectCollision();
    addGravity();
}

animate();
spawnParticles();
console.log(Particle)
console.log(particles)