import {Block} from './Block';

export class Single extends Block {
    static shape = [[1]];
    constructor(color) {
        super(color, Single.shape);
    }
}