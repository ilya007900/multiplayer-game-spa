import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/game/game.component';
import { StartGameComponent } from './components/start-game/start-game.component';


const routes: Routes = [
    {
        path: 'game/:id',
        component: GameComponent
    },
    {
      path: 'start-game/:gameRoomId',
      component: StartGameComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
