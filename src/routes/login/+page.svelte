<script>
    import { goto } from '$app/navigation'; // Importa la función goto

    function iniciarSesion() {
    // Simular un inicio de sesión exitoso
    goto('/'); // Redirige a la página principal
  }
</script>


<h1>Módulo de login</h1>

<button on:click={iniciarSesion}>Iniciar sesión</button>