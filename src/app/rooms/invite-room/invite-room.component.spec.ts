import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteRoomComponent } from './invite-room.component';

describe('InviteRoomComponent', () => {
  let component: InviteRoomComponent;
  let fixture: ComponentFixture<InviteRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InviteRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
