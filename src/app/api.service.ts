import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getRestaurants(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/restaurants?page=${page}&limit=${limit}`);
  }

  getRestaurantById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/restaurants/${id}`);
  }

  searchRestaurants(query: string, page: number, limit: number, filterCuisine: string[]): Observable<any> {
    const cuisineFilter = filterCuisine.length ? `&cuisines=${filterCuisine.join(',')}` : '';
    return this.http.get<any>(`${this.baseUrl}/api/search-restaurants?q=${query}&page=${page}&limit=${limit}${cuisineFilter}`);
  }

  // Add this method to fetch restaurants with images
  getRestaurantsWithImages(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/api/restaurants?page=${page}&limit=${limit}`);
  }

  // Add this method for searching restaurants with images
  searchRestaurantsWithImages(query: string, page: number, limit: number, filterCuisine: string[]): Observable<any> {
    const cuisineFilter = filterCuisine.length ? `&cuisines=${filterCuisine.join(',')}` : '';
    return this.http.get<any>(`${this.baseUrl}/api/search-restaurants?q=${query}&page=${page}&limit=${limit}${cuisineFilter}`);
  }
}
