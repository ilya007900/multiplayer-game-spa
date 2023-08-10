import { Player } from "../../shared/interfaces/player";

export interface GameRoom {
    id: string;
    players: Player[];
}