import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: any[] = [];
  page = 1;
  limit = 10;
  searchQuery: string = '';
  filterCuisine: string[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.apiService.getRestaurants(this.page, this.limit).subscribe((data: any[]) => {
      this.restaurants = data;
    });
  }

  searchRestaurants() {
    this.page = 1; // Reset to first page for new search
    this.apiService.searchRestaurants(this.searchQuery, this.page, this.limit, this.filterCuisine).subscribe((data: any[]) => {
      this.restaurants = data;
    });
  }

  nextPage() {
    this.page++;
    this.loadRestaurants();
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadRestaurants();
    }
  }
}
