import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/products/products.service';

import { Alert } from '../../lib/alert';
import { Constants } from '../../lib/constants';
import { Product } from 'src/app/models/products.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})

export class ProductsComponent implements OnInit {
  products: Product[];
  sortOptions: any;
  sortField: any;
  sortOrder: any;
  sortKey: any;

  constructor(public router: Router, public constants: Constants, public alert: Alert, public productService: ProductService) {
    this.products = [];
  }

  ngOnInit(): void {
    this.productService.getProducts().then(data => {
      console.log('products', data);
      this.products = data;
    });

    this.sortOptions = [
      { label: 'Pahalıdan-Ucuza', value: '!price' },
      { label: 'Ucuzdan-Pahalıya', value: 'price' },
    ];
  }

  target(event: KeyboardEvent): HTMLInputElement {
    if (!(event.target instanceof HTMLInputElement)) {
      throw new Error("wrong target");
    }
    return event.target;
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
}
