import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // Fetch restaurants with pagination
  getRestaurants(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/restaurants?page=${page}&limit=${limit}`);
  }

  // Fetch a specific restaurant by ID
  getRestaurantById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/restaurants/${id}`);
  }

  // Search restaurants with pagination and cuisine filter
  searchRestaurants(query: string, page: number, limit: number, filterCuisine: string[]): Observable<any> {
    const cuisineFilter = filterCuisine.length ? `&cuisines=${filterCuisine.join(',')}` : '';
    return this.http.get<any>(`${this.baseUrl}/api/search-restaurants?q=${query}&page=${page}&limit=${limit}${cuisineFilter}`);
  }

  // Fetch restaurants with images, including pagination
  getRestaurantsWithImages(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/restaurants-with-images?page=${page}&limit=${limit}`);
  }

  // Search restaurants with images, including pagination and cuisine filter
  searchRestaurantsWithImages(query: string, page: number, limit: number, filterCuisine: string[]): Observable<any> {
    const cuisineFilter = filterCuisine.length ? `&cuisines=${filterCuisine.join(',')}` : '';
    return this.http.get<any>(`${this.baseUrl}/api/search-restaurants-with-images?q=${query}&page=${page}&limit=${limit}${cuisineFilter}`);
  }

  // Add a review
  reviewRestaurants(username: string, rating: number, suggestions: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/put-restaurants`, { username, rating, suggestions });
  }

  // Fetch reviews
  getReviews(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/fetch`);
  }
}
