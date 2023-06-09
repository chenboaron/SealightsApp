import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {

  form: FormGroup;
  countryName: string;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: { countryName: string },
    public dialogRef: MatDialogRef<DialogComponent>
  ) {
    this.form = this.fb.group({
      city: ['', Validators.required]
    });
    this.countryName = data.countryName;
  }

  submit(form: NgForm) {
    this.dialogRef.close({
      clicked: 'submit',
      form: form,
    });
  }


}
