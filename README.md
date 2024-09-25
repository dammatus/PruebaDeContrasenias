Aquí tienes el `README.md` actualizado, incluyendo la nota sobre la universidad:

```markdown
# Password Checker

Este proyecto es un **Verificador de Contraseña** en React que ayuda a los usuarios a evaluar la fortaleza de sus contraseñas y ofrece sugerencias para mejorarlas. A continuación, se explica cómo funciona el código y cómo puedes utilizarlo.

## Características

- **Verificación de la fortaleza de la contraseña**: Evalúa la contraseña ingresada y proporciona un puntaje basado en varios criterios.
- **Sugerencias de mejora**: Ofrece recomendaciones sobre cómo fortalecer la contraseña.
- **Indicador visual**: Muestra una barra de progreso que indica el nivel de fortaleza de la contraseña.
- **Alertas**: Informa al usuario sobre la fortaleza de la contraseña a través de mensajes claros y concisos.

## Instalación

Para usar este componente, asegúrate de tener instalado React y Material-UI. Puedes incluirlo en tu proyecto siguiendo estos pasos:

1. Clona este repositorio.
2. Instala las dependencias necesarias:
   ```bash
   npm install @mui/material @emotion/react @emotion/styled
   ```
3. Importa el componente `PasswordChecker` en tu aplicación:
   ```javascript
   import PasswordChecker from './PasswordChecker';
   ```

## Uso

El componente `PasswordChecker` permite al usuario ingresar una contraseña y verificar su fortaleza. Aquí hay un resumen de cómo funciona el código:

### Estructura del Componente

- **Estado del Componente**: Utiliza el hook `useState` para manejar el estado de la contraseña, el feedback, el progreso y las alertas.
  
- **Efecto de Actualización**: El hook `useEffect` se activa cada vez que cambia la contraseña. Este efecto evalúa la fortaleza de la contraseña y genera el feedback correspondiente.

### Evaluación de la Contraseña

1. **Longitud**: Comprueba si la contraseña tiene al menos 8 o 12 caracteres.
   - Menos de 8 caracteres: sugerencia para mejorar.
   - Entre 8 y 12 caracteres: advertencia para aumentar la longitud.

2. **Variedad de Caracteres**: Verifica si la contraseña incluye mayúsculas, minúsculas, números y símbolos.

3. **Contraseñas Comunes**: Evalúa si la contraseña es una de las más comunes y sugiere evitar su uso.

4. **Tiempo Estimado para Romperla**: Calcula el tiempo estimado que tomaría romper la contraseña usando fuerza bruta.

### Interfaz de Usuario

- **Barra de Progreso**: Muestra visualmente la fortaleza de la contraseña. Cambia de color según el puntaje:
  - Verde: Fuerte
  - Naranja: Aceptable
  - Rojo: Débil

- **Alertas**: Muestra un mensaje de alerta al usuario después de verificar la contraseña, indicando si es fuerte, aceptable o débil.

### Ejemplo de Código

Aquí hay un fragmento del código que muestra cómo se evalúa la contraseña:

```javascript
if (password.length >= 12) {
  score++;
} else if (password.length >= 8) {
  score++;
  newFeedback += 'La contraseña debe tener al menos 12 caracteres para ser más segura.\n';
} else {
  newFeedback += 'La contraseña debe tener al menos 8 caracteres.\n';
}
```

## Contribuciones

Si deseas contribuir a este proyecto, no dudes en enviar un pull request o abrir un problema para discutir mejoras.

## Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo y modificarlo según tus necesidades.

---

### Nota

Este proyecto es un trabajo realizado por alumnos de la **Universidad Nacional de San Luis (UNSL)** en la materia **Ciberseguridad**. Fue creado con fines educativos para ser utilizado en la promoción de carreras 2024 de la universidad.
```

Si necesitas más cambios o detalles adicionales, no dudes en decírmelo.