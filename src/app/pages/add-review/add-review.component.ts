import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Review } from '@models/review';
import { ReviewService } from '@services/review.service';
import { SessionService } from '@services/session.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit, OnDestroy {

  review: Review = new Review();
  courseId: number;
  userId: string;

  constructor(
    private reviewService: ReviewService,
    private sessionService: SessionService,
    private router: Router,
    private route: ActivatedRoute) 
    { 
       this.courseId = this.route.snapshot.params['id'];
       this.userId = sessionService.getId();
    }

  ngOnInit(): void {
  }

  onSubmit(): void {
      this.reviewService.save(this.courseId, this.userId, this.review).subscribe((response) => {
        console.log(response);
      })

      this.router.navigate(['/reviews']);
  }

  ngOnDestroy(): void {
    
  }

}
