// gameController.js
export class GameController {
    constructor(state, view) {
        this.state = state;
        this.view = view;
    }

    handleTurnEnd() {
        // 1. Check and clear lines in the model
        const cleared = this.state.grid.checkAndClearLines();

        // 2. Update score if lines were cleared
        const totalCleared = cleared.rows.length + cleared.cols.length;
        if (totalCleared > 0) {
            this.state.score += totalCleared * 100; // Example scoring
        }

        // 3. Check if the tray is empty to refresh it
        // Filter out nulls to see if any real blocks remain
        const remainingBlocks = this.state.offeredBlocks.filter(b => b !== null);

        if (remainingBlocks.length === 0) {
            console.log("Tray empty! Refreshing...");
            this.state.refreshBlocks(); // Generates new random blocks
            // IMPORTANT: Sync the new blocks to the grid's reference
            this.state.grid.offeredBlocks = this.state.offeredBlocks;
        }

        // 4. Final render update
        this.view.render();
    }
}