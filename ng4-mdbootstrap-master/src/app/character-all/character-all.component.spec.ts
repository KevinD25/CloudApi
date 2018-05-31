import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterAllComponent } from './character-all.component';

describe('CharacterAllComponent', () => {
  let component: CharacterAllComponent;
  let fixture: ComponentFixture<CharacterAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
