import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Course } from '@models/course';
import { CourseService } from '@services/course.service';
import { SessionService } from '@services/session.service';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
    courses: Course[] = [];
    isAdmin: boolean = false;

    constructor(
        private courseService: CourseService,
        private sessionService: SessionService,
        private router: Router
    ) {
        this.getCourses();
        this.isAdmin = sessionService.getIsAdmin();
    }

    ngOnInit(): void { }

    getCourses() {
        this.courseService.get().subscribe((response: Course[]) => {
            this.courses = response;
        });
    }

    onAddCourseClick(): void {
        this.router.navigate(['/add-course']);
    }

    deleteFromView(givenCourse: Course): void {
        this.courses = this.courses.filter(courseEntry => courseEntry !== givenCourse);
    }
}
