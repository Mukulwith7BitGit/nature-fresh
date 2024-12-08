import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ProductView } from '../../models/ProductView';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-display',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.css'],
})
export class ProductsDisplayComponent implements OnInit {

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

}
