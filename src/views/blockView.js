export function drawShape(ctx, shape, startX, startY, endX, endY, cellSize, padding, color, alpha = 1.0) {

    if (!shape || !Array.isArray(shape)) return;

    ctx.save();

    ctx.globalAlpha = alpha;
    ctx.fillStyle = color;

    shape.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
            if(value > 0) {
                const x = startX + colIndex * (cellSize + padding);
                const y = startY + rowIndex * (cellSize + padding);

                ctx.fillRect(x, y, cellSize, cellSize);

                ctx.strokeStyle = "rgba(0, 0, 0, 0.2)"; //default values to change later on
                ctx.lineWidth = 1;
                ctx.strokeRect(x, y, cellSize, cellSize);
            }
        });
    });

    ctx.restore();
}