// Arquivo core de mecanicas, perseguicoes e movimentacao

import Maze from "./maze.js";
import Player from "./player.js";
import Ghost from "./ghost.js";

export default class Pacman {
    constructor(maze, players, ghosts) {
        this.maze = maze;
        this.players = players;
        this.ghosts = ghosts;
        this.directions = [
            [-1, 0], //cima
            [1, 0],  // baixo
            [0, -1], // esquerda
            [0, 1]   // direita 
        ];
    }

    moveGhosts() {
        this.ghosts.forEach(ghost => {
            let path = ghost.chase(this.players[0], this.maze);
            if (path && path.length > 1) {
                let [nextX, nextY] = path[1];
                ghost.move([nextX, nextY]);
    
                if (nextX === this.players[0].position[0] && 
                    nextY === this.players[0].position[1]) {
                    console.log(`${ghost.name} capturou o ${this.players[0].name}!`);
                    
                    process.exit();  // Para a execução do jogo
                } else {
                    console.log(`${ghost.name} moveu para a posição [${nextX}, ${nextY}]`);
                }
            } else {
                console.log('Nenhum movimento válido disponível.');
            }
        });
    }
    
    simulateGame(rounds) {
        for (let i = 0; i < rounds; i++) {
            this.moveGhosts();
        }
    }
}