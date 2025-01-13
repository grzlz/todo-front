// +server.js
import pkg from 'pg';

const { Pool } = pkg;

// Configura el Pool de conexiones para PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'shalashala',
    port: 5432
});

export async function POST({ request }) {
    const { correo, password } = await request.json();
    let client;

    try {
        // Obtener un cliente de la conexión de pool
        client = await pool.connect();

        // Paso 1: Verificar si el correo y contraseña coinciden en la base de datos
        const findUserQuery = `
            SELECT * 
            FROM usuarios 
            WHERE correo_electronico = $1 AND password = $2
        `;
        const userResult = await client.query(findUserQuery, [correo, password]);

        if (userResult.rows.length === 0) {
            return new Response(JSON.stringify({ error: 'Correo electrónico o contraseña incorrectos' }), { status: 401 });
        }

        // Paso 2: Generar la respuesta exitosa
        return new Response(JSON.stringify({ message: 'Inicio de sesión exitoso' }), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        // Liberar el cliente para que vuelva al pool
        if (client) client.release();
    }
}
