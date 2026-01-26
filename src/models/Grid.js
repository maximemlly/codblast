export class Grid {
    constructor() {
        this.size = 8;
        this.rows = this.size;
        this.cols = this.size;

        this.cells = Array.from({ length: this.size }, () =>
            Array(this.size).fill(null)
        );
    }

    getCell(row, col) {
        if (this.isWithinBounds(col, row)) {
            return this.cells[row][col];
        }
        return null;
    }

    isWithinBounds(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }

    placeBlockCheck(shape, startX, startY) {
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                // CRITICAL: Only check the part of the shape that is actually a block
                if (shape[row][col] !== 0) {
                    const tx = startX + col;
                    const ty = startY + row;

                    // 1. Check if it's out of the grid
                    if (!this.isWithinBounds(tx, ty)) return false;

                    // 2. Check if the spot is already taken (not null)
                    if (this.cells[ty][tx] !== null) return false;
                }
            }
        }
        return true; // All SOLID pieces are in valid, empty spots
    }


    placeBlock(shape, startX, startY, color = "#eee") {
        shape.forEach((row, rowIndex) => {
            row.forEach((cellValue, colIndex) => {
                if (cellValue !== 0) {
                    // Store an object with the color so the View can draw it
                    this.cells[startY + rowIndex][startX + colIndex] = { color: color };
                }
            });
        });
    }

    checkAndClearLines() {
        let clearedRows = [];
        let clearedCols = [];

        for (let r = 0; r < this.size; r++) {
            if (this.cells[r].every(cell => cell !== null)) {
                clearedRows.push(r);
            }
        }

        for (let c = 0; c < this.size; c++) {
            let colFull = true;
            for (let r = 0; r < this.size; r++) {
                if (this.cells[r][c] === null) {
                    colFull = false;
                    break;
                }
            }
            if (colFull) clearedCols.push(c);
        }

        clearedRows.forEach(r => this.cells[r].fill(null));
        clearedCols.forEach(c => {
            for (let r = 0; r < this.size; r++) {
                this.cells[r][c] = null;
            }
        });

        return { rows: clearedRows, cols: clearedCols };
    }
}