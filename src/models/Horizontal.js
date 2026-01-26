import {Block} from './Block';

export class Horizontal extends Block {
    static shape = [[1, 1, 1]];

    constructor(color) {
        super(color, Horizontal.shape);
    }
}