import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameRoomWelcomeComponent } from './game-room-welcome.component';

describe('GameRoomWelcomeComponent', () => {
  let component: GameRoomWelcomeComponent;
  let fixture: ComponentFixture<GameRoomWelcomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameRoomWelcomeComponent]
    });
    fixture = TestBed.createComponent(GameRoomWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
