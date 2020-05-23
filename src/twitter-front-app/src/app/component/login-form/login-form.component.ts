import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from 'src/app/dto/user';
import { LoginResponse } from 'src/app/dto/LoginResponse';
import { AuthService } from 'src/app/service/auth.service';
import { ConnectedUser } from 'src/app/model/connected-user';
import { ErrorMessage } from 'src/app/model/error-message';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  error: ErrorMessage;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // LoginForm builder
    this.loginForm = this.fb.group({
      pseudo: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.submitted = true;

      const user: UserDto = {
        pseudo: this.loginForm.value.pseudo,
        password: this.loginForm.value.password
      };

      // login le user
      this.authService.loginUser(user).subscribe((loginResponse: LoginResponse) => {
        this.submitted = false;
        this.error = null;
        // set token in local storage
        this.authService.setUserToken(loginResponse.token);

        // set connectedUser state
        const connectedUser: ConnectedUser = {
          _id: loginResponse.user.id,
          pseudo: user.pseudo
        };
        this.authService.connectedUser.next(connectedUser);

        // redirection vers la page home
        // **TO DO */

      }, (error) => {
        this.submitted = false;
        this.error = error.error;
        console.log(error);
      });

    }
  }

}
