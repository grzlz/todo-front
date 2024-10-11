import pkg from 'pg'
const { Pool } = pkg

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'shalashala',
    port: 5432
})

export async function DELETE({request}) {
    let frontData = await request.json()

    const client = await pool.connect()

    
    const deleteQuery = `DELETE FROM tareas WHERE id=$1`
    const values = [frontData.id]
    const result = await client.query(deleteQuery, values)

    client.release()
    return new Response('Todo bien', {status: 200})
}