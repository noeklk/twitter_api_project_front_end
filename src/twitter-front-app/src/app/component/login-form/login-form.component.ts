import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from 'src/app/dto/user';
import { LoginService } from 'src/app/service/login.service';
import { LoginResponseModel } from 'src/app/model/login-response';
import { AuthService } from 'src/app/service/auth.service';
import { ErrorMessageModel } from 'src/app/model/error-message';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error: ErrorMessageModel;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private myRoute: Router
  ) { }

  ngOnInit(): void {
    // LoginForm builder
    this.loginForm = this.fb.group({
      pseudo: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

  }

  async Login() {
    if (this.loginForm.valid) {
      this.submitted = true;

      const user: UserDto = {
        pseudo: this.loginForm.value.pseudo,
        password: this.loginForm.value.password
      };

      // login le user
      await this.loginService.LoginUser(user).then((loginResponse: HttpResponse<LoginResponseModel>) => {
        this.submitted = false;
        this.error = null;

        // set token in local storage
        this.authService.SetUserToken(loginResponse.body.token);
        this.authService.SetUserId(loginResponse.body.user.id);

        // On récupère ensuite l'utilisateur avec l'id stocker dans la session dans home

        this.myRoute.navigate(['home']);

      }).catch((e: HttpErrorResponse) => {
        this.submitted = false;
        alert(e.error.message);
      });
    }
  }
}
