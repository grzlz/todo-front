import jwt from 'jsonwebtoken';

const SECRET_KEY = 'tu_llave_secreta_aqui'; // Cambia esto por una clave segura y mantenla confidencial

export async function POST({ request }) {
    const { correo, password } = await request.json();

    try {
        // Paso 1: Autenticar al usuario con la API existente
        const authResponse = await fetch('http://18.227.26.255:8000/autenticarUsuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, password })
        });

        if (!authResponse.ok) {
            if (authResponse.status === 401) {
                return new Response(JSON.stringify({ error: 'Credenciales incorrectas' }), { status: 401 });
            } else {
                throw new Error('Error al autenticar al usuario en el API externo');
            }
        }

        // Paso 2: Extraer información del usuario autenticado
        const { userId } = await authResponse.json();

        // Paso 3: Generar el JWT
        const token = jwt.sign(
            { id }, // Información del usuario que queremos incluir
            SECRET_KEY,                       // Clave secreta para firmar el token
            { expiresIn: '1h' }               // Tiempo de expiración del token
        );

        // Paso 4: Devolver el token al cliente
        return new Response(JSON.stringify({ token }), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
