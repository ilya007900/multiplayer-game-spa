import { Position } from "./position";

export interface MakeMoveRequest {
    nickname: string;
    newPosition: Position;
}