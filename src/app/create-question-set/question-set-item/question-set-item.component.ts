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
  @Output() questionCreated = new EventEmitter();
  public formGroup: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this._fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
      choiceA: ['', Validators.required],
      choiceB: ['', Validators.required],
      choiceC: ['', Validators.required],
      choiceD: ['', Validators.required]
    });
    this.questionCreated.emit(this.formGroup);
  }

}
