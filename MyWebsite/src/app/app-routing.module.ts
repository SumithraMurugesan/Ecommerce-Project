import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductsComponent } from './component/add-products/add-products.component';
import { AdminComponent } from './component/admin/admin.component';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutFormComponent } from './component/checkout-form/checkout-form.component';
import { HomeComponent } from './component/home/home.component';
import { HotOffersComponent } from './component/hot-offers/hot-offers.component';
import { LoginComponent } from './component/login/login.component';
import { LoginFormComponent } from './component/loginform/loginform.component';
import { NewArrivalsComponent } from './component/new-arrivals/new-arrivals.component';
import { ProductViewComponent } from './component/product-view/product-view.component';
import { ProductsComponent } from './component/products/products.component';
import { TrendingComponent } from './component/trending/trending.component';
import { OrderPlacedComponent } from './order-placed/order-placed.component';
import { ViewOrderDetailsComponent } from './view-order-details/view-order-details.component';
import { ViewOrderProductsComponent } from './view-order-products/view-order-products.component';





const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'hotOffers', component: HotOffersComponent },
  { path: 'trending', component: TrendingComponent },
  { path: 'newArrivals', component: NewArrivalsComponent },
  { path: 'productView', component: ProductViewComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'checkout', component: CheckoutFormComponent },
  { path: 'login', component: LoginComponent },
  { path: 'loginform', component: LoginFormComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'addproduct', component: AddProductsComponent },
  { path: 'orderplaced', component: OrderPlacedComponent },
  { path: 'viewOrderDetails', component: ViewOrderDetailsComponent },
  { path: 'viewOrderProducts', component: ViewOrderProductsComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
