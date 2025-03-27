let tareas = [];

function agregarTarea(event) {
    event.preventDefault();
    let nombre = document.getElementById("nombre").value;
    if (nombre.trim() === "") return;
    tareas.push({ nombre, completada: false });
    document.getElementById("nombre").value = "";
    mostrarTareas();
}

function mostrarTareas() {
    let lista = document.getElementById("taskList");
    lista.innerHTML = "";
    for (let i = 0; i < tareas.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = `
            <span class="${tareas[i].completada ? 'completed' : ''}">${tareas[i].nombre}</span>
            <button onclick="completarTarea(${i})">✔</button>
            <button onclick="eliminarTarea(${i})">❌</button>
        `;
        lista.appendChild(li);
    }
}

function completarTarea(index) {
    tareas[index].completada = !tareas[index].completada;
    mostrarTareas();
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    mostrarTareas();
}

function eliminarCompletadas() {
    let nuevasTareas = [];
    for (let i = 0; i < tareas.length; i++) {
        if (!tareas[i].completada) {
            nuevasTareas.push(tareas[i]);
        }
    }
    tareas = nuevasTareas;
    mostrarTareas();
}

document.getElementById("TareasForm").addEventListener("submit", agregarTarea);