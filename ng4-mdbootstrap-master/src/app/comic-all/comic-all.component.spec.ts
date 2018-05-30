import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComicAllComponent } from './comic-all.component';

describe('ComicAllComponent', () => {
  let component: ComicAllComponent;
  let fixture: ComponentFixture<ComicAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComicAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
