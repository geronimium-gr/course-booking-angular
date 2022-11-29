import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Course } from '@models/course';
import { CourseService } from '@services/course.service';

@Component({
    selector: 'app-edit-course',
    templateUrl: './edit-course.component.html',
    styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
    course: Course = new Course();

    constructor(
        private courseService: CourseService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        let courseId: number = this.route.snapshot.params['id'];

        courseService.getOne(courseId).subscribe((response: Object) => {
            this.course = response;
        });
    }

    ngOnInit(): void { }

    onSubmit(): void {
        this.courseService.update(this.course).subscribe((response: Record<string, any>) => {
            if (response['result'] === 'updated') {
                Swal.fire({
                    title: 'Update Successful',
                    text: 'The course has been updated successfully.',
                    icon: 'success'
                }).then(() => {
                    this.router.navigate(['/courses']);
                });
            }
        });
    }
}
