import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  template: `
    <div>
    
      
      <router-outlet></router-outlet>
    </div>
  `,
  styles: []
})
export class AppComponent {
  searchQuery: string = '';
  restaurants: any[] = []; // Initialize restaurants as an empty array

  constructor(private apiService: ApiService) {}

  searchRestaurants() {
    console.log('Search query:', this.searchQuery); 
    this.apiService.getRestaurants(1, 10).subscribe( // Defaulting to page 1 and limit 10
      (data: any[]) => {
        console.log('Received data:', data); 
        this.restaurants = data;
      },
      (error: any) => {
        console.error('Error fetching restaurants:', error);
      }
    );
  }
}
