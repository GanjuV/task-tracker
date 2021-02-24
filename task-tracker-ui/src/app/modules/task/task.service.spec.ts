import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CoreModule } from '@core';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let taskService: TaskService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoreModule, HttpClientTestingModule],
      providers: [TaskService],
    });

    taskService = TestBed.inject(TaskService);
    httpMock = TestBed.inject(HttpTestingController as Type<HttpTestingController>);
  });

  afterEach(() => {
    httpMock.verify();
  });

  describe('getAllTasks', () => {
    it('should return a random Chuck Norris quote', () => {
      // Arrange
      const mockData = [
        {
          title: 'Task 1',
          description: 'Complete UI of tool',
          dueDate: '2021-02-25T18:30:00.000Z',
          priority: 'Low',
          status: 'Inprogress',
          id: 1,
        },
      ];

      // Act
      const subscription = taskService.getAllTasks();

      // Assert
      subscription.subscribe((data) => {
        expect(data).toEqual(mockData);
      });
      httpMock.expectOne({}).flush(mockData);
    });
  });
});
