import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateIntegerPositive } from '../shared/validators/positive.validator';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      value: ['', Validators.required, validateIntegerPositive]
    });
  }

  isErrorVisible(field: string, error: string) {
    return this.form.controls[field].dirty && this.form.controls[field].errors && this.form.controls[field].errors[error];
  }

  reset() {
    this.form.reset();
  }

  get valid() {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }
}
