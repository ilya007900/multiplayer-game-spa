import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PlayerService {
    setPlayer(nickname: string): void {
        sessionStorage.setItem('nickname', nickname);
    }

    getPlayer(): string {
        return sessionStorage.getItem('nickname') ?? '';
    }
}