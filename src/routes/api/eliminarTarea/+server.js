export async function DELETE({ request }) {
    let frontData = await request.json();  // Parse the incoming JSON to get the id

    console.log(frontData)

    try {
        // Send the DELETE request to the FastAPI backend
        const response = await fetch('http://13.58.249.92:8000/eliminarTarea', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: frontData.id })
        });

        // Handle success or failure based on the FastAPI response
        if (response.ok) {
            return new Response('Todo bien', { status: 200 });
        } else {
            return new Response('Error al eliminar', { status: 400 });
        }
    } catch (error) {
        return new Response('Error del servidor', { status: 500 });
    }
}

