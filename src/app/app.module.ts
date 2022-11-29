import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BannerComponent } from './components/banner/banner.component';
import { HighlightsComponent } from './components/highlights/highlights.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { CourseComponent } from './components/course/course.component';
import { EditCourseComponent } from './pages/edit-course/edit-course.component';
import { AddCourseComponent } from './pages/add-course/add-course.component';
import { ReviewComponent } from './pages/review/review.component';
import { AddReviewComponent } from './pages/add-review/add-review.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'courses', component: CoursesComponent },
    { path: 'edit-course/:id', component: EditCourseComponent },
    { path: 'add-course', component: AddCourseComponent },
    { path: 'reviews', component: ReviewComponent },
    { path: 'add-review/:id', component: AddReviewComponent },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    declarations: [
        AppComponent,
        BannerComponent,
        HighlightsComponent,
        HomeComponent,
        LoginComponent,
        NavbarComponent,
        NotFoundComponent,
        RegisterComponent,
        CoursesComponent,
        CourseComponent,
        EditCourseComponent,
        AddCourseComponent,
        ReviewComponent,
        AddReviewComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }