import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppService} from '../app.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-create-question-set',
  templateUrl: './create-question-set.component.html',
  styleUrls: ['./create-question-set.component.scss']
})
export class CreateQuestionSetComponent implements OnInit, OnDestroy {

  public questionsInfo: FormGroup;
  public questions = [];
  public loading = true;
  public questionSetId = null;
  public subscriptions = [];

  constructor(private _fb: FormBuilder,
              private appService: AppService,
              private router: Router,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if (id !== 'create') {
      this.questionSetId = id;
      this.appService.getQuestionSet(id).subscribe(questionSet => {
        this.questionsInfo = this._fb.group({
          title: [questionSet.title, Validators.required],
          description: [questionSet.description, Validators.required]
        });
        for (const question of questionSet.questions) {
          this.addQuestion(question);
        }
        this.loading = false;
      });
    } else {
      this.questionsInfo = this._fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required]
      });
      this.addQuestion();
      this.loading = false;
    }

    this.appService.toolbarBack.next(true);
    this.appService.toolbarDone.next(true);

    this.subscriptions.push(this.appService.toolbarBackTriggered.asObservable().subscribe(() => {
      this.router.navigate(['/TeachQ/dashboard']);
    }));

    this.subscriptions.push(this.appService.toolbarDoneTriggered.asObservable().subscribe(() => {
      let valid = true;
      if (this.questionsInfo.invalid) {
        this.markFormGroupTouched(this.questionsInfo);
        valid = false;
      }

      for (const question of this.questions) {
        if (question.invalid) {
          this.markFormGroupTouched(question);
          valid = false;
        }
      }

      if (valid) {
        this.loading = true;
        this.appService.saveQuestionSet(this.questionsInfo.value, this.questions.map(a => a.value), this.questionSetId).subscribe(() => {
          this.router.navigate(['/TeachQ/dashboard']);
        });
      } else {
        this.snackBar.open('Please fill out all forms', 'Okay', {
          duration: 2000
        });
      }
    }));
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
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.appService.toolbarBack.next(false);
    this.appService.toolbarDone.next(false);
  }

  addQuestion(questionSet?) {
    this.questions.push(this._fb.group({
      question: [questionSet ? questionSet.question : '', Validators.required],
      answer: [questionSet ? questionSet.answer : 'A', Validators.required],
      choiceA: [questionSet ? questionSet.choiceA : '', Validators.required],
      choiceB: [questionSet ? questionSet.choiceB : '', Validators.required],
      choiceC: [questionSet ? questionSet.choiceC : '', Validators.required],
      choiceD: [questionSet ? questionSet.choiceD : '', Validators.required]
    }));
  }

}
