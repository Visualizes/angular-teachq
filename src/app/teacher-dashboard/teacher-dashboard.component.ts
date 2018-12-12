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
          const questionSet = JSON.parse(JSON.stringify(questionSets[id]));
          const presentations = [];
          for (const presentationID in questionSet.presentations) {
            if (questionSet.presentations.hasOwnProperty(presentationID)) {
              presentations.push(Object.assign({ id: presentationID }, questionSet.presentations[presentationID]));
            }
          }
          questionSet.presentations = presentations;
          this.questionSets.push(Object.assign({ id: id }, questionSet));
        }
      }
      console.log(this.questionSets);
      this.loading = false;
    });
  }

  present(id) {
    this.appService.presentQuestionSet(id).subscribe(data => {
      console.log(data);
      this.router.navigate([`/TeachQ/dashboard/questions/${id}/present/${data.id}`]);
    });
  }

  presentHistory(questionSetID, presentationID) {
    this.router.navigate([`/TeachQ/dashboard/questions/${questionSetID}/present/${presentationID}`], { queryParams: { h: 1 }});
  }

  delete(id) {
    this.appService.deleteQuestionSet(id).subscribe(() => {
      this.initializeQuestionSets();
    });
  }

}
