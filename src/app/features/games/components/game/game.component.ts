import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GamesService } from '../../services/games.service';
import { Game } from '../../interfaces/game';
import { GameUnit } from '../../interfaces/game-unit';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { Position } from '../../interfaces/position';
import { Area } from '../../interfaces/rectangle';
import { PlayerService } from 'src/app/features/shared/services/player.services';
import { Player } from 'src/app/features/shared/interfaces/player';
import { GamesEventsService } from '../../services/games-events.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  nickname = '';
  game: Game | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly playerService: PlayerService,
    private readonly gamesService: GamesService,
    private readonly gamesEventsService: GamesEventsService) {
  }

  async ngOnInit(): Promise<void> {
    const gameId = this.route.snapshot.paramMap.get('id')!;
    this.nickname = this.playerService.getPlayer();

    await this.gamesEventsService.listenPlayerMadeMove(gameId, (data: GameUnit, nextMove: Player) => {
      this.game!.currentTurn = nextMove;
      
      if (data.player.nickname === this.nickname) {
        return;
      }

      const gameUnit = this.game!.gameUnits.find(x => x.player.nickname === data.player.nickname)!;
      gameUnit.position = data.position;
    })

    this.gamesService.getGame(gameId).subscribe(result => {
      this.game = result;
    });
  }

  dragDisabled(gameUnit: GameUnit): boolean {
    return gameUnit.player.nickname !== this.nickname || this.game!.currentTurn.nickname !== this.nickname;
  }

  onDragEnded(e: CdkDragEnd, gameUnit: GameUnit): void {
    const point = e.source.getFreeDragPosition()
    const position: Position = {
      x: point.x,
      y: point.y
    };

    const canNotDrop = this.game!.gameUnits
      .filter(x => x.player.nickname !== gameUnit.player.nickname)
      .some(p => this.cross(position, this.game!.gameUnitSize, p.position, this.game!.gameUnitSize));

    if (canNotDrop) {
      e.source._dragRef.setFreeDragPosition({
        x: gameUnit.position.x,
        y: gameUnit.position.y
      });
      return;
    }

    gameUnit.position = position;

    this.gamesService.makeMove(this.game!.id, {
      nickname: gameUnit.player.nickname,
      newPosition: { x: Math.round(position.x), y: Math.round(position.y) }
    }).subscribe(result => {

    });
  }

  private cross(position1: Position, area1: Area, position2: Position, area2: Area): boolean {

    const positionToPoints = (position: Position, area: Area): Position[] => {
      const point1: Position = {
        x: position.x,
        y: position.y
      }

      const point2: Position = {
        x: position.x + area.width,
        y: position.y
      }

      const point3: Position = {
        x: position.x,
        y: position.y + area.height
      }

      const point4: Position = {
        x: position.x + area.width,
        y: position.y + area.height
      }

      return [point1, point2, point3, point4];
    }

    const isPointInSquare = (squareStartPosition: Position, squareArea: Area, point: Position): boolean => {
      return point.x >= squareStartPosition.x &&
        point.y >= squareStartPosition.y &&
        point.x <= squareStartPosition.x + squareArea.width &&
        point.y <= squareStartPosition.y + squareArea.height;
    }

    const points1 = positionToPoints(position1, area1);
    return points1.some(point => isPointInSquare(position2, area2, point));
  }
}
