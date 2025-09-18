import { Component, OnInit } from '@angular/core';
import {RouterModule} from '@angular/router';
import { Article } from '../article/article';
import { HttpClient } from '@angular/common/http';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { Chart, PieController, ArcElement, Legend, Tooltip } from 'chart.js'
import * as d3 from 'd3';
import { DataService } from '../data';

@Component({
  selector: 'pb-homepage',
  imports: [Article, Breadcrumbs],
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

  constructor(private http: HttpClient, private dataService: DataService) { Chart.register(PieController, ArcElement, Legend, Tooltip) }

  ngOnInit(): void {
    //this.http.get('http://localhost:3000/budget')
    //.subscribe((res: any) => {
    this.dataService.getBudgetData()
    .subscribe((res: any) => {
      console.log(res);
      const myBudget = res
      for (var i = 0; i < res.myBudget.length; i++) {
          this.dataSource.datasets[0].data[i] = res.myBudget[i].budget;
          this.dataSource.labels[i] = res.myBudget[i].title;
      }
      this.createChart();
      this.createD3Chart(myBudget.myBudget);
    });
  }

  createChart() {
    var ctx = document.getElementById('myChart') as HTMLCanvasElement;
    var myPieChart = new Chart(ctx, {
        type: "pie",
        data: this.dataSource
    });
  }
  createD3Chart(myBudget: any) {
    var svg = d3.select("#d3js-chart")
      .append("svg")
      .attr("width", 960)
      .attr("height", 450)
      .append("g")
      .attr("transform", "translate(" + 960 / 2 + "," + 450 / 2 + ")");

    svg.append("g").attr("class", "slices");
    svg.append("g").attr("class", "labels");
    svg.append("g").attr("class", "lines");

    var width = 960,
      height = 450,
      radius = Math.min(width, height) / 2;

    var pie = d3.pie<{ title: string, budget: number }>()
      .sort(null)
      .value(d => d.budget);

    const arc = d3.arc<d3.PieArcDatum<{ title: string, budget: number }>>()
      .outerRadius(radius * 0.8)
      .innerRadius(radius * 0.4);

    const outerArc = d3.arc<d3.PieArcDatum<{ title: string, budget: number }>>()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    var key = (d: d3.PieArcDatum<{ title: string }>) => d.data.title;

    var color = d3.scaleOrdinal()
      .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b",
              "#a05d56", "#d0743c", "#ff8c00"]);

      /* ------- PIE SLICES -------*/
      const budgetData = myBudget.map((d: { title: any; budget: any; }) => ({
          title: d.title,
          budget: d.budget
      }));
      console.log(budgetData)
      var slice = svg.select(".slices").selectAll("path.slice")
          .data(pie(budgetData), key as any);

      slice.enter()
          .insert("path")
          .attr("fill", d => color(d.data.title) as string)
          .attr("class", "slice")
          .attr("d", arc);

      /* ------- TEXT LABELS -------*/
      var text = svg.select(".labels").selectAll("text")
          .data(pie(budgetData), key as any);

      text.enter()
          .append("text")
          .attr("dy", ".35em")
          .attr("transform", d => "translate(" + arc.centroid(d) + ")")
          .style("text-anchor", "middle")
          .text(d => d.data.title)

      //Couldn't figure out how to get the polylines working in Typescript...      
    }
  }

