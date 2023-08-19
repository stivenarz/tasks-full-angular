import { TestBed } from '@angular/core/testing';

import { TasksConectionService } from './tasks-conection.service';

describe('TasksConectionService', () => {
  let service: TasksConectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TasksConectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
