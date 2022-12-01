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
    isEnrolled: boolean = false;
    hasToken: boolean = (localStorage.getItem('token') !== null);
    userId!: string;

    constructor(
        private courseService: CourseService,
        private userService: UserService,
        private sessionService: SessionService,
        private router: Router
    ) {}

    ngOnInit(): void { 
        this.isAdmin = this.sessionService.getIsAdmin();
        this.userId = this.sessionService.getId();

        this.checkEnrollStatus();
    }

    checkEnrollStatus() {
        this.courseService.checkIfEnrolled(this.course.id, this.userId).subscribe((response: Record<string, any>) => {
            response['result'] === "not_enrolled" ? this.isEnrolled = false : this.isEnrolled = true
        })
    }

    enroll(): void {
        this.userService.enroll(this.course.id!, this.userId).subscribe({
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


    review() {
        this.router.navigate(['/add-review/' + this.course.id]);
    }

    successfulEnrollment(response: Record<string, any>) {
        Swal.fire({
           title: 'Enrollment Successful', 
           text: 'Enjoy the course!', 
           icon: 'success'}).then(() => this.checkEnrollStatus());
    }

    failedEnrollment(result: Record<string, any>) {
        let data: Record<string, any> = result['error'];

        if (data['result'] === 'already_enrolled') {
            Swal.fire('Enrollment Cancelled', 'You are already enrolled in this course.', 'error');
        }
    }
}