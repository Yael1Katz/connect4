import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Player } from '../../models/player';
import {CellType} from "../../shared/cell-type.enum";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  boardArr: Array<any>;
  playerOne: boolean;
  gameOn: boolean;

  constructor(private gameService: GameService) {

  };

  ngOnInit() {
    this.resetGame();
    this.gameService.resetGameEventEmitter.subscribe(isOpen => {
      this.resetGame();
    });
  }

  updateState(data) {
    if (this.gameOn) {
      this.boardArr = [...this.boardArr].map((column, i) => {
        if (i === data.colIndex) {
          const newCol = [...column];
          newCol[data.cell] = this.playerOne ? CellType.Red : CellType.Yellow;
          return newCol;
        };
        return column;
      });

      let currentPlayer: Player;
      const continueGame = !(this.winningMove());
      if (continueGame) {
        this.playerOne = !this.playerOne;
        currentPlayer = this.playerOne ? this.gameService.settings.player1 : this.gameService.settings.player2;
        this.gameService.changeActivePlayerEventEmitter.emit(currentPlayer);
      }
      else {
        this.gameOn = false;
        currentPlayer = this.playerOne ? this.gameService.settings.player1 : this.gameService.settings.player2;
        this.gameService.winnerMessageEventEmitter.emit(currentPlayer.name + " is the winner!!!!")
      }
    }
  };

  winningMove() {
    let stopGame: boolean = false;

    stopGame = this.verticalCheck() ||
      this.horizontalCheck() ||
      this.DiagonalCheck1() ||
      this.DiagonalCheck2() ||
      this.DiagonalCheck3() ||
      this.DiagonalCheck4();
    return stopGame;
  };

  private checkLine(values: number[]): boolean {
    let last = 1;
    let lastCount = 0;

    for (let i = 0; i < values.length; i++) {
      if (values[i] === last) {
        lastCount++;
      } else {
        last = values[i];
        lastCount = 1;
      }
      if (last !== null && lastCount === this.gameService.settings.winningNumber) {
        break;
      }
    }
    if (last !== null && lastCount === this.gameService.settings.winningNumber) {
      return true;
    }
    return false;
  }


  horizontalCheck(): boolean {
    for (let r = 0; r < this.gameService.settings.rows; r++) {
      const row = this.boardArr.map((c, i) => {
        return this.boardArr[i][r];
      });
      if (this.checkLine(row) == true) {
        return true;
      }
    };
    return false;
  }

  verticalCheck(): boolean {
    for (let i = 0; i < this.gameService.settings.columns; i++) {

      if (this.checkLine(this.boardArr[i])) {
        return true;
      }
    }
    return false;
  }


  DiagonalCheck1(): boolean {
    /*
* Diagonal check 1 (first left to right check)
*
* [x][ ][ ][ ][ ][ ][ ]
* [x][x][ ][ ][ ][ ][ ]
* [x][x][x][ ][ ][ ][ ]
* [x][x][x][x][ ][ ][ ]
* [ ][x][x][x][x][ ][ ]
* [ ][ ][x][x][x][x][ ]
* [ ][ ][ ][x][x][x][x]
*
*/
    for (let i = 0; i <= this.gameService.settings.rows - this.gameService.settings.winningNumber; i++) {
      let row, col;
      let values = [];

      for (row = i, col = 0; row < this.gameService.settings.rows && col < this.gameService.settings.columns; row++ , col++) {
        values = [...values, this.boardArr[row][col]];
      }

      if (this.checkLine(values) == true) {
        return true;
      }
    }
    return false;
  }

  DiagonalCheck2(): boolean {
    /*
     * Diagonal check 2 (last left to right check)
     *
     * [ ][x][x][x][ ][ ][ ]
     * [ ][ ][x][x][x][ ][ ]
     * [ ][ ][ ][x][x][x][ ]
     * [ ][ ][ ][ ][x][x][x]
     * [ ][ ][ ][ ][ ][x][x]
     * [ ][ ][ ][ ][ ][ ][x]
     * [ ][ ][ ][ ][ ][ ][ ]
     *
     */

    for (let i = 1; i <= this.gameService.settings.columns - this.gameService.settings.winningNumber; i++) {
      let row, col;
      let values = [];

      for (row = 0, col = i; row < this.gameService.settings.rows && col < this.gameService.settings.columns; row++ , col++) {
        values = [...values, this.boardArr[col][row]];
      }

      if (this.checkLine(values) == true) {
        return true;
      }
    }
    return false;
  }

  DiagonalCheck3(): boolean {
    /*
     * Diagonal check 3 (first right to left check)
     *
     * [ ][ ][ ][x][x][x][x]
     * [ ][ ][x][x][x][x][ ]
     * [ ][x][x][x][x][ ][ ]
     * [x][x][x][x][ ][ ][ ]
     * [x][x][x][ ][ ][ ][ ]
     * [x][x][ ][ ][ ][ ][ ]
     * [x][ ][ ][ ][ ][ ][ ]
     *
     */

    for (let i = this.gameService.settings.winningNumber - 1; i < this.gameService.settings.columns; i++) {
      let row, col;
      let values = [];

      for (row = 0, col = i; row < this.gameService.settings.rows && col >= 0; row++ , col--) {
        values = [...values, this.boardArr[col][row]];
      }
      if (this.checkLine(values) == true) {
        return true;
      }
    }
    return false;
  }

  DiagonalCheck4(): boolean {
    /*
      * Diagonal check 4 (last right to left check)
      *
      * [ ][ ][ ][ ][ ][ ][ ]
      * [ ][ ][ ][ ][ ][ ][x]
      * [ ][ ][ ][ ][ ][x][x]
      * [ ][ ][ ][ ][x][x][x]
      * [ ][ ][ ][x][x][x][ ]
      * [ ][ ][x][x][x][ ][ ]
      * [ ][x][x][x][ ][ ][ ]
      *
      */

    for (let i = 1; i <= this.gameService.settings.rows - this.gameService.settings.winningNumber; i++) {
      let row, col;
      let values = [];

      for (row = i, col = this.gameService.settings.columns - 1; row < this.gameService.settings.rows && col >= 0; row++ , col--) {
        values = [...values, this.boardArr[col][row]];
      }
      if (this.checkLine(values) == true) {
        return true;
      }
    }
    return false;
  }

  resetGame() {
    this.boardArr = Array(this.gameService.settings.columns)
      .fill(Array(this.gameService.settings.rows).fill(null));
    this.playerOne = true;
    this.gameOn = true;
  }

}