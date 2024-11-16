<script>
    let nombre = "";
    let apellido = "";
    let correo = "";
    let contra = "";
    let warnings = [];

    let emailregex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    let validacion = /^(?=.\d)(?=.[a-z])(?=.*[A-Z]).{6,20}$/;

    async function registrar() {
        warnings = [];
        
        if (nombre.length === 0) {
            warnings.push("No ha puesto su nombre");
        }
        if (apellido.length === 0) {
            warnings.push("No ha puesto su apellido");
        }
        if (!emailregex.test(correo)) {
            warnings.push("El correo no es válido");
        }
        if (!validacion.test(contra)) {
            warnings.push("Su contraseña debe ser mayor a 6 carácteres y contener mayúsculas, minúsculas, números y símbolos");
        }
        if (warnings.length === 0) {
            try {
                const response = await fetch('api/registrarUsuario', {
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
                } else {
                    console.error('Error en el registro');
                }
            } catch (error) {
                console.error('Error en la solicitud HTTP:', error);
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

<style>/* Estilo general para el formulario */
main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #f3e8ff; /* Fondo suave morado */
    font-family: 'Arial', sans-serif;
}

/* Contenedor del formulario */
form {
    background-color: #ffffff;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    margin: 20px;
    border: 2px solid #6a4c9c; /* Borde morado claro */
}

/* Título del formulario */
h1 {
    font-size: 2rem;
    margin-bottom: 20px;
    text-align: center;
    color: #6a4c9c; /* Título en morado */
}

/* Estilo de los inputs */
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

/* Estilo cuando un input está enfocado */
input:focus {
    border-color: #9b5de5; /* Morado oscuro cuando está enfocado */
    outline: none;
}

/* Estilo del botón */
button {
    width: 100%;
    padding: 12px;
    background-color: #9b5de5; /* Morado en el botón */
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

/* Hover sobre el botón */
button:hover {
    background-color: #6a4c9c; /* Morado oscuro en hover */
}

/* Lista de advertencias */
ul {
    list-style-type: none;
    padding: 0;
    margin-top: 20px;
    width: 100%;
}

ul li {
    color: #e94e77; /* Rojo rosado para las advertencias */
    font-size: 0.9rem;
}

/* Responsividad para pantallas pequeñas */
@media (max-width: 480px) {
    form {
        width: 90%;
    }
}
</style>
