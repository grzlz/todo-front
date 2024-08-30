<script>
    let tarea = ""
    let lista_de_tareas = [
       
    ]
    
    function agregarTarea(){
        if (tarea.length === 0) {
            alert("Pusiste una tarea vacia")
        } else {
            lista_de_tareas = [...lista_de_tareas,
            {nombre_tarea: tarea, completado:false}]
            tarea=""
        }
    }

    let isChecked = false

</script>

<h1>
    Lista de tareas
</h1>
<input type="text" placeholder="Escribe una tarea aqui" bind:value={tarea}>
<button on:click={agregarTarea}>Agregar</button>
<ul>
    {#each lista_de_tareas as tarea}
    <li>
        <input type="checkbox" bind:checked={tarea.completado}>

        <span class:completado={tarea.completado}> {tarea.nombre_tarea}</span>
       
        <button class="container" >
            Eliminar
        </button>
    </li>
   
    
    {/each}
</ul>

<style>
    .completado {
        text-decoration: line-through;
    }

    ul{
        list-style-type: none;
    }

    button{        
        background-color:#866fa57d;
        color: rgb(34, 33, 32);
    }
    .container{        
        background-color:#ceb02a7d;
        color: rgb(34, 33, 32);
    }
</style>




