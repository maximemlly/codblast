export function resize(canvas, gridModel, gameOptions, pixelRatio) {
  const { cellSize, padding } = gameOptions;

  const gridWidth = gridModel.width * cellSize + 2 * padding;
  const gridHeight = gridModel.height * cellSize + 2 * padding;

  const trayHeight = 100;
  const totalHeight = gridHeight + trayHeight;

  canvas.style.width = `${gridWidth}px`;
  canvas.style.height = `${totalHeight}px`;

  canvas.width = gridWidth * pixelRatio;
  canvas.height = totalHeight * pixelRatio;

  return gridHeight;
}
