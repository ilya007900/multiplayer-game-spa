import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameRoomsService } from '../../services/game-rooms.service';
import { Player } from 'src/app/features/shared/interfaces/player';
import { FormControl, Validators } from '@angular/forms';
import { PlayerService } from 'src/app/features/shared/services/player.services';

@Component({
  selector: 'app-game-room-welcome',
  templateUrl: './game-room-welcome.component.html',
  styleUrls: ['./game-room-welcome.component.scss']
})
export class GameRoomWelcomeComponent {
  nicknameControl = new FormControl('', Validators.required);
  colorControl = new FormControl('', [Validators.required]);
  gameRoomIdControl = new FormControl('', [Validators.required]);

  showJoinForm = false;
  error = '';

  constructor(
    private readonly gameRoomsService: GameRoomsService,
    private readonly playerService: PlayerService,
    private readonly router: Router) {
  }

  createGameRoomDisabled(): boolean {
    return this.nicknameControl.invalid || this.colorControl.invalid;
  }

  onCreateRoomClick(): void {

    const player: Player = {
      nickname: this.nicknameControl.value!,
      color: this.colorControl.value!
    };

    this.gameRoomsService.createGameRoom({ nickname: player.nickname, color: player.color })
      .subscribe({
        next: (result) => {
          this.playerService.setPlayer(player.nickname);
          this.router.navigateByUrl(`/game-room/${result.id}`);
        },
        error: (error) => {
          this.error = error.error[0].error;
        }
      });
  }

  onBackClick(): void {
    this.showJoinForm = false;
    this.error = '';
  }

  joinGameRoomDisabled(): boolean {
    if (!this.showJoinForm) {
      return this.createGameRoomDisabled();
    }

    return this.gameRoomIdControl.invalid;
  }

  onJoinGameRoomClick(): void {
    if (!this.showJoinForm) {
      this.showJoinForm = true;
      return;
    }

    const player: Player = {
      nickname: this.nicknameControl.value!,
      color: this.colorControl.value!
    };

    this.gameRoomsService.joinGameRoom(this.gameRoomIdControl.value!, { nickname: player.nickname, color: player.color })
      .subscribe({
        next: (result) => {
          this.playerService.setPlayer(player.nickname);
          this.router.navigateByUrl(`/game-room/${result.id}`);
        },
        error: (error) => {
          this.error = error.error[0].error;
        }
      });
  }
}
