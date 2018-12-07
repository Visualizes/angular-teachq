import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LogInComponent } from './log-in/log-in.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Routing} from './app.routing';
import {
  MatButtonModule, MatCardModule, MatCheckboxModule, MatFormFieldModule, MatIconModule, MatInputModule, MatMenuModule,
  MatProgressSpinnerModule,
  MatRadioModule, MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { TeacherDashboardComponent } from './teacher-dashboard/teacher-dashboard.component';
import { CreateQuestionSetComponent } from './create-question-set/create-question-set.component';
import { QuestionSetItemComponent } from './create-question-set/question-set-item/question-set-item.component';
import {AppService} from './app.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { QuestionsPresentationComponent } from './questions-presentation/questions-presentation.component';
import { ClickerComponent } from './clicker/clicker.component';
import {ChartsModule} from 'ng2-charts/ng2-charts';
import {ChartModule} from 'angular2-chartjs';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    RegisterComponent,
    TeacherDashboardComponent,
    CreateQuestionSetComponent,
    QuestionSetItemComponent,
    QuestionsPresentationComponent,
    ClickerComponent
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    BrowserAnimationsModule,
    ChartModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    ReactiveFormsModule,
    Routing
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
