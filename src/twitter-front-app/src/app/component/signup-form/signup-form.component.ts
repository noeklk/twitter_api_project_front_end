import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from 'src/app/dto/user';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { MessageModel } from 'src/app/model/message';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class SignupFormComponent implements OnInit {

  signupForm: FormGroup;
  submitted = false;
  errorMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private myRoute: Router
  ) { }

  ngOnInit(): void {
    // SignupForm builder
    this.signupForm = this.fb.group({
      pseudo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40)]]
    });

  }

  async Signup() {
    if (!this.signupForm.valid) {
      return;
    }

    this.errorMessage = null;
    this.submitted = true;

    const user: UserDto = {
      pseudo: this.signupForm.value.pseudo,
      password: this.signupForm.value.password
    };

    // signup le user
    await this.authService.SignupUser(user).then((signupResponse: HttpResponse<MessageModel>) => {

      alert('Inscription effectué avec succès, veuillez maintenant vous connecter');
      this.myRoute.navigate(['login']);

    }).catch((e: HttpErrorResponse) => {
      this.errorMessage = e.error.message ? e.error.message : 'Erreur de connexion avec l\'Api';
    }).finally(() => {
      this.submitted = false;
    });
  }
}

