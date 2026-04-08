// este archivo es solamente para hacer pruebas

//para hacer pruebas podemos usar la funcion fetch
fetch("http://localhost:3000/clientes", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        username: "Carlos",
        email: "carloscharlie67@gmail.com"
    })
}).then(res => res.json()).then(data => console.log(data));

fetch("http://localhost:3000/habitaciones", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        nombre_habitacion: "Habitación suite junior",
    })
}).then(res => res.json()).then(data => console.log(data));