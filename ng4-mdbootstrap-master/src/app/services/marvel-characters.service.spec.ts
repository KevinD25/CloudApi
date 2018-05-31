import { TestBed, inject } from '@angular/core/testing';

import { MarvelCharactersService } from './marvel-characters.service';

describe('MarvelCharactersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MarvelCharactersService]
    });
  });

  it('should be created', inject([MarvelCharactersService], (service: MarvelCharactersService) => {
    expect(service).toBeTruthy();
  }));
});
