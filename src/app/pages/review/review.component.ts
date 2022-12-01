import { Component, OnDestroy, OnInit } from '@angular/core';
import { Review } from '@models/review';
import { ReviewService } from '@services/review.service';

interface ReviewResponse {
  course: {
    name: string
  },
  user: {
    firstName: string,
    lastName: string
  },
  feedback: string,
  rating: string,
  datetimeCreated: Date
}

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy {

  reviews: ReviewResponse[] = [];

  constructor(private reviewService: ReviewService) { }
 
  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): void {
    this.reviewService.findAll().subscribe((response: ReviewResponse[]) => {
      console.log(response);
      this.reviews = response;
    })
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    
  }

}
