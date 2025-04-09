cargarDesdeLocalStorage();

function agregarTarea(event) {
    event.preventDefault();
    let nombre = document.getElementById("nombre").value;
    if (nombre.trim() === "") return;

    let nuevaTarea = {
        nombre,
        completada: false,
        fechaCreacion: new Date().toISOString(),
        fechaCompletado: null
    };
    tareas.push(nuevaTarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    document.getElementById("nombre").value = "";
    mostrarTareas();
}


function cargarDesdeLocalStorage() {
    const datos = localStorage.getItem("tareas");
    tareas = datos ? JSON.parse(datos) : [];
}


function mostrarTareas() {
    const lista = document.getElementById("taskList");
    lista.innerHTML = "";

    const filtro = document.getElementById("filtro")?.value || "todas";

    const tareasOrdenadas = [...tareas].sort((a, b) => new Date(a.fechaCreacion) - new Date(b.fechaCreacion));

    const tareasFiltradas = tareasOrdenadas.filter(t => {
        if (filtro === "completadas") return t.completada;
        if (filtro === "pendientes") return !t.completada;
        return true; 
    });

    tareasFiltradas.forEach((tarea, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${tarea.completada ? 'completed' : ''}">${tarea.nombre}</span>
            <div>
              <button onclick="completarTarea(${index})">✔</button>
              <button onclick="eliminarTarea(${index})">❌</button>
            </div>
        `;
        lista.appendChild(li);
    });
}

function completarTarea(index) {
    tareas[index].completada = !tareas[index].completada;
    if (tareas[index].completada && !tareas[index].fechaCompletado) {
        tareas[index].fechaCompletado = new Date().toISOString();
    }
    localStorage.setItem('tareas', JSON.stringify(tareas));
    mostrarTareas();
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    mostrarTareas();
}

function eliminarCompletadas() {
    tareas = tareas.filter(tarea => !tarea.completada);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    mostrarTareas();
}

function calcularTareaMasRapida() {
    const tareasCompletadas = tareas.filter(t => t.completada && t.fechaCompletado && t.fechaCreacion);

    if (tareasCompletadas.length === 0) {
        alert("No hay tareas completadas aún.");
        return;
    }

    const tareaMasRapida = tareasCompletadas.reduce((masRapida, tarea) => {
        const duracionActual = new Date(tarea.fechaCompletado) - new Date(tarea.fechaCreacion);
        const duracionMasRapida = new Date(masRapida.fechaCompletado) - new Date(masRapida.fechaCreacion);
        return duracionActual < duracionMasRapida ? tarea : masRapida;
    });

    alert(`La tarea más rápida fue "${tareaMasRapida.nombre}" y se completó en ${(new Date(tareaMasRapida.fechaCompletado) - new Date(tareaMasRapida.fechaCreacion)) / 1000} segundos.`);
}

document.getElementById("TareasForm").addEventListener("submit", agregarTarea);

window.onload = function() {
    mostrarTareas();
};