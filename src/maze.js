export default class Maze {
    // construcao do labirinto: Utilizamos a grid para representar o 
    // labirinto(Interssesao de linhas horizontais e conjunto de linhas verticais)
    constructor(grid) {
        this.grid = grid;
        this.rows = grid.length;
        this.cols = grid[0].length;
    }

    // Deteccao de colisao: Quando o retornar true quer dizer que o personagem pode andar pelo caminho 
    isWalkable(x, y) {
        return this.grid[x] [y] === 0;
    }
}



