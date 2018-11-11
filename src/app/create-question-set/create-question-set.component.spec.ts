import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuestionSetComponent } from './create-question-set.component';

describe('CreateQuestionSetComponent', () => {
  let component: CreateQuestionSetComponent;
  let fixture: ComponentFixture<CreateQuestionSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuestionSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuestionSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
