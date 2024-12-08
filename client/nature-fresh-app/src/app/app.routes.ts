import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsDisplayComponent } from './components/products-display/products-display.component';
import { ProductsAdminComponent } from './components/products-admin/products-admin.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

export const routes: Routes = [
    // note that lazy loaded modules are not initialized at app startup and are only loaded on demand 
    // by this they improve performance of app
    { path: '', component: HomeComponent },  // eager loading
    { path: 'products/list', component: ProductsDisplayComponent },
    { path: 'products/admin', component: ProductsAdminComponent },
    { path: 'products/add', component: AddProductComponent },
    { path: 'products/:productId', component: EditProductComponent }
];
