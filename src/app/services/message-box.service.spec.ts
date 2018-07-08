import { TestBed, inject } from '@angular/core/testing';

import { MessageBoxService } from './message-box.service';

describe('MessageBoxService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageBoxService]
    });
  });

  it('should be created', inject([MessageBoxService], (service: MessageBoxService) => {
    expect(service).toBeTruthy();
  }));
});
