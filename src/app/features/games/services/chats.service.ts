import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Chat } from "../interfaces/chat";
import { HttpClient } from "@angular/common/http";
import { SendMessageRequest } from "../interfaces/send-message-request";

@Injectable({
    providedIn: 'root'
})
export class ChatsService {
    private baseUrl = `${environment.api.service_endpoint}/api/chats`;

    constructor(private readonly http: HttpClient) { }

    getById(chatId: string): Observable<Chat> {
        return this.http.get<Chat>(`${this.baseUrl}/${chatId}`);
    }

    sendMessage(chatId: string, model: SendMessageRequest): Observable<Chat> {
        return this.http.post<Chat>(`${this.baseUrl}/${chatId}`, model);
    }
}