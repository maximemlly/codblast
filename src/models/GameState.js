// models/gameState.js
import { Grid } from "./Grid.js";
// Import all your specific block classes here
import {Horizontal} from "./Horizontal.js";
import {LShape} from "./LShape.js";
import {Single} from "./Single.js";
import {SquareBlock} from "./SquareBlock.js";
import {TShape} from "./TShape.js";
import {Vertical} from "./Vertical.js";


export class GameState {
    constructor() {
        // Initialise la grille de jeu
        this.grid = new Grid();
        this.score = 0;
        this.gameOver = false;

        // Contient les 3 blocs disponibles en bas
        this.offeredBlocks = [null, null, null];

        // Donne 3 blocs au joueur dès le début
        this.refreshBlocks();

        this.highScore = parseInt(localStorage.getItem("codblast_highscore")) || 0;
    }

    /**
     * Remplit les emplacements vides avec de nouveaux blocs aléatoires
     */
    refreshBlocks() {
        // Liste des classes de blocs disponibles
        const blockClasses = [Horizontal, LShape, Single, SquareBlock, TShape, Vertical];
        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF'];

        for (let i = 0; i < 3; i++) {
            // Remplace seulement les blocs qui sont utilisés (donc null)
            if (this.offeredBlocks[i] === null) {
                // Choisit une classe et une couleur au hasard
                const RandomBlockClass = blockClasses[Math.floor(Math.random() * blockClasses.length)];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];

                // Crée une nouvelle instance de la classe de bloc choisie
                this.offeredBlocks[i] = new RandomBlockClass(randomColor);
            }
        }
    }

    /**
     * Vérifie si le joueur peut encore placer au moins un des blocs disponibles
     */
    checkGameOver() {
        // Regarde seulement les blocs encore non joués
        const playableBlocks = this.offeredBlocks.filter(b => b !== null);

        // Si tous les blocs sont joués, on n'est pas encore en Game Over (refreshBlocks viendra après)
        if (playableBlocks.length === 0) return false;

        // Parcourt chaque bloc restant
        for (const block of playableBlocks) {
            // Parcourt chaque case de la grille pour tester si le bloc rentre
            for (let row = 0; row < this.grid.size; row++) {
                for (let col = 0; col < this.grid.size; col++) {
                    // Utilise la logique définie dans Grid.js pour tester la collision
                    if (this.grid.placeBlockCheck(block.shape, col, row)) {
                        return false; // Un placement est possible, le jeu continue
                    }
                }
            }
        }

        // Aucun bloc ne rentre nulle part : Fin de partie
        this.gameOver = true;
        return true;
    }

    /**
     * Met à jour le score du joueur
     */
    updateScore(points) {
        this.score += points;
        if(this.score > this.highScore) {
            this.highScore = this.score;

            localStorage.setItem('codblast_highscore', this.highScore)
        }
    }
}