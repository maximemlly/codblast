// gameController.js
export class GameController {
    constructor(state, view) {
        this.state = state;
        this.view = view;
    }

    handleTurnEnd() {
        // 1. Identify which lines need clearing WITHOUT clearing them yet
        // This requires the getLinesToClear() helper in your Grid class
        const cleared = this.state.grid.getLinesToClear();
        const lineCount = cleared.rows.length + cleared.cols.length;

        if (lineCount > 0) {
            // 2. TRIGGER ANIMATIONS
            // We do this while the grid cells still contain their color data
            cleared.rows.forEach(index => this.view.explodeLine('row', index));
            cleared.cols.forEach(index => this.view.explodeLine('col', index));

            // 3. NOW ACTUALLY CLEAR THE GRID
            this.state.grid.checkAndClearLines();

            // --- 4. SCORING LOGIC ---
            let turnPoints = lineCount * 80;

            if (lineCount > 1) {
                const comboBonus = (lineCount - 1) * 50;
                turnPoints += comboBonus;
            }

            this.state.streak = (this.state.streak || 0) + 1;
            if (this.state.streak > 1) {
                turnPoints *= this.state.streak;
            }

            this.state.score += turnPoints;
        } else {
            this.state.streak = 0;
            // No lines cleared? Just run the standard check
            this.state.grid.checkAndClearLines();
        }

        // 5. Refresh tray if empty
        if (this.state.offeredBlocks.every(b => b === null)) {
            this.state.refreshBlocks();
            this.state.grid.offeredBlocks = this.state.offeredBlocks;
        }

        // 6. Loss Check
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
        const currentHighscore = parseInt(localStorage.getItem('codblast_highscore')) || 0;
        if (this.state.score > currentHighscore) {
            localStorage.setItem('codblast_highscore', this.state.score);
        }
        alert(`Game Over! Final Score: ${this.state.score}`);
        window.location.href = "index.html";
    }
}