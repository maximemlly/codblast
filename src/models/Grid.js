export class Grid {
    constructor() {
        //grille 8x8
        this.size = 8;
        //initialize la grille est la rend vide(met tout a 0)
        this.cells = Array.from({ length: this.size }, () =>
            Array(this.size).fill(0)
        );
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
                    if (!this.isWithinBounds(tx, ty) || this.cells[ty][tx] !== 0) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    placeBlock(shape, startX, startY, value = 1) {
        shape.forEach((row, rowIndex) => {
            row.forEach((cellValue, colIndex) => {
                //Si cette partie du block est vide on met a jour la cellule de la grille
                if(cellValue !== 0) {
                    this.cells[startY + rowIndex][startX + colIndex] = value;
                }
            });
        });
    }
}