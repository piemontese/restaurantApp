import { TestBed, inject } from '@angular/core/testing';

import { DetailDialogService } from './detail-dialog.service';

describe('DetailDialogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailDialogService]
    });
  });

  it('should be created', inject([DetailDialogService], (service: DetailDialogService) => {
    expect(service).toBeTruthy();
  }));
});
