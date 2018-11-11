import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-question-set',
  templateUrl: './create-question-set.component.html',
  styleUrls: ['./create-question-set.component.scss']
})
export class CreateQuestionSetComponent implements OnInit {

  public questions = [];

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.addQuestion();
  }

  addQuestion() {
    this.questions.push(this._fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      choiceA: ['', Validators.required],
      choiceB: ['', Validators.required],
      choiceC: ['', Validators.required],
      choiceD: ['', Validators.required]
    }));
  }

}
