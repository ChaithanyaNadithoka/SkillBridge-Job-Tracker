# Postman Testing Guide — SkillBridge API

This guide describes manual Postman test scenarios to validate the SkillBridge backend API running at `http://localhost:8080/api`.

Use this guide to perform functional, negative, authorization, and lifecycle tests.

---

## Setup

1. Start the backend:

```bash
cd "skillbridge-backend"
mvn -DskipTests spring-boot:run
```

2. Install Postman (or use Postman web).

3. Create a Postman Environment named `SkillBridge (Local)` with variables:
- `baseUrl` = `http://localhost:8080/api`
- `username` = (admin or test user email/username)
- `password` = (user password)
- `userId` = (empty)
- `jobId` = (empty)
- `applicationId` = (empty)

Use `{{baseUrl}}` and the Authorization tab (Basic Auth) in requests.

---

## Auth: Login & Register

Note: Some projects protect `POST /api/auth/register`. If you receive `401 Unauthorized` for register, use an admin account to create users or ask to permit the endpoint.

With Basic Authentication you do not request or store JWTs. Instead use Postman's Authorization tab:

1. Configure Basic Auth at collection or request level
- In Postman select the Collection or Request → `Authorization` tab → Type: `Basic Auth`.
- Set `Username` to `{{username}}` and `Password` to `{{password}}`.
- Postman will add the `Authorization: Basic <base64>` header automatically for requests.

2. POST /api/auth/register (if public) or use admin to create user
- URL: `{{baseUrl}}/auth/register`
- Body (JSON): example:
```json
{
  "name":"Test User",
  "email":"test@example.com",
  "password":"Password123!",
  "role":"CANDIDATE"
}
```
- If the endpoint is protected, make sure the collection/request Authorization uses an admin `{{username}}`/`{{password}}`.
- Expected: 201 Created (or 200), JSON with created user id. Save `userId` in Tests:
```javascript
const id = pm.response.json().id || pm.response.json().data?.id;
if (id) pm.environment.set('userId', id);
```

---

## Common headers / Authorization

-- For protected requests use Basic Auth: set the request/collection `Authorization` → Type `Basic Auth` and use `{{username}}` and `{{password}}`.
-- To add the header manually via Pre-request script (optional):
```javascript
const u = pm.environment.get('username');
const p = pm.environment.get('password');
if (u && p) {
  const headerValue = 'Basic ' + btoa(u + ':' + p);
  pm.request.headers.add({ key: 'Authorization', value: headerValue });
}
```

---

## Test Scenarios (Manual steps)

Each scenario shows the request, expected result, and notes for assertions.

### 1. Health check / Basics
- GET `{{baseUrl}}/` or `/health`
- Expect: 200 OK and body indicating application up.

### 2. Authentication
- Happy: request with valid Basic Auth credentials (set in Authorization tab) → request succeeds.
- Bad credentials: wrong username/password → 401 Unauthorized.
# Postman Testing Guide — SkillBridge API (Updated)

This guide covers manual Postman test scenarios for the current SkillBridge backend (HTTP Basic Auth, MariaDB). The backend listens at `http://localhost:8080` and most API routes use the `/api` prefix (both `/auth/*` and `/api/auth/*` are accepted).

Use this guide to run functional, negative, authorization, and lifecycle tests.

---

## Quick Setup

1. Start the backend (from workspace root):

```bash
cd skillbridge-backend
mvn -DskipTests spring-boot:run
```

2. Start the frontend (optional):

```bash
cd skillbridge-frontend
npm install   # first time only
npm run dev
```

3. In Postman create an Environment `SkillBridge (Local)` with variables:
- `baseUrl` = `http://localhost:8080/api`
- `username` = (user email for Basic Auth)
- `password` = (user password)
- `userId`, `jobId`, `applicationId` (empty placeholders)

---

## Authentication Notes (current behavior)

- The backend uses HTTP Basic Authentication for protected endpoints. Include `Authorization: Basic <base64(email:password)>` for protected requests.
- `POST /auth/register` and `POST /auth/login` (and their `/api/auth/*` equivalents) are intended to be public; they accept JSON bodies and do not require the Basic header.
- The `login` endpoint returns basic user info (no JWT). Your client should store the user's credentials or email/password and use Basic Auth for subsequent requests.

Test credentials (from `schema.sql`):
- App test user: `testuser@example.com` / `Password123!`
- DB user (JDBC): `skillbridge_user` / `SkillBridge@123` (used in `application.properties`)

---

## Common Postman Setup

1. Use `{{baseUrl}}` for request URLs.
2. For protected endpoints, set `Authorization` → Type: `Basic Auth` and use `{{username}}` and `{{password}}`.
3. For `register` and `login` calls, use raw JSON body (no Authorization header required).

Pre-request script (optional) to add Basic header manually:

```javascript
const u = pm.environment.get('username');
const p = pm.environment.get('password');
if (u && p) {
  pm.request.headers.upsert({ key: 'Authorization', value: 'Basic ' + btoa(u + ':' + p) });
}
```

---

## Useful Endpoints & Examples

Register (no Authorization header required):

```http
POST {{baseUrl}}/auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}
```

Login (no Authorization header required):

```http
POST {{baseUrl}}/auth/login
Content-Type: application/json

{
  "email": "testuser@example.com",
  "password": "Password123!"
}
```

Protected request example (use Basic Auth in Authorization tab):

```http
GET {{baseUrl}}/applications
Authorization: Basic <base64(email:password)>
```

Curl examples:

```bash
# Register
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"uniqueuser@example.com","password":"SecurePass123!","confirmPassword":"SecurePass123!"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testuser@example.com","password":"Password123!"}'

# Protected (list applications)
curl -X GET http://localhost:8080/api/applications \
  -H "Authorization: Basic $(echo -n 'testuser@example.com:Password123!' | base64)"
```

---

## Test Scenarios (condensed)

- Health: `GET {{baseUrl}}/health` → 200
- Register: valid data → 201 (or 200) / duplicate email → 409 (currently returns 500 in this build)
- Login: valid credentials → 200 + user info; invalid → 401
- Protected endpoints: require Basic Auth → 200; missing/invalid → 401
- CRUD flows for users, jobs, applications, interview rounds as described in original guide — use Basic Auth where required

---

## Database / Schema

The workspace contains `schema.sql` which creates:
- Database: `skillbridge_db`
- Tables: `users`, `job_applications`, `interview_rounds`
- App user: `skillbridge_user` / `SkillBridge@123` (granted privileges)

Run the script from a MySQL/MariaDB client:

```sql
SOURCE schema.sql;
```

Verify:

```sql
USE skillbridge_db;
SELECT * FROM users WHERE email = 'testuser@example.com';
```

If you get `Email already exists` on register, remove the existing row or use a different email:

```sql
DELETE FROM users WHERE email = 'newuser@example.com';
```

---

## Troubleshooting & Notes

- 401 on register/login: Check the network request in browser DevTools — ensure `Authorization` header is NOT being sent for the register/login POST if you expect them public.
- Duplicate-email error returns 500 in current backend; semantically it should be 409. You can check the DB to confirm existence before reattempting.
- CORS: The backend now allows origins `localhost:3000/3001/5173` — if your frontend runs on a different host add it to the backend `CorsConfigurationSource` in `SecurityConfig.java`.
- DB connectivity: If the app reports missing DB or tables, run `schema.sql` and verify `application.properties` points to the correct DB and user.

---

## Quick Checklist

1. Start DB (MariaDB/MySQL) and run `schema.sql` if needed
2. Start backend: `mvn -DskipTests spring-boot:run`
3. Start frontend (optional): `npm run dev` and open the landing page
4. Use Postman: register/login (no auth header) → use Basic Auth for protected endpoints
5. Inspect backend logs on errors and paste stacktrace for help

---

If you want, I can also add a ready-to-import `postman_collection.json` and `postman_environment.json` for quick execution — tell me and I will generate them.
