import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CellType } from "../../shared/cell-type.enum";

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.css']
})
export class ColumnComponent implements OnInit {

  @Input() col: Array<number>;
  @Input() colIndex: number;
  @Input() playerOne: boolean;
  @Input() gameOn: boolean;
  @Output() updateState: EventEmitter<any> = new EventEmitter<any>();

  constructor() { };

  ngOnInit() {
  }

  checkActive = cell => this.col[cell] === null ? '' : 'active';

  cellVal = i => {
    let className: string = '';
    switch (this.col[i]) {
      case (CellType.Empty):
        className = '';
        break;
      case (CellType.Yellow):
        className = 'yellow';
        break;
      case (CellType.Red):
        className = 'red';
        break;
      case (CellType.GhostRed):
        className = 'ghost-red';
        break;
      case (CellType.GhostYellow):
        className = 'ghost-yellow';
        break;
    };
    return className;
  };

  nextCell() {
    for (let i = this.col.length; i >= 0; i--) {
      if (this.col[i] === CellType.Empty ||
        this.col[i] === CellType.GhostRed ||
        this.col[i] === CellType.GhostYellow) {
        return i;
      }
    }
    return null; //false means full
  };

  clickColumn() {
    const nextCell = this.nextCell();
    if (typeof nextCell == 'number') {
      let data = {
        colIndex: this.colIndex,
        cell: nextCell
      };
      this.updateState.emit(data);
    } else {
      //column is full;
    };
  };

  setGhost(show: boolean) {
    const nextCell = this.nextCell();
    if (show && this.gameOn) {
      if (nextCell !== null) {
        this.col = this.col.map((cell, i) => {
          if (nextCell === i) {
            return this.playerOne ? CellType.GhostRed : CellType.GhostYellow;
          }
          return cell;
        });
      }
    } else {
      this.col = this.col.map((cell, i) => {
        return (cell == -1 || cell == -2) ? null : cell;
      });
    };
  };

};
