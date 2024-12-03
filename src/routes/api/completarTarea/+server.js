import jwt from 'jsonwebtoken';

const SECRET_KEY = 'tu_llave_secreta_aqui'; // Debe coincidir con la clave usada en iniciarSesion

export async function POST({ request }) {
    const authHeader = request.headers.get('Authorization');

    // Verificar si el token está presente en los encabezados
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: 'Token no proporcionado' }), { status: 401 });
    }

    const token = authHeader.split(' ')[1]; // Extraer el token

    try {
        // Verificar el token con la clave secreta
        const decoded = jwt.verify(token, SECRET_KEY);

        // Si el token es válido, procesar la lógica de la API
        const { completado, id } = await request.json();

        let response = await fetch('http://13.58.249.92:8000/completarTarea', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completado, id })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la tarea desde el API externo');
        }

        const resultado = await response.json();
        return new Response(JSON.stringify(resultado), { status: 200 });

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return new Response(JSON.stringify({ error: 'Token inválido' }), { status: 403 });
        } else if (error.name === 'TokenExpiredError') {
            return new Response(JSON.stringify({ error: 'Token expirado' }), { status: 403 });
        } else {
            console.error('Error:', error);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }
    }
}