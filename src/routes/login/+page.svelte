<script>
    import { goto } from '$app/navigation'; // Importa la función goto

    let email = '';
    let password = '';
    let errorMessage = '';
    let fieldErrors = { email: '', password: '' };

    function redirARegistro(event) {
        event.preventDefault();
        goto('/registro');
    }

    const validateFields = () => {
      fieldErrors.email = '';
      fieldErrors.password = '';

      if (!email.includes('@')) {
        fieldErrors.email = 'Por favor, ingresa un correo electrónico válido.';
      }

      if (!password.trim()) {
        fieldErrors.password = 'La contraseña no puede estar vacía.';
      }

      return !fieldErrors.email && !fieldErrors.password;
    };

    const handleSubmit = async () => {
      if (!validateFields()) {
        return;
      }

      try {
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correo: email, password }),
        });

        if (!response.ok) {
          const error = await response.json();
          errorMessage =
            error.message || 'Error al autenticar. Por favor, inténtalo de nuevo.';
        } else {
          console.log('Inicio de sesión exitoso.');
          const { token } = await response.json();
          console.log('Token:', token);
			    sessionStorage.setItem('token', token);
          
          goto('/tareas'); // Cambiar cuando la implementación de JWS esté lista
        }
      } catch (error) {
        errorMessage = 'Hubo un problema al conectar con el servidor.';
      }
    };
</script>

<main>
  <h1>Bienvenido a To Do App</h1>
  <p class="subtitle">
    por <a href="https://www.icarus.mx/" target="_blank" rel="noopener noreferrer">icarus.mx</a>
  </p>
  <form on:submit|preventDefault={handleSubmit}>
    <div>
      <label for="email">Correo electrónico</label>
      <input
        type="email"
        id="email"
        bind:value={email}
        placeholder="Ingresa tu correo"
      />
      {#if fieldErrors.email}
        <p>{fieldErrors.email}</p>
      {/if}
    </div>

    <div>
      <label for="password">Contraseña</label>
      <input
        type="password"
        id="password"
        bind:value={password}
        placeholder="Ingresa tu contraseña"
      />
      {#if fieldErrors.password}
        <p>{fieldErrors.password}</p>
      {/if}
    </div>

    <button type="submit">Iniciar sesión</button>
    <div class="registro-prompt">
      <span class="registro-text">¿Aún no tienes una cuenta?</span>
      <button on:click={redirARegistro} class="btn btn-registro">Registrarse</button>
    </div>

    {#if errorMessage}
      <p>{errorMessage}</p>
    {/if}
  </form>
</main>

<style>
  /* Estilo general */
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
  }

  h1 {
    font-size: 24px;
    color: #333;
    margin-bottom: 5px;
    font-weight: bold;
  }

  .subtitle {
    font-size: 12px;
    color: #007bff;
    margin-bottom: 20px;
  }

  .subtitle a {
    text-decoration: none;
    color: #007bff;
  }

  .subtitle a:hover {
    text-decoration: underline;
  }

  form {
    max-width: 400px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  div {
    margin-bottom: 20px;
  }

  label {
    display: block;
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #333;
  }

  input {
    width: 100%;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
    box-sizing: border-box;
    transition: border-color 0.3s ease;
  }

  input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
  }

  button {
    width: 100%;
    background-color: #007bff;
    color: white;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  button:hover {
    background-color: #0056b3;
    transform: scale(1.03);
  }

  button:active {
    transform: scale(1);
  }

  .login-prompt {
        margin-top: 32px; 
        text-align: center;
    }


    .login-text {
        display: block; 
        font-size: 0.85rem; 
        color: #555; 
        margin-bottom: 8px; 
    }


    .btn-login {
        display: inline-block; 
        width: auto; 
        padding: 4px; 
        background-color: transparent; 
        color: #9b5de5; 
        font-size: 0.9rem; 
        text-align: center; 
        border: none; 
        cursor: pointer;
        transition: color 0.3s ease; 
    }


    .btn-login:hover {
        color: #6a4c9c; 
    }

  p {
    font-size: 14px;
    color: red;
    margin: 5px 0 0;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #eef2f7;
    color: #333;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
</style>
