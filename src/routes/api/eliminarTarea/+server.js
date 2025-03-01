import jwt from 'jsonwebtoken';

const SECRET_KEY = 'tu_llave_secreta_aqui'; // Asegúrate de usar la misma clave que en iniciarSesion

export async function DELETE({ request }) {
    const authHeader = request.headers.get('Authorization');

    // Validar la presencia del token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return new Response(JSON.stringify({ error: 'Token no proporcionado' }), { status: 401 });
    }

    const token = authHeader.split(' ')[1]; // Extraer el token

    try {
        // Verificar la validez del token
        const decoded = jwt.verify(token, SECRET_KEY);

        // Extraer datos de la solicitud
        const frontData = await request.json(); // Datos enviados desde el frontend
        const response = await fetch('http://18.227.26.255:8000/eliminarTarea', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: frontData.id }) // Asegúrate de que el backend espera este formato
        });

        if (!response.ok) {
            return new Response(JSON.stringify({ error: 'Error al eliminar la tarea' }), { status: response.status });
        }

        return new Response('Tarea eliminada con éxito', { status: 200 });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return new Response(JSON.stringify({ error: 'Token inválido' }), { status: 403 });
        } else if (error.name === 'TokenExpiredError') {
            return new Response(JSON.stringify({ error: 'Token expirado' }), { status: 403 });
        } else {
            console.error('Error del servidor:', error);
            return new Response(JSON.stringify({ error: 'Error del servidor' }), { status: 500 });
        }
    }
}
