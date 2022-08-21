import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/modules/material.module';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { authInterceptorProvider } from './auth/auth.interceptor';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminHomeComponent } from './pages/admin/admin-home/admin-home.component';
import { CategoriesComponent } from './pages/admin/categories/categories.component';
import { CategoryDialogComponent } from './components/category-dialog/category-dialog.component';
import { QuizzesComponent } from './pages/admin/quizzes/quizzes.component';
import { QuizDialogComponent } from './components/quiz-dialog/quiz-dialog.component';
import { QuestionsComponent } from './pages/admin/questions/questions.component';
import { QuestionDialogComponent } from './components/question-dialog/question-dialog.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import { UserHomeComponent } from './pages/user/user-home/user-home.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { QuizComponent } from './pages/user/quiz/quiz.component';
import { NgxUiLoaderHttpModule, NgxUiLoaderModule } from 'ngx-ui-loader';
import { MatCarouselModule } from 'ng-mat-carousel';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    HomeComponent,
    MainNavComponent,
    UserDashboardComponent,
    AdminDashboardComponent,
    ProfileComponent,
    SidebarComponent,
    AdminHomeComponent,
    CategoriesComponent,
    CategoryDialogComponent,
    QuizzesComponent,
    QuizDialogComponent,
    QuestionsComponent,
    QuestionDialogComponent,
    UserSidebarComponent,
    UserHomeComponent,
    LoadQuizComponent,
    InstructionsComponent,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    LayoutModule,
    CKEditorModule,
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true
    }),
    MatCarouselModule.forRoot()
  ],
  providers: [authInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
