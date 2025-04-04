document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('La respuesta no es JSON');
        }

        const result = await response.json();
        alert(result.message || result.error || 'Error desconocido');
    } catch (error) {
        alert('Error al registrar: ' + error.message);
        console.error('Error al registrar:', error);
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError('La respuesta no es JSON');
        }

        const result = await response.json();
        if (result.message) {
            alert(result.message);
            window.location.href = '/dashboard'; // Redirigir a dashboard
        } else {
            alert(result.error || 'Error desconocido');
        }
    } catch (error) {
        alert('Error al iniciar sesión: ' + error.message);
        console.error('Error al iniciar sesión:', error);
    }
});