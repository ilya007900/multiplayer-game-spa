import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CreateGameRoomRequest } from "../interfaces/create-game-room-request";
import { Observable } from "rxjs";
import { GameRoom } from "../interfaces/game-room";
import { environment } from "src/environments/environment";
import { JoinGameRoomRequest } from "../interfaces/join-game-room-request";

@Injectable({
    providedIn: 'root'
})
export class GameRoomsService {

    private baseUrl = `${environment.api.service_endpoint}/api/gameRooms`;

    constructor(private readonly http: HttpClient) { }

    createGameRoom(model: CreateGameRoomRequest): Observable<GameRoom> {
        return this.http.post<GameRoom>(`${this.baseUrl}`, model);
    }

    joinGameRoom(gameRoomId: string, model: JoinGameRoomRequest): Observable<GameRoom> {
        return this.http.post<GameRoom>(`${this.baseUrl}/${gameRoomId}/players`, model);
    }

    leaveGameRoom(gameRoomId: string, nickname: string): Observable<GameRoom> {
        return this.http.delete<GameRoom>(`${this.baseUrl}/${gameRoomId}/players/${nickname}`);
    }

    getGameRoom(gameRoomId: string): Observable<GameRoom> {
        return this.http.get<GameRoom>(`${this.baseUrl}/${gameRoomId}`);
    }
}