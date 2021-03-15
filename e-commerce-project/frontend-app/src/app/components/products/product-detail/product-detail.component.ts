import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Alert } from '../../../lib/alert';
import { Constants } from '../../../lib/constants';
import { AuthService } from '../../../services/authorization/auth/auth.service';
import { ProductService } from '../../../services/products/products.service';
import { ProductImage } from 'src/app/models/productimage.model';
import { Product } from 'src/app/models/products.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})

export class ProductDetailComponent implements OnInit {
  loading: boolean = false;
  id: any;
  product: Product;
  responsiveOptions: any;
  fileType: string = "";
  fileName: string = "";

  constructor(public router: Router, public activatedRoute: ActivatedRoute, public constants: Constants, public alert: Alert, public authService: AuthService, public productService: ProductService) {
    this.responsiveOptions = [
      {
        breakpoint: '300px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
    this.product = new Product();
  }

  ngOnInit(): void {
    this.isAuthenticated;
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.detailProduct();


  }

  detailProduct() {
    this.loading = true;
    this.productService.getProduct(this.id).subscribe((product) => {
      if (product) {
        this.product = product;
        this.loading = false;
      } else {
        this.loading = false;
        this.alert.swal(this.alert.error, 'Veri yok', this.alert.errorType);
      }
    }, (err) => {
      this.loading = false;
      this.alert.swal(this.alert.systemError, err.message, this.alert.errorType);
    });
  }

  updateProduct() {
    this.loading = true;
    this.productService.updateProduct(this.product).subscribe((res: any) => {
      this.alert.swal(this.alert.successTitle, "Ürün güncellendi.", this.alert.successType);
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
      this.alert.swal(this.alert.systemError, err.message, this.alert.errorType);
    });
  }

  deleteProductImage(imageId: any) {
    this.loading = true;
    this.productService.deleteProductImage(imageId).subscribe((res: any) => {
      this.getProductImages();
      this.loading = false;
    }, (err: any) => {
      this.loading = false;
      this.alert.swal(this.alert.systemError, err.message, this.alert.errorType);
    });
  }

  getProductImages() {
    this.productService.getProductImages(this.id).subscribe((res: any) => {
      this.product.productImages = res;
    }, (err: any) => {
      this.loading = false;
      this.alert.swal(this.alert.systemError, err.message, this.alert.errorType);
    });
  }

  handleFileSelect(evt: any) {

    let files = evt.target.files;

    let file = files[0];
    this.fileType = file.type;
    this.fileName = file.name;

    if (files && file) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadProductImage(reader.result);
      };
    }
  }

  uploadProductImage(base64string: any) {
    this.loading = true;
    var base64str = base64string.split(',');
    var data = atob(base64str[1].replace(/(\r\n|\n|\r)/gm, ""));
    var len = data.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      bytes[i] = data.charCodeAt(i);
    }
    let fileName = `${new Date().getTime()}.jpg`;
    const url = `${this.constants.blobStorageUrl}/${fileName}?${this.constants.sasToken}`;
    this.productService.uploadImageToAzure(url, bytes.buffer).subscribe((res: any) => {

      let productImage = new ProductImage();
      productImage.productId = this.product.id;
      productImage.url = `${this.constants.blobStorageUrl}/${fileName}`;

      this.productService.addProductImage(productImage).subscribe((uploadedImage: any) => {
        this.product.productImages.push(uploadedImage);
        this.alert.swal(this.alert.successTitle, "Ürün resmi yüklendi.", this.alert.successType);
        this.loading = false;
      }, (err: any) => {
        this.loading = false;
        this.alert.swal(this.alert.systemError, err.message, this.alert.errorType);
      });
    }, (err: any) => {
      this.loading = false;
      this.alert.swal(this.alert.systemError, err.message, this.alert.errorType);
    });
  }

  get isAuthenticated() {
    return this.authService.isLogged();
  }

}
