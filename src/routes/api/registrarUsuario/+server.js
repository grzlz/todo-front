
export async function POST({ request }) {
    const { nombre, apellido, correo, password } = await request.json();
    console.log('Datos recibidos:', { nombre, apellido, correo, password });

    try {
        // Paso 1: Verificar que el username y el email no estén registrados
        let checkResponse = await fetch('http://18.227.26.255:8000/verificarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo })
        });

        if (!checkResponse.ok) {
            throw new Error('Error al verificar el usuario en el API externo');
        }

        let { emailExists } = await checkResponse.json();

        
        if (emailExists) {
            return new Response(JSON.stringify({ error: 'El email ya está en uso' }), { status: 400 });
        }


        // Paso 2: Registrar el usuario en la API de AWS
        let registerResponse = await fetch('http://18.227.26.255:8000/registrarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellido, correo, password })
        });

        if (!registerResponse.ok) {
            throw new Error('Error al registrar el usuario en el API externo');
        }

        let resultado = await registerResponse.json();

        return new Response(JSON.stringify(resultado), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
