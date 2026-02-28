# Self-Healing E2E Presentation

Presentación interactiva para la defensa del TFG sobre **Self-Healing de locators en pruebas E2E con Playwright + IA local (LLM)**.

**Autor:** Adrián Suárez Gómez

---

## 🚀 Inicio rápido

```bash
# Instalar dependencias
npm install

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Previsualizar build
npm run preview
```

---

## ⌨️ Atajos de teclado

| Tecla | Acción |
|-------|--------|
| `P` | Activar/desactivar Presenter Mode |
| `1-6` | Saltar a capítulo específico |
| `H` | Activar Chaos Mode (easter egg) |
| `G` | Abrir/cerrar Glosario |
| `R` | Resetear timer del presenter |
| `Esc` | Cerrar overlays |

---

## 📖 Capítulos

1. **Hero** - Tests break. We heal them.
2. **The Pain** - El problema de los locators frágiles
3. **The Healing** - Consola de reparación interactiva
4. **Architecture** - Diagrama del sistema
5. **Results** - Resultados del experimento
6. **Observability** - Dashboard y conclusiones

---

## 🎤 Presenter Mode

Al pulsar `P`, aparece un overlay con:

- ⏱️ **Timer** de 15 minutos (clic para iniciar/pausar)
- 📍 **Capítulo actual** con tiempo recomendado
- 📝 **Speaker notes** específicas por sección
- ⌨️ **Atajos** visibles para navegación rápida

El indicador de tiempo cambia de color:
- 🟢 Verde = adelantado
- ⚪ Blanco = en tiempo
- 🔴 Rojo = atrasado

---

## 🖨️ Impresión

Pulsa el botón "Imprimir resumen" en el capítulo 6 para generar una versión imprimible con CSS optimizado.

---

## 🔧 Stack técnico

- **Vite** + **React 18** + **TypeScript**
- **TailwindCSS** - Styling con dark mode
- **Framer Motion** - Animaciones premium
- **SVG procedural** - Glyphs personalizados (sin icon packs)

---

## 📁 Estructura

```
src/
├── sections/       # 6 capítulos de la presentación
├── components/     # Componentes reutilizables
├── data/          # Configuración y datasets
├── utils/         # Hotkeys, glyphs, animaciones
└── styles/        # CSS + print styles
```

---

## 🎨 Personalización

Edita `src/data/config.ts` para cambiar:

- Nombre del autor
- Colores de acento
- Tiempos por capítulo
- Datos de resultados

---

## ✅ Optimizado para

- Pantalla 1920×1080 (27")
- Compartir pantalla online
- Modo offline (sin dependencias externas)
- Accesibilidad (a11y)
- `prefers-reduced-motion`

---

## 📜 Licencia

MIT License - Adrián Suárez Gómez © 2024
