import { TestBed, inject } from '@angular/core/testing';

import { WordParserService } from './word-parser.service';

describe('WordParserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordParserService]
    });
  });

  it('should be created', inject([WordParserService], (service: WordParserService) => {
    expect(service).toBeTruthy();
  }));
});
