import {RouterModule, Routes} from '@angular/router';
import {LogInComponent} from './log-in/log-in.component';
import {RegisterComponent} from './register/register.component';
import {TeacherDashboardComponent} from './teacher-dashboard/teacher-dashboard.component';
import {CreateQuestionSetComponent} from './create-question-set/create-question-set.component';
import {QuestionsPresentationComponent} from './questions-presentation/questions-presentation.component';
import {ClickerComponent} from './clicker/clicker.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: '/TeachQ/login',
    pathMatch: 'full'
  },
  {
    path: 'TeachQ',
    children: [
      {
        path: '',
        redirectTo: '/TeachQ/login',
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
        path: 'questions/:id',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/questions/:id/present'
          },
          {
            path: 'present/:presentationID',
            component: QuestionsPresentationComponent
          }
        ]
      },
      {
        path: 'clicker/:presentationID',
        component: ClickerComponent
      }
    ]
  }

];

export const Routing = RouterModule.forRoot(APP_ROUTES);
