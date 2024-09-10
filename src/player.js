export default class Player {

    // E possivel ver qual personagem e sua posicao na grid como [x,y]
    constructor(name, position) {
        this.name = name;
        this.position = position;
    }

    // Metodo para atualizar as coordenadas do jogador
    move(newPosition) {
        this.position = newPosition;
    }
}