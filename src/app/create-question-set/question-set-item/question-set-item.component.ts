import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-question-set-item',
  templateUrl: './question-set-item.component.html',
  styleUrls: ['./question-set-item.component.scss']
})
export class QuestionSetItemComponent implements OnInit {

  @Input() questionNumber;
  @Input() questionFormGroup;
  public questionLength = 350;

  constructor() { }

  ngOnInit() {
  }

}
