
<script>
    import { goto } from '$app/navigation'; // Para manejar redirecciones en SvelteKit
    let nombre = "";
    let apellido = "";
    let correo = "";
    let contra = "";
    let warnings = [];

    let emailregex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    let validacion = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,20}$/;

    async function registrar() {
    warnings = [];
    
    if (!nombre || nombre.trim().length === 0) {
        warnings.push("El nombre es obligatorio.");
    }
    if (!apellido || apellido.trim().length === 0) {
        warnings.push("El apellido es obligatorio.");
    }
    if (!emailregex.test(correo)) {
            warnings.push("El correo no es válido");
        }
    if (!validacion.test(contra)) {
            warnings.push("Su contraseña debe ser mayor a 6 carácteres y contener mayúsculas, minúsculas, números y símbolos");
        }
    if (warnings.length === 0) {
        try {
            const response = await fetch('https://tu-api.com/registro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nombre,
                        apellido,
                        correo,
                        contra,
                    }),
                });

        if (response.ok) {
                    const result = await response.json();
                    console.log('Registro exitoso:', result);
                
     // Redirigir a la página de inicio de sesión
    window.location.href = '/login'; // Cambia '/login' por la URL de tu página de inicio de sesión
                } else {
                    const errorData = await response.json();
                    warnings.push(errorData.message || "Error en el registro");
                }
            } catch (error) {
                console.error('Error en la solicitud HTTP:', error);
                warnings.push("Hubo un problema al intentar registrarse.");
            }
        }
    }

</script>

<main>
    <form>
        <h1>Registro</h1>

        <input type="text" placeholder="Nombre" bind:value={nombre}>
        <input type="text" placeholder="Apellido" bind:value={apellido}>
        <input type="email" placeholder="Correo" bind:value={correo}>
        <input type="password" placeholder="Contraseña" bind:value={contra}>
        <button on:click={registrar}>Registrar</button>

        <ul>
            {#each warnings as warning}
            <li>{warning}</li>
            {/each}
        </ul>
    </form>
</main>

<style>
    /* Estilo general para centrar todo el contenido */
    main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background: #f3e8ff; /* Fondo suave morado */
        font-family: 'Arial', sans-serif;
        margin: 0; /* Elimina márgenes */
        padding: 0;
        box-sizing: border-box; /* Asegura un mejor manejo del diseño */
    }
    
    /* Formulario centrado */
    form {
        background-color: #ffffff;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px; /* Tamaño máximo del formulario */
        display: flex;
        flex-direction: column;
        gap: 10px; /* Espaciado uniforme entre los elementos */
        align-items: center; /* Centrar los elementos dentro del formulario */
        border: 2px solid #6a4c9c; /* Borde morado claro */
    }
    
    /* Título del formulario */
    h1 {
        font-size: 2rem;
        margin-bottom: 20px;
        text-align: center;
        color: #6a4c9c; /* Título en morado */
    }
    
    /* Inputs centrados */
    input {
        width: 100%;
        padding: 12px;
        margin: 10px 0;
        border: 1px solid #d4a5f7; /* Borde morado claro */
        border-radius: 8px;
        font-size: 1rem;
        transition: all 0.3s ease;
        background-color: #f8f4fd; /* Fondo de input morado muy suave */
    }
    
    /* Inputs enfocados */
    input:focus {
        border-color: #9b5de5; /* Morado oscuro cuando está enfocado */
        outline: none;
    }
    
    /* Botón de enviar */
    button {
        width: 100%;
        padding: 12px;
        background-color: #9b5de5; /* Botón morado */
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 1.1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    
    /* Hover del botón */
    button:hover {
        background-color: #6a4c9c; /* Botón morado oscuro al pasar el cursor */
    }
    
    /* Lista de advertencias */
    ul {
        list-style-type: none;
        padding: 0;
        margin-top: 10px;
        width: 100%;
    }
    
    ul li {
        color: #e94e77; /* Color rosado para advertencias */
        font-size: 0.9rem;
        text-align: left;
    }
    
    /* Responsividad para pantallas pequeñas */
    @media (max-width: 480px) {
        form {
            width: 90%; /* El formulario ocupa un 90% de la pantalla */
        }
    }
    </style>