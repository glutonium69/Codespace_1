///////////////////////////////////////////////
/* _____Go a bit down for customisation______*/
///////////////////////////////////////////////

/*___Check below if you are on mobile___*/

document.body.appendChild(document.createElement("canvas"));

document.body.bgColor = "#101010";
document.body.style.margin = "0";

const cnv = document.querySelector("canvas");
const c = cnv.getContext("2d");

cnv.width = innerWidth;
cnv.height = innerHeight * 0.98;


//////////////////////////////////////////////////
/////////////////___Customize___//////////////////

//////////___Change Value As Needed___////////////
//////////////////////////////////////////////////

//change to true if you are on mobile
const onMobile = false;

//total amount of particles
const particleAmount = 300;

// Max radius a particle can have
const particleRadiusMax = 8;

// color of particles + the bond / line
const particleColor = "#65A098";

// max normal velocity for each particle over x axis
const particleVxMax = 1;

// same but over y axis
const particleVyMax = particleVxMax;

// particles acceleration over mouse
const accelerationOverMouse = 0.1;

// going back to initial velocity after a certain time
const velocityAfterMouse = particleVxMax;

// within which distance they should create bond
const lineRange = 30;

// width of the bond / line
const lineW = 0.5;

// within wich distance it'll trigger the particles
const mouseTrigger = 100;

//array to hold all particles
const particleArr = [];

// lower number = longer trails
const cnvAlpha = 0.3;

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////

const mouse = {
    x: undefined,
    y: undefined
};

class Particle {
    constructor() {
        this.r = Math.random() * (particleRadiusMax * 0.8) + particleRadiusMax * 0.2;

        this.x = Math.random() * (cnv.width - this.r * 2) + this.r;

        this.y = Math.random() * (cnv.height - this.r * 2) + this.r;

        this.vx = Math.random() * (particleVxMax * 0.7) - particleVxMax * 0.3;

        this.vy = Math.random() * (particleVyMax * 0.7) - particleVxMax * 0.3;

        this.color = particleColor;
    }

    drawArc() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    updateArc() {
        if (this.x + this.r >= cnv.width || this.x - this.r <= 0)
            this.vx = -this.vx;

        if (this.y + this.r >= cnv.height || this.y - this.r <= 0)
            this.vy = -this.vy;

        if (this.x + this.r > cnv.width + this.r * 0.6 || this.x - this.r < -this.r * 0.6)
            this.x = cnv.width / 2;

        if (this.y + this.r > cnv.height + this.r * 0.6 || this.y - this.r < -this.r * 0.6)
            this.y = cnv.height / 2;

        let mouseDis;
        let timeOutId;

        if (mouse.x && mouse.y)
            mouseDis = distance({ x: this.x, y: this.y }, mouse);

        if (mouseDis) {
            if (mouseDis < mouseTrigger) {
                // this.x += 50;
                // this.y += 50;

                this.vx > 0
                    ? (this.vx += accelerationOverMouse)
                    : (this.vx -= accelerationOverMouse);

                this.vy > 0
                    ? (this.vy += accelerationOverMouse)
                    : (this.vy -= accelerationOverMouse);

                timeOutId = setTimeout(() => {
                    this.vx > 0
                        ? (this.vx = velocityAfterMouse)
                        : (this.vx = -velocityAfterMouse);

                    this.vy > 0
                        ? (this.vy = velocityAfterMouse)
                        : (this.vy = -velocityAfterMouse);
                }, 1500);
            }
        }

        this.x += this.vx;
        this.y += this.vy;

        this.drawArc();
    }
}

function init() {
    for (let i = 0; i < particleAmount; i++) particleArr.push(new Particle());
}
init();

function drawParticle() {
    for (let i = 0; i < particleAmount; i++) particleArr[i].updateArc();
}

function drawLine() {
    for (let i = 0; i < particleAmount; i++) {
        for (let j = 0; j < particleAmount; j++) {
            if (i != j) {
                const dis = distance(particleArr[i], particleArr[j]);

                let mouseDis = Infinity;

                if (mouse.x && mouse.y) mouseDis = distance(particleArr[i], mouse);

                if (dis < lineRange && mouseDis > mouseTrigger) {
                    c.beginPath();
                    c.moveTo(particleArr[i].x, particleArr[i].y);

                    c.lineTo(particleArr[j].x, particleArr[j].y);

                    c.strokeStyle = particleColor;
                    c.lineWidth = lineW;
                    c.stroke();
                }
            }
        }
    }
}

function animate() {
    window.requestAnimationFrame(animate);

    c.fillStyle = `rgba(16,16,16,${cnvAlpha})`;
    c.fillRect(0, 0, cnv.width, cnv.height);

    drawLine();
    drawParticle();
}
animate();

let hover = "mousemove";
let hoverEnd = "mouseout";

if (onMobile) {
    hover = "touchmove";
    hoverEnd = "touchend";
}

cnv.addEventListener(hover, (e) => {

    if (onMobile) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
    }
    else {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }
});

cnv.addEventListener(hoverEnd, () => {
    mouse.x = undefined;
    mouse.y = undefined;
});

function distance(item1, item2) {
    const x1 = item1["x"];
    const y1 = item1["y"];

    const x2 = item2["x"];
    const y2 = item2["y"];

    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}
