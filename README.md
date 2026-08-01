# JavaScript Asincrónico: Suite de Laboratorios Integradores

Este repositorio reúne una serie de laboratorios prácticos enfocados en el dominio de la **asincronía en JavaScript (ES6+)**, el consumo de **APIs RESTful** mediante la API `fetch`, el manejo estructurado de **Promesas** (`async/await`) y la manipulación avanzada del **DOM sin librerías externas** (*Vanilla JS*).

El objetivo principal es aplicar arquitecturas de software limpias, separación rigurosa de responsabilidades y buenas prácticas de desarrollo web moderno.

---

## 🛠️ Tecnologías y Estándares Utilizados

* **Lenguaje:** JavaScript ES6+ (Declaración explícita, Clases de JS, Asincronía moderna).
* **Marcado y Estilos:** HTML5 Semántico y CSS3 Moderno (Variables CSS, Flexbox, CSS Grid).
* **Estándares de Arquitectura:**
  * Carga diferida de scripts (`defer`).
  * Gestión de eventos mediante el ciclo de vida del DOM (`DOMContentLoaded`).
  * Inyección dinámica de nodos en RAM (`createElement`, `textContent`, `append`).
  * Control y captura de errores en red con bloques `try / catch`.

---
## 📂 Hoja de Ruta y Estado de los Laboratorios

| Laboratorio | Datos Consumidos / API | Estado | Documentación | Puntos Clave de Profesionalización |
| :--- | :--- | :---: | :---: | :--- |
| **01. Rastreador de Indicadores Económicos / Cotización del Dólar** | Cotizaciones en tiempo real (Oficial, Blue, MEP, Tarjeta) mediante **DolarAPI**. | 🟢 En Proceso | [Ver Doc](./01-cotizador-dolar/README.md) | Filtros por tipo de dólar, calculadora conversora (ARS/USD), persistencia de favoritos en `localStorage` y manejo de spinners de carga. |
| **02. Dashboard de Clima y Pronóstico Urbano** | Temperatura, humedad y estado del tiempo en tiempo real mediante **Open-Meteo API**. | 🟡 Pendiente | -- | Tarjetas dinámicas con íconos de estado, historial de ciudades en `localStorage`, conversión de unidades (C/F) y renderizado reactivo. |
| **03. Buscador y Catálogo de Películas / Series** | Título, año, póster y sinopsis mediante **TVMaze / OMDb API**. | 🟡 Pendiente | -- | Sistema de favoritos persistente, modal con vista de detalle, validación de inputs (`.trim()`) y renderizado modular con métodos de array. |

---

## 💻 Estructura del Repositorio

```text
js-async-integrador-labs/
├── README.md                   <-- Documentación principal de la suite (este archivo)
├── 01-cotizador-dolar/         <-- Laboratorio 01: Cotizaciones del Dólar
│   ├── index.html
│   ├── app.js
│   ├── style.css
│   └── README.md               <-- Documentación del Proyecto #1
├── 02-dashboard-clima/         <-- Laboratorio 02: Clima Urbano
│   ├── index.html
│   ├── app.js
│   ├── style.css
│   └── README.md
└── 03-buscador-peliculas/      <-- Laboratorio 03: Catálogo de Películas
    ├── index.html
    ├── app.js
    ├── style.css
    └── README.md
```
## Cómo Ejecutar los Proyectos Localmente

1. Clona este repositorio en tu entorno local:
```bash
git clone https://github.com/TU-USUARIO/js-async-integrador-labs.git
```
2. Accede al directorio de trabajo:
cd js-async-integrador-labs

3. Abre la carpeta del laboratorio deseado (por ejemplo 01-cotizador-dolar) utilizando la extensión Live Preview de Microsoft o Live Server en Visual Studio Code.
