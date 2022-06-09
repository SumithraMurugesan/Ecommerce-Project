import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './shared/filter.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { HotOffersComponent } from './component/hot-offers/hot-offers.component';
import { NewArrivalsComponent } from './component/new-arrivals/new-arrivals.component';
import { TrendingComponent } from './component/trending/trending.component';
import { FooterComponent } from './component/footer/footer.component';
import { ProductViewComponent } from './component/product-view/product-view.component';
import { CheckoutFormComponent } from './component/checkout-form/checkout-form.component';
import { CartComponent } from './component/cart/cart.component';
import { AdminComponent } from './component/admin/admin.component';
import { AddProductsComponent } from './component/add-products/add-products.component';
import { ProductsComponent } from './component/products/products.component';
import { HttpCallInterceptor } from './interceptor/interceptor';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './component/login/login.component';
import { LoginFormComponent } from './component/loginform/loginform.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { ViewOrderDetailsComponent } from './view-order-details/view-order-details.component';
import { ViewOrderProductsComponent } from './view-order-products/view-order-products.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    HotOffersComponent,
    NewArrivalsComponent,
    TrendingComponent,
    FooterComponent,
    ProductViewComponent,
    FilterPipe,
    CheckoutFormComponent,
    AdminComponent,
    CartComponent,
    AddProductsComponent,
    ProductsComponent,
    LoginFormComponent,
    LoginComponent,
    OrderPlacedComponent,
    ViewOrderDetailsComponent,
    ViewOrderProductsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [CartComponent, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpCallInterceptor,
    multi: true
  }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
