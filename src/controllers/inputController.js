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

        const mouseX = (e.clientX - rect.left) * (this.view.canvas.width / rect.width) / this.view.pixelRatio;
        const mouseY = (e.clientY - rect.top) * (this.view.canvas.height / rect.height) / this.view.pixelRatio;

        this.mouseX = mouseX;
        this.mouseY = mouseY;

        const offSetX = (this.draggingBlock.shape[0].length * this.view.options.cellSize) / 2;
        const offsetY = (this.draggingBlock.shape.length * this.view.options.cellSize) / 2;

        const dropCell = this.view.screenToCell(mouseX - offsetX, mouseY - offsetY);

        this.view.render(this);
        if(dropCell) {
            this.view.highlightCell(dropCell.row, dropCell.col);
        }
    }

    handleUp(e) {
        if (!this.draggingBlock) return;

        const offsetX = (this.draggingBlock.shape[0].length * this.view.options.cellSize) / 2;
        const offsetY = (this.draggingBlock.shape.length * this.view.options.cellSize) / 2;
        const cell = this.view.screenToCell(this.mouseX - offsetX, this.mouseY - offsetY);

        if (cell) {
            const shape = this.draggingBlock.shape;
            const color = this.draggingBlock.color;

            // 1. Check if placement is valid
            if (this.state.grid.placeBlockCheck(shape, cell.col, cell.row)) {

                // 2. ACTUALLY place the block (You were missing this call!)
                this.state.grid.placeBlock(shape, cell.col, cell.row, color);

                // 3. Remove it from the tray
                this.state.offeredBlocks[this.dragIndex] = null;

                // 4. Trigger the end of turn logic
                this.gameController.handleTurnEnd();
            }
        }

        this.draggingBlock = null;
        this.dragIndex = -1;
        this.view.render();
    }
}