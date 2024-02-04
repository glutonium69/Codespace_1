export class Particle {
    constructor(x, y, radius, color, options) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color ?? "white";
        this.options = {
            vx: options?.vx ?? 0,
            vy: options?.vy ?? 0,
            clicked: options?.clicked ?? false
        }
    }

    draw(ctx){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(ctx){
        this.x += this.options.vx;
        this.y += this.options.vy;
        this.draw(ctx);
    }

    animate(ctx){
        requestAnimationFrame(this.animate.bind(this, ctx));
        ctx.clearRect(
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2
        );
        this.update(ctx);
    }
}