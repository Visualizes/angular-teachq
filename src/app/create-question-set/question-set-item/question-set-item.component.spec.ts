import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionSetItemComponent } from './question-set-item.component';

describe('QuestionSetItemComponent', () => {
  let component: QuestionSetItemComponent;
  let fixture: ComponentFixture<QuestionSetItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionSetItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionSetItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
