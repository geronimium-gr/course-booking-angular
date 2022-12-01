import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

import { Course } from '@models/course';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private baseUrl: string = environment.apiUrl + '/courses';
    private httpHeaders: HttpHeaders = new HttpHeaders({
        'Authorization': `Bearer ${this.sessionService.getToken()}`
    });

    constructor(
        private http: HttpClient,
        private sessionService: SessionService
    ) { }

    get(): Observable<Course[]> {
        return this.http.get<Course[]>(this.baseUrl);
    }

    getOne(id: number): Observable<Object> {
        return this.http.get<Course[]>(`${this.baseUrl}/${id}`);
    }

    add(course: Course): Observable<Object> {
        return this.http.post(this.baseUrl, course, { headers: this.httpHeaders });
    }

    update(course: Course): Observable<Object> {
        return this.http.put(this.baseUrl + `/${course.id}`, course, { headers: this.httpHeaders });
    }

    archive(id: number): Observable<Object> {
        return this.http.delete(this.baseUrl + `/${id}`, { headers: this.httpHeaders });
    }

    checkIfEnrolled(courseId: any, userId: string): Observable<Object> {
        return this.http.post(
            `${this.baseUrl}/enrolled`,
            { courseId: courseId, userId: userId },
            { headers: this.httpHeaders });
    }
}