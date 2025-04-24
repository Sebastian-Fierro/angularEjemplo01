import { Component } from '@angular/core';
import {Product} from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Empresa ACME';
  _listFilter!: string;
  filteredProducts!: Product[];


  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
  }


  performFilter(filterBy: string): Product[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: Product) =>
      product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  ngOnInit(): void {
    this.filteredProducts = this.products;
  }


  products:Product[] = [
    {
      productId: 1,
      productName: 'Zapatillas de lona',
      productCode: 'GD-0011',
      releaseDate: 'March 19, 2026',
      price: 19.95,
      description: 'Description of Product 1',
      starRating: 3,
      imageurl: 'https://www.pastik.cl/cdn/shop/products/zapatilla-hombre-lona-negro-clasica-670725.jpg?v=1700429832&width=600'
    },
    {
      productId: 2,
      productName: 'Product 2',
      productCode: 'P002',
      releaseDate: '2023-02-01',
      price: 200,
      description: 'Description of Product 2',
      starRating: 90,
      imageurl: 'https://via.placeholder.com/150'
    }
  ];
}
