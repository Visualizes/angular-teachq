import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsPresentationComponent } from './questions-presentation.component';

describe('QuestionsPresentationComponent', () => {
  let component: QuestionsPresentationComponent;
  let fixture: ComponentFixture<QuestionsPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsPresentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
