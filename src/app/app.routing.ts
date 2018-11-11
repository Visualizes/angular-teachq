import {RouterModule, Routes} from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {RegisterComponent} from './register/register.component';
import {TeacherDashboardComponent} from './teacher-dashboard/teacher-dashboard.component';
import {CreateQuestionSetComponent} from './create-question-set/create-question-set.component';

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
        path: 'create',
        component: CreateQuestionSetComponent
      }
    ]
  }
];

export const Routing = RouterModule.forRoot(APP_ROUTES);
