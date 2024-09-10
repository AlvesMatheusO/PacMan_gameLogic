export default class MazeGenerator {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.maze = Array.from({ length: rows }, () => Array(cols).fill(1)); // Labirinto todo bloqueado
        this.directions = [
            [-2, 0], // Cima
            [2, 0],  // Baixo
            [0, -2], // Esquerda
            [0, 2],  // Direita
        ];
    }

    generate() {
        let startX = Math.floor(Math.random() * this.rows);
        let startY = Math.floor(Math.random() * this.cols);

        if (startX % 2 === 0) startX += 1;
        if (startY % 2 === 0) startY += 1;

        this.maze[startX][startY] = 0; 
        this.dfs(startX, startY);

        return this.maze;
    }

    dfs(x, y) {
        // Embaralhar direções para garantir aleatoriedade
        this.shuffle(this.directions);

        for (let [dx, dy] of this.directions) {
            const nx = x + dx;
            const ny = y + dy;

            // Verificar se o novo ponto está dentro do labirinto e se é uma parede
            if (nx > 0 && ny > 0 && nx < this.rows - 1 && ny < this.cols - 1 && this.maze[nx][ny] === 1) {
                
                this.maze[x + dx / 2][y + dy / 2] = 0;
                this.maze[nx][ny] = 0;

                this.dfs(nx, ny);
            }
        }
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}
