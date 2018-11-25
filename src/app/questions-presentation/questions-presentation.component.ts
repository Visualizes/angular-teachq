import {Component, OnDestroy, OnInit} from '@angular/core';
import {Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AppService} from '../app.service';

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

  constructor(private appService: AppService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.appService.getQuestionSet(this.route.snapshot.params.id).subscribe(questionSet => {
      console.log(questionSet);
      this.questions = questionSet.questions;
      this.loading = false;
    });
    this.appService.toolbarBack.next(true);

    this.subscriptions.push(this.appService.toolbarBackTriggered.asObservable().subscribe(() => {
      this.router.navigate(['/dashboard']);
    }));
  }

  ngOnDestroy() {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
    this.appService.toolbarBack.next(false);
  }

  next() {
    this.questionIndex++;
  }

  previous() {
    this.questionIndex--;
  }
}
