import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Course } from '@models/course';
import { UserService } from '@services/user.service';
import { CourseService } from '@services/course.service';
import { SessionService } from '@services/session.service';
import { ICourses } from 'src/app/interfaces/Icourses.interface';



@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
    @Input() course!: ICourses;
    @Input() deleteFromView!: Function;

    isAdmin: boolean = false;
    isEnrolled: boolean = false;
    hasToken: boolean = (localStorage.getItem('token') !== null);
    userId!: string;
    imageUrl!: string;

    constructor(
        private courseService: CourseService,
        private userService: UserService,
        private sessionService: SessionService,
        private router: Router
    ) {}

    ngOnInit(): void { 
        this.isAdmin = this.sessionService.getIsAdmin();
        this.userId = this.sessionService.getId();

        this.imageUrl = `https://avatars.dicebear.com/api/initials/${this.course.name}.svg`

        this.checkEnrollStatus();

    }

    checkEnrollStatus() {
        this.courseService.checkIfEnrolled(this.course.courseId, this.userId).subscribe((response: Record<string, any>) => {
            response['result'] === "not_enrolled" ? this.isEnrolled = false : this.isEnrolled = true
        })
    }

    enroll(): void {
        this.userService.enroll(this.course.courseId!, this.userId).subscribe({
            next: this.successfulEnrollment.bind(this), 
            error: this.failedEnrollment.bind(this)
        });
    }

    edit(): void {
        this.router.navigate(['/edit-course/' + this.course.id]);
    }

    archive(course: any): void {
        Swal.fire({
            title: 'Confirm Action', 
            text: 'Do you really want to archive this course?', 
            icon: 'warning',
            showCancelButton: true
        }).then((result) => {
            if (result.isConfirmed) {
                this.courseService.archive(this.course.courseId!).subscribe((response: Record<string, any>) => {
                    Swal.fire('Archive Successful', 'The course has been successfully archived.', 'success');
                    this.deleteFromView(course);
                    console.log(course);
                    
                });
            }
        });
    }


    review() {
        this.router.navigate(['/add-review/' + this.course.courseId]);
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