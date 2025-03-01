export async function GET() {

    let response = await fetch('http://18.227.26.255:8000/obtenerDatos')
    let datos = await response.json()

    return new Response(JSON.stringify(datos),{status: 200})
} 
