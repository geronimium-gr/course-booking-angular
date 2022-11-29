import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Course } from '@models/course';
import { UserService } from '@services/user.service';
import { CourseService } from '@services/course.service';
import { SessionService } from '@services/session.service';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
    @Input() course!: Course;
    @Input() deleteFromView!: Function;

    isAdmin: boolean = false;
    hasToken: boolean = (localStorage.getItem('token') !== null);

    constructor(
        private courseService: CourseService,
        private userService: UserService,
        private sessionService: SessionService,
        private router: Router
    ) {
        this.isAdmin = sessionService.getIsAdmin();
    }

    ngOnInit(): void { }

    enroll(): void {
        this.userService.enroll(this.course.id!).subscribe({
            next: this.successfulEnrollment.bind(this), 
            error: this.failedEnrollment.bind(this)
        });
    }

    edit(): void {
        this.router.navigate(['/edit-course/' + this.course.id]);
    }

    archive(course: Course): void {
        Swal.fire({
            title: 'Confirm Action', 
            text: 'Do you really want to archive this course?', 
            icon: 'warning',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.courseService.archive(this.course.id!).subscribe((response: Record<string, any>) => {
                    Swal.fire('Archive Successful', 'The course has been successfully archived.', 'success');
                    this.deleteFromView(course);
                });
            }
        });
    }

    successfulEnrollment(response: Record<string, any>) {
        Swal.fire('Enrollment Successful', 'Enjoy the course!', 'success');
    }

    failedEnrollment(result: Record<string, any>) {
        let data: Record<string, any> = result['error'];

        if (data['result'] === 'already_enrolled') {
            Swal.fire('Enrollment Cancelled', 'You are already enrolled in this course.', 'error');
        }
    }
}