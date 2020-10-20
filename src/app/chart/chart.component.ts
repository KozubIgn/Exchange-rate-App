import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  title = 'Currency:';
  type = 'function';
  data = ''; // DAJ TUTAJ SWOJE DANE!
    columnNames = ['Data', 'Value'];
  options = {colors: ['#e0440e',], is3D: true};
  width = 1068;
  height = 800;

  constructor() {
  }

  ngOnInit(): void {
  }

}
