import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserDto } from 'src/app/dto/user';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // LoginForm builder
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });

  }

  onSubmit() {
    if(this.loginForm.valid) {
      this.submitted = true;

      const user: UserDto = { 
        username: this.loginForm.value.username,
        password: this.loginForm.value.password
      };

      console.log(user);
      
    }
  }

}
