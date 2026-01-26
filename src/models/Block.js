export class Block {
    //couleur prefaite
    #color = "green";
    #shape;
    constructor(color, shape) {
        this.#color = color;
        this.#shape = shape;
        //taille calculer pour la collision et le render
        this.width = shape[0].length;
        this.height = shape.length;
    }

    get shape() {
        return this.#shape;
    }

    get color() {
        return this.#color;
    }

    //formes faites par l'ia, accessible avec Block.shapes.SQUARE_2x2, par exemple
    static get shapes() {
        return {
            SINGLE: [[1]],
            HORIZONTAL_3: [[1, 1, 1]],
            VERTICAL_3: [[1], [1], [1]],
            SQUARE_2x2: [[1, 1], [1, 1]],
            L_SHAPE: [[1, 0], [1, 0], [1, 1]],
            T_SHAPE: [[1, 1, 1], [0, 1, 0]]
        };
    }
}