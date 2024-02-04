import { Particle } from './class/Particle.js';

const cnv = document.getElementById("canvas");
const ctx = cnv.getContext("2d");
const particles = [];

cnv.width = innerWidth;
cnv.height = innerHeight;

window.addEventListener("resize", function () {
    cnv.width = innerWidth;
    cnv.height = innerHeight;
});
