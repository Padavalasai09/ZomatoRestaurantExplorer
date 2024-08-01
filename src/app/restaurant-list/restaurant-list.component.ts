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
  total_pages = 1; // Adjusted to 1 as default
  limit = 10;
  searchQuery: string = '';
  filterCuisine: string[] = [];
  isSearching: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.apiService.getRestaurants(this.page, this.limit).subscribe((data: any) => {
      this.restaurants = data.restaurants;
      this.total_pages = Math.ceil(data.total / this.limit); // Assuming `data.total` contains the total number of restaurants
    });
  }

  searchRestaurants() {
    this.page = 1; // Reset to first page for new search
    this.isSearching = true;
    this.apiService.searchRestaurants(this.searchQuery, this.page, this.limit, this.filterCuisine).subscribe((data: any) => {
      this.restaurants = data.restaurants;
      console.log(data.total);
      this.total_pages = Math.ceil(data.total / this.limit); // Assuming `data.total` contains the total number of search results
    });
  }

  nextPage() {
    if (this.page < this.total_pages) {
      this.page++;
      this.loadPage();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.loadPage();
    }
  }

  goToPage(page: number) {
    if (page !== this.page) {
      this.page = page;
      this.loadPage();
    }
  }

  loadPage() {
    if (this.isSearching) {
      this.apiService.searchRestaurants(this.searchQuery, this.page, this.limit, this.filterCuisine).subscribe((data: any) => {
        this.restaurants = data.restaurants;
        this.total_pages = Math.ceil(data.total / this.limit); // Adjust total pages based on search results
      });
    } else {
      this.loadRestaurants();
    }
  }

  getPages(): number[] {
    const pages = [];
    if (this.total_pages <= 6) {
      // If there are 6 or fewer pages, show them all
      for (let i = 1; i <= this.total_pages; i++) {
        pages.push(i);
      }
    } else {
    
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
  
    
      if (this.page > 4 && this.page < this.total_pages) {
        pages.push(this.page);
      }
  
      pages.push(this.total_pages);
    }
    return pages;
  }
}
