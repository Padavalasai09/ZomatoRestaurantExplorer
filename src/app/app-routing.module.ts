import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { ReviewComponent } from './review/review.component';

const routes: Routes = [
  { path: '', component: RestaurantListComponent }, // Default path
  { path: 'restaurant/:id', component: RestaurantDetailComponent },
  {path: 'restaurant/:id/review', component:ReviewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
