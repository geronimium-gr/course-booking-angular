import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

import { Course } from '@models/course';
import { Review } from '@models/review';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl: string = environment.apiUrl + '/reviews';
    private httpHeaders: HttpHeaders = new HttpHeaders({
        'Authorization': `Bearer ${this.sessionService.getToken()}`
    });

    constructor(
      private http: HttpClient,
      private sessionService: SessionService
  ) { }

  findAll(): Observable<Review[]> {
    return this.http.get<Review[]>(this.baseUrl);
  }

  save(courseId: number, userId: string, review: Review): Observable<Object> {
    return this.http.post(`http://localhost:8080/api/${courseId}/reviews`, {rating: review.rating, feedback: review.feedback, user:{id: userId}}, { headers: this.httpHeaders });
  }
}
