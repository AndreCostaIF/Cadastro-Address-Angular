import { TestBed } from '@angular/core/testing';

import { DeletarEnderecoService } from './deletar-endereco.service';

describe('DeletarEnderecoService', () => {
  let service: DeletarEnderecoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletarEnderecoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
