import { Component, OnDestroy, OnInit } from '@angular/core';
import { Review } from '@models/review';
import { ReviewService } from '@services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy {

  reviews: any[] = [];

  constructor(private reviewService: ReviewService) { }
 
  ngOnInit(): void {
    this.getReviews();
  }

  getReviews(): void {
    this.reviewService.findAll().subscribe((response: any[]) => {
      console.log(response);
      this.reviews = response;
    })
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    
  }

}
