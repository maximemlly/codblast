export function resize(canvas, grid, options, pixelRatio) {
  // Increase the available width for mobile
  const paddingMargin = 20;
  const maxWidth = (window.innerWidth * 0.9) - (paddingMargin * 2);

  // Set a higher cap for desktop but let mobile go wider This prevents the grid from being a tiny sliver on a phone
  const availableWidth = Math.min(maxWidth, 450);

  // Recalculate cell size based on the new available width
  options.cellSize = (availableWidth / 8) - options.padding;

  const gridWidth = 8 * (options.cellSize + options.padding) + options.padding;

  // Ensure the tray has enough height for the blocks
  const trayHeight = 220;
  const totalHeight = gridWidth + trayHeight;

  canvas.width = gridWidth * pixelRatio;
  canvas.height = totalHeight * pixelRatio;

  canvas.style.width = `${gridWidth}px`;
  canvas.style.height = `${totalHeight}px`;

  return gridWidth;
}