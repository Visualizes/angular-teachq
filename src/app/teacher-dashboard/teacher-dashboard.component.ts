import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

  public questionSets = [];
  public loading = true;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.appService.getQuestionSets().subscribe(questionSets => {
      for (const id in questionSets) {
        if (questionSets.hasOwnProperty(id)) {
          this.questionSets.push(Object.assign({ id: id }, questionSets[id]));
        }
      }
      this.loading = false;
    });
  }

}
