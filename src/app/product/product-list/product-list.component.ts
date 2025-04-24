import { Component,OnInit, Input } from '@angular/core';
import { Product } from '../../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit{

    @Input('datos') public products!:Product[];
    imageWidth: number=100;
    imageMargin: number=10;
    showImage:boolean = false;

    constructor(){}
    
    ngOnInit(){}

    toggleImage():void{
      this.showImage = !this.showImage;
    }
}
