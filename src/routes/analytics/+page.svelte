<script>
    import { onMount } from 'svelte';
    import Highcharts from 'highcharts';
    
    // Función para cerrar sesión
    async function CerrarSesion() {
      localStorage.removeItem('sessionToken');
      window.location.href = '/';  // Redirige al login
    }
    
    // Datos de ejemplo para las gráficas
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
      yAxis: {
        title: { text: 'Número de Tareas' },
      },
      series: [
        {
          name: 'Tareas',
          data: [
            createdData.reduce((a, b) => a + b, 0),
            completedData.reduce((a, b) => a + b, 0)
          ],
          dataLabels: {
            enabled: true,
            color: '#000',  // Color negro para el texto
            style: {
              fontWeight: 'bold',
              textOutline: 'none',  // Sin contorno
              fontSize: '16px',
            },
            verticalAlign: 'middle',  // Ajustar las etiquetas al centro
            align: 'left',  // Alinea las etiquetas a la izquierda
            x: 15,  // Desplaza las etiquetas hacia la derecha
          }
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
  
  <main>
    <!-- Barra de navegación -->
    <header>
      <nav>
        <ul>
          <li><a href="/tareas" class="nav-button">Tareas</a></li>
          <li><a href="/analytics" class="nav-button">Analytics</a></li>
          <li><button on:click={CerrarSesion} class="nav-button">Cerrar Sesión</button></li>
        </ul>
      </nav>
    </header>
  
    <!-- Contenido Principal -->
    <div class="container mt-3 my-4">
      <div class="row mb-4">
        <!-- Card con el total de tareas -->
        <div class="col-md-6 d-flex align-items-stretch">
          <div class="card text-center w-100">
            <div class="card-body center-content">
              <h5 class="card-title">Total de Tareas</h5>
              <p class="card-text fs-1 align-self-center">{totalTasks}</p>
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
  
      <!-- Card con la gráfica de líneas -->
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
  </main>
  
  <style>
    /* Diseño principal */
    main {
      max-width: 900px;
      margin: 2rem auto;
      padding: 3rem;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }
  
    /* Barra de navegación */
    header {
      background-color: #6200ea;
      color: white;
      padding: 1rem 0;
      text-align: center;
      border-radius: 12px 12px 0 0;
      margin-bottom: 2rem;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
  
    nav ul {
      list-style-type: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
    }
  
    nav ul li {
      margin-right: 20px;
    }
  
    /* Estilos para los botones de navegación */
    .nav-button {
      color: white;
      text-decoration: none;
      font-size: 1.1rem;
      padding: 10px 20px;
      border-radius: 8px;
      transition: background-color 0.3s ease, transform 0.2s ease;
      background-color: #6200ea;
      display: inline-block;
      border: 2px solid white;
    }
  
    .nav-button:hover {
      background-color: #3700b3;
      transform: scale(1.05);
      border-color: #3700b3;
    }
  
    /* Estilos para el botón de Cerrar Sesión */
    button {
      border: none;
      background-color: transparent;
      cursor: pointer;
    }
  
    /* Efectos de transición y hover */
    button, .nav-button {
      transition: all 0.3s ease;
    }
  
    button:hover, .nav-button:hover {
      transform: scale(1.05);
    }
  
    /* Estilos para las gráficas */
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
      margin-top: 2rem;
    }
  </style>
  