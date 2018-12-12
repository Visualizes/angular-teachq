import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../app.service';
import {AngularFireDatabase} from '@angular/fire/database';
import {ChartComponent} from 'angular2-chartjs';
import {MatDialog} from '@angular/material';
import {QrCodeDialogComponent} from '../qr-code-dialog/qr-code-dialog.component';

@Component({
  selector: 'app-questions-presentation',
  templateUrl: './questions-presentation.component.html',
  styleUrls: ['./questions-presentation.component.scss']
})
export class QuestionsPresentationComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(ChartComponent) chart: ChartComponent;
  @ViewChild('questionCard') questionCard: ElementRef;
  public questions = [];
  public questionIndex = 0;
  public loading = true;
  public subscriptions = [];
  public showAnswer = false;
  public numberAnswered = 0;
  public url = '';
  public colors = [
    '#F44336',
    '#9C27B0',
    '#2196F3',
    '#4CAF50',
    '#FFEB3B',
    '#FF9800',
  ];

  type = 'pie';

  data = {
    labels: ['A', 'B', 'C', 'D'],
    datasets: [
      {
        data: [],
        backgroundColor: [],
      }
    ]
  };

  options = {
    responsive: true
  };

  constructor(private appService: AppService,
              private db: AngularFireDatabase,
              private route: ActivatedRoute,
              private router: Router,
              private cdr: ChangeDetectorRef,
              private dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.updateGraphColors();
  }

  ngOnInit() {
    const routeParams = this.route.snapshot.params;
    this.url = `${document.location.protocol}//${window.location.hostname}`;
    if (this.url.includes('localhost')) {
      this.url += ':4200';
    }
    this.url += `/TeachQ/clicker?id=${routeParams.presentationID}`;
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
      this.router.navigate(['/TeachQ/dashboard']);
    }));

    const path = `/users/${sessionStorage.getItem('uid')}/questionSets/${routeParams.id}/presentations/${routeParams.presentationID}`;
    this.db.database.ref(path).on('value', data => {
      if (data.val() == null) {
        return;
      }
      const answers = data.val()[data.val()['currentQuestion']];
      let numberAnswered = 0;
      this.data.datasets[0].data = [];
      if (answers != null) {
        for (const choice of this.data.labels) {
          if (answers.hasOwnProperty(choice)) {
            this.data.datasets[0].data.push(answers[choice]);
            numberAnswered += answers[choice];
          } else {
            this.data.datasets[0].data.push(null);
          }
        }
      }
      if (this.chart != null) {
        this.chart.chart.update();
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
    } else {
      console.log(this.questionCard.nativeElement.offsetHeight)
    }
    this.appService.updateCurrentQuestion(
      this.route.snapshot.params.id,
      this.route.snapshot.params.presentationID,
      `q${this.questionIndex + (this.showAnswer ? 1 : 2)}`,
      this.showAnswer ? this.questions[this.questionIndex].answer : null).subscribe(() => {
        if (!this.showAnswer) {
          this.loading = false;
          this.questionIndex++;
          this.updateGraphColors();
        }
    });
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
      this.updateGraphColors();
    });
  }

  refresh() {
    this.appService.refreshQuestion(
      this.route.snapshot.params.id,
      this.route.snapshot.params.presentationID,
      `q${this.questionIndex + 1}`).subscribe(() => {
        this.showAnswer = false;
    });
  }

  updateGraphColors() {
    const colors = JSON.parse(JSON.stringify(this.colors));
    this.data.datasets[0].backgroundColor = [];
    for (let i = 0; i < 4; i++) {
      const index = Math.floor(Math.random() * colors.length);
      this.data.datasets[0].backgroundColor.push(colors[index]);
      colors.splice(index, 1);
    }
    if (this.chart != null) {
      this.chart.chart.update();
    }
  }

  magnify() {
    this.dialog.open(QrCodeDialogComponent, {
      data: {url: this.url}
    });
  }
}
