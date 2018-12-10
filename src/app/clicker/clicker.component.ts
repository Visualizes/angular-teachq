import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute} from '@angular/router';
import Reference = firebase.database.Reference;
import {AppService} from '../app.service';

@Component({
  selector: 'app-clicker',
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.scss']
})
export class ClickerComponent implements OnInit {

  public choices = ['A', 'B', 'C', 'D'];
  private database: Reference;
  private currentQuestion;
  public correctAnswer = null;
  public showAnswer = false;
  public answered = false;
  public _choice = '';

  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute,
    private appService: AppService
  ) { }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    this.appService.getPresentationData(queryParams.id).subscribe(data => {
      const path = `/users/${data.userID}/questionSets/${data.questionSetID}/presentations/${queryParams.id}`;
      this.database = this.db.database.ref(path);
      this.database.child('currentQuestion').on('value', currentQuestion => {
        this.answered = false;
        this._choice = '';
        this.currentQuestion = currentQuestion.val();
      });
      this.database.child('answer').on('value', answer => {
        this.showAnswer = answer.val() != null;
        if (!this.showAnswer) {
          this._choice = '';
          this.answered = false;
        }
        this.correctAnswer = answer.val();
      });
    });
  }

  answer(choice) {
    if (!this.answered) {
      this.database.child(this.currentQuestion).child(choice).transaction(count => count ? ++count : 1);
      this._choice = choice;
    }
    this.answered = true;
  }

}
