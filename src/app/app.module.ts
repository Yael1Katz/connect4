import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/board/board.component';
import { GameComponent } from './views/game/game.component';
import { ColumnComponent } from './components/column/column.component';
import { LogComponent } from './components/log/log.component';
import { SnackBarComponent } from './components/snack-bar/snack-bar.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { GameService } from './services/game.service';;


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    GameComponent,
    ColumnComponent,
    LogComponent,
    SnackBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
