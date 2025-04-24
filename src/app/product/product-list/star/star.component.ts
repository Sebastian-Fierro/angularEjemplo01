import { Component, OnChanges, Input} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrl: './star.component.css'
})
export class StarComponent implements OnChanges{
    @Input() rating: number=100;
    stars: number = 0;
    arr: any = new Array(this.stars).fill(1);

    ngOnChanges(): void {
      if (this.rating > 0 && this.rating <= 40) {
        this.stars = 1;
      } else if (this.rating > 40 && this.rating <= 80) {
        this.stars = 2;
      } else if (this.rating > 80 && this.rating <= 120) {
        this.stars = 3;
      } else if (this.rating > 120 && this.rating <= 160) {
        this.stars = 4;
      } else if (this.rating > 160) {
        this.stars = 5;
      }
    
      this.arr = new Array(this.stars).fill(1);
    }
}
