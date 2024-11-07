import bcrypt from 'bcryptjs';

export async function POST({ request }) {
    const { nombre, apellido, correo_electronico, contraseña } = await request.json();

    try {
        // Paso 1: Verificar que el username y el email no estén registrados
        let checkResponse = await fetch('http://13.58.249.92:8000/verificarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo_electronico })
        });

        if (!checkResponse.ok) {
            throw new Error('Error al verificar el usuario en el API externo');
        }

        let { emailExists } = await checkResponse.json();

        
        if (emailExists) {
            return new Response(JSON.stringify({ error: 'El email ya está en uso' }), { status: 400 });
        }

        // Paso 2: Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(contraseña, 10);

        // Paso 3: Registrar el usuario en la API de AWS
        let registerResponse = await fetch('http://13.58.249.92:8000/registrarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellido, correo_electronico, contraseña: hashedPassword })
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