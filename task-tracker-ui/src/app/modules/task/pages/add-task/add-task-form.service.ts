import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Injectable()
export class AddTaskFormService {
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [null, Validators.required],
      description: [null, Validators.maxLength(30)],
      dueDate: [null], //,Validators.required
      priority: [null, Validators.required],
      status: ['Inprogress'],
    });
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const _control = formGroup.get(field);
      if (_control instanceof FormControl) {
        _control.markAsTouched({ onlySelf: true });
      } else if (_control instanceof FormGroup) {
        this.validateAllFormFields(_control);
      }
    });
  }
}
