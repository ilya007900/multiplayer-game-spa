import { Player } from "../../shared/interfaces/player";
import { Position } from "./position";

export interface GameUnit{
    player: Player;
    position: Position;
}