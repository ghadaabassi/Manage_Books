import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-statistique',
  standalone: true,
  imports: [],
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit, OnDestroy {
  private chart: any; // Chart.js instance
  private dataInterval: any; // To store setInterval for real-time update

  constructor() {
    // Register Chart.js components
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.createChart(); // Create chart on initialization
    this.startDataUpdates(); // Start real-time data updates
  }

  ngOnDestroy(): void {
    // Clear the interval when the component is destroyed
    if (this.dataInterval) {
      clearInterval(this.dataInterval);
    }
  }

  // Function to create the initial chart
  createChart(): void {
    const ctx = (document.getElementById('bookSalesChart') as HTMLCanvasElement).getContext('2d');

    this.chart = new Chart(ctx!, {
      type: 'line',
      data: {
        labels: this.getMonths(),
        datasets: [{
          label: 'Books Sold',
          data: this.generateRandomData(),
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
          tension: 0.4 // Smooth the line curve
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: { 
            title: { display: true, text: 'Month' },
            ticks: { autoSkip: true, maxRotation: 0, minRotation: 0 }
          },
          y: { 
            title: { display: true, text: 'Books Sold' }
          }
        }
      }
    });
  }

  // Function to generate random sales data
  generateRandomData(): number[] {
    return Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
  }

  // Function to get month labels
  getMonths(): string[] {
    return [
      'January', 'February', 'March', 'April', 'May', 'June', 'July', 
      'August', 'September', 'October', 'November', 'December'
    ];
  }

  // Function to update chart data every 2 seconds (real-time simulation)
  startDataUpdates(): void {
    this.dataInterval = setInterval(() => {
      const newData = this.generateRandomData(); // Get new random data
      this.chart.data.datasets[0].data = newData; // Update dataset with new data
      this.chart.update(); // Re-render the chart with updated data
    }, 1000); 
  }
}
