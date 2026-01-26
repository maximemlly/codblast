// Game.js
import { Grid } from "./models/Grid.js";
import { BoardView } from "./views/boardView.js";

export class Game {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.grid = new Grid();

        // For testing purposes: Add a block to the tray manually
        this.grid.offeredBlocks = [
            { shape: [[1, 1], [1, 1]], color: "#ff5e5e" },
            { shape: [[1, 1, 1]], color: "#5ef4ff" }
        ];

        this.view = new BoardView(this.canvas, this.grid);
    }

    start() {
        console.log("Game Logic Starting...");
        this.view.render();
        // Here you would eventually start your animation loop
    }
}