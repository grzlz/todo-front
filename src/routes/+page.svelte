<script>
    import { onMount } from 'svelte';
    import { goto } from '$app/navigation';
    onMount(() => {
        // Obtener el token JWT del almacenamiento local
        //const token = localStorage.getItem('token');
        // Verificar si existe un token
        //if (token) {
            // Redirigir a la página de tareas si existe un token
            goto('/tareas');
        //} else {
            // Redirigir a la página de login si no existe un token
            //goto('/login');
        //}
    });
</script>
