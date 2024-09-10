import Player from "./player.js";
import Ghost from "./ghost.js";
import Pacman from "./game.js";

const x = Number(process.argv[2]);

const mazes = [
  [
    [0, 1, 0, 0],
    [0, 1, 0, 1],
    [0, 0, 0, 1],
    [1, 1, 0, 0],
  ],
  [
    [0, 1, 0, 0, 0],
    [0, 1, 1, 0, 1],
    [0, 0, 1, 0, 0],
    [1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0],
  ],
  [
    [0, 1, 0, 0, 0, 1, 0],
    [0, 0, 0, 1, 0, 0, 0],
    [0, 1, 0, 1, 1, 0, 1],
    [0, 1, 1, 0, 1, 0, 1],
    [0, 0, 1, 0, 1, 0, 1],
    [0, 1, 1, 0, 0, 0, 0],
    [0, 1, 0, 0, 1, 1, 1],
  ],
];
const maze = mazes[x]?? mazes[0];

const positions = [
  {
    "ghost": [0, 0],
    "pacman": [3, 3]
  },
  {
    "ghost": [0, 0],
    "pacman": [0, 4]
  },
  {
    "ghost": [6, 0],
    "pacman": [3, 3]
  }
];

const ghostPosition = positions[x]["ghost"];  // Posição inicial do fantasma
const pacmanPosition = positions[x]["pacman"];  // Posição inicial do Pac-Man

const pacman = new Pacman();

const player = new Player('Pacman', pacmanPosition);
const ghost = new Ghost('Fantasma vermelho', ghostPosition);

let round = 1;
let caught = false;

while (!caught) {
  console.log(`Rodada ${round}:`);

  // Mostrar a posição do Pac-Man e do Fantasma
  console.log(`Posição do Pac-Man: ${player.position}`);
  console.log(`Posição do Fantasma: ${ghost.position}`);

  // console.log('\nEstado do jogo:');
  // let gameState = maze.map((arr) => { return arr.slice(); });
  // gameState[player.position[0]][player.position[1]] = 2
  // gameState[ghost.position[0]][ghost.position[1]] = 3
  // gameState.forEach((i) => { console.log(i); });
  // console.log();
  pacman.printGameState(maze, player, ghost);

  // O fantasma se move em direção ao Pac-Man
  ghost.chase(player, maze);

  // Verificar se o fantasma capturou o Pac-Man
  if (ghost.position[0] === player.position[0] && ghost.position[1] === player.position[1]) {
    console.log('O Fantasma capturou o Pac-Man!');
    caught = true;

    pacman.printGameState(maze, player, ghost);
  }

  // Adicionar um limite de rodadas para parar o loop (para evitar infinitos)
  if (round >= 100) {
    console.log('Limite de rodadas atingido.');
    pacman.printGameState(maze, player, ghost);
    break;
  }

  console.log();
  round++;
}