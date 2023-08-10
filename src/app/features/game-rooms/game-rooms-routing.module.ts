import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameRoomComponent } from './components/game-room/game-room.component';
import { GameRoomWelcomeComponent } from './components/game-room-welcome/game-room-welcome.component';


const routes: Routes = [
    {
        path: 'game-room-welcome',
        component: GameRoomWelcomeComponent
    },
    {
      path: 'game-room/:id',
      component: GameRoomComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GameRoomsRoutingModule { }
