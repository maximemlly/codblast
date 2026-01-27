// gameController.js
export class GameController {
    constructor(state, view) {
        this.state = state;
        this.view = view;
    }

    // Inside GameController.js
    // Inside GameController.js
    handleTurnEnd() {
        // 1. Clear lines first (this might open up new moves!)
        this.state.grid.checkAndClearLines();

        // 2. Refresh tray if empty
        if (this.state.offeredBlocks.every(b => b === null)) {
            this.state.refreshBlocks();
            this.state.grid.offeredBlocks = this.state.offeredBlocks; // Sync
        }

        // 3. THE LOSS CHECK
        // Filter out nulls so we only check the blocks still in the tray
        const playableBlocks = this.state.offeredBlocks.filter(block => block !== null);

        // If there are blocks left, can ANY of them fit?
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
        alert(`Game Over! Final Score: ${this.state.score}`);
        window.location.href = "index.html"; // Redirect to menu
    }}