export async function POST({ request }) {
    const { completado, id } = await request.json();

    try {
        // Hacer la solicitud POST al API en la instancia de AWS
        let response = await fetch('http://13.58.249.92:8000/completarTarea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completado, id })
        });

        // Verificar si la solicitud fue exitosa
        if (!response.ok) {
            throw new Error('Error al actualizar la tarea desde el API externo');
        }

        // Retornar la respuesta del API externo
        let resultado = await response.json();

        return new Response(JSON.stringify(resultado), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}