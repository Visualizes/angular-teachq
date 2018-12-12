import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  public loginFormGroup: FormGroup;
  public error = false;

  constructor(
    private _fb: FormBuilder,
    private auth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginFormGroup = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false, null]
    });
  }

  logIn() {
    if (this.loginFormGroup.valid) {
      this.auth.auth.signInWithEmailAndPassword(this.loginFormGroup.value.email, this.loginFormGroup.value.password).then(data => {
        this.error = false;
        sessionStorage.setItem('uid', data.user.uid);
        sessionStorage.setItem('name', data.user.displayName);
        this.router.navigate(['/TeachQ/dashboard']);
      }).catch(err => {
        this.error = true;
      });
    }
  }

}
