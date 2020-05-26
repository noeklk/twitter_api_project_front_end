import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from 'src/app/dto/user';
import { LoginResponseModel } from 'src/app/model/login-response';
import { AuthService } from 'src/app/service/auth.service';
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
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private myRoute: Router
  ) { }

  ngOnInit(): void {
    // LoginForm builder
    this.loginForm = this.fb.group({
      pseudo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]]
    });

  }

  async Login() {
    if (!this.loginForm.valid) {
      return;
    }

    this.errorMessage = null;
    this.submitted = true;

    const user: UserDto = {
      pseudo: this.loginForm.value.pseudo,
      password: this.loginForm.value.password
    };

    // login le user
    await this.authService.LoginUser(user).then((loginResponse: HttpResponse<LoginResponseModel>) => {
      // set token and userId in local storage
      this.authService.SetUserToken(loginResponse.body.token);
      this.authService.SetUserId(loginResponse.body.user.id);

      // On récupère ensuite l'utilisateur avec l'id stocker dans la session dans home

      this.myRoute.navigate(['home']);

    }).catch((e: HttpErrorResponse) => {
      this.errorMessage = e.error.message ? e.error.message : 'Erreur de connexion avec l\'Api';
    }).finally(() => {
      this.submitted = false;
    });

  }
}
