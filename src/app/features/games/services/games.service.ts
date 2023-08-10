import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Game } from "../interfaces/game";
import { StartGameRequest } from "../interfaces/start-game-request";
import { MakeMoveRequest } from "../interfaces/make-move-request";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class GamesService {

    private baseUrl = `${environment.api.service_endpoint}/api/games`;

    constructor(private readonly http: HttpClient) { }

    startGame(model: StartGameRequest): Observable<Game> {
        return this.http.post<Game>(`${this.baseUrl}`, model);
    }

    getGame(gameId: string): Observable<Game> {
        return this.http.get<Game>(`${this.baseUrl}/${gameId}`);
    }

    makeMove(gameId: string, model: MakeMoveRequest): Observable<Game> {
        return this.http.post<Game>(`${this.baseUrl}/${gameId}/moves`, model);
    }
}