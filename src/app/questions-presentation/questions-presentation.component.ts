import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../app.service';
import {AngularFireDatabase} from '@angular/fire/database';

@Component({
  selector: 'app-questions-presentation',
  templateUrl: './questions-presentation.component.html',
  styleUrls: ['./questions-presentation.component.scss']
})
export class QuestionsPresentationComponent implements OnInit, OnDestroy {

  public questions = [];
  public questionIndex = 0;
  public loading = true;
  public subscriptions = [];
  public showAnswer = false;
  public numberAnswered = 0;

  constructor(private appService: AppService,
              private db: AngularFireDatabase,
              private route: ActivatedRoute,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.params;
    this.appService.updateCurrentQuestion(
      routeParams.id,
      routeParams.presentationID,
      `q1`).subscribe();

    this.appService.getQuestionSet(routeParams.id).subscribe(questionSet => {
      console.log(questionSet);
      this.questions = questionSet.questions;
      this.loading = false;
    });
    this.appService.toolbarBack.next(true);

    this.subscriptions.push(this.appService.toolbarBackTriggered.asObservable().subscribe(() => {
      this.router.navigate(['/dashboard']);
    }));

    const path = `/users/${sessionStorage.getItem('uid')}/questionSets/${routeParams.id}/presentations/${routeParams.presentationID}`;
    this.db.database.ref(path).on('value', data => {
      const answers = data.val()[data.val()['currentQuestion']];
      let numberAnswered = 0;
      if (answers != null) {
        for (const choice in answers) {
          if (answers.hasOwnProperty(choice)) {
            numberAnswered += answers[choice];
          }
        }
      }
      this.numberAnswered = numberAnswered;
      this.cdr.detectChanges();
      console.log(this.numberAnswered);
    });
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.appService.toolbarBack.next(false);
  }

  next() {
    this.showAnswer = !this.showAnswer;
    if (!this.showAnswer) {
      this.loading = true;
      this.appService.updateCurrentQuestion(
        this.route.snapshot.params.id,
        this.route.snapshot.params.presentationID,
        `q${this.questionIndex + 2}`).subscribe(() => {
        this.loading = false;
        this.questionIndex++;
      });
    }
  }

  previous() {
    this.showAnswer = false;
    this.loading = true;
    this.appService.updateCurrentQuestion(
      this.route.snapshot.params.id,
      this.route.snapshot.params.presentationID,
      `q${this.questionIndex}`).subscribe(() => {
      this.loading = false;
      this.questionIndex--;
    });
  }

  refresh() {
    this.appService.refreshQuestion(
      this.route.snapshot.params.id,
      this.route.snapshot.params.presentationID,
      `q${this.questionIndex + 1}`).subscribe();
  }
}
