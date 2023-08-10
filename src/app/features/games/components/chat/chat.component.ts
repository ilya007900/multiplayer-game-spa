import { Component, Input, OnInit } from '@angular/core';
import { Chat } from '../../interfaces/chat';
import { ChatsService } from '../../services/chats.service';
import { PlayerService } from 'src/app/features/shared/services/player.services';
import { Message } from '../../interfaces/message';
import { ChatsEventsService } from '../../services/chats-events.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @Input() chatId: string = '';

  chat: Chat | null = null;

  message: string = '';

  constructor(
    private readonly chatsService: ChatsService,
    private readonly chatsEventsService: ChatsEventsService,
    private readonly playerService: PlayerService) { }

  async ngOnInit(): Promise<void> {
    await this.chatsEventsService.listenNewMessages(this.chatId, (data: Message) => {
      this.chat!.messages.push(data);
    });

    this.chatsService.getById(this.chatId).subscribe(result => {
      this.chat = result;
    })
  }

  sendDisabled(): boolean {
    return !this.message.length;
  }

  onSendClick(): void {
    this.chatsService.sendMessage(this.chat!.id, {
      from: this.playerService.getPlayer(),
      text: this.message
    }).subscribe(result => {
      this.message = '';
    });
  }
}
