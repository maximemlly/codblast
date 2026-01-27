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

        if (lineCount > 0) {
            // --- 2. ADVANCED SCORING LOGIC ---

            // A. Base Points (10 points per cell, 8 cells per line = 80 per line)
            let turnPoints = lineCount * 80;

            // B. Combo Bonus (Extra points for clearing multiple lines at once)
            if (lineCount > 1) {
                const comboBonus = (lineCount - 1) * 50;
                turnPoints += comboBonus;
            }

            // C. Streak/Chain Multiplier (Rewarding back-to-back clears)
            // Increment the streak counter in your state
            this.state.streak = (this.state.streak || 0) + 1;

            if (this.state.streak > 1) {
                // Apply a multiplier based on the streak level
                turnPoints *= this.state.streak;
                console.log(`Streak x${this.state.streak}! Points this turn: ${turnPoints}`);
            }

            // Update the actual game score
            this.state.score += turnPoints;

        } else {
            // Reset the streak if no lines were cleared this turn
            this.state.streak = 0;
        }

        // 3. Refresh tray if empty
        if (this.state.offeredBlocks.every(b => b === null)) {
            this.state.refreshBlocks();
            // Sync the grid's reference to the newly generated blocks
            this.state.grid.offeredBlocks = this.state.offeredBlocks;
        }

        // 4. Loss Check: Determine if any remaining blocks can fit
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
        console.log("GAME OVER triggered");

        // Save highscore to localStorage
        const currentHighscore = parseInt(localStorage.getItem('codblast_highscore')) || 0;
        if (this.state.score > currentHighscore) {
            localStorage.setItem('codblast_highscore', this.state.score);
        }

        alert(`Game Over! Final Score: ${this.state.score}`);
        window.location.href = "index.html";
    }
}