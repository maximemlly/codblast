import {Block} from './Block';

export class TShape extends Block {
    static shape = [[1, 1, 1], [0, 1, 0]];
    constructor(color) {
        super(color, TShape.shape);
    }
}