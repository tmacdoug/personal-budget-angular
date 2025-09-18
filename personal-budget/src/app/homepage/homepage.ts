import { Component, OnInit } from '@angular/core';
import {RouterModule} from '@angular/router';
import { Article } from '../article/article';
import { HttpClient } from '@angular/common/http';
import { Chart, PieController, ArcElement, Legend, Tooltip } from 'chart.js'

@Component({
  selector: 'pb-homepage',
  imports: [Article],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss',
})
export class Homepage implements OnInit {
  
  public dataSource = {
      datasets: [
          {
              data: [100],
              backgroundColor: [
                  '#ffcd56',
                  '#ff6384',
                  '#36a2eb',
                  '#fd6b19',
                  '#eb8034',
                  '#5edb4b',
                  '#4bdbd9'
              ]
          }
      ],
      labels: ['temp']
  };

  constructor(private http: HttpClient) { Chart.register(PieController, ArcElement, Legend, Tooltip) }

  ngOnInit(): void {
    this.http.get('http://localhost:3000/budget')
    .subscribe((res: any) => {
      console.log(res)
      for (var i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();
    });
  }

  createChart() {
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
        type: "pie",
        data: this.dataSource
    });
  }
}
