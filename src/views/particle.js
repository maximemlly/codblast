export class Particle {
    constructor(x, y, color) {
        this.x = x; // coords en x du centre de la cellule qui a ete "cleared"
        this.y = y; // meme chose mais en y
        this.color = color; // herite du block qui a ete "cleared"
        // done une plage aleatoire de -6 a +6px par frame
        this.vx = (Math.random() - 0.5) * 12;
        this.vy = (Math.random() - 0.5) * 12;
        this.life = 1.0; //met l'opacite a 100%
        this.decay = Math.random() * 0.03 + 0.02;
        this.size = Math.random() * 4 + 2; //taille random d'un pixel
    }

    update() {
        // ajour de volicité
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.1; // Gravity
        // reduit l'opacite basés sur le decay definit au dessus
        this.life -= this.decay;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.life;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size/2, this.y - this.size/2, this.size, this.size);
        ctx.restore();
    }
}