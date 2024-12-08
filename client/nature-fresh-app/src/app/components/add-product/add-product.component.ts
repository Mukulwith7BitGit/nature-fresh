import { Component, OnInit } from '@angular/core';
import { ProductView } from '../../models/ProductView';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {

  public product: ProductView = {
    name: '',
    image: '',
    price: 0.0,
    quantity: 0.0,
    info: '',
  };
  public isNameEmpty: boolean | undefined;
  public isImageEmpty: boolean | undefined;
  public isPriceEmpty: boolean | undefined;
  public isQuantityEmpty: boolean | undefined;
  public isInfoEmpty: boolean | undefined;
  constructor(
    private productService: ProductService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  public submitCreateProduct() {

    this.isNameEmpty = false;
    this.isImageEmpty = false;
    this.isPriceEmpty = false;
    this.isQuantityEmpty = false;
    this.isInfoEmpty = false;

    if (!this.product.name) {
      this.isNameEmpty = true;
    } if (!this.product.image) {
      this.isImageEmpty = true;
    } if (!this.product.price) {
      this.isPriceEmpty = true;
    } if (!this.product.quantity) {
      this.isQuantityEmpty = true;
    } if (!this.product.info) {
      this.isInfoEmpty = true;
    } if (!this.isNameEmpty && !this.isImageEmpty && !this.isPriceEmpty && !this.isQuantityEmpty && !this.isInfoEmpty) {
      this.productService.createProduct(this.product).subscribe((data: ProductView) => {
        this.router.navigate(['/products/admin']).then();
      });
    }
  }
}
