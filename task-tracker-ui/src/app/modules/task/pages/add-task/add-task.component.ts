import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Logger } from '@app/@core';
import { DialogService, DialogSubscribeService } from '@app/@shared';
import { AddTaskFormService } from './add-task-form.service';
import { TaskService } from '../../task.service';
import { TaskSubscribeService } from '../../task-subscribe.service';

const log = new Logger('AddTaskComponent');

interface ISelectBox {
  label: string;
  value: string;
}

@Component({
  selector: 'app-add-task-home',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit, OnDestroy {
  taskForm: FormGroup;
  minDate = new Date();
  private _submitFormSubscription: Subscription;
  priorities: ISelectBox[] = [
    { label: 'Low', value: 'Low' },
    { label: 'Medium', value: 'Medium' },
    { label: 'High', value: 'High' },
  ];
  constructor(
    private _TaskService: TaskService,
    private _AddTaskFormService: AddTaskFormService,
    private _dialogSubscribeService: DialogSubscribeService,
    private _taskSubscribeService: TaskSubscribeService,
    private _dialogService: DialogService,
    private _snackBar: MatSnackBar
  ) {
    this.taskForm = this._AddTaskFormService.form;

    this._submitFormSubscription = this._dialogSubscribeService.subscribeFormSubmit().subscribe((message) => {
      this.addTask(this.taskForm.value);
    });
  }
  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  ngOnInit() {}

  addTask(data: any) {
    if (this.taskForm.invalid) {
      this._AddTaskFormService.validateAllFormFields(this.taskForm);
      return;
    }
    log.info(data);
    this._TaskService
      .addTask(data)
      .pipe(
        finalize(() => {
          this.taskForm.markAsPristine();
        })
      )
      .subscribe(
        (response) => {
          this._dialogService.closeDialog();
          this._taskSubscribeService.dataFetch();
          this.openSnackBar('Data added successfully', 'Close');
        },
        (error) => {
          const _errorMessage = error.error && error.error.message ? error.error.message : error.message;
          log.error(_errorMessage);
        }
      );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnDestroy() {
    this.taskForm.reset();
    this._submitFormSubscription.unsubscribe();
  }
}
