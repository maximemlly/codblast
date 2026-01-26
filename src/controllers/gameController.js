export class GameController {
    constructor(gameState, boardView) {
        this.state = gameState;
        this.view = boardView;
    }

    handleTurnEnd() {
        const cleared = this.state.grid.checkAndClearLines();

        if (cleared.rows.length > 0 || cleared.cols.length > 0) {

            const totalLines = cleared.rows.length + cleared.cols.length;
            //a changer
            const points = totalLines * 8 * 10;

            this.state.updateScore(points);
            console.log(`Score: ${this.state.score}`);
        }

        if (this.state.checkGameOver()) {
            alert("Game Over! Score final: " + this.state.score);
        }
        this.view.render();
    }
}