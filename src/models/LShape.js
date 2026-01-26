import {Block} from './Block';

export class LShape extends Block {
    static shape = [[1, 0], [1, 0], [1, 1]];
    constructor(color) {
        super(color, LShape.shape);
    }
}