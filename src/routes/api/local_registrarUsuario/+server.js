// +server.js
import pkg from 'pg';
import bcrypt from 'bcryptjs';

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
    const { nombre, apellido, correo_electronico, password } = await request.json();
    let client;

    try {
        // Obtener un cliente de la conexión de pool
        client = await pool.connect();

        // Paso 1: Verificar si el correo ya existe en la base de datos
        const checkQuery = `SELECT correo_electronico FROM usuarios WHERE correo_electronico = $1`;
        const checkResult = await client.query(checkQuery, [correo_electronico]);

        if (checkResult.rows.length > 0) {
            return new Response(JSON.stringify({ error: 'El email ya está en uso' }), { status: 400 });
        }

        // Paso 2: Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Paso 3: Insertar el usuario en la base de datos
        const insertQuery = `INSERT INTO usuarios (nombre, apellido, correo_electronico, password) VALUES ($1, $2, $3, $4)`;
        await client.query(insertQuery, [nombre, apellido, correo_electronico, hashedPassword]);

        return new Response(JSON.stringify({ message: 'Usuario registrado exitosamente' }), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    } finally {
        // Liberar el cliente para que vuelva al pool
        if (client) client.release();
    }
}
