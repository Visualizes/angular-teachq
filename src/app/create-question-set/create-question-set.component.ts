import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../app.service';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-create-question-set',
  templateUrl: './create-question-set.component.html',
  styleUrls: ['./create-question-set.component.scss']
})
export class CreateQuestionSetComponent implements OnInit, OnDestroy {

  public questions = [];

  constructor(private _fb: FormBuilder,
              private appService: AppService,
              private router: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.addQuestion();
    this.appService.toolbarBack.next(true);
    this.appService.toolbarDone.next(true);

    this.appService.toolbarBackTriggered.asObservable().subscribe(() => {
      this.router.navigate(['/dashboard']);
    });

    this.appService.toolbarDoneTriggered.asObservable().subscribe(() => {
      let invalid = false;
      for (const question of this.questions) {
        if (question.invalid) {
          this.snackBar.open('Please fill out all forms', 'Okay', {
            duration: 2000
          });
          this.markFormGroupTouched(question);
          invalid = true;
        }
      }
    });
  }

  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  ngOnDestroy() {
    this.appService.toolbarBack.next(false);
    this.appService.toolbarDone.next(false);
  }

  addQuestion() {
    this.questions.push(this._fb.group({
      question: ['', Validators.required],
      answer: ['A', Validators.required],
      choiceA: ['', Validators.required],
      choiceB: ['', Validators.required],
      choiceC: ['', Validators.required],
      choiceD: ['', Validators.required]
    }));
  }

}
