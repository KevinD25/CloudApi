import { TestBed, inject } from '@angular/core/testing';

import { MarvelMoviesService } from './marvel-movies.service';

describe('MarvelMoviesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarvelMoviesService]
    });
  });

  it('should be created', inject([MarvelMoviesService], (service: MarvelMoviesService) => {
    expect(service).toBeTruthy();
  }));
});
