import { Injectable } from '@angular/core';

@Injectable()
export class Constants {

  identityUrl: string = 'http://identity.akinisik.com/connect/token';
  productUrl: string = 'http://product.akinisik.com/api';
  blobStorageUrl: string = 'https://akinecommerce.blob.core.windows.net/products';
  sasToken: string = 'sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-01T03:17:49Z&st=2021-03-14T19:17:49Z&spr=https,http&sig=BIGtIzRwLpGb3zIRDXwhExG8ZdPT9Z7x020gMtV%2FbCA%3D';
  clientId: string = "angular-app";
  clientSecret: string = "secret";
  grant_type: string = "password";
  scope: string = "product.service offline_access";
}
