export default class Ghost {
  constructor(name, position) {
      this.name = name;
      this.position = position;
  }

  move(newPosition) {
      // Verifica se a nova posição é diferente da atual antes de mover
      if (this.position[0] !== newPosition[0] || this.position[1] !== newPosition[1]) {
          this.position = newPosition;
      }
  }

  // Método para o fantasma perseguir o Pac-Man usando BFS
  chase(player, maze) {
      console.log(`${this.name} está perseguindo ${player.name} da posição ${this.position}`);

      const [targetX, targetY] = player.position;
      const [ghostX, ghostY] = this.position;

      // Função auxiliar para verificar se a célula é válida (dentro do grid e não é uma parede)
      const isValidMove = (x, y) => {
          return x >= 0 && y >= 0 && x < maze.length && y < maze[0].length && maze[x][y] === 0;
      };

      // BFS para encontrar o menor caminho
      const queue = [[ghostX, ghostY]];
      const visited = Array.from({ length: maze.length }, () => Array(maze[0].length).fill(false));
      const parent = Array.from({ length: maze.length }, () => Array(maze[0].length).fill(null));

      visited[ghostX][ghostY] = true;

      const directions = [
          [-1, 0], // cima
          [1, 0],  // baixo
          [0, -1], // esquerda
          [0, 1]   // direita
      ];

      while (queue.length > 0) {
          const [x, y] = queue.shift();

          // Verificar se encontramos o Pac-Man
          if (x === targetX && y === targetY) {
              console.log('Pac-Man encontrado!');
              let path = [];
              let current = [x, y];

              while (current) {
                  path.push(current);
                  current = parent[current[0]][current[1]];
              }

              path.reverse();
              console.log('Caminho encontrado:', path);

              // Mover o fantasma para a próxima posição no caminho
              if (path.length > 1 && isValidMove(path[1][0], path[1][1])) {
                  this.move(path[1]);  // Move o fantasma para a próxima posição válida
              } else {
                  console.log('Nenhum movimento válido disponível.');
              }
              
              return;
          }

          // Explorar os vizinhos
          for (let [dx, dy] of directions) {
              const newX = x + dx;
              const newY = y + dy;

              if (isValidMove(newX, newY) && !visited[newX][newY]) {
                  queue.push([newX, newY]);
                  visited[newX][newY] = true;
                  parent[newX][newY] = [x, y];
              }
          }
      }
      
      console.log('Nenhum caminho encontrado.');
  }
}
