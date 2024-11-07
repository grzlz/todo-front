<script>
    import { onMount } from 'svelte';

    // Variables para los campos del formulario
    let nombre = '';
    let apellido = '';
    let correo_electronico = '';
    let password = '';
    let mensaje = '';

    // Función para enviar la solicitud de registro
    async function registerUser() {
        try {
            const response = await fetch('/api/local_registrarUsuario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    apellido,
                    correo_electronico,
                    password
                })
            });

            const result = await response.json();

            if (response.ok) {
                mensaje = result.message || 'Usuario registrado exitosamente';
            } else {
                mensaje = result.error || 'Error al registrar usuario';
            }
        } catch (error) {
            console.error('Error:', error);
            mensaje = 'Error de conexión con el servidor';
        }
    }
</script>

<style>
    /* Estilos sencillos para el formulario */
    form {
        max-width: 400px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    label {
        display: block;
        margin-top: 10px;
    }

    input {
        width: 100%;
        padding: 8px;
        margin-top: 5px;
        border: 1px solid #ccc;
        border-radius: 3px;
    }

    button {
        margin-top: 15px;
        padding: 10px;
        width: 100%;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }

    button:hover {
        background-color: #0056b3;
    }

    p {
        margin-top: 15px;
        color: #007bff;
    }
</style>

<form on:submit|preventDefault={registerUser}>
    <h2>Registro de Usuario</h2>

    <label for="nombre">Nombre:</label>
    <input id="nombre" bind:value={nombre} type="text" required />

    <label for="apellido">Apellido:</label>
    <input id="apellido" bind:value={apellido} type="text" required />

    <label for="correo_electronico">Correo Electrónico:</label>
    <input id="correo_electronico" bind:value={correo_electronico} type="email" required />

    <label for="password">Contraseña:</label>
    <input id="password" bind:value={password} type="password" required />

    <button type="submit">Registrar</button>

    {#if mensaje}
        <p>{mensaje}</p>
    {/if}
</form>
