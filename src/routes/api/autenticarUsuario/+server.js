export async function POST({ request }) {
    const { correo, password } = await request.json();

    try {
        let authResponse = await fetch('http://18.227.26.255:8000/autenticarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, password })
        });
      
        if (!authResponse.ok) {
            if (authResponse.status === 401) {
                return new Response(JSON.stringify({ error: 'Credenciales incorrectas' }), { status: 401 });
            } else {
                throw new Error('Error al autenticar al usuario en el API externo');
            }
        }

        let resultado = await authResponse.json();

        return new Response(JSON.stringify(resultado), { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
