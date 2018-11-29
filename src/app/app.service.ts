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

  presentQuestionSet(id) {
    return this.http.get<any>(`${this.apiBase}/present_question_set/${sessionStorage.getItem('uid')}/${id}`);
  }

  updateCurrentQuestion(questionSetID, presentationID, currentQuestion) {
    const url = `${this.apiBase}/update_current_question/${sessionStorage.getItem('uid')}/${questionSetID}/${presentationID}`;
    return this.http.post<any>(url, { currentQuestion: currentQuestion });
  }

  refreshQuestion(questionSetID, presentationID, currentQuestion) {
    const url = `${this.apiBase}/refresh_question/${sessionStorage.getItem('uid')}/${questionSetID}/${presentationID}`;
    return this.http.post<any>(url, { currentQuestion: currentQuestion });
  }
}
