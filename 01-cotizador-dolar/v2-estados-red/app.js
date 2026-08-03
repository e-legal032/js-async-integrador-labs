// ==========================================
// 1. CAPA DE DIBUJO Y MANIPULACIÓN DEL DOM
// ==========================================

/**
 * Crea una tarjeta HTML en RAM a partir de un objeto cotizacion.
 */
const crearTarjetaCotizacion = (cotizacion) => {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta-dolar");

  const titulo = document.createElement("h2");
  titulo.textContent = `Dólar ${cotizacion.nombre}`;

  const contenedorPrecios = document.createElement("div");
  contenedorPrecios.classList.add("precios");

  const parrafoCompra = document.createElement("p");
  parrafoCompra.textContent = `Compra: $${cotizacion.compra}`;

  const parrafoVenta = document.createElement("p");
  parrafoVenta.textContent = `Venta: $${cotizacion.venta}`;

  contenedorPrecios.append(parrafoCompra, parrafoVenta);

  const horaTexto = new Date(cotizacion.fechaActualizacion).toLocaleTimeString();
  const fecha = document.createElement("small");
  fecha.textContent = `Actualizado: ${horaTexto}`;

  tarjeta.append(titulo, contenedorPrecios, fecha);

  return tarjeta;
};

/**
 * Dibuja el array completo de cotizaciones en el contenedor.
 */
const renderizarCotizaciones = (listaCotizaciones, contenedor) => {
  contenedor.textContent = "";

  listaCotizaciones.forEach((cotizacion) => {
    const tarjetaNodo = crearTarjetaCotizacion(cotizacion);
    contenedor.appendChild(tarjetaNodo);
  });
};

// ==========================================
// 2. FUNCIONES DE CONTROL DE ESTADOS VISUALES
// ==========================================

/**
 * Maneja la visibilidad de las capas en pantalla según el estado actual.
 */
const cambiarEstadoUI = (estado, UI) => {
  // Ocultamos todos los paneles primero para limpiar el escenario
  UI.cargando.classList.add("oculto");
  UI.mensajeError.classList.add("oculto");
  
  if (estado === "CARGANDO") {
    UI.cargando.classList.remove("oculto");
    UI.contenedor.textContent = ""; // Limpiamos tarjetas viejas si las hubiera
    UI.btnCargar.disabled = true;  // Bloqueamos el botón para evitar doble clic
  } 
  else if (estado === "EXITO") {
    UI.btnCargar.disabled = false;
  } 
  else if (estado === "ERROR") {
    UI.mensajeError.classList.remove("oculto");
    UI.btnCargar.disabled = false;
  }
};

// ==========================================
// 3. CAPA DE RED / ASINCRONÍA (API REST)
// ==========================================

/**
 * Gestiona la petición a la API manejando los estados de Carga, Éxito y Error.
 */
const obtenerCotizaciones = async (UI) => {
  // PASO A: Activamos el estado visual de "CARGANDO"
  cambiarEstadoUI("CARGANDO", UI);

  try {
    const respuesta = await fetch("https://dolarapi.com/v1/dolares");

    // Si el servidor responde con un status fuera del rango 200-299 (ej: 404 o 500)
    if (!respuesta.ok) {
      throw new Error(`Respuesta de red no válida: HTTP Status ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    
    // PASO B: Dibujamos los datos y activamos el estado "EXITO"
    renderizarCotizaciones(datos, UI.contenedor);
    cambiarEstadoUI("EXITO", UI);

  } catch (error) {
    // PASO C: Capturamos cualquier fallo de red y activamos el estado "ERROR"
    console.error("Detalle técnico del fallo:", error);
    
    UI.textoError.textContent = `No se pudieron cargar las cotizaciones (${error.message}). Por favor, reintentá en unos momentos.`;
    cambiarEstadoUI("ERROR", UI);
  }
};

// ==========================================
// 4. INICIALIZACIÓN DE LA APLICACIÓN (DOM)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Empaquetamos las referencias del DOM en un objeto UI para pasarlas fácilmente
  const UI = {
    btnCargar: document.querySelector("#btnCargar"),
    contenedor: document.querySelector("#contenedorCotizaciones"),
    cargando: document.querySelector("#cargando"),
    mensajeError: document.querySelector("#mensajeError"),
    textoError: document.querySelector("#textoError")
  };

  // Asignamos el evento al botón
  UI.btnCargar.addEventListener("click", () => {
    obtenerCotizaciones(UI);
  });
});
