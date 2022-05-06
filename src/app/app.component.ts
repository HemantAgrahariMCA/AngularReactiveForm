import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from '../_helper/must-match.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'reactive-form-advance';
  registerForm: FormGroup;
  Title: string = '';
  FirstName: string = '';
  LastName: string = '';
  DOB: any = '';
  Password: any = '';
  ConfirmPAssword: any = '';
  address: any;
  SelectQualification: any;
  AcceptTerms: boolean;
  Gender: any;
  submitted = false;
  qualification: [
    'High School',
    'Intermediate',
    'Graduations',
    'Post Graduation'
  ];

  constructor(private formbuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formbuilder.group(
      {
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        gender: ['', Validators.required],
        address: ['', Validators.required],
        selectQualification: ['', Validators.required],
        dob: [
          '',
          [
            Validators.required,
            Validators.pattern(
              /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
            ),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  chooseGender(val: any) {
    this.Gender = val;
  }

  selectQualification(val: any) {
    this.SelectQualification=val.target.value
    console.log(this.SelectQualification);
    // console.log(e.value);
    // this.SelectQualification.setValue(e.target.value, { onlySelf: true });
  }

  // convenience getter for easy access to form field
  get f() {
    return this.registerForm.controls;
  }

  onSubmit(val: any) {
    this.submitted = true;
    this.Title = val.controls.title.value;
    this.FirstName = val.controls.firstName.value;
    this.LastName = val.controls.lastName.value;
    this.Password = val.controls.password.value;
    this.ConfirmPAssword = val.controls.confirmPassword.value;
    this.address = val.controls.address.value;
    this.AcceptTerms = val.controls.acceptTerms.value;
  
    console.log(this.Title);
    console.log('Clicked');

    //  stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    // display form value on success
    alert('Success!!!!\n\n' + JSON.stringify(this.registerForm.value, null, 4));
  }
  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
