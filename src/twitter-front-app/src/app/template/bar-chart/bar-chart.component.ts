import { Component, OnInit, Input } from '@angular/core';
import {
  IBarChartOptions,
  IChartistAnimationOptions,
  IChartistData
} from 'chartist';
import { ChartEvent, ChartType } from 'ng-chartist';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  // Les données passé par le parent
  @Input() labels;
  @Input() series;

  // Initialisation des varibles pour le bar-chart
  type: ChartType;
  data: IChartistData;
  options: IBarChartOptions;
  events: ChartEvent;

  constructor() { }

  ngOnInit(): void {
    this.type = 'Bar';

    this.data = {
      labels: this.labels,
      series: [this.series]
    };

    this.options = {
      axisX: {
        showGrid: false
      },
      height: 300
    };

    this.events = {
      draw: (data) => {
        if (data.type === 'bar') {
          data.element.animate({
            y2: {
              dur: '0.5s',
              from: data.y1,
              to: data.y2,
              easing: 'easeOutQuad'
            } as IChartistAnimationOptions
          });
        }
      }
    };
  }

}
