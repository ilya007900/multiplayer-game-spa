import { Player } from "../../shared/interfaces/player";
import { GameUnit } from "./game-unit";
import { Area } from "./rectangle";

export interface Game {
    id: string;
    players: Player[];
    gameUnits: GameUnit[];
    currentTurn: Player;
    fieldSize: Area;
    gameUnitSize: Area;
    chatId: string | null;
}