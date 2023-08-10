import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { GameRoomComponent } from './components/game-room/game-room.component';
import { GameRoomsRoutingModule } from './game-rooms-routing.module';
import { GameRoomWelcomeComponent } from './components/game-room-welcome/game-room-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';


@NgModule({
  declarations: [
    GameRoomComponent,
    GameRoomWelcomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    GameRoomsRoutingModule,
    
  ]
})
export class GameRoomsModule { }
