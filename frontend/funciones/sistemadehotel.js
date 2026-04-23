const API = "http://localhost:3000";


function mostrarMensaje(texto, tipo = "success") {
    const div = document.getElementById("mensaje");

    div.innerHTML = `
        <div class="alert alert-${tipo}">
            ${texto}
        </div>
    `;

    setTimeout(() => {
        div.innerHTML = "";
    }, 3000);
}



async function cargarClientes() {
    try {
        const res = await fetch(`${API}/clientes`);
        const data = await res.json();

        const tabla = document.getElementById("tablaclientes");
        tabla.innerHTML = "";

        if (data.length === 0) {
            tabla.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center">
                        No hay clientes
                    </td>
                </tr>
            `;
            return;
        }

        data.forEach(c => {
            tabla.innerHTML += `
                <tr>
                    <td>${c.id}</td>
                    <td>${c.username}</td>
                    <td>${c.email}</td>
                    <td>
                        <button class="btn btn-danger btn-sm"
                            onclick="eliminarCliente(${c.id})">
                            Eliminar
                        </button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.log(error);
        mostrarMensaje("Error cargando clientes", "danger");
    }
}


async function crearCliente() {
    try {
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();

        if (!username || !email) {
            mostrarMensaje("Completa todos los campos", "warning");
            return;
        }

        const res = await fetch(`${API}/clientes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email })
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.mensaje || "Error creando cliente");
        }

        document.getElementById("username").value = "";
        document.getElementById("email").value = "";

        mostrarMensaje("Cliente creado correctamente", "success");

        cargarClientes();

    } catch (error) {
        console.log(error);
        mostrarMensaje(error.message, "danger");
    }
}


async function eliminarCliente(id) {
    try {
        if (!confirm("¿Seguro que quieres eliminar este cliente?")) return;

        const res = await fetch(`${API}/clientes/${id}`, {
            method: "DELETE"
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.mensaje || "Error eliminando cliente");
        }

        mostrarMensaje("Cliente eliminado", "success");

        cargarClientes();

    } catch (error) {
        console.log(error);
        mostrarMensaje(error.message, "danger");
    }
}


document.addEventListener("DOMContentLoaded", cargarClientes);