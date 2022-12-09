import { Component, Input, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Review } from '@models/review';
import { ReviewService } from '@services/review.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit, OnDestroy {

  review: Review = new Review();
  stars: Array<number> = new Array(5);
  starValue: number = 1;
  @Input() courseId!: number;
  @Input() userId!: string;

  @Output() refreshReviews = new EventEmitter<string>();

  constructor(
    private reviewService: ReviewService,
    private router: Router) 
    {  }

  ngOnInit(): void {
  }

  refreshToggle() {
    this.refreshReviews.emit();
  }

  setRating(rating: number): void {
    console.log(rating);
    this.starValue = rating;
    this.review.rating = this.starValue;
  }



  onSubmit(): void {
     
      this.review.rating = this.starValue;

      this.reviewService.save(this.courseId, this.userId, this.review).subscribe((response) => {
        console.log(response);
        this.refreshToggle();
      })
  }

  ngOnDestroy(): void {
    
  }

}
