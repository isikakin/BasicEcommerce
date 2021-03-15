import { ProductImage } from './productimage.model';
export class Product {
    id?: any;
    name?: string;
    code?: string;
    barcode: string = "";
    description?: string;
    price?: number;
    piece?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
    productImages: ProductImage[] = [];
}