import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { Player } from "../../shared/interfaces/player";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class GamesEventsService {

    private baseUrl = `${environment.api.hub_endpoint}`;
    private hubConnection: signalR.HubConnection | null = null;

    async listenPlayerMadeMove(gameId: string, callback: (data: any, nextTurn: Player) => any) {
        const hub = await this.getHub();
        hub.on(`move-made-${gameId}`, callback);
    }

    private async getHub(): Promise<signalR.HubConnection> {
        if (this.hubConnection) {
            return this.hubConnection;
        }

        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${this.baseUrl}/game`)
            .build();

        try {
            await this.hubConnection.start();
        } catch (err) {
            console.error('Error while starting connection: ' + err);
        }

        return this.hubConnection;
    }
}