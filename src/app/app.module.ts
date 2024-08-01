import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { ApiService } from './api.service';
import { NgbModule, NgbPagination, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ReviewComponent } from './review/review.component'; // Import ApiService

@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    RestaurantDetailComponent,
    ReviewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
