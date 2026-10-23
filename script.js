
"use strict";

/* =====================================
   BASE DE DATOS DE MODALIDADES
===================================== */

const modalidades = [
  {
    id: "m0",
    titulo: "Tesis",
    categoria: "Investigación y textos",
    descripcion: "Convierte preguntas en respuestas.",
    imagen: "Imagenes/Tesis.webp",
    enlace: "https://canva.link/cj9hv4rwcxs5gph"
  },
  {
    id: "m1",
    titulo: "Texto publicado",
    categoria: "Investigación y textos",
    descripcion: "Comparte tu conocimiento con el mundo.",
    imagen: "Imagenes/Texto Publicado.jpg",
    enlace: "https://canva.link/g6x1ipixqmpnsmt"
  },
  {
    id: "m2",
    titulo: "Tesina",
    categoria: "Investigación y textos",
    descripcion: "Ideas claras, resultados concretos.",
    imagen: "Imagenes/Tesina.jpg",
    enlace: "https://canva.link/i96hsa5s90qt6ml"
  },
  {
    id: "m3",
    titulo: "Recuperación de experiencia profesional",
    categoria: "Trayectorias",
    descripcion: "Tu experiencia, tu título.",
    imagen: "Imagenes/Recuperación de experiencia Laboral.webp",
    enlace: "https://canva.link/jqi0upaxokaojqh"
  },
  {
    id: "m4",
    titulo: "Historia de vida",
    categoria: "Trayectorias",
    descripcion: "Tu trayectoria contada de manera única.",
    imagen: "Imagenes/Historia de vida.jpg",
    enlace: "https://canva.link/0lv48c4l5itky85"
  },
  {
    id: "m5",
    titulo: "Análisis de testimonio",
    categoria: "Investigación y textos",
    descripcion: "Profundiza en cada voz.",
    imagen: "Imagenes/Analisis de testimonio.jpg",
    enlace: "https://canva.link/xt059bhx7h5y90q"
  },
  {
    id: "m6",
    titulo: "Trayectoria formativa",
    categoria: "Trayectorias",
    descripcion: "Refleja todo lo aprendido.",
    imagen: "Imagenes/Trayectoria formativa.jpeg",
    enlace: "https://canva.link/2mk5l9ay6tiofu1"
  },
  {
    id: "m7",
    titulo: "Ensayo",
    categoria: "Investigación y textos",
    descripcion: "Expresa tus ideas con estilo.",
    imagen: "Imagenes/Ensayo.webp",
    enlace: "https://canva.link/nrvyqc5lu1aqbjd"
  },
  {
    id: "m8",
    titulo: "Monografía",
    categoria: "Investigación y textos",
    descripcion: "Investiga y organiza tu tema.",
    imagen: "Imagenes/Monografia.jpg",
    enlace: "https://canva.link/ed671qng7uxni09"
  },
  {
    id: "m9",
    titulo: "Informe académico",
    categoria: "Investigación y textos",
    descripcion: "Documenta tu conocimiento profesional.",
    imagen: "Imagenes/Informe academico.avif",
    enlace: "https://canva.link/74rtnv7rohihr27"
  },
  {
    id: "m10",
    titulo: "Proyecto de intervención",
    categoria: "Proyectos",
    descripcion: "Actúa y deja huella.",
    imagen: "Imagenes/Proyecto de intervención.png",
    enlace: "https://canva.link/czhwr4ja44ido2l"
  },
  {
    id: "m11",
    titulo: "Proyecto de gestión escolar",
    categoria: "Proyectos",
    descripcion: "Mejora tu entorno educativo.",
    imagen: "Imagenes/Proyecto de gestion escolar.avif",
    enlace: "https://canva.link/fm2coyh96v49jdm"
  },
  {
    id: "m12",
    titulo: "Proyecto pedagógico de acción docente",
    categoria: "Proyectos",
    descripcion: "Innovación en enseñanza.",
    imagen: "Imagenes/Proyecto pedagogico de accion docente.webp",
    enlace: "https://canva.link/to55zu9rmq9ym42"
  },
  {
    id: "m13",
    titulo: "Innovación educativa",
    categoria: "Proyectos",
    descripcion: "Ideas que transforman la educación.",
    imagen: "Imagenes/Innovacion educativa.jpg",
    enlace: "https://canva.link/ntfjfp5xztaapet"
  },
  {
    id: "m14",
    titulo: "Desarrollo educativo",
    categoria: "Proyectos",
    descripcion: "Crecimiento en cada etapa.",
    imagen: "Imagenes/Desarrollo educativo.webp",
    enlace: "https://canva.link/sl3ieq3vcp84533"
  },
  {
    id: "m15",
    titulo: "Trayectoria profesional",
    categoria: "Trayectorias",
    descripcion: "Tu camino reflejado.",
    imagen: "Imagenes/Trayectoria profesional.jpg",
    enlace: "https://canva.link/9x2pomkj2uu5l7b"
  },
  {
    id: "m16",
    titulo: "Informe de intervención",
    categoria: "Proyectos",
    descripcion: "Analiza acciones reales y mejora la gestión educativa.",
    imagen: "Imagenes/Informe de intervencion.avif",
    enlace: "https://canva.link/1amju2gnblm7m38"
  }
];

/* =====================================
   ELEMENTOS DE LA PÁGINA
===================================== */

const grid = document.querySelector("#modeGrid");
const search = document.querySelector("#searchInput");
const chips = [...document.querySelectorAll(".chip")];
const count = document.querySelector("#resultCount");
const empty = document.querySelector("#emptyState");
const toast = document.querySelector("#toast");

let filtroActual = "Todas";

/* =====================================
   ALMACENAMIENTO LOCAL
===================================== */

const storage = {
  get(clave, defecto) {
    try {
      return JSON.parse(localStorage.getItem(clave)) ?? defecto;
    } catch {
      return defecto;
    }
  },

  set(clave, valor) {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      // El sitio continúa funcionando sin almacenamiento.
    }
  }
};

let favoritos = new Set(
  storage.get("rumbo-favorites", [])
);

/* =====================================
   NOTIFICACIONES
===================================== */

function notificar(mensaje) {
  toast.textContent = mensaje;
  toast.classList.add("show");

  clearTimeout(notificar.temporizador);

  notificar.temporizador = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

/* =====================================
   GENERAR TARJETAS
===================================== */

function generarTarjetas() {
  grid.replaceChildren();

  modalidades.forEach(modalidad => {
    const tarjeta = document.createElement("article");
    tarjeta.className = "mode-card";
    tarjeta.dataset.id = modalidad.id;
    tarjeta.dataset.category = modalidad.categoria;

    const media = document.createElement("div");
    media.className = "mode-media";

    const imagen = document.createElement("img");
    imagen.src = modalidad.imagen;
    imagen.alt = `Ilustración de ${modalidad.titulo}`;
    imagen.loading = "lazy";

    const favorito = document.createElement("button");
    favorito.className = "favorite";
    favorito.type = "button";
    favorito.setAttribute(
      "aria-label",
      `Guardar ${modalidad.titulo} en favoritos`
    );

    favorito.addEventListener("click", () => {
      alternarFavorito(modalidad.id);
    });

    media.append(imagen, favorito);

    const cuerpo = document.createElement("div");
    cuerpo.className = "mode-body";

    const categoria = document.createElement("span");
    categoria.className = "tag";
    categoria.textContent = modalidad.categoria;

    const titulo = document.createElement("h3");
    titulo.textContent = modalidad.titulo;

    const descripcion = document.createElement("p");
    descripcion.textContent = modalidad.descripcion;

    const enlace = document.createElement("a");
    enlace.href = modalidad.enlace;
    enlace.target = "_blank";
    enlace.rel = "noopener noreferrer";
    enlace.className = "mode-link";
    enlace.textContent = "Explorar modalidad ↗";

    cuerpo.append(categoria, titulo, descripcion, enlace);
    tarjeta.append(media, cuerpo);
    grid.appendChild(tarjeta);
  });

  actualizarFavoritos();
}

/* =====================================
   FAVORITOS
===================================== */

function actualizarFavoritos() {
  document.querySelectorAll(".mode-card").forEach(tarjeta => {
    const boton = tarjeta.querySelector(".favorite");
    const activo = favoritos.has(tarjeta.dataset.id);

    boton.textContent = activo ? "♥" : "♡";
    boton.setAttribute("aria-pressed", String(activo));
    boton.title = activo
      ? "Quitar de favoritos"
      : "Guardar en favoritos";
  });
}

function alternarFavorito(id) {
  if (favoritos.has(id)) {
    favoritos.delete(id);
    notificar("Modalidad eliminada de favoritos");
  } else {
    favoritos.add(id);
    notificar("Modalidad guardada en favoritos");
  }

  storage.set("rumbo-favorites", [...favoritos]);

  actualizarFavoritos();
  filtrarModalidades();
}

/* =====================================
   BUSCADOR INTELIGENTE
===================================== */

function normalizar(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function filtrarModalidades() {
  const busqueda = normalizar(search.value.trim());
  let visibles = 0;

  document.querySelectorAll(".mode-card").forEach(tarjeta => {
    const modalidad = modalidades.find(
      item => item.id === tarjeta.dataset.id
    );

    const texto = normalizar(
      modalidad.titulo + " " +
      modalidad.categoria + " " +
      modalidad.descripcion
    );

    const coincideTexto = texto.includes(busqueda);

    const coincideCategoria =
      filtroActual === "Todas" ||
      (
        filtroActual === "Favoritas"
          ? favoritos.has(modalidad.id)
          : modalidad.categoria === filtroActual
      );

    const mostrar = coincideTexto && coincideCategoria;

    tarjeta.hidden = !mostrar;

    if (mostrar) visibles++;
  });

  count.textContent = `${visibles} de ${modalidades.length} modalidades`;
  empty.hidden = visibles !== 0;
}

search.addEventListener("input", filtrarModalidades);

/* =====================================
   FILTROS POR CATEGORÍA
===================================== */

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    filtroActual = chip.dataset.filter;

    chips.forEach(boton => {
      const activo = boton === chip;
      boton.classList.toggle("active", activo);
      boton.setAttribute("aria-pressed", String(activo));
    });

    filtrarModalidades();
  });
});

document.querySelector("#clearFilters")
  .addEventListener("click", () => {
    search.value = "";
    chips[0].click();
    search.focus();
  });

/* =====================================
   RUTA DE TITULACIÓN
===================================== */

const pasos = [
  ...document.querySelectorAll("[data-step]")
];

let completados = new Set(
  storage.get("rumbo-steps", [])
);

const barra = document.querySelector("#progressBar");
const relleno = document.querySelector("#progressFill");

function actualizarProgreso() {
  pasos.forEach((paso, indice) => {
    paso.checked = completados.has(indice);
  });

  const total = pasos.length;
  const cantidad = completados.size;
  const porcentaje = Math.round((cantidad / total) * 100);

  document.querySelector("#progressText").textContent =
    `${cantidad} de ${total} pasos`;

  document.querySelector("#progressPercent").textContent =
    `${porcentaje}%`;

  relleno.style.width = `${porcentaje}%`;

  barra.setAttribute("aria-valuenow", cantidad);

  if (cantidad === total) {
    notificar("¡Has marcado todos los pasos de tu ruta!");
  }
}

pasos.forEach((paso, indice) => {
  paso.addEventListener("change", () => {
    if (paso.checked) {
      completados.add(indice);
    } else {
      completados.delete(indice);
    }

    storage.set("rumbo-steps", [...completados]);
    actualizarProgreso();
  });
});

document.querySelector("#resetProgress")
  .addEventListener("click", () => {
    if (completados.size === 0) return;

    const confirmar = confirm(
      "¿Quieres reiniciar tu avance de titulación?"
    );

    if (confirmar) {
      completados.clear();
      storage.set("rumbo-steps", []);
      actualizarProgreso();
      notificar("Progreso reiniciado");
    }
  });

/* =====================================
   MENÚ PARA CELULARES
===================================== */

const navToggle = document.querySelector("#navToggle");
const nav = document.querySelector("#mainNav");

navToggle.addEventListener("click", () => {
  const abierto = nav.classList.toggle("open");

  navToggle.setAttribute(
    "aria-expanded",
    String(abierto)
  );

  navToggle.setAttribute(
    "aria-label",
    abierto ? "Cerrar menú" : "Abrir menú"
  );
});

nav.querySelectorAll("a").forEach(enlace => {
  enlace.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
  });
});

/* =====================================
   INICIAR PÁGINA
===================================== */

generarTarjetas();
filtrarModalidades();
actualizarProgreso();
