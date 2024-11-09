# Proyecto de Autenticación con Node.js, Express y JWT

Este proyecto es un ejemplo básico de autenticación en Node.js utilizando **Express** y **JSON Web Token (JWT)**. Incluye rutas para registrar usuarios, iniciar sesión y acceder a una ruta protegida.

## Descripción del Proyecto

El objetivo de este proyecto es aprender a implementar autenticación mediante JWT en un servidor Node.js. Los usuarios pueden registrarse, iniciar sesión y acceder a rutas protegidas utilizando un token.

## Prerrequisitos o Dependencias

Para ejecutar este proyecto, necesitas:

- **Node.js** (versión 14 o superior)
- **NPM** (gestor de paquetes de Node.js)

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

3. Configura las variables de entorno creando un archivo `.env` con la siguiente clave:

```
JWT_SECRET=tu_clave_secreta
```

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

```bash
curl -X GET http://localhost:3000/api/auth/protected -H "Authorization: Bearer <tu_token>"
```

## Autor

Proyecto desarrollado por [Brayan Diaz C](https://github.com/brayandiazc)

## Licencia

Este proyecto está bajo la Licencia MIT.
