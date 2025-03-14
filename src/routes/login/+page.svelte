<script>
  import { goto } from '$app/navigation';
  
  let email = '';
  let password = '';
  let errorMessage = '';
  let fieldErrors = { email: '', password: '' };

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
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        errorMessage =
          error.message || 'Error al autenticar. Por favor, inténtalo de nuevo.';
      } else {
        console.log('Inicio de sesión exitoso.');
        errorMessage = '';
        goto('/');
      }
    } catch (error) {
      errorMessage = 'Hubo un problema al conectar con el servidor.';
    }
  };
</script>

<main>
  <section class="container">
    <div class="left-panel">
      <h2>Recuerda siempre lo importante con</h2>
      <h1>To Do App</h1>
      <div class="image-panel">
        <img src="lista.jpg" alt="App en acción" class="phone-image" />
      </div>
      <p class="subtitle">
        por <a href="https://www.icarus.mx/" target="_blank" rel="noopener noreferrer">icarus.mx</a>
      </p>
    </div>

    <div class="right-panel">
      <h2>Inicia sesión</h2>
      <p>Es rápido y sencillo</p>
      <form on:submit|preventDefault={handleSubmit}>
        <input type="email" placeholder="Correo electrónico" bind:value={email} />
        {#if fieldErrors.email}
          <p class="error-message">{fieldErrors.email}</p>
        {/if}

        <input type="password" placeholder="Contraseña" bind:value={password} />
        {#if fieldErrors.password}
          <p class="error-message">{fieldErrors.password}</p>
        {/if}

        <button type="submit">Iniciar sesión</button>

        {#if errorMessage}
          <p class="error-message">{errorMessage}</p>
        {/if}
      </form>

      <p class="login-link">¿No tienes una cuenta? <a href="/registro">Regístrate</a></p>
    </div>
  </section>
</main>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');

  body {
    margin: 0;
    background-color: #f0f2f5;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .container {
    display: flex;
    max-width: 950px;
    width: 90%;
    background: #ffffff;
    border-radius: 5%;
    overflow: hidden;
    flex-wrap: wrap;
    margin-top: 50px;
  }

  .left-panel {
    flex: 1;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 40px;
    text-align: center;
  }

  .left-panel h1 {
    font-size: 5rem;
    margin-bottom: 20px;
    font-family: 'Dancing Script', cursive;
  }

  .left-panel h2 {
    font-size: 1rem;
    margin: 10px 0;
    font-family: 'Georgia', 'Times New Roman', Times, serif;
  }

  .phone-image {
    width: 250px;
    border-radius: 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transform: rotate(-10deg);
    animation: float 5s ease-in-out infinite;
    margin-bottom: 10px;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0) rotate(-3deg);
    }
    50% {
      transform: translateY(-10px) rotate(-1deg);
    }
  }

  .right-panel {
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .right-panel h2 {
    font-size: 1.4rem;
    font-family: 'Georgia, 'Times New Roman', Times, serif';
    color: #333;
    margin-bottom: 10px;
    text-align: center;
  }

  .right-panel p {
    font-size: 0.9rem;
    font-family:'Georgia, 'Times New Roman', Times, serif';
    color: #333;
    margin-bottom: 23px;
    text-align: center;
  }

  input {
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 0.9rem;
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: #1889f2;
    color: white;
    border: none;
    border-radius: 15px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 20px;
  }

  button:hover {
    background-color: #0adb49;
  }

  .error-message {
    font-size: 0.9rem;
    color: red;
    margin-top: 5px;
  }

  .login-link {
    text-align: center;
    margin-top: 20px;
  }

  .login-link a {
    color: #1877f2;
    text-decoration: none;
  }

  .login-link a:hover {
    text-decoration: underline;
  }

  @media (max-width: 780px) {
    .container {
      flex-direction: column;
    }

    .left-panel {
      padding: 20px;
    }

    .right-panel {
      padding: 20px;
    }
  }
</style>