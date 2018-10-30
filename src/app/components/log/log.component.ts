import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Player } from '../../models/player';


@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  currentPlayer: Player;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.resetGame();
    this.gameService.resetGameEventEmitter.subscribe(() => {
      this.resetGame();
    });
    this.gameService.changeActivePlayerEventEmitter.subscribe((currentPlayer) => {
      this.currentPlayer = currentPlayer;
    });
  }

  resetGame() {
    this.currentPlayer = this.gameService.settings.player1;
  }

}
