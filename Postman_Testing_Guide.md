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
- Missing credentials: no Authorization header → 401 Unauthorized for protected endpoints.

### 3. User lifecycle
1. Create: `POST {{baseUrl}}/auth/register` (or admin create)
   - Expect 201 + `userId` saved.
2. Read: `GET {{baseUrl}}/users/{{userId}}`
   - Expect 200 with correct fields.
3. Update: `PUT {{baseUrl}}/users/{{userId}}` with modified payload
   - Expect 200 and returned resource shows changes.
4. Delete: `DELETE {{baseUrl}}/users/{{userId}}`
   - Expect 204 or 200; subsequent GET → 404.

Negative flows:
- Create user with existing email → expected 409 or validation error.
- Unauthenticated access to protected endpoints → 401.

### 4. Jobs (Admin)
- Create job (admin): `POST {{baseUrl}}/jobs` with title/description → save `jobId`.
- List jobs: `GET {{baseUrl}}/jobs` → 200 and includes created job.
- Get job: `GET {{baseUrl}}/jobs/{{jobId}}` → 200.
- Update: `PUT {{baseUrl}}/jobs/{{jobId}}` → 200 and assert changes.
- Delete/archive: `DELETE {{baseUrl}}/jobs/{{jobId}}` → 204 and GET → 404.

Edge cases:
- Create job with missing title → 400.
- Non-admin tries to create job → 403 Forbidden.

### 5. Applications (Candidate)
- Apply: `POST {{baseUrl}}/applications` body includes `jobId`, `applicantId`, resume link.
  - Save `applicationId`.
- Get application: `GET {{baseUrl}}/applications/{{applicationId}}` → 200.
- Update status (recruiter/admin): `PATCH {{baseUrl}}/applications/{{applicationId}}/status` with `{ "status":"INTERVIEWING" }` → 200.

Negative:
- Apply for invalid job id → 404.
- Duplicate apply → 409 if enforced.

### 6. Interview rounds
- Create: `POST {{baseUrl}}/interviews` with `applicationId`, `roundType`, `scheduledAt`.
- Update result: `PATCH {{baseUrl}}/interviews/{{id}}/result` → set PASS/FAIL.
- Validate scheduled date cannot be past (400) if validation exists.

### 7. Role & permission checks
- With candidate token, request admin-only endpoint → expect 403.
- With admin token, call candidate-only actions → expect 200.
- Test refreshed tokens or expired tokens if you can shorten expiration locally.

### 8. Security & Basic Auth tests
- Wrong credentials: set incorrect `{{username}}`/`{{password}}` → 401.
- No credentials: remove Authorization header → 401 for protected endpoints.
- Ensure admin-only endpoints return 403 for non-admin credentials.

---

## Postman Tests (assertions)
Use Postman Tests to verify responses automatically.

pm.test('Has token', () => pm.expect(body.token || body.accessToken).to.be.a('string'));
Examples:
- Status code check:
```javascript
pm.test('Status is 200', () => pm.response.to.have.status(200));
```
- Save returned IDs:
```javascript
const res = pm.response.json();
if (res.id) pm.environment.set('jobId', res.id);
```

---

## Test Data Flow & Cleanup
- Recommended order (create then read/update then delete): users → jobs → applications → interviews.
- Always delete created data after tests to keep the dev DB clean; create a `Cleanup` folder in Postman to run delete requests that ignore 404.
- Cleanup test script snippet (ignore 404):
```javascript
if (![200,204,404].includes(pm.response.code)) {
  throw new Error('Cleanup failed with ' + pm.response.code);
}
```

---

## Running Collections (Runner / Newman)
- Run selected folders in Postman Runner using your environment and iteration count.
- Newman CLI:
```bash
newman run postman_collection.json -e postman_environment.json --delay-request 100
```
- Use CI to run smoke tests on PRs; keep destructive tests off shared environments.

---

## Troubleshooting
- 401 on `/auth/register`: endpoint protected. Use admin token or update security config.
- 403 on admin endpoints: ensure token belongs to an admin user.
- 500 or unexpected error: open backend logs (terminal running backend) and paste stacktrace for debugging.
- Token not saved: check Tests script and that response body is JSON with token field.

---

## Quick checklist for manual test session
1. Start backend and confirm `{{baseUrl}}` reachable.
2. Login as admin → save `authToken`.
3. Create user (if needed) → save `userId`.
4. Create job as admin → save `jobId`.
5. Switch to candidate token if testing candidate flows.
6. Create application → save `applicationId`.
7. Create interview rounds and record results.
8. Run cleanup.

---

If you want, I can also:
- Add a ready-to-import `postman_collection.json` and `postman_environment.json` to this workspace, or
- Patch your existing `postman_collection.json` to include login/register/jobs/applications examples.

Tell me which option you prefer and I will create the files.
