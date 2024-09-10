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

    bfs(start, end) {
        let queue = [[start]];
        let visited = Array.from({
            length: this.maze.length  
        }, () => Array(this.maze[0].length).fill(false));  
        
        visited[start[0]] [start[1]] = true;

        while(queue.length > 0) {
            let path = queue.shift();
            let [x, y] = path[path.length - 1];

            if (x === end[0] && y === end[1]) {
                return path;
            }

            for (let [dx, dy] of this.directions) {
                let newX = x + dx;
                let newY = y + dy;

                if (
                    newX >= 0 && newX < this.maze.rows &&
                    newY >= 0 && newY < this.maze.cols &&
                    this.maze.isWalkable(newX, newY) &&
                    !visited[newX][newY]
                 ) {
                    visited[newX][newY] = true;
                    queue.push([...path, [newX, newY]]);
                 }
            }
        }
        return null;
    }

    moveGhosts() {
        this.ghosts.forEach((ghost, ghostIndex) => {
            let closestPlayer = this.players[0];
            let path = this.bfs(ghost.position,  closestPlayer.position);

            if (path && path.length > 1) {
                let [nextX, nextY] = path[1];
                ghost.move([nextX, nextY]);

                if (nextX === closestPlayer.position[0] && 
                    nextY === closestPlayer.position[1]) {
                    console.log(`${ghost.name} matou o ${closestPlayer.name}!`);
                } else {
                    console.log(`${ghost.name} moveu para posicao [${nextX}, ${nextY}]`);
                }
            }
        });
    }

    simulateGame(rounds) {
        for(let i = 0; i < rounds; i++ ) {
            // console.log(`Rodada ${i + 1}:`);
            this.moveGhosts();
        }
    }
}