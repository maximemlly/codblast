// gameController.js
export class GameController {
    constructor(state, view) {
        this.state = state;
        this.view = view;
    }

    handleTurnEnd() {
        // 1. Capture the clearing data
        const cleared = this.state.grid.checkAndClearLines();
        const lineCount = cleared.rows.length + cleared.cols.length;

        // 2. Points Logic: Reward combos
        if (lineCount > 0) {
            const basePoints = lineCount * 100; // 100 per line
            const comboBonus = (lineCount - 1) * 50; // Extra for multiple lines
            this.state.score += (basePoints + comboBonus);
        }

        // 3. Refresh tray if empty
        if (this.state.offeredBlocks.every(b => b === null)) {
            this.state.refreshBlocks();
            this.state.grid.offeredBlocks = this.state.offeredBlocks;
        }

        // 4. Loss Check: Only check blocks that aren't null
        const playableBlocks = this.state.offeredBlocks.filter(block => block !== null);
        const canStillPlay = playableBlocks.some(block =>
            this.state.grid.canFitAnywhere(block.shape)
        );

        if (!canStillPlay) {
            this.triggerGameOver();
        }

        this.view.render();
    }

    triggerGameOver() {
        // Save highscore to localStorage before leaving
        const currentHighscore = localStorage.getItem('codblast_highscore') || 0;
        if (this.state.score > currentHighscore) {
            localStorage.setItem('codblast_highscore', this.state.score);
        }

        alert(`Game Over! Final Score: ${this.state.score}`);
        window.location.href = "index.html";
    }
}