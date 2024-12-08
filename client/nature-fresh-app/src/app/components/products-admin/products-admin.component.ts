import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductView } from '../../models/ProductView';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-admin',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.css'],
})
export class ProductsAdminComponent implements OnInit {

  public products: ProductView[] = [] as ProductView[];
  public errorMessage: string | undefined;

  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data: ProductView[]) => {
      this.products = data;
    }, (error) => {
      this.errorMessage = error;
    });
  }

  deleteProduct(productId: string | undefined) {
    let confirmDelete = confirm("Are you sure you want to delete this product permanently?");
    if (confirmDelete && productId) {
      this.productService.deleteProduct(productId).subscribe((data) => {
        this.productService.getAllProducts().subscribe((data: ProductView[]) => {
          this.products = data;
        }, (error) => {
          this.errorMessage = error;
        });
      }, (error) => {
        this.errorMessage = error;
      })
    }
  }
}
