import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/products/products.service';

import { Alert } from '../../../lib/alert';
import { Constants } from '../../../lib/constants';
import { Product } from 'src/app/models/products.model';
import { AuthService } from 'src/app/services/authorization/auth/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})

export class ProductsComponent implements OnInit {
  loading: boolean = false;
  displayProductDialog: boolean = false;
  products: Product[];
  sortOptions: any;
  sortField: any;
  sortOrder: any;
  sortKey: any;
  product: Product;

  constructor(public router: Router, public constants: Constants, public alert: Alert, public authService: AuthService, public productService: ProductService) {
    this.products = [];
    this.product = new Product();
  }

  ngOnInit(): void {
    this.isAuthenticated;
    this.getProducts();
    this.sortOptions = [
      { label: 'Pahalıdan-Ucuza', value: '!price' },
      { label: 'Ucuzdan-Pahalıya', value: 'price' },
    ];
  }

  getProducts() {
    this.loading = true;
    return this.productService.getProducts().subscribe((products: any) => {
      if (products) {
        this.products = products;
        this.loading = false;
      } else {
        this.loading = false;
        this.alert.swal(this.alert.error, 'Veri yok', this.alert.errorType);
      }
    }, (err: any) => {
      this.loading = false;
      this.alert.swal(this.alert.systemError, err.message, this.alert.errorType);
    });
  }

  detailProduct(id: any) {
    this.router.navigate(['/product/', id]);
  }

  addProduct() {
    this.product.barcode = this.generateBarcode();
    if (this.product.piece != null && this.product.piece > 1) {
      this.product.inventoryStatus = 'INSTOCK';
    }

    this.product.rating = 0;
    this.productService.addProduct(this.product).subscribe((res: any) => {
      this.alert.swal(this.alert.successTitle, "Ürün eklendi.", this.alert.successType);
      this.getProducts();
    }, (err: any) => {
      this.alert.swal(this.alert.systemError, err.message, this.alert.errorType);
    });
  }

  goLogin() {
    this.router.navigate(['/login/']);
  }

  target(event: KeyboardEvent): HTMLInputElement {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("wrong target");
    }
    return event.target;
  }

  showProductModal() {
    this.displayProductDialog = true;
  }

  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  generateBarcode() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 11; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  get isAuthenticated() {
    return this.authService.isLogged();
  }
}
