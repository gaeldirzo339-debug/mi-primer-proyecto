const formulario = document.getElementById("formulario");
const input = document.getElementById("nueva-tarea");
const lista = document.getElementById("lista");
const contador = document.getElementById("contador");

const STORAGE_KEY = "tareas";

// Carga las tareas guardadas en el navegador
let tareas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function guardar() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
}

function mostrar() {
  lista.innerHTML = "";

  tareas.forEach((tarea, indice) => {
    const li = document.createElement("li");
    if (tarea.completada) {
      li.classList.add("completada");
    }

    const texto = document.createElement("span");
    texto.textContent = tarea.texto;
    texto.addEventListener("click", () => alternarTarea(indice));

    const borrar = document.createElement("button");
    borrar.textContent = "✕";
    borrar.title = "Borrar tarea";
    borrar.addEventListener("click", () => borrarTarea(indice));

    li.append(texto, borrar);
    lista.appendChild(li);
  });

  const pendientes = tareas.filter((t) => !t.completada).length;
  contador.textContent =
    tareas.length === 0
      ? "No tienes tareas. ¡Agrega una!"
      : `Tareas pendientes: ${pendientes} de ${tareas.length}`;
}

function agregarTarea(texto) {
  tareas.push({ texto, completada: false });
  guardar();
  mostrar();
}

function alternarTarea(indice) {
  tareas[indice].completada = !tareas[indice].completada;
  guardar();
  mostrar();
}

function borrarTarea(indice) {
  tareas.splice(indice, 1);
  guardar();
  mostrar();
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  const texto = input.value.trim();
  if (texto === "") return;

  agregarTarea(texto);
  input.value = "";
  input.focus();
});

mostrar();
