# Laboratorio 01: Cotizador de Dólar en Tiempo Real

## 🎯 Objetivo General
Desarrollar una aplicación web interactiva de una sola página (SPA simple) que consulte las cotizaciones del dólar en Argentina en tiempo real mediante la integración de una API pública REST, procesando la respuesta asincrónica y actualizando la interfaz de usuario de manera reactiva y limpia.

---

## 📐 Arquitectura del Código

El archivo `app.js` está estructurado siguiendo el principio de **Separación de Responsabilidades** (*Separation of Concerns*), dividido en tres capas operativas:

### 1. Capa de UI y Manipulación del DOM
* **`crearTarjetaCotizacion(cotizacion)`**: Recibe un objeto individual de cotización y construye la estructura de nodos HTML en la memoria RAM (`<article>`, `<h2>`, `<p>`, `<small>`) utilizando los métodos estándar `document.createElement`, `textContent` y `append`. Evita el uso de `innerHTML` para prevenir riesgos de seguridad y renderizado ineficiente.
* **`renderizarCotizaciones(listaCotizaciones, contenedor)`**: Se encarga de la limpieza previa del contenedor en el DOM (`contenedor.textContent = ""`) y de recorrer el arreglo de datos para acoplar las tarjetas generadas mediante `appendChild`.

### 2. Capa de Red y Asincronía (API REST)
* **`obtenerCotizaciones(contenedor)`**: Función asincrónica (`async`) que efectúa la petición a la API externa mediante `fetch()`. Implementa la pausa de ejecución controlada con `await`, la validación de respuestas de red (`respuesta.ok`), la conversión del *stream* de datos a JSON y el manejo de excepciones mediante bloques `try / catch`.

### 3. Capa de Inicialización y Eventos
* **`DOMContentLoaded`**: Escuchador global del ciclo de vida del DOM que asegura que las capturas de elementos (`document.querySelector`) y el registro de eventos en botones (`addEventListener`) se realicen únicamente cuando el árbol HTML ha sido completamente construido por el navegador.

---

## 🛰️ Especificación del Consumo de API

* **Endpoint:** `https://dolarapi.com/v1/dolares`
* **Método HTTP:** `GET`
* **Estructura del Objeto Devuelto (JSON):**

```json
[
  {
    "moneda": "USD",
    "casa": "oficial",
    "nombre": "Oficial",
    "compra": 1020.5,
    "venta": 1060.5,
    "fechaActualizacion": "2026-07-31T..."
  }
]
```
## Conceptos Clave Aplicados y Estudiados
1.	Sintaxis async / await:
    o	async: Define una función asincrónica que implícitamente retorna una Promesa.
    o	await: Detiene la ejecución interna de la función hasta que la Promesa (red o conversión JSON) sea resuelta o rechazada, sin bloquear el hilo principal (main thread) del navegador.
2.	Atributo defer:
    o	Garantiza que el archivo app.js se descargue en segundo plano mientras se analiza el HTML, postergando su ejecución hasta que el documento haya sido analizado por completo.
3.	Inyección de Nodos vs. Strings:
    o	Se prioriza la creación explícita de nodos en memoria RAM con la DOM API en lugar de la concatenación de texto con innerHTML, logrando una manipulación limpia y un código libre de dependencias.
4.	Selectores CSS Modernos:
    o	Uso de document.querySelector respetando la sintaxis formal de selectores de CSS (#id, .clase).

## 📌 Evolución del Proyecto

### 🔹 v1-mvp (Producto Mínimo Viable)
- **Objetivo**: Renderizado dinámico de tarjetas a partir de una API externa.
- **Conceptos clave**:
  - Separación rigurosa en 3 capas (Capa de Dibujo/DOM, Capa de Red/API, Inicialización).
  - Peticiones asincrónicas con `fetch` y `async/await`.
  - Generación de nodos en memoria RAM con `document.createElement()`.

---

### 🔹 v2-estados-red (Resiliencia y Experiencia de Usuario)
- **Objetivo**: Controlar la interfaz según el ciclo de vida de la red (espera, éxito y error).
- **Conceptos clave**:
  - **Manejo de Estados Visuales**: Estado de Carga (`loading`), Éxito y Error controlados mediante la clase CSS `.oculto`.
  - **Patrón `try...catch`**: Captura de errores de red o respuestas HTTP inválidas (`!respuesta.ok`).
  - **Spinners y Feedback**: Indicador de progreso con animación CSS (`@keyframes`).
  - **Accesibilidad (WAI-ARIA)**: Uso de `aria-live="polite"` para actualizaciones asincrónicas y `role="alert"` para errores.
  - **Prevención de Peticiones Duplicadas**: Deshabilitación temporal del botón (`disabled = true`) durante la carga.

