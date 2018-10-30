import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css']
})
export class SnackBarComponent implements OnInit {

  constructor(public snackBar: MatSnackBar, public gameService: GameService) { }

  ngOnInit() {
    
    this.gameService.winnerMessageEventEmitter.subscribe((message) => {
      this.openSnackBar(message);
    });

  }

  openSnackBar(message) {
    this.snackBar.open(message, "", {
      duration: 4000,
    });
  }
}

