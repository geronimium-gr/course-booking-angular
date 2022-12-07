import { Component, Input, OnDestroy, OnInit } from '@angular/core';
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
  @Input() courseId!: number;
  @Input() userId!: string;

  constructor(
    private reviewService: ReviewService) 
    {  }

  ngOnInit(): void {
  }

  onSubmit(): void {
      this.reviewService.save(this.courseId, this.userId, this.review).subscribe((response) => {
        console.log(response);
      })
  }

  ngOnDestroy(): void {
    
  }

}
