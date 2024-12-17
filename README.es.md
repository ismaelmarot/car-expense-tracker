
# **Car Expense Tracker**

**Versión:** 1.0.0

Aplicación para llevar el registro de gastos de vehículos, diseñada para simplificar la gestión de gastos de múltiples vehículos y agruparlos por categorías. Además, incluye opciones avanzadas como la generación de reportes en PDF y visualización de estadísticas mediante gráficos.

---

## **Tabla de Contenidos**
1. [Características](#características)
2. [Tecnologías Usadas](#tecnologías-usadas)
3. [Instalación](#instalación)
4. [Uso](#uso)
5. [Capturas de Pantalla](#capturas-de-pantalla)
6. [Autor](#autor)
7. [Licencia](#licencia)

---

## **Características**
- Registro y edición de gastos asociados a vehículos.
- Soporte para múltiples vehículos.
- Agrupación de gastos por categorías (combustible, mantenimiento, seguro, etc.).
- Generación de reportes en PDF con criterios de selección.
- Visualización de estadísticas mediante gráficos interactivos.

---

## **Tecnologías Usadas**
### **Frontend**
- **React**: Framework para construir la interfaz de usuario.
- **Material UI**: Biblioteca de componentes UI con diseño moderno.
- **Styled Components**: Estilización de componentes basada en CSS-in-JS.

### **Backend**
- **Express**: Framework minimalista para Node.js.

### **Base de Datos**
- **SQLite**: Base de datos ligera y eficiente para almacenamiento local.

### **Otras Herramientas**
- **Yarn**: Gestor de dependencias.

---

## **Instalación**
Sigue estos pasos para clonar e instalar el proyecto:

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu_usuario/car-expense-tracker.git
   cd car-expense-tracker
   ```

2. **Instalar dependencias** para el frontend y el backend:
   ```bash
   cd car-expense-tracker-frontend
   yarn install
   cd ../car-expense-tracker-backend
   yarn install
   ```

3. **Configurar variables de entorno**:
   - Crea un archivo `.env` en la carpeta del backend con las configuraciones necesarias, por ejemplo:
     ```env
     PORT=4000
     DATABASE_URL=car_expenses.sqlite
     ```

---

## **Uso**

### **Iniciar el Backend**
1. Navega a la carpeta del backend:
   ```bash
   cd car-expense-tracker-backend
   ```
2. Inicia el servidor:
   ```bash
   yarn start
   ```

### **Iniciar el Frontend**
1. Navega a la carpeta del frontend:
   ```bash
   cd car-expense-tracker-frontend
   ```
2. Inicia la aplicación:
   ```bash
   yarn start
   ```

### **Entornos**
- Para desarrollo, usa los comandos anteriores.
- Configura scripts específicos si necesitas ejecutar el proyecto en modo producción.

---

## **Capturas de Pantalla**
*(Aquí puedes incluir imágenes de tu aplicación. Si deseas, puedes agregar capturas de la interfaz gráfica o vistas de los gráficos y reportes generados por tu aplicación).*

---

## **Autor**
Desarrollado por **Ismael Marot**.  
Encuentra más proyectos en [GitHub](https://github.com/ismaelmarot).

---

## **Licencia**
Este proyecto está bajo la licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.
