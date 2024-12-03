<script>
    import { onMount } from 'svelte';
    import Highcharts from 'highcharts';
  
    // Mock data
    let totalTasks = 30;
    let tasksData = [
      { date: '2024-11-01', created: 10, completed: 5 },
      { date: '2024-11-02', created: 15, completed: 10 },
      { date: '2024-11-03', created: 20, completed: 15 },
      { date: '2024-11-04', created: 5, completed: 2 }
    ];
  
    // Extract data for charts
    let categories = tasksData.map(task => task.date);
    let createdData = tasksData.map(task => task.created);
    let completedData = tasksData.map(task => task.completed);
  
    // Chart configuration
    let barChartOptions = {
      chart: { type: 'bar' },
      title: { text: 'Tareas Creadas vs Completadas' },
      xAxis: { categories: ['Creadas', 'Completadas'] },
      series: [
        {
          name: 'Tareas',
          data: [
            createdData.reduce((a, b) => a + b, 0),
            completedData.reduce((a, b) => a + b, 0)
          ]
        }
      ],
      credits: { enabled: false }
    };
  
    let lineChartOptions = {
      chart: { type: 'line' },
      title: { text: 'Progreso de Tareas por Fecha' },
      xAxis: { categories },
      yAxis: { title: { text: 'Número de Tareas' } },
      series: [
        { name: 'Creadas', data: createdData },
        { name: 'Completadas', data: completedData }
      ],
      credits: { enabled: false }
    };
  
    // Mount charts
    onMount(() => {
      Highcharts.chart('bar-chart', barChartOptions);
      Highcharts.chart('line-chart', lineChartOptions);
    });
  </script>
  
  <style>
    .container {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
    }
    .panels {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .panel {
      width: 48%;
      text-align: center;
      background-color: #f9f9f9;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    #line-chart {
      width: 100%;
      height: 400px;
    }
  </style>
  
  <div class="container">
    <!-- Top Panels -->
    <div class="panels">
      <div class="panel">
        <h2>Total de Tareas</h2>
        <p>{totalTasks}</p>
      </div>
      <div class="panel" id="bar-chart"></div>
    </div>
  
    <!-- Full-width Chart -->
    <div id="line-chart"></div>
  </div>
  