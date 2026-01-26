import { Block } from './Block.js';

export class SquareBlock extends Block {
    static shape = [[1, 1], [1, 1]];
    constructor(color) {
        super(color, SquareBlock.shape);
    }
}
