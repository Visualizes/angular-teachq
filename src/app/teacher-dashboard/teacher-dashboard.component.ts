import { Component, OnInit } from '@angular/core';
import {AppService} from '../app.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

  public questionSets = [];
  public loading = true;

  constructor(
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initializeQuestionSets();
  }

  private initializeQuestionSets() {
    this.appService.getQuestionSets().subscribe(questionSets => {
      this.questionSets = [];
      for (const id in questionSets) {
        if (questionSets.hasOwnProperty(id)) {
          this.questionSets.push(Object.assign({ id: id }, questionSets[id]));
        }
      }
      this.loading = false;
    });
  }

  navigateTo(id) {
    this.router.navigate([`/dashboard/questions/${id}`]);
  }

  delete(id) {
    this.appService.deleteQuestionSet(id).subscribe(() => {
      this.initializeQuestionSets();
    });
  }

}
