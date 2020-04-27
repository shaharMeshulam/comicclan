import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() maxNumOfStars: number;
  @Input() rating: number;
  dummyArray: any[];

  constructor() { }

  ngOnInit() {
    this.dummyArray = this.array(this.maxNumOfStars);
  }

  private array(n: number): any[] {
    return Array(n);
  }

}
