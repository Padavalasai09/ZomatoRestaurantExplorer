import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  restaurant: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.apiService.getRestaurantById(id).subscribe(
      (data: any) => { // Specify 'any' or use an appropriate type
        this.restaurant = data;
      },
      (error: any) => { // Specify 'any' or use an appropriate type
        console.error('Error fetching restaurant details:', error);
      }
    );
  }
}
