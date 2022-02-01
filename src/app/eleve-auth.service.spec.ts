import { TestBed } from '@angular/core/testing';

import { EleveAuthService } from './eleve-auth.service';

describe('EleveAuthService', () => {
  let service: EleveAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EleveAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
