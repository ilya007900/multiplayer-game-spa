import { Injectable } from "@angular/core";
import * as signalR from "@microsoft/signalr";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class GameRoomsEventsService {

    private baseUrl = `${environment.api.hub_endpoint}`;
    private hubConnection: signalR.HubConnection | null = null;

    async listenPlayerJoined(roomId: string, callback: (data: any) => any) {
        const hub = await this.getHub();
        hub.on(`player-joined-${roomId}`, callback);
    }

    async listenPlayerLeft(roomId: string, callback: (data: any) => any) {
        const hub = await this.getHub();
        hub.on(`player-left-${roomId}`, callback);
    }

    async listenGameStarted(gameRoomId: string, callback: (data: any) => any): Promise<void> {
        const hub = await this.getHub();
        hub.on(`game-started-${gameRoomId}`, callback);
    }

    async getHub(): Promise<signalR.HubConnection> {
        if (this.hubConnection) {
            return this.hubConnection;
        }

        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${this.baseUrl}/game-room`)
            .build();

        try {
            await this.hubConnection.start();
            console.log('Connection started');
        } catch (err) {
            console.error('Error while starting connection: ' + err);
        }

        return this.hubConnection;
    }
}