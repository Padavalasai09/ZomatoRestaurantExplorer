import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  username = '';
  rating: any = 1;
  suggestions = '';
  message = '';
  fetchedData: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.fetchReviews();
  }

  addReview() {
    console.log(this.username, this.rating, this.suggestions);
    this.apiService.reviewRestaurants(this.username, this.rating, this.suggestions).subscribe(
      (data: any) => {
        this.message = 'Successfully added';
        this.username = '';
        this.rating = 1;
        this.suggestions = '';
        this.fetchReviews();
        this.showMessage();
      },
      (error) => {
        this.message = 'Error adding review';
        console.error(error);
        this.showMessage();
      }
    );
  }

  fetchReviews() {
    this.apiService.getReviews().subscribe(
      (data: any) => {
        this.fetchedData = data;
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  showMessage() {
    const messageContainer = document.querySelector('.message-container') as HTMLElement;
    if (messageContainer) {
      messageContainer.classList.add('show');
      setTimeout(() => {
        messageContainer.classList.remove('show');
        this.message = ''; // Clear message after hiding
      }, 3000); // Hide message after 3 seconds
    }
  }
}
