import { Component, OnInit } from '@angular/core';
import { ProductView } from '../../models/ProductView';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  public isNameEmpty: boolean | undefined;
  public isImageEmpty: boolean | undefined;
  public isPriceEmpty: boolean | undefined;
  public isQuantityEmpty: boolean | undefined;
  public isInfoEmpty: boolean | undefined;


  public productId: string | null = '';
  public selectedProduct: ProductView = {} as ProductView;
  public errorMessage: string | undefined;

  constructor(
    private activatedRouter: ActivatedRoute,
    private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    // the route that was sent to this component has a param which can be extracted using paramMap
    this.activatedRouter.paramMap.subscribe((param: ParamMap) => {
      this.productId = param.get('productId');
    });

    if (this.productId) {
      this.productService.getProduct(this.productId).subscribe((data) => {
        this.selectedProduct = data;
      }, (error) => {
        this.errorMessage = error;
      })
    }
  }

  public submitUpdateProduct() {
    this.isNameEmpty = false;
    this.isImageEmpty = false;
    this.isPriceEmpty = false;
    this.isQuantityEmpty = false;
    this.isInfoEmpty = false;

    if (!this.selectedProduct.name) {
      this.isNameEmpty = true;
    } if (!this.selectedProduct.image) {
      this.isImageEmpty = true;
    } if (!this.selectedProduct.price) {
      this.isPriceEmpty = true;
    } if (!this.selectedProduct.quantity) {
      this.isQuantityEmpty = true;
    } if (!this.selectedProduct.info) {
      this.isInfoEmpty = true;
    } if (!this.isNameEmpty && !this.isImageEmpty && !this.isPriceEmpty && !this.isQuantityEmpty && !this.isInfoEmpty) {
      if (this.productId) {
        this.productService.updateProduct(this.productId, this.selectedProduct).subscribe((data: ProductView) => {
          this.router.navigate(['/products/admin']).then();
        });
      }
    }
  }
}
