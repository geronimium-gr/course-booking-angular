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

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  findAllRatings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ratings`)
  }

  save(courseId: number, userId: string, review: Review): Observable<Object> {
    return this.http.post(`${this.baseUrl}/${courseId}`, {rating: review.rating, feedback: review.feedback, user:{id: userId}}, { headers: this.httpHeaders });
  }
}
