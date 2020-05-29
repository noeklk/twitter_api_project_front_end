import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TwitterService } from 'src/app/service/twitter.service';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss']
})
export class UpdateStatusComponent implements OnInit {

  statusForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private twitterService: TwitterService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.statusForm = this.fb.group({
      status: ['', [Validators.required, Validators.maxLength(280)]]
    });
  }

  updateStatus() {
    this.loading = true;
    const status = this.statusForm.value.status;

    this.twitterService.updateStatus(status).pipe(first()).subscribe(res => {
      this._snackBar.open('Statut mis à jour avec succès', 'Ok', {
        duration: 3000
      });
    }, err => {
      this._snackBar.open('Echec de la mise à jour de votre statut', 'Ok', {
        duration: 3000
      });
      console.log(err);
    }, () => {
      this.loading = false;
    });
  }
}
