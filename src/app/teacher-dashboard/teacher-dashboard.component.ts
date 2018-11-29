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

  present(id) {
    this.appService.presentQuestionSet(id).subscribe(data => {
      console.log(data);
      this.router.navigate([`/questions/${id}/present/${data.id}`]);
    });
  }

  delete(id) {
    this.appService.deleteQuestionSet(id).subscribe(() => {
      this.initializeQuestionSets();
    });
  }

}
