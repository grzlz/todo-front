import jwt from 'jsonwebtoken';

const SECRET_KEY = 'tu_llave_secreta_aqui'; // Asegúrate de usar la misma clave que en iniciarSesion

export async function POST({ request }) {
    const authHeader = request.headers.get('Authorization');

    // Validar la presencia del token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: 'Token no proporcionado' }), { status: 401 });
    }

    const token = authHeader.split(' ')[1]; // Extraer el token

    try {
        // Verificar la validez del token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Lógica para agregar tarea
        const frontData = await request.json(); // Datos enviados desde el frontend
        const response = await fetch('http://13.58.249.92:8000/agregarTarea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(frontData)
        });

        if (!response.ok) {
            throw new Error('Error al agregar la tarea en el backend');
        }

        return new Response('Todo bien', { status: 200 });
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