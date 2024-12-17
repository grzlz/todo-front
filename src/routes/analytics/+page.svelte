<script>
  import { onMount } from 'svelte';
  import Highcharts from 'highcharts';

  // Datos de ejemplo
  let totalTasks = 30;
  let tasksData = [
    { date: '2024-11-01', created: 10, completed: 5 },
    { date: '2024-11-02', created: 15, completed: 10 },
    { date: '2024-11-03', created: 20, completed: 15 },
    { date: '2024-11-04', created: 5, completed: 2 }
  ];

  // Extraer datos para las gráficas
  let categories = tasksData.map(task => task.date);
  let createdData = tasksData.map(task => task.created);
  let completedData = tasksData.map(task => task.completed);

  // Configuración de las gráficas
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

  // Montar las gráficas al cargar el componente
  onMount(() => {
    Highcharts.chart('bar-chart', barChartOptions);
    Highcharts.chart('line-chart', lineChartOptions);
  });
</script>

<body>
  
  <!-- Layout con Bootstrap -->
  <div class="container mt-3 my-4">
  <div class="row  mb-4 ">
    <!-- Card con el total de tareas -->
    <div class="col-md-6 d-flex align-items-stretch">
      <div class="card text-center w-100">
        <div class="card-body center-content">
          <h5 class="card-title">Total de Tareas</h5>
          <p class="card-text fs-1  align-self-center">{totalTasks}</p>
        </div>
      </div>
    </div>

    <!-- Card con la gráfica de barras -->
    <div class="col-md-6 d-flex align-items-stretch">
      <div class="card w-100">
        <div class="card-body">
          <div id="bar-chart" style="width: 100%; height: 400px;"></div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- Card con la gráfica de líneas a lo ancho -->
  <div class="row">
    <div class="col-12">
      <div class="card">
        <div class="card-body">
          <div id="line-chart" style="width: 100%; height: 400px;"></div>
        </div>
      </div>
    </div>
  </div>
</div>
</body>


<style>
  body {
    background-color: #343a40; /* Gris oscuro */
    margin: 0;
    color: #ffffff;
  }

  .card {
    background-color: #ffffff;
    color: #000000;
  }

  .card-body.center-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .card-text.fs-1 {
    margin-top: auto;
    margin-bottom: auto;
  }

  .container {
    margin-top: 2rem; /* Agregar margen superior */
  }
</style>