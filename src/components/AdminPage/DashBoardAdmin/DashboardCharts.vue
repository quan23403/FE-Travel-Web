<template>
    <v-card outlined>
      <v-card-title>Revenue Overview</v-card-title>
      <v-card-subtitle>Performance of last 6 months</v-card-subtitle>
      <v-card-text>
        <canvas id="revenue-chart"></canvas>
      </v-card-text>
    </v-card>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    name: 'DashboardCharts',
    mounted() {
      const ctx = document.getElementById('revenue-chart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [
            {
              label: 'Revenue',
              data: [5000, 10000, 7000, 12000, 9000, 15000],
              borderColor: '#4CAF50',
              tension: 0.3,
              fill: false,
            },
          ],
        },
      });
    },
  };
  </script>
  