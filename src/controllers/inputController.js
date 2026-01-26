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

        this.mouseX = e.clientX - rect.left;
        this.mouseY = e.clientY - rect.top;

        this.view.render(this);

        const cell = this.view.screenToCell(this.mouseX, this.mouseY);
        if (cell) {
            this.view.highlightCell(cell.row, cell.col);
        }
    }

    handleUp(e) {
        if (!this.draggingBlock) return;

        const rect = this.view.canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const cell = this.view.screenToCell(mouseX, mouseY);

        if (cell) {
            const shape = this.draggingBlock.shape;
            const color = this.draggingBlock.color;

            if (this.state.grid.placeBlockCheck(shape, cell.col, cell.row)) {
                this.state.grid.placeBlock(shape, cell.col, cell.row, color);
                this.state.offeredBlocks[this.dragIndex] = null;

                if (this.state.offeredBlocks.every(b => b === null)) {
                    this.state.refreshBlocks();
                }

                this.gameController.handleTurnEnd();
            }
        }

        this.draggingBlock = null;
        this.dragIndex = -1;
        this.view.render();
    }
}