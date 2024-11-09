# Proyecto de Autenticación con Node.js, Express y JWT usando MongoDB Atlas

Este proyecto es un ejemplo básico de autenticación en Node.js utilizando **Express**, **JSON Web Token (JWT)** y **MongoDB Atlas**. Incluye rutas para registrar usuarios, iniciar sesión y acceder a una ruta protegida.

## Descripción del Proyecto

El objetivo de este proyecto es aprender a implementar autenticación mediante JWT en un servidor Node.js. Los usuarios se registran, inician sesión y pueden acceder a rutas protegidas utilizando un token. Los datos de usuario se almacenan en MongoDB Atlas.

## Prerrequisitos o Dependencias

Para ejecutar este proyecto, necesitas:

- **Node.js** (versión 14 o superior)
- **NPM** (gestor de paquetes de Node.js)
- **MongoDB Atlas** (base de datos en la nube de MongoDB)

## Configuración de MongoDB Atlas

1. Crea una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Crea un nuevo clúster y una base de datos (por ejemplo, `autenticacion_db`).
3. Crea una colección llamada `usuarios`.
4. Añade un usuario con permisos de lectura y escritura para la base de datos.
5. Copia la URL de conexión y configúrala en el archivo `.env` (ver detalles en la siguiente sección).

## Instalación del Proyecto

1. Clona el repositorio y navega al directorio del proyecto:

```bash
git clone https://github.com/brayandiazc/jwt_fundamentos
cd jwt_fundamentos
```

2. Instala las dependencias:

```bash
npm install
```

3. Configura las variables de entorno creando un archivo `.env` en la raíz del proyecto con los siguientes datos:

```
JWT_SECRET=tu_clave_secreta
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/autenticacion_db?retryWrites=true&w=majority
```

- Reemplaza `<username>` y `<password>` con tus credenciales de MongoDB Atlas.
- `JWT_SECRET` es la clave secreta utilizada para firmar los tokens JWT.

## Instrucciones para Ejecutar el Proyecto

1. Inicia el servidor:

```bash
node index.js
```

2. El servidor se ejecutará en `http://localhost:3000`. Verás en la consola las rutas disponibles para probar en Postman o con `curl`.

## Rutas disponibles

### Registro de usuario

- **Ruta**: `/api/auth/register`
- **Método**: `POST`
- **Descripción**: Crea un nuevo usuario.

#### Ejemplo de solicitud (con curl)

```bash
curl -X POST http://localhost:3000/api/auth/register -H "Content-Type: application/json" -d '{"username": "usuario1", "password": "12345"}'
```

### Inicio de sesión

- **Ruta**: `/api/auth/login`
- **Método**: `POST`
- **Descripción**: Autentica al usuario y devuelve un token JWT.

#### Ejemplo de solicitud (con curl)

```bash
curl -X POST http://localhost:3000/api/auth/login -H "Content-Type: application/json" -d '{"username": "usuario1", "password": "12345"}'
```

### Ruta protegida

- **Ruta**: `/api/auth/protected`
- **Método**: `GET`
- **Descripción**: Devuelve un mensaje de bienvenida si el usuario tiene un token JWT válido.

#### Ejemplo de solicitud (con curl)

Usa el token recibido en el inicio de sesión y añádelo en el encabezado `Authorization` como `Bearer <tu_token>`.

```bash
curl -X GET http://localhost:3000/api/auth/protected -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

## Autor

Proyecto desarrollado por [Brayan Diaz C](https://github.com/brayandiazc)

## Licencia

Este proyecto está bajo la Licencia MIT.
