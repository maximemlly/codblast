import {drawShape} from './blockView.js';
import {resize} from './resize.js';

export class BoardView {
  constructor(canvas, gridModel, options) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.grid = gridModel;

    this.gridHeight = 0;

    this.options = Object.assign(
      {
        cellSize: 48,
        padding: 2,
        lineColor: "#222",
        bgColor: "#0b0b0b",
        showGridLines: true,
        highlightColor: "rgba(255,255,255,0.15)",
      },
      options,
    );

    this.pixelRatio = Math.max(1, window.devicePixelRatio || 1);
    this.resizeObserver = null;
    this.clickHandler = null;

    this.setup();
  }

  setup() {
    this.resizeObserver = () => this.resize();
    this.applyPixelRatio();
    this.resizeObserver();
    window.addEventListener("resize", this.resizeObserver);
    this.canvas.addEventListener(
      "click",
      (e) => {
        if (this.clickHandler) {
          const rect = this.canvas.getBoundingClientRect();
          const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
          const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
          const cell = this.screenToCell(x, y);
          this.clickHandler(cell);
        }
      },
      false,
    );
  }

  applyPixelRatio() {
    this.pixelRatio = Math.max(1, window.devicePixelRatio || 1);
    this.ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
  }

  resize() {
    this.gridHeight = resize(this.canvas, this.grid, this.options, this.pixelRatio);
    this.applyPixelRatio();
    this.render();
  }

  clear() {
    const ctx = this.ctx;
    ctx.save();
    ctx.fillStyle = this.options.bgColor;
    ctx.fillRect(
      0,
      0,
      this.canvas.width / this.pixelRatio,
      this.canvas.height / this.pixelRatio,
    );
    ctx.restore();
  }

  render(inputController = null) {
    this.clear();
    this.drawGrid();
    this.drawBlocks();
    this.drawTray();

    if (inputController && inputController.draggingBlock) {
      const { draggingBlock, mouseX, mouseY } = inputController;
      const size = this.options.cellSize;

      const startX = mouseX - (draggingBlock.shape[0].length * size) / 2;
      const startY = mouseY - (draggingBlock.shape.length * size) / 2;

      drawShape(this.ctx, draggingBlock.shape, startX, startY, size, this.options.padding, draggingBlock.color, 0.7);
    }
  }

  drawTray() {
    const trayY = this.gridHeight + 20; // Start below the grid
    const slotWidth = this.canvas.width / (this.pixelRatio * 3);
    const cellSize = this.options.cellSize * 0.8; // Draw slightly smaller in tray

    this.grid.offeredBlocks.forEach((block, i) => {
      if (!block) return;
      // Center the shape within its 1/3 width slot
      const startX = i * slotWidth + (slotWidth / 2) - (block.shape[0].length * cellSize) / 2;

      drawShape(this.ctx, block.shape, startX, trayY, cellSize, this.options.padding, block.color);
    });
  }

  drawGrid() {
    const ctx = this.ctx;
    const opt = this.options;
    const cell = opt.cellSize;
    const pdg = opt.padding;
    const cols = this.grid.cols;
    const rows = this.grid.rows;

    ctx.save();
    ctx.fillStyle = opt.bgColor;
    ctx.fillRect(
      0,
      0,
      this.canvas.width / this.pixelRatio,
      this.canvas.height / this.pixelRatio,
    );

    if (opt.showGridLines) {
      ctx.strokeStyle = opt.lineColor;
      ctx.lineWidth = 1;
      // horizontal lines
      for (let r = 0; r <= rows; r++) {
        const y = pdg + r * (cell + pdg) + 0.5;
        ctx.beginPath();
        ctx.moveTo(pdg, y);
        ctx.lineTo(pdg + cols * (cell + pdg), y);
        ctx.stroke();
      }
      for (let c = 0; c <= cols; c++) {
        const x = pdg + c * (cell + pdg) + 0.5;
        ctx.beginPath();
        ctx.moveTo(x, pdg);
        ctx.lineTo(x, pdg + rows * (cell + pdg));
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  drawBlocks() {
    const ctx = this.ctx;
    const opt = this.options;
    const cell = opt.cellSize;
    const pdg = opt.padding;

    ctx.save();
    for (let r = 0; r < this.grid.rows; r++) {
      for (let c = 0; c < this.grid.cols; c++) {
        const block = this.grid.getCell(r, c); // méthode attendue côté modèle
        if (!block) continue;
        const x = pdg + c * (cell + pdg);
        const y = pdg + r * (cell + pdg);

        // block background
        ctx.fillStyle = block.color || "#eee";
        ctx.fillRect(x, y, cell, cell);

        // block border / highlight
        ctx.strokeStyle = block.borderColor || "#222";
        ctx.lineWidth = 2;
        ctx.strokeRect(x + 1, y + 1, cell - 2, cell - 2);
      }
    }
    ctx.restore();
  }

  screenToCell(px, py) {
    const opt = this.options;
    const cell = opt.cellSize;
    const pdg = opt.padding;
    // px,py are in canvas pixels already scaled by width/height mapping in click
    const col = Math.floor((px - pdg) / (cell + pdg));
    const row = Math.floor((py - pdg) / (cell + pdg));
    if (row < 0 || row >= this.grid.rows || col < 0 || col >= this.grid.cols)
      return null;
    return { row, col };
  }

  highlightCell(row, col) {
    if (row == null || col == null) return;
    const ctx = this.ctx;
    const opt = this.options;
    const cell = opt.cellSize;
    const pdg = opt.padding;
    const x = pdg + col * (cell + pdg);
    const y = pdg + row * (cell + pdg);

    ctx.save();
    ctx.fillStyle = opt.highlightColor;
    ctx.fillRect(x, y, cell, cell);
    ctx.restore();
  }

  onClick(fn) {
    this.clickHandler = fn;
  }

  setGrid(gridModel) {
    this.grid = gridModel;
    this.resize();
  }
}
