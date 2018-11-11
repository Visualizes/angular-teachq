import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Routing} from './app.routing';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatRadioModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { CreateQuestionSetComponent } from './create-question-set/create-question-set.component';
import { QuestionSetItemComponent } from './create-question-set/question-set-item/question-set-item.component';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    TeacherDashboardComponent,
    CreateQuestionSetComponent,
    QuestionSetItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    MatToolbarModule,
    ReactiveFormsModule,
    Routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
