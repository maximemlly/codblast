export function resize(canvas, gridModel, gameOptions, pixelRatio) {
  const { cellSize, padding } = gameOptions;
  const cols = gridModel.cols;
  const rows = gridModel.rows;

  const gridWidth = cols * (cellSize + padding) + padding;
  const gridHeight = rows * (cellSize + padding) + padding;

  const trayHeight = 150;
  const totalHeight = gridHeight + trayHeight;

  canvas.style.width = `${gridWidth}px`;
  canvas.style.height = `${totalHeight}px`;

  canvas.width = Math.round(gridWidth * pixelRatio);
  canvas.height = Math.round(totalHeight * pixelRatio);

  return gridHeight;
}
