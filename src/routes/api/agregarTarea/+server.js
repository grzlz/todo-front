import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'shalashala',
    port: 5432
})

export async function POST({request}) {
    let frontData = await request.json()

    const client = await pool.connect()

    
    const insertQuery = `INSERT INTO tareas(nombre_tarea, completado) VALUES($1, $2)`
    const values = [frontData.nombre_tarea, frontData.completado]
    const result = await client.query(insertQuery, values)

    client.release()
    return new Response('Todo bien', {status: 200})
}