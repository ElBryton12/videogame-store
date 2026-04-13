# 🎮 Pixel Vault — Videogame Store

Sistema de gestión y venta de videojuegos desarrollado como proyecto final para la materia de **Ingeniería de Software Avanzada** utilizando la metodología **SCRUM**.

---

## 👥 Equipo de desarrollo

| Nombre | Rol |
|--------|-----|
| Brayan | Developer / Scrum Master Sprint 3 |
| Luis | Developer / Scrum Master Sprint 1 |
| Christian | Developer / Scrum Master Sprint 2 |
| Víctor | Developer |
| Iván | Developer |

---

## 🛠 Stack tecnológico

**Backend**
- Java 17 + Spring Boot 3.5
- Spring Security + JWT
- Spring Data JPA + Hibernate
- PostgreSQL
- RAWG Video Games API

**Frontend**
- React 18 + Vite
- React Router v6
- Axios
- CSS modular
- Google Fonts (Press Start 2P)

---

## 📋 Historias de usuario (SCRUM)

### Sprint 1 — Autenticación

| ID | Historia | Responsable |
|----|----------|-------------|
| US-01 | Registro de usuario con contraseña cifrada | Brayan |
| US-02 | Login con JWT token | Iván |
| US-03 | Protección de endpoints por roles | Luis |
| US-04 | Pantallas de login y registro en React | Christian |

### Sprint 2 — CRUD + RAWG

| ID | Historia | Responsable |
|----|----------|-------------|
| US-05 | Insertar videojuegos (ADMIN) | Víctor |
| US-06 | Buscar videojuegos por nombre | Brayan |
| US-07 | Actualizar videojuegos (ADMIN) | Iván |
| US-08 | Eliminar videojuegos - soft delete (ADMIN) | Christian |
| US-09 | Portadas y ratings desde RAWG API | Luis |

### Sprint 3 — Compras

| ID | Historia | Responsable |
|----|----------|-------------|
| US-10 | Comprar videojuego | Brayan |
| US-11 | Historial de compras con total gastado | Víctor |
| US-12 | Carrito de compras con drawer lateral | Iván |
| US-13 | Panel de administración | Christian + Luis |

---

## 🚀 Instalación y ejecución

### Requisitos previos

- Java 17
- Node.js 20+
- PostgreSQL
- Maven

### Backend

```bash
# Crear base de datos
psql -U postgres -c "CREATE DATABASE videogamestore;"

# Ejecutar
cd backend
mvn spring-boot:run
```

Configurar `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/videogamestore
spring.datasource.username=postgres
spring.datasource.password=postgres
jwt.secret=tuClaveSecreta
jwt.expiration=86400000
rawg.api.key=tuApiKeyDeRAWG
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Abrir http://localhost:5173

---

## 🔑 Endpoints principales

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| POST | /api/auth/register | Registro de usuario | Público |
| POST | /api/auth/login | Login + JWT | Público |
| GET | /api/games | Listar juegos | Autenticado |
| GET | /api/games/search?name= | Buscar juegos | Autenticado |
| POST | /api/games | Crear juego | ADMIN |
| PUT | /api/games/{id} | Actualizar juego | ADMIN |
| DELETE | /api/games/{id} | Eliminar juego | ADMIN |
| POST | /api/purchases/{gameId} | Comprar juego | Autenticado |
| GET | /api/purchases/me | Mis compras | Autenticado |

---

## 🎨 Identidad visual

**Pixel Vault** utiliza un diseño retro arcade inspirado en los videojuegos de los 80s:

- Fuente pixel **Press Start 2P**
- Paleta neón: rosa `#ff2d78`, cyan `#00e5ff`, amarillo `#ffe600`, verde `#39ff14`
- Logo SVG pixel art con moneda dorada
- Animaciones CSS tipo arcade
- Favicon personalizado

---

## 📁 Estructura del proyecto

```
videogame-store/
├── backend/
│   └── src/main/java/com/videogamestore/backend/
│       ├── controller/
│       ├── dto/
│       ├── entity/
│       ├── repository/
│       ├── security/
│       │   ├── config/
│       │   └── jwt/
│       └── service/
├── frontend/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       ├── services/
│       └── styles/
└── README.md
```

---

## 📌 Variables de entorno requeridas

| Variable | Descripción |
|----------|-------------|
| `spring.datasource.url` | URL de conexión a PostgreSQL |
| `spring.datasource.username` | Usuario de la base de datos |
| `spring.datasource.password` | Contraseña de la base de datos |
| `jwt.secret` | Clave secreta para firmar tokens JWT |
| `jwt.expiration` | Duración del token en milisegundos |
| `rawg.api.key` | API Key de RAWG.io |

> ⚠️ Nunca subas el `application.properties` con credenciales reales a GitHub.

---

## 🎮 Créditos

Proyecto desarrollado para la materia de Ingeniería de Software — 2026.

API de videojuegos provista por [RAWG.io](https://rawg.io/apidocs)
