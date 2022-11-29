import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Course } from '@models/course';
import { CourseService } from '@services/course.service';

@Component({
    selector: 'app-add-course',
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
    course: Course = new Course();

    constructor(
        private courseService: CourseService,
        private router: Router
    ) { }

    ngOnInit(): void { }

    onSubmit(): void {
        this.courseService.add(this.course).subscribe((response: Record<string, any>) => {
            if (response['result'] === 'added') {
                Swal.fire({
                    title: 'New Course Added',
                    text: 'The course has been added successfully.',
                    icon: 'success'
                }).then(() => {
                    this.router.navigate(['/courses']);
                });
            }
        });
    }
}