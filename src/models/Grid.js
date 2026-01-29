// gére l'array qui represente la grille
export class Grid {
    constructor() {
        this.size = 8;
        this.rows = 8;
        this.cols = 8;
        // crée une array avec une structure tel que this.cells[row][col]
        this.cells = Array.from({ length: this.size }, () =>
            Array(this.size).fill(null)
        );
    }
    // cherche la valeur d'une cellule
    getCell(rows, col) {
        // prevoit et empeche les "Index out of bounds" errors
        if(this.isWithinBounds(rows, col)) {
            return this.cells[rows][col];
        }
        return null;
    }
    // s'assure que les coordinés ne sont pas a l'exterieur de la grille
    isWithinBounds(x, y) {
        return x >= 0 && x < this.size && y >= 0 && y < this.size;
    }
    // detection de collision et simule les placements pour voir si ils sont valables
    placeBlockCheck(shape, startX, startY) {
        // 2 boucles for pour scanner la forme de la matrice
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[row].length; col++) {
                // ignore les 0s (les espaces vide en forme de T ou L)
                if (shape[row][col] !== 0) {
                    const tx = startX + col;
                    const ty = startY + row;
                    // regarde si le block tape un mur ou un autre block
                    if (!this.isWithinBounds(tx, ty)) return false;
                    if (this.cells[ty][tx] !== null) return false;
                }
            }
        }
        return true;
    }
    // ecrit la data dans l'array
    placeBlock(shape, startX, startY, color = "#eee") {
        shape.forEach((row, rowIndex) => {
            row.forEach((cellValue, colIndex) => {
                if(cellValue !== 0) {
                    this.cells[startY + rowIndex][startX + colIndex] = {color: color};
                }
            });
        });
    }

    // identifie les lignes pleines, horizontal our vertical
    getLinesToClear() {
        let rows = [];
        let cols = [];

        // regarde si tout les items dans un array passe le teste
        for (let r = 0; r < this.size; r++) {
            if (this.cells[r].every(cell => cell !== null)) {
                rows.push(r); // a trouver une ligne pleine
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
            if (colFull) cols.push(c); // found full column
        }

        return { rows, cols };
    }
    // suprime les lignes pleines de la data
    checkAndClearLines() {
        const { rows, cols } = this.getLinesToClear();

        // method pour reset une ranger
        rows.forEach(r => this.cells[r].fill(null));

        // method pour reset une ligne vertical
        cols.forEach(c => {
            for (let r = 0; r < this.size; r++) {
                this.cells[r][c] = null;
            }
        });

        return { rows, cols };
    }
    // le game over, il cherche des positions valables pour chaque block dans la grille
    canFitAnywhere(shape) {
        if (!shape) return false;
        for (let r = 0; r < this.size; r++) {
            for (let c = 0; c < this.size; c++) {
                if (this.placeBlockCheck(shape, c, r)) {
                    return true; // a trouver au moins 1 emplacement valide
                }
            }
        }
        return false;
    }
}