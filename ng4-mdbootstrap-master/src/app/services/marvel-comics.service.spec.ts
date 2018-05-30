import { TestBed, inject } from '@angular/core/testing';

import { MarvelComicsService } from './marvel-comics.service';

describe('MarvelComicsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarvelComicsService]
    });
  });

  it('should be created', inject([MarvelComicsService], (service: MarvelComicsService) => {
    expect(service).toBeTruthy();
  }));
});
