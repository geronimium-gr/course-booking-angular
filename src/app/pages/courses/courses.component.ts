import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Course } from '@models/course';
import { CourseService } from '@services/course.service';
import { ReviewService } from '@services/review.service';
import { SessionService } from '@services/session.service';
import { ICourses } from '../../interfaces/Icourses.interface';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
    courses: ICourses[] = [];
    isAdmin: boolean = false;

    constructor(
        private courseService: CourseService,
        private reviewService: ReviewService,
        private sessionService: SessionService,
        private router: Router
    ) {}

    ngOnInit(): void { 
        this.getCourses();
        this.isAdmin = this.sessionService.getIsAdmin();
    }

    getCourses() {
        // For getting all the courses only w/o ratings
        // this.courseService.get().subscribe((response: Course[]) => {
        //     this.courses = response;
        // });

        this.reviewService.findAllRatings().subscribe((response: ICourses[]) => {
            this.courses = response;
        })
    }

    onAddCourseClick(): void {
        this.router.navigate(['/add-course']);
    }

    deleteFromView(givenCourse: any): void {
       this.courses = this.courses.filter(courseEntry => courseEntry !== givenCourse);
    }
}
