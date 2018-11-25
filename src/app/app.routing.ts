import {RouterModule, Routes} from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {RegisterComponent} from './register/register.component';
import {TeacherDashboardComponent} from './teacher-dashboard/teacher-dashboard.component';
import {CreateQuestionSetComponent} from './create-question-set/create-question-set.component';
import {QuestionsPresentationComponent} from './questions-presentation/questions-presentation.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: TeacherDashboardComponent
      },
      {
        path: 'questions/:id',
        component: CreateQuestionSetComponent
      }
    ]
  },
  {
    path: 'questions',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/questions/present'
      },
      {
        path: 'present/:id',
        component: QuestionsPresentationComponent
      }
    ]
  }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
