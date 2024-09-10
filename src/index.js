
import Player from "./player.js";
import Ghost from "./ghost.js";
import Pacman from "./game.js";
import Maze from "./maze.js";
import MazeGenerator from "./MazeGenerator.js"

// Exemplo de uso
let mazeGenerator = new MazeGenerator(11, 11);  
let maze = mazeGenerator.generate();
console.log(maze);

const ghostPosition = [1, 1];  // Posição inicial do fantasma
const pacmanPosition = [3,5];  // Posição inicial do Pac-Man

const player = new Player('Pacman', pacmanPosition);
const ghost = new Ghost('Fantasma vermelho', ghostPosition);

let round = 1;
let caught = false;

while (!caught) {
  console.log(`Rodada ${round}:`);

  // Mostrar a posição do Pac-Man e do Fantasma
  console.log(`Posição do Pac-Man: ${player.position}`);
  console.log(`Posição do Fantasma: ${ghost.position}`);

  console.log('\nEstado do jogo:');
  let gameState = maze.map((arr) => { return arr.slice(); });
  gameState[player.position[0]][player.position[1]] = 2
  gameState[ghost.position[0]][ghost.position[1]] = 3
  gameState.forEach((i) => { console.log(i); });
  console.log();

  // O fantasma se move em direção ao Pac-Man
  ghost.chase(player, maze);

  // Verificar se o fantasma capturou o Pac-Man
  if (ghost.position[0] === player.position[0] && ghost.position[1] === player.position[1]) {
    console.log('O Fantasma capturou o Pac-Man!');
    caught = true;

    console.log('\nEstado do jogo:');
    let gameState = maze.map((arr) => { return arr.slice(); });
    gameState[player.position[0]][player.position[1]] = 2
    gameState[ghost.position[0]][ghost.position[1]] = 3
    gameState.forEach((i) => { console.log(i); });
    console.log();
  }

  // Adicionar um limite de rodadas para parar o loop (para evitar infinitos)
  if (round >= 10) {
    console.log('Limite de rodadas atingido.');

    console.log('\nEstado do jogo:');
    let gameState = maze.map((arr) => { return arr.slice(); });
    gameState[player.position[0]][player.position[1]] = 2
    gameState[ghost.position[0]][ghost.position[1]] = 3
    gameState.forEach((i) => { console.log(i); });
    console.log();
    break;
  }

  round++;
}