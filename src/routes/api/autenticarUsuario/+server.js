import jwt from 'jsonwebtoken';

const SECRET_KEY = 'tu_llave_secreta_aqui';

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

        if(authResponse.ok) {
            const user = await authResponse.json();

            const token = jwt.sign({
                userId: user.id},
                SECRET_KEY,
                { expiresIn: '1h' }
            )

            console.log(token)
            return new Response(JSON.stringify({ token }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            
        }
        else {
            // Mock authentication failed
            return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
        }
    } catch (error) {
        console.error('Error:', error);
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
