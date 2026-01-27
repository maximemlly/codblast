export function resize(canvas, grid, options, pixelRatio) {
  const margin = 20;
  // Calculate the maximum width the grid can take
  const maxWidth = window.innerWidth - (margin * 2);

  // Dynamically adjust cellSize based on screen width
  // 8 columns + padding between them
  const availableWidth = Math.min(maxWidth, 500); // Caps size at 500px
  options.cellSize = (availableWidth / 8) - options.padding;

  const gridWidth = 8 * (options.cellSize + options.padding) + options.padding;
  // Account for the grid + tray area
  const totalHeight = gridWidth + 200;

  canvas.width = gridWidth * pixelRatio;
  canvas.height = totalHeight * pixelRatio;

  canvas.style.width = `${gridWidth}px`;
  canvas.style.height = `${totalHeight}px`;

  return gridWidth; // Returns the vertical cutoff for the grid
}