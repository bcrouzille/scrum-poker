import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRoomComponent } from './detail-room.component';

describe('DetailRoomComponent', () => {
  let component: DetailRoomComponent;
  let fixture: ComponentFixture<DetailRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
