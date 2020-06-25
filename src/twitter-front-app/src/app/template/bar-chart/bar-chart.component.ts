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
  @Input() labels; // Date
  @Input() series; // Tweet Number

  // Initialisation des varibles pour le bar-chart
  type: ChartType;
  data: IChartistData;
  options: IBarChartOptions;
  events: ChartEvent;

  constructor() { }

  ngOnInit(): void {
    this.type = 'Line';

    this.data = {
      labels: this.labels,
      series: [this.series]
    };

    this.options = {
      axisX: {
        showGrid: false
      },
      height: 300,
      showArea: true,
    };

    this.events = {
      draw: (data) => {
        let seq: any, delays: any, durations: any;
        seq = 0;
        delays = 80;
        durations = 500;

        if (data.type === 'line' || data.type === 'area') {
          data.element.animate({
            d: {
              begin: 300,
              dur: 400,
              from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
              to: data.path.clone().stringify(),
              easing: 'easeOutQuad'
            }
          });
        } else if (data.type === 'point') {
              seq++;
              data.element.animate({
                opacity: {
                  begin: seq * delays,
                  dur: durations,
                  from: 0,
                  to: 1,
                  easing: 'ease'
                }
              });
          }

      }
    };
  }
}
