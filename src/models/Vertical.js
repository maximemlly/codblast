import {Block} from './Block';

export class Vertical extends Block {
    static shape = [[1],[1],[1]];
    constructor(color) {
        super(color, Vertical.shape);
    }
}