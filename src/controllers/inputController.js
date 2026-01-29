export class InputController {
    constructor(gameState, boardView, gameController) {
        // appel gamestate, boardview, game controller(la logic du jeu)
        this.state = gameState;
        this.view = boardView;
        this.gameController = gameController;
        // track le block que le joueur a dans la main, regarde d'ou le block vient, position x et y en unités canvas
        this.draggingBlock = null;
        this.dragIndex = -1;
        this.mouseX = 0;
        this.mouseY = 0;

        this.initListener();
    }

    initListener() {
        //appel canvas
        const canvas = this.view.canvas;
        // regarde en même temps un click ou si l'utilisateur touche l'ecran
        canvas.addEventListener('pointerdown', (e) => this.handleDown(e));
        //regarde le deplacement de la souri pendant le click ou le drag
        window.addEventListener('pointermove', (e) => this.handleMove(e));
        // regarde si l'utilisateur lache le click de la souri ou leve le doigt
        window.addEventListener('pointerup', (e) => this.handleUp(e));
    }
    // regarde si l'utilisateur a clicker sur un block
    handleDown(e) {
        // prend la taille du canvas et sa position
        const rect = this.view.canvas.getBoundingClientRect();
        // calcule la position relative par rapport au coin du haut de gauche du canvas
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        // calcule la hauteur de la grille en utilisant la taille d'une cellule et le nombre de rangées
        const gridHeight = this.view.grid.rows * (this.view.options.cellSize + this.view.options.padding);

        // si le click est en dessous de la grille on regarde si il touche la boite contenant les blocks
        if (y > gridHeight) {
            // separe le canvas en 3 partie pour chaque block
            const slotWidth = this.view.canvas.width / (this.view.pixelRatio * 3);
            const slotIndex = Math.floor(x / slotWidth);
            const selectedBlock = this.state.offeredBlocks[slotIndex];

            if (selectedBlock) {
                this.draggingBlock = selectedBlock;
                this.dragIndex = slotIndex;
                //debug
                console.log(`Picked up block from slot: ${slotIndex}`);
            }
        }
    }

    // met a jour la position du block que l'on tient
    handleMove(e) {
        if (!this.draggingBlock) return;
        // prend la position du canvas
        const rect = this.view.canvas.getBoundingClientRect();

        // traduit les pixel en unités canvas, pren aussi en conte les pixelRatio
        const mouseX = (e.clientX - rect.left) * (this.view.canvas.width / rect.width) / this.view.pixelRatio;
        const mouseY = (e.clientY - rect.top) * (this.view.canvas.height / rect.height) / this.view.pixelRatio;

        this.mouseX = mouseX;
        this.mouseY = mouseY;

        // centre le block su le cursor
        const offsetX = (this.draggingBlock.shape[0].length * this.view.options.cellSize) / 2;
        const offsetY = (this.draggingBlock.shape.length * this.view.options.cellSize) / 2;

        // method de Boardview pour trouver la cellule la plus proche
        const dropCell = this.view.screenToCell(mouseX - offsetX, mouseY - offsetY);
        // re dessine la frame pour montrer que le block bouge
        this.view.render(this);

        if(dropCell) {
            this.view.highlightCell(dropCell.row, dropCell.col);
        }
    }

    // logic pour placer un block dans la grille
    handleUp(e) {
        if (!this.draggingBlock) return;

        // converti la position du block relacher en cellule de  la grille
        const offsetX = (this.draggingBlock.shape[0].length * this.view.options.cellSize) / 2;
        const offsetY = (this.draggingBlock.shape.length * this.view.options.cellSize) / 2;
        const cell = this.view.screenToCell(this.mouseX - offsetX, this.mouseY - offsetY);

        if (cell) {
            const shape = this.draggingBlock.shape;
            const color = this.draggingBlock.color;

            // regarde si la position est vide et dans la grille grace a une methode dans Grid.js
            if (this.state.grid.placeBlockCheck(shape, cell.col, cell.row)) {

                // place le block dans la grille et met a jour la grille avec la forme du block et sa couleur
                this.state.grid.placeBlock(shape, cell.col, cell.row, color);

                // retire le block de la boite en dessous
                this.state.offeredBlocks[this.dragIndex] = null;

                // fait appel a la logic de fin de tour dans Gamecontroller
                this.gameController.handleTurnEnd();
            }
        }
        // reset pour preparer la prochaine interaction
        this.draggingBlock = null;
        this.dragIndex = -1;
        // fait un render pour montrer que le block est placer, ou est remis dans la boite
        this.view.render();
    }
}