import Maze from "./maze.js";
import Player from "./player.js";
import Ghost from "./ghost.js";
import Pacman from "./game.js";

const maze = [
    [0, 1, 0, 0],
    [0, 1, 0, 1],
    [0, 0, 0, 1],
    [1, 1, 0, 0],
  ];
const ghostPosition = [0, 0];  // Posição inicial do fantasma
const pacmanPosition = [3, 3];  // Posição inicial do Pac-Man

const player = new Player('Pacman', pacmanPosition);
const ghost = new Ghost('Fantasma vermelho', ghostPosition);

let round = 1;
let caught = false;

while (!caught) {
  console.log(`Rodada ${round}:`);
  
  // Mostrar a posição do Pac-Man e do Fantasma
  console.log(`Posição do Pac-Man: ${player.position}`);
  console.log(`Posição do Fantasma: ${ghost.position}`);
  
  // O fantasma se move em direção ao Pac-Man
  ghost.chase(player, maze);
  
  // Verificar se o fantasma capturou o Pac-Man
  if (ghost.position[0] === player.position[0] && ghost.position[1] === player.position[1]) {
    console.log('O Fantasma capturou o Pac-Man!');
    caught = true;
  }
  
  // Adicionar um limite de rodadas para parar o loop (para evitar infinitos)
  if (round >= 10) {
    console.log('Limite de rodadas atingido.');
    break;
  }

  round++;
}
const game = new Pacman(maze, [player], [ghost]);

game.simulateGame(5);