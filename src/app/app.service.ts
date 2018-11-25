import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  public toolbarBack = new Subject();
  public toolbarDone = new Subject();
  public toolbarBackTriggered = new Subject();
  public toolbarDoneTriggered = new Subject();

  private apiBase = `${document.location.protocol}//${window.location.hostname}:8000/TeachQ/api`;

  constructor(private http: HttpClient) { }

  registerUser(user) {
    console.log(user);
    return this.http.post<any>(`${this.apiBase}/create_user`, user);
  }

  saveQuestionSet(information, questionSet, id?) {
    console.log(information);
    console.log(questionSet);
    return this.http.post<any>(`${this.apiBase}/save_question_set/${sessionStorage.getItem('uid')}/${id ? id : ''}`,
      { information: information, question_set: questionSet });
  }

  getQuestionSets() {
    return this.http.get<any>(`${this.apiBase}/get_question_sets/${sessionStorage.getItem('uid')}`);
  }

  getQuestionSet(id) {
    return this.http.get<any>(`${this.apiBase}/get_question_set/${sessionStorage.getItem('uid')}/${id}`);
  }

  deleteQuestionSet(id) {
    return this.http.get<any>(`${this.apiBase}/delete_question_set/${sessionStorage.getItem('uid')}/${id}`);
  }
}
