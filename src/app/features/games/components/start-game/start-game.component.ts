import { Component, OnInit } from '@angular/core';
import { GamesService } from '../../services/games.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-start-game',
  templateUrl: './start-game.component.html',
  styleUrls: ['./start-game.component.scss']
})
export class StartGameComponent implements OnInit {
  
  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly gamesService: GamesService){
  }

  ngOnInit(): void {
    const gameRoomId = this.route.snapshot.paramMap.get('gameRoomId')!;

    this.gamesService.startGame({gameRoomId: gameRoomId}).subscribe(result=>{
      this.router.navigateByUrl(`/game/${result.id}`);
    });
  }
}
