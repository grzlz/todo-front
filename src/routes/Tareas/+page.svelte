<script>
    import { onMount } from 'svelte';

    let tarea = "";
    let lista_de_tareas = [];
    
    onMount(() => {
        obtenerDatos();
    });

    async function obtenerDatos() {
        let response = await fetch('/api/obtenerDatos');
        let datos = await response.json();
        lista_de_tareas = datos;
    }

    async function agregarTarea() {
        if (tarea.length === 0) {
            alert("Pusiste una tarea vacía");
        } else {
            let response = await fetch('/api/agregarTarea', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre_tarea: tarea,
                    completado: false,
                }),
            });
        }
        obtenerDatos();
    }

    async function eliminarTarea(id) {
        let response = await fetch('/api/eliminarTarea', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
            }),
        });
        obtenerDatos();
    }

    async function completarTarea(tarea) {
        let response = await fetch('/api/completarTarea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: tarea.id,
                completado: tarea.completado,
            }),
        });
    }
</script>

<main>
    <!-- Barra de navegación añadida -->
    <header>
        <nav>
            <ul>
                <li><a href="/tareas" class="nav-button">Tareas</a></li>
                <li><a href="/analytics" class="nav-button">Analytics</a></li>
                <li><button on:click={CerrarSesion} class="nav-button">Cerrar Sesión</button></li>
            </ul>
        </nav>
    </header>

    <h1>Lista de tareas</h1>

    <div class="input-container">
        <input type="text" placeholder="Escribe una tarea aquí" bind:value={tarea} />
        <button on:click={agregarTarea}>Agregar</button>
    </div>

    <ul>
        {#each lista_de_tareas as tarea, indice}
        <li>
            <input type="checkbox" bind:checked={tarea.completado} on:change={() => completarTarea(tarea)} />
            <span class:completado={tarea.completado}>{tarea.nombre_tarea}</span>
            <button class="eliminar" on:click={() => eliminarTarea(tarea.id)}>Eliminar</button>
        </li>
        {/each}
    </ul>
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

    /* Contenedor del input y botón de agregar */
    .input-container {
        display: flex;
        justify-content: center;
        margin-bottom: 2rem;
    }

    input[type="text"] {
        width: calc(100% - 120px);
        padding: 0.75rem;
        margin-right: 1rem;
        border-radius: 8px;
        border: 1px solid #ddd;
        font-size: 1rem;
        color: #333;
    }

    button {
        padding: 0.75rem 1.5rem;
        background-color: #6200ea;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 8px;
        font-size: 1rem;
        transition: background-color 0.3s ease, transform 0.2s ease;
    }

    button:hover {
        background-color: #3700b3;
        transform: scale(1.05);
    }

    /* Lista de tareas */
    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem;
        background-color: #f4f4f9;
        border-radius: 10px;
        margin-bottom: 1rem;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        transition: background-color 0.3s ease;
    }

    li:hover {
        background-color: #e6e6f0;
    }

    .completado {
        text-decoration: line-through;
        color: gray;
    }

    /* Estilos para los botones eliminar */
    .eliminar {
        background-color: red;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-size: 0.9rem;
        cursor: pointer;
        border: none;
        transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .eliminar:hover {
        background-color: darkred;
        transform: scale(1.05);
    }

    /* Estilo para los checkboxes */
    input[type="checkbox"] {
        margin-right: 10px;
        transform: scale(1.2);
    }

    /* Estilos para el formulario de agregar tarea */
    .input-container {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-bottom: 2rem;
    }

    /* Estilos para el fondo general y sombras */
    body {
        background-color: #f7f7f7;
        margin: 0;
        padding: 0;
    }

    /* Resaltar el texto de advertencia en las alertas */
    .alerta {
        color: red;
        font-weight: bold;
    }

    /* Efectos de transición y hover */
    button, .nav-button, .eliminar {
        transition: all 0.3s ease;
    }

    button:hover, .nav-button:hover, .eliminar:hover {
        transform: scale(1.05);
    }

</style>
