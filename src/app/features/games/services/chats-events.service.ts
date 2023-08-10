import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Chat } from "../interfaces/chat";
import { HttpClient } from "@angular/common/http";
import { SendMessageRequest } from "../interfaces/send-message-request";
import * as signalR from "@microsoft/signalr";

@Injectable({
    providedIn: 'root'
})
export class ChatsEventsService {
    private baseUrl = `${environment.api.hub_endpoint}`;
    private hubConnection: signalR.HubConnection | null = null;

    async listenNewMessages(chatId: string, callback: (data: any) => any) {
        const hub = await this.getHub();
        hub.on(`message-sent-${chatId}`, callback);
    }

    private async getHub(): Promise<signalR.HubConnection> {
        if (this.hubConnection) {
            return this.hubConnection;
        }

        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(`${this.baseUrl}/chat`)
            .build();

        try {
            await this.hubConnection.start();
        } catch (err) {
            console.error('Error while starting connection: ' + err);
        }

        return this.hubConnection;
    }
}