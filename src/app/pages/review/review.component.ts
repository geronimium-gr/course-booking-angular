import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Review } from '@models/review';
import { ReviewService } from '@services/review.service';
import { SessionService } from '@services/session.service';

interface ReviewResponse {
  id: number,
  course: {
    name: string
  },
  user: {
    firstName: string,
    lastName: string
  },
  feedback: string,
  rating: number,
  datetimeCreated: Date
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy {

  reviews: ReviewResponse[] = [];

  courseId: number;
  userId: string;

  constructor(
    private reviewService: ReviewService,
    private sessionService: SessionService,
    private route: ActivatedRoute) { 
      this.courseId = this.route.snapshot.params['id'];
      this.userId = this.sessionService.getId();
      
    }
 
  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): void {
    this.reviewService.findAll(this.courseId).subscribe((response: ReviewResponse[]) => {
      console.log(response);
      this.reviews = response;
    })
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    
  }

}
