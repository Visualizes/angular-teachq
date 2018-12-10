import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerFormGroup: FormGroup;
  public passwordError = false;

  constructor(private _fb: FormBuilder,
              private appService: AppService,
              private router: Router) { }

  ngOnInit() {
    this.registerFormGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      display_name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  register() {
    const user = this.registerFormGroup.value;
    if (user.password !== user.confirm_password) {
      this.passwordError = true;
      return;
    }
    this.passwordError = false;
    if (this.registerFormGroup.valid) {
      this.appService.registerUser(user).subscribe(() => {
        this.router.navigate(['/TeachQ/login']);
      });
    }
  }

}
