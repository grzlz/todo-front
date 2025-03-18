<script>
    import { goto } from '$app/navigation'; 
    let nombre = "";
    let apellido = "";
    let correo = "";
    let password = "";
    let warnings = [];

    let emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let validacion = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    async function registrar() {
        warnings = [];

        if (nombre.length === 0) {
            warnings.push("No ha puesto su nombre");
        }
        if (apellido.length === 0) {
            warnings.push("No ha puesto su apellido");
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
                        password,
                    }),
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Registro exitoso:', result);
                    alert("Registro exitoso. Por favor, inicie sesión para continuar.");
                    goto('/login'); 

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
    <section class="container">
        <div class="left-panel">
            <h7>Organiza tu vida con</h7>
            <h1>To Do App</h1>
            <p1>Te ayudamos con el registro de tus tareas y la organización de tus prioridades. ¡Para que nunca olvides lo importante! </p1>
            <p1>¿Quieres conocer qué tanto avanzas en tus tareas? ¡También te lo decimos! </p1>
            <div class="image-panel"> 
                <img src= "lista.jpg" alt="App en acción" class="phone-image">
            </div>
            <p2 class="subtitle">
                por <a href="https://www.icarus.mx/" target="_blank" rel="noopener noreferrer">icarus.mx</a>
              </p2>

        </div>

        <div class="right-panel">
            <div class="image-panel2"> 
                <img src= "analytics.jpeg" alt="App en acción" class="phone-image2">
            </div>
            <h2>Crea una cuenta</h2>
            <h10>Es fácil, rápido y gratis</h10>

            <input type="text" placeholder="Nombre" bind:value={nombre}>
            <input type="text" placeholder="Apellido" bind:value={apellido}>
            <input type="email" placeholder="Correo" bind:value={correo}>
            <input type="password" placeholder="Contraseña" bind:value={password}>
            <button type="button" on:click={registrar}>Registrar</button>

            <ul>
                {#each warnings as warning}
                <li>{warning}</li>
                {/each}
            </ul>
            <p class="login-link">¿Ya tienes cuenta? <a href="/login">Inicia sesión</a></p>
        </div>
    </section>
</main>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');

    body {
        margin: 10;
        background-color: #f0f2f5;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 1000vh;
    }
   
    .container {
    display: flex;
    max-width: 950px;
    width: 90%;
    background: rgb(255, 255, 255);
    border-radius: 5%;
    overflow: hidden;
    flex-wrap: wrap; 
    margin-top: 50px;
}

.left-panel {
    flex: 1;
    background-color: #ffffff;
    color: rgb(255, 255, 255);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex;
    padding: 0px;
    text-align: center;
}

.image-panel {
    flex: 1; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 20px;
}

.phone-image {
        position:relative;
        width: 250px;
        border-radius: 15px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        transform: rotate(10deg);
        animation: float 5s ease-in-out infinite;
        margin-bottom: 10px;
    }
    
    .phone-image:nth-child(2) {
        transform: rotate(10deg);
        animation-delay: 2s;
    }


.form-panel {
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

@keyframes float {
        0%, 100% {
            transform: translateY(0) rotate(-1  0deg);
        }
        50% {
            transform: translateY(-10px) rotate(-10deg);
        }
    }
     
    .form-panel {
        flex: 1;
        padding: 40px;
        display:flex;
        flex-direction:column-reverse;
        justify-content: center;
    }

    .left-panel {
        flex: 5px;
        background-color: #ffffff;
        color: rgba(0, 0, 0, 0.863);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 90px;
        text-align: center;
    }

    .left-panel h1 {
        font-size: 5rem;
        margin-bottom: 10px;
        font-family:'Dancing Script', cursive;
    }

    .left-panel h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
        margin-top: 5px;
        font-family:'Georgia, 'Times New Roman', Times, serif';
    }

    .left-panel p1 {
        font-size: 1rem;
        margin-left: 5px;
        margin-right: 5px;
        margin-bottom: 1rem;
        font-family:'Georgia, 'Times New Roman', Times, serif';
    }

    .left-panel p2 {
        font-size: 0.8rem;
        margin-left: 5px;
        margin-right: 10px;
        font-family:'Georgia, 'Times New Roman', Times, serif';
        margin-bottom: 30px;
    }

    .right-panel {
        flex: 1;
        padding: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .phone-image2 {
        position:relative;
        width: 370px;
        border-radius: 15px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        transform: rotate(10deg);
        animation: float 5s ease-in-out infinite;
        margin-bottom: 10px;
    }
    
    .phone-image:nth-child(2) {
        transform: rotate(-10deg);
        animation-delay: 2s;
    }

    .right-panel h2 {
        font-size: 1.4rem;
        font-family:'Georgia, 'Times New Roman', Times, serif';
        color: #333;
        margin-top: 40px;
        text-align: center;
    }

    .right-panel h10{
        font-size: 0.9rem;
        font-family:'Georgia, 'Times New Roman', Times, serif';
        color: #333;
        margin-bottom: 20px;
        margin-top: 5px;
        text-align:center;
    }

    input { 
        width: 80%;
        padding: 7.5px;
        margin: 4px 0;
        border: 1.3px solid #ccc;
        border-radius: 5px;
        font-size: 0.9rem;
        margin-left: 30px;
    }

    button {
        width: 100%;
        padding: 5px;
        background-color: #1889f2;
        color: white;
        border: none;
        border-radius: 15px;
        font-size: 1rem;
        cursor: pointer;
        margin-top: 40px;
    }

    button:hover {
        background-color: #0adb49;
    }

    ul {
        list-style: none;
        padding: 0;
        margin-top: 10px;
    }

    ul li {
        color: red;
        font-size: 0.9rem;
    }

    .login-link {
        text-align: center;
        margin-top: 20px;
    }

    .login-link a {
        color: #1877f2;
        text-decoration:dashed;
    }

    .login-link a:hover {
        text-decoration: underline;
    }

    @media (max-width: 780px) {
        .container {
            flex-direction: column;
        }

        .left-panel {
            padding: 100px;
        }

        .right-panel {
            padding: 10px;
        }
    }
</style>
