export class InputController {
    constructor(gameState, boardView, gameController) {
        this.state = gameState;
        this.view = boardView;
        this.gameController = gameController;

        this.draggingBlock = null;
        this.dragIndex = -1;
        this.mouseX = 0;
        this.mouseY = 0;

        this.initListener();
    }

    initListener() {
        const canvas = this.view.canvas;
        canvas.addEventListener('pointerdown', (e) => this.handleDown(e));
        window.addEventListener('pointermove', (e) => this.handleMove(e));
        window.addEventListener('pointerup', (e) => this.handleUp(e));
    }

    handleDown(e) {
        const rect = this.view.canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const gridHeight = this.view.grid.rows * (this.view.options.cellSize + this.view.options.padding);

        if (y > gridHeight) {
            const slotWidth = this.view.canvas.width / (this.view.pixelRatio * 3);
            const slotIndex = Math.floor(x / slotWidth);
            const selectedBlock = this.state.offeredBlocks[slotIndex];

            if (selectedBlock) {
                this.draggingBlock = selectedBlock;
                this.dragIndex = slotIndex;
                console.log(`Picked up block from slot: ${slotIndex}`);
            }
        }
    }

    handleMove(e) {
        if (!this.draggingBlock) return;
        const rect = this.view.canvas.getBoundingClientRect();

        // Convert screen pixels to internal canvas pixels
        const mouseX = (e.clientX - rect.left) * (this.view.canvas.width / rect.width) / this.view.pixelRatio;
        const mouseY = (e.clientY - rect.top) * (this.view.canvas.height / rect.height) / this.view.pixelRatio;

        this.mouseX = mouseX;
        this.mouseY = mouseY;

        // Calculate how many cells to shift to center the block on the mouse
        const offsetX = (this.draggingBlock.shape[0].length * this.view.options.cellSize) / 2;
        const offsetY = (this.draggingBlock.shape.length * this.view.options.cellSize) / 2;

        // Find the cell at the TOP-LEFT of the block, not the center
        const dropCell = this.view.screenToCell(mouseX - offsetX, mouseY - offsetY);

        this.view.render(this);
        if (dropCell) {
            // Highlight where the TOP-LEFT of the block will land
            this.view.highlightCell(dropCell.row, dropCell.col);
        }
    }

    handleUp(e) {
        if (!this.draggingBlock) return;

        const offsetX = (this.draggingBlock.shape[0].length * this.view.options.cellSize) / 2;
        const offsetY = (this.draggingBlock.shape.length * this.view.options.cellSize) / 2;

        // Use the exact same math as handleMove
        const cell = this.view.screenToCell(this.mouseX - offsetX, this.mouseY - offsetY);

        if (cell) {
            const shape = this.draggingBlock.shape;
            if (this.state.grid.placeBlockCheck(shape, cell.col, cell.row)) {
                // Ensure you pass the color from the block object
                this.state.grid.placeBlock(shape, cell.col, cell.row, this.draggingBlock.color);
                this.state.offeredBlocks[this.dragIndex] = null;

                // Refresh tray if empty
                if (this.state.offeredBlocks.every(b => b === null)) {
                    this.state.refreshBlocks();
                    this.state.grid.offeredBlocks = this.state.offeredBlocks;
                }
                this.gameController.handleTurnEnd();
            }
        }

        this.draggingBlock = null;
        this.dragIndex = -1;
        this.view.render();
    }
}