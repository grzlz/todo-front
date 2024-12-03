<script>
    import { onMount } from 'svelte';
    async function CerrarSesion() {
        localStorage.removeItem('sessionToken');
        window.location.href = '/';  // Redirige al login
    };
  </script>
  
  <main>
      <header>
          <nav>
              <ul>
                  <li><a href="/tareas" class="nav-button">Tareas</a></li>
                  <li><a href="/analytics" class="nav-button">Analytics</a></li>
                  <li><button on:click={CerrarSesion} class="nav-button">Cerrar Sesión</button></li>
              </ul>
          </nav>
      </header>    
  
      <h1>En proceso...</h1>
  </main>
  
  <style>
      /* Diseño principal */
      main {
          max-width: 800px;
          margin: 2rem auto;
          padding: 3rem;
          background-color: #ffffff;
          border-radius: 12px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
  
      h1 {
          text-align: center;
          font-size: 2rem;
          color: #333;
          margin-bottom: 2rem;
          font-weight: 600;
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
  
      .nav-button {
          color: white;
          text-decoration: none;
          font-size: 1.1rem;
          padding: 10px 20px;
          border-radius: 8px;
          transition: background-color 0.3s ease, transform 0.2s ease;
          background-color: #6200ea;
          display: inline-block;
      }
  
      .nav-button:hover {
          background-color: #3700b3;
          transform: scale(1.05);
      }
  
      /* Estilos para el botón de Cerrar Sesión */
      button {
          border: none;
          background-color: transparent;
          cursor: pointer;
      }
  
      /* Estilo general para el fondo de la página */
      body {
          background-color: #f7f7f7;
          margin: 0;
          padding: 0;
      }
  
      /* Efectos de transición y hover */
      button, .nav-button {
          transition: all 0.3s ease;
      }
  
      button:hover, .nav-button:hover {
          transform: scale(1.05);
      }
  </style>
  