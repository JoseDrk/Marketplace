document.addEventListener("DOMContentLoaded", async function () {
    const tbody = document.getElementById("usuarios-body");

    try {
        const response = await fetch("http://127.0.0.1:3000/users"); // Llamamos al endpoint
        const users = await response.json();

        users.forEach(user => {
            const row = document.createElement("tr");
            row.innerHTML = `<td>${user.Id}</td><td>${user.Username}</td>`;
            tbody.appendChild(row);
        });

    } catch (error) {
        console.error("Error al cargar usuarios:", error);
    }
});
