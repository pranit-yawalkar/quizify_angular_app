import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminGuard } from './auth/admin.guard';
import { LoginGuard } from './auth/login.guard';
import { NormalGuard } from './auth/normal.guard';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { QuestionsComponent } from './pages/admin/questions/questions.component';
import { QuizzesComponent } from './pages/admin/quizzes/quizzes.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { QuizComponent } from './pages/user/quiz/quiz.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'signup', component: RegisterComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full', canActivate: [LoginGuard] },
  {
    path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard], children: [
      { path: '', component: AdminHomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'quizzes', component: QuizzesComponent },
      { path: 'questions/:quizId/:qtitle', component: QuestionsComponent },
    ]
  },
  {
    path: 'user-dashboard', component: UserDashboardComponent, children: [
      { path: '', component: UserHomeComponent, canActivate: [NormalGuard] },
      { path: 'quizzes', component: LoadQuizComponent },
      { path: 'instructions/:quizId', component: InstructionsComponent, canActivate: [NormalGuard] },
    ]
  },
  { path: 'quiz/start/:quizId', component: QuizComponent, canActivate: [NormalGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
