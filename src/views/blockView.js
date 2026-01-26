export function drawShape(ctx, shape, x, y, size, padding, color, alpha = 1) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;

    shape.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell !== 0) {
                const drawX = x + colIndex * (size + padding);
                const drawY = y + rowIndex * (size + padding);
                ctx.fillRect(drawX, drawY, size, size);

                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                ctx.strokeRect(drawX, drawY, size, size);
            }
        });
    });
    ctx.restore();
}