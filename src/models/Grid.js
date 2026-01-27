export class Grid {
    constructor() {
        //grille 8x8
        this.size = 8;
        this.rows = 8;
        this.cols = 8;
        //initialize la grille est la rend vide(met tout a 0)
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

    //regarde si une position x, y est dans la grille
    isWithinBounds(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }

    //test si un block rentre dans une zone sans la placer
    placeBlockCheck(shape, startX, startY) {
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                //regarde si des partie du group block a une piece solide
                if (shape[row][col] !== 0) {
                    const tx = startX + col;
                    const ty = startY + row;
                    //retourne faux si une partie du block est hors jeux ou touche un autre block
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
                //Si cette partie du block est vide on met a jour la cellule de la grille
                if(cellValue !== 0) {
                    this.cells[startY + rowIndex][startX + colIndex] = {color: color};
                }
            });
        });
    }

    checkAndClearLines() {
        let clearedRows = [];
        let clearedCols = [];

        // 1. Check Rows
        for (let r = 0; r < this.size; r++) {
            // Use this.cells (plural)
            if (this.cells[r].every(cell => cell !== null)) {
                clearedRows.push(r);
            }
        }

        // 2. Check Columns
        for (let c = 0; c < this.size; c++) {
            let colFull = true;
            for (let r = 0; r < this.size; r++) {
                // Fix typo: changed this.cell to this.cells
                if (this.cells[r][c] === null) {
                    colFull = false;
                    break;
                }
            }
            if (colFull) clearedCols.push(c);
        }

        // 3. Execute Clear for Rows
        clearedRows.forEach(r => this.cells[r].fill(null));

        // 4. Execute Clear for Columns (The Critical Fix)
        clearedCols.forEach(c => {
            for (let r = 0; r < this.size; r++) {
                // Only clear the specific column 'c', not the whole row
                this.cells[r][c] = null;
            }
        });

        return { rows: clearedRows, cols: clearedCols };
    }
    // Inside Grid.js
    // Inside Grid.js
    canFitAnywhere(shape) {
        if (!shape) return false;

        // Scan every row and column of the 8x8 grid
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                // Check if THIS specific shape can fit at THIS specific coordinate
                if (this.placeBlockCheck(shape, c, r)) {
                    return true; // Found a valid move!
                }
            }
        }
        return false; // No valid move found for this shape
    }
}