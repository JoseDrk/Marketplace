// Crear usuario
document.getElementById('createUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    console.log('Enviando datos (Crear Usuario):', { username, password });

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const result = await response.json();
        console.log('Respuesta del servidor (Crear Usuario):', result);
        alert(result.message || result.error);
        fetchUsers();
    } catch (error) {
        console.error('Error en Crear Usuario:', error);
    }
});
// Actualizar usuario
document.getElementById('updateUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = Number(document.getElementById('userId').value);
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;

    console.log('Enviando datos (Actualizar Usuario):', { userId, username, password });

    try {
        const response = await fetch(`/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const result = await response.json();
        console.log('Respuesta del servidor (Actualizar Usuario):', result);
        alert(result.message || result.error);
        fetchUsers();
    } catch (error) {
        console.error('Error en Actualizar Usuario:', error);
    }
});

// Eliminar usuario
document.getElementById('deleteUserForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const userId = Number(document.getElementById('deleteUserId').value);

    console.log('Enviando solicitud para eliminar usuario con ID:', userId);

    try {
        const response = await fetch(`/delete/${userId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const result = await response.json();
        console.log('Respuesta del servidor (Eliminar Usuario):', result);
        alert(result.message || result.error);
        fetchUsers();
    } catch (error) {
        console.error('Error en Eliminar Usuario:', error);
    }
});

// Obtener usuarios
async function fetchUsers() {
    const response = await fetch('/users');
    const users = await response.json();

    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `ID: ${user.Id}, Nombre de usuario: ${user.Username}`;
        userList.appendChild(li);
    });
}

// Cargar usuarios al cargar la página
async function fetchUsers() {
    try {
        const response = await fetch('/users');

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        }

        const users = await response.json();
        console.log('Usuarios obtenidos del servidor:', users);

        const userList = document.getElementById('userList');
        userList.innerHTML = '';

        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `ID: ${user.id}, Nombre de usuario: ${user.username}`;
            userList.appendChild(li);
        });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
    }
}