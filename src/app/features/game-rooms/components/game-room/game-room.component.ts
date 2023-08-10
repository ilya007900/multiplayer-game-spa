import { Component, OnInit } from '@angular/core';
import { GameRoomsService } from '../../services/game-rooms.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameRoom } from '../../interfaces/game-room';
import { Player } from 'src/app/features/shared/interfaces/player';
import { PlayerService } from 'src/app/features/shared/services/player.services';
import { GameRoomsEventsService } from '../../services/game-rooms-events.service';

@Component({
  selector: 'app-game-room',
  templateUrl: './game-room.component.html',
  styleUrls: ['./game-room.component.scss']
})
export class GameRoomComponent implements OnInit {
  private nickname: string = '';

  gameRoom: GameRoom | null = null;

  constructor(
    private readonly gameRoomsService: GameRoomsService,
    private readonly gameRoomsEventsService : GameRoomsEventsService,
    private readonly playerService: PlayerService,
    private readonly route: ActivatedRoute,
    private readonly router: Router) { }

  async ngOnInit(): Promise<void> {
    const gameRoomId = this.route.snapshot.paramMap.get('id')!;
    this.nickname = this.playerService.getPlayer();

    await this.gameRoomsEventsService.listenPlayerJoined(gameRoomId, (data: Player) => {
      this.gameRoom!.players.push(data);
    });

    await this.gameRoomsEventsService.listenPlayerLeft(gameRoomId, (data: Player) => {
      this.gameRoom!.players = this.gameRoom!.players.filter(x => x.nickname !== data.nickname);
    });

    await this.gameRoomsEventsService.listenGameStarted(gameRoomId, (data: string) => {
      this.router.navigateByUrl(`/game/${data}`);
    });

    this.gameRoomsService.getGameRoom(gameRoomId).subscribe(result => {
      this.gameRoom = result;
    });
  }

  leaveRoomClicked(): void {
    this.gameRoomsService.leaveGameRoom(this.gameRoom!.id, this.nickname).subscribe(() => {
      this.router.navigateByUrl('/game-room-welcome');
    });
  }

  startGameClicked(): void {
    this.router.navigateByUrl(`/start-game/${this.gameRoom!.id}`);
  }
}
