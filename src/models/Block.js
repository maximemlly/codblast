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
}