import { Player } from "./player";


export class Settings {
    columns: number;
    rows: number;
    player1: Player;
    player2: Player;
    winningNumber: number;

    constructor(columns, rows, player1, player2, winningNumber) {
        this.columns = columns;
        this.rows = rows;
        this.player1 = player1;
        this.player2 = player2;
        this.winningNumber = winningNumber;
    };
}