import {Grid} from "./Grid.js";
import {Block} from "./Block.js";

export class GameState {
    constructor() {
        this.grid = new Grid();
        this.score = 0;
        this.gameOver = false;
        //Contient 3 blocks dans bar
        this.offeredBlocks = [null, null, null];
        //donne 3 blocks au joueur des le debuts
        this.refreshBlocks();
    }

    //Redonne au joueurs des blocks une fois qu'il a epuiser son stock
    refreshBlocks() {
        //A changer les couleurs
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF'];
        const shapeKeys = Object.keys(Block.shapes);

        for (let i = 0; i < 3; i++) {
            //Remplace seulement les blocks qui sont utiliser (donc null)
            if (this.offeredBlocks[i] === null) {
                const randomShape = Block.shapes[shapeKeys[Math.floor(Math.random() * shapeKeys.length)]];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                //Cree nouveaux blocks et les stockes dans l'inventaire
                this.offeredBlocks[i] = new Block(randomColor, randomShape);
            }
        }
    }

    //Regarde si les Blocks peuvent etre placer sur la grille
    checkGameOver() {
        //Regarde seulement les Blocks non jouer
        const playableBlocks = this.offeredBlocks.filter(b => b !== null);

        // Si tout les blocks sont jouer et on est pas coincer
        if (playableBlocks.length === 0) return false;

        for (const block of playableBlocks) {
            for (let row = 0; row < this.grid.size; row++) {
                for (let col = 0; col < this.grid.size; col++) {
                    // Utilise la logic definie dans le Grid.js
                    if (this.grid.placeBlockCheck(block.shape, col, row)) {
                        return false; // A trouver un placement valide
                    }
                }
            }
        }

        this.gameOver = true;
        return true;
    }

    //Met a jour le score, a changer peut etre
    updateScore(points) {
        this.score += points;
    }
}