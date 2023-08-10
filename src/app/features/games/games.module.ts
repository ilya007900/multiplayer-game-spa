import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './components/game/game.component';
import { GamesRoutingModule } from './games-routing.module';
import { StartGameComponent } from './components/start-game/start-game.component';
import { MaterialModule } from 'src/app/material/material.module';
import { ChatComponent } from './components/chat/chat.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    GameComponent,
    StartGameComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    GamesRoutingModule,
    FormsModule
  ]
})
export class GamesModule { }
