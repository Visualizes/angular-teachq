import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {ActivatedRoute} from '@angular/router';
import Reference = firebase.database.Reference;

@Component({
  selector: 'app-clicker',
  templateUrl: './clicker.component.html',
  styleUrls: ['./clicker.component.scss']
})
export class ClickerComponent implements OnInit {

  public choices = ['A', 'B', 'C', 'D'];
  private database: Reference;
  private currentQuestion;
  private answered = false;

  constructor(
    private db: AngularFireDatabase,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.params;
    const path = `/users/${routeParams.userID}/questionSets/${routeParams.questionSetID}/presentations/${routeParams.presentationID}`;
    this.database = this.db.database.ref(path);
    this.database.child('currentQuestion').on('value', currentQuestion => {
      this.answered = false;
      this.currentQuestion = currentQuestion.val();
    });
  }

  answer(choice) {
    if (!this.answered) {
      this.database.child(this.currentQuestion).child(choice).transaction(count => count ? ++count : 1);
    }
    this.answered = true;
  }

}
