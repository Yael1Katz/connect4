import { Injectable, Output, EventEmitter } from '@angular/core';
import { Settings } from '../models/settings';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  settings: Settings;
  @Output() resetGameEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() changeActivePlayerEventEmitter: EventEmitter<any> = new EventEmitter<any>();
  @Output() winnerMessageEventEmitter: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.settings = new Settings(7, 6, new Player("Yael", "red"), new Player("Gil", "yellow"), 4);
  };

};
