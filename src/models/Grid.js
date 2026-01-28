export class Grid {
    constructor() {
        this.size = 8;
        this.rows = 8;
        this.cols = 8;
        this.cells = Array.from({ length: this.size }, () =>
            Array(this.size).fill(null)
        );
    }

    getCell(rows, col) {
        if(this.isWithinBounds(rows, col)) {
            return this.cells[rows][col];
        }
        return null;
    }

    isWithinBounds(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }

    placeBlockCheck(shape, startX, startY) {
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                if (shape[row][col] !== 0) {
                    const tx = startX + col;
                    const ty = startY + row;
                    if (!this.isWithinBounds(tx, ty)) return false;
                    if (this.cells[ty][tx] !== null) return false;
                }
            }
        }
        return true;
    }

    placeBlock(shape, startX, startY, color = "#eee") {
        shape.forEach((row, rowIndex) => {
            row.forEach((cellValue, colIndex) => {
                if(cellValue !== 0) {
                    this.cells[startY + rowIndex][startX + colIndex] = {color: color};
                }
            });
        });
    }

    /**
     * NEW: Identifies full lines without clearing them.
     * Essential for the explosion animation to find block colors.
     */
    getLinesToClear() {
        let rows = [];
        let cols = [];

        // Check Rows
        for (let r = 0; r < this.size; r++) {
            if (this.cells[r].every(cell => cell !== null)) {
                rows.push(r);
            }
        }

        // Check Columns
        for (let c = 0; c < this.size; c++) {
            let colFull = true;
            for (let r = 0; r < this.size; r++) {
                if (this.cells[r][c] === null) {
                    colFull = false;
                    break;
                }
            }
            if (colFull) cols.push(c);
        }

        return { rows, cols };
    }

    checkAndClearLines() {
        const { rows, cols } = this.getLinesToClear();

        // Execute Clear for Rows
        rows.forEach(r => this.cells[r].fill(null));

        // Execute Clear for Columns
        cols.forEach(c => {
            for (let r = 0; r < this.size; r++) {
                this.cells[r][c] = null;
            }
        });

        return { rows, cols };
    }

    canFitAnywhere(shape) {
        if (!shape) return false;
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.placeBlockCheck(shape, c, r)) {
                    return true;
                }
            }
        }
        return false;
    }
}