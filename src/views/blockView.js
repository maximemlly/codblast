// est utiliser par la grille et input controller
export function drawShape(ctx, shape, x, y, size, padding, color, alpha = 1) {
    // vient de canvasAPI, sauvegarde un snapshot des parametres draw definit
    ctx.save();
    // fixe le niveau de transparance
    ctx.globalAlpha = alpha;
    // definit la couleurs des blocks
    ctx.fillStyle = color;

    // regarde la forme de la matrice
    shape.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            // dessine seulement si la valeur de la cellule est vide(ici egale a 0)
            if(cell !== 0) {
                // calcule la position exacte de la case
                const drawX = x + colIndex * (size + padding);
                const drawY = y + rowIndex * (size + padding);
                // canvasAPI dessine le block dans la grille, avec la couleur et la forme donner
                ctx.fillRect(drawX, drawY, size, size);
                // canvasAPI change la couleur de la bordure en noire avec une opacite de 10%
                ctx.strokeStyle = "rgba(0, 0, 0, 0.1)";
                // dessine la bordure autour de chaque blocks pour donner de la definitions
                ctx.strokeRect(drawX, drawY, size, size);
            }
        });
    });
    // retourne les parametres de canvas a comme ils etaient avant
    ctx.restore();
}