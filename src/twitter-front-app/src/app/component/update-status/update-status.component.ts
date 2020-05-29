import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TwitterService } from 'src/app/service/twitter.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-update-status',
  templateUrl: './update-status.component.html',
  styleUrls: ['./update-status.component.scss']
})
export class UpdateStatusComponent implements OnInit {

  statusForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private twitterService: TwitterService) { }

  ngOnInit(): void {

    this.statusForm = this.fb.group({
      status: ['', Validators.required]
    });

  }

  updateStatus() {
    this.submitted = true;
    const status = this.statusForm.value.status;
    if (!status) {
      this.submitted = false;
      console.log("c'est vide mon bro");
      return;
    }
    this.twitterService.updateStatus(status).pipe(first()).subscribe(res => {
      console.log("status updated succesfully");
      this.submitted = false;
    }, err => {
      this.submitted = false;
      console.log(err);
    });

  }

}
