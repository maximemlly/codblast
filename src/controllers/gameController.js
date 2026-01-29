export class GameController {
    constructor(state, view) {
        // gameState pour la data du jeu, et boardView pour les graphism
        this.state = state;
        this.view = view;
    }
    // trigger aprés qu'un block est placer
    handleTurnEnd() {
        // method du grid.js qui regarde l'array pour chercher des lignes completer
        const cleared = this.state.grid.getLinesToClear();
        const lineCount = cleared.rows.length + cleared.cols.length;

        if (lineCount > 0) {
            // trigger les animations
            cleared.rows.forEach(index => this.view.explodeLine('row', index));
            cleared.cols.forEach(index => this.view.explodeLine('col', index));

            // appell method depuis grid.js qui change les cases des grille qui sont clear en null
            this.state.grid.checkAndClearLines();

            // logic des points
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
            this.state.grid.checkAndClearLines();
        }

        // regarde si les 3 blocks on ete utiliser et si il est en remet 3 autres aleatoirement
        if (this.state.offeredBlocks.every(b => b === null)) {
            this.state.refreshBlocks();
            this.state.grid.offeredBlocks = this.state.offeredBlocks;
        }

        // algo trouver en ligne et adapter pour regarder toutes les positions possibles et regarde si on peut jouer ou pas
        const playableBlocks = this.state.offeredBlocks.filter(block => block !== null);
        const canStillPlay = playableBlocks.some(block =>
            this.state.grid.canFitAnywhere(block.shape)
        );

        if (!canStillPlay) {
            this.triggerGameOver();
        }
        // method du boardview qui met a jour le canvas
        this.view.render();
    }

    triggerGameOver() {

        const currentHighscore = parseInt(localStorage.getItem('codblast_highscore')) || 0;
        if (this.state.score > currentHighscore) {
            localStorage.setItem('codblast_highscore', this.state.score);
        }
        let totalGames = parseInt(localStorage.getItem('codblast_games_played')) || 0;
        totalGames++;
        localStorage.setItem('codblast_games_played', totalGames);

        alert(`Game Over! Final Score: ${this.state.score}`);
        window.location.href = "index.html";
    }
}