import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CountService } from '../../services/count.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private countService: CountService
  ) {
    this.form = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  ngOnInit(): void {}

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password).subscribe((response) => {
        const { accessToken: token } = response;
        this.countService.setValueToLocalStorage('token', token);
        this.countService.setHttpParams();
        this.router.navigate(['/dashboard']);
      });
    }
  }
}
