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

    
    const postQuery = `UPDATE tareas SET completado = $1 WHERE id=$2`
    const values = [frontData.completado, frontData.id]
    const result = await client.query(postQuery, values)

    client.release()
    return new Response('Todo bien', {status: 200})
}