// ==========================================
// 1. CAPA DE DIBUJO Y MANIPULACIÓN DEL DOM
// ==========================================

/**
 * Recibe un objeto 'cotizacion' y construye el nodo <article> en memoria RAM.
 */
const crearTarjetaCotizacion = (cotizacion) => {
  // A. Creación del contenedor principal de la tarjeta
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta-dolar");

  // B. Creación del título (<h2>)
  const titulo = document.createElement("h2");
  titulo.textContent = `Dólar ${cotizacion.nombre}`;

  // C. Creación del contenedor de precios
  const contenedorPrecios = document.createElement("div");
  contenedorPrecios.classList.add("precios");

  const parrafoCompra = document.createElement("p");
  parrafoCompra.textContent = `Compra: $${cotizacion.compra}`;

  const parrafoVenta = document.createElement("p");
  parrafoVenta.textContent = `Venta: $${cotizacion.venta}`;

  contenedorPrecios.append(parrafoCompra, parrafoVenta);

  // D. Creación de la fecha de actualización (<small>)
  const horaTexto = new Date(cotizacion.fechaActualizacion).toLocaleTimeString();
  const fecha = document.createElement("small");
  fecha.textContent = `Actualizado: ${horaTexto}`;

  // E. Ensamblado final dentro de la tarjeta
  tarjeta.append(titulo, contenedorPrecios, fecha);

  return tarjeta;
};

/**
 * Recibe la lista completa de cotizaciones y limpia/dibuja el contenedor del DOM.
 */
const renderizarCotizaciones = (listaCotizaciones, contenedor) => {
  // Limpiamos el contenido previo del nodo
  contenedor.textContent = "";

  // Recorremos la lista, creamos cada tarjeta y la acoplamos al DOM
  listaCotizaciones.forEach((cotizacion) => {
    const tarjetaNodo = crearTarjetaCotizacion(cotizacion);
    contenedor.appendChild(tarjetaNodo);
  });
};

// ==========================================
// 2. CAPA DE RED / ASINCRONÍA (API REST)
// ==========================================

/**
 * Petición asincrónica a la API pública de cotizaciones.
 */
const obtenerCotizaciones = async (contenedor) => {
  try {
    const respuesta = await fetch("https://dolarapi.com/v1/dolares");

    if (!respuesta.ok) {
      throw new Error(`Error de red HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    
    // Pasamos los datos recibidos a la función de renderizado
    renderizarCotizaciones(datos, contenedor);

  } catch (error) {
    console.error("Fallo la comunicación con la API:", error);
  }
};

// ==========================================
// 3. INICIALIZACIÓN DE LA APLICACIÓN (DOM)
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
  // Captura moderna con selectores CSS
  const btnCargar = document.querySelector("#btnCargar");
  const contenedorCotizaciones = document.querySelector("#contenedorCotizaciones");

  // Asignación de eventos
  btnCargar.addEventListener("click", () => {
    obtenerCotizaciones(contenedorCotizaciones);
  });
});
