# OPSCORD Security Architecture

A production-grade platform requires defense-in-depth, especially when handling infrastructure logs and incident data.

## Authentication Strategy

OPSCORD relies on a stateless JWT architecture for human users, and API Keys for machine-to-machine integrations.

1. **Access Tokens (JWT):** Short-lived tokens (15 minutes) used for API authorization. Contains user ID, org ID, and Role.
2. **Refresh Tokens:** Long-lived opaque strings stored in HTTP-Only, Secure, `SameSite=Strict` cookies. Tracked in the database for instant revocation on compromised devices.
3. **API Keys:** Prefixed strings (e.g., `opscord_test_xxx`, `opscord_live_xxx`) assigned to Projects for external webhook ingestion validation. The database stores the **SHA-256 hash**, never the plaintext key.

## Role-Based Access Control (RBAC)

Enforced via middleware on all API Gateway routes:

- **OWNER**: Full administrative and billing rights for the Organization.
- **ADMIN**: Can manage team members, edit Alert Rules, and regenerate API keys.
- **MEMBER**: Standard read/write access. Can resolve Incidents and create Projects.
- **VIEWER**: Read-only dashboard access. Cannot acknowledge or resolve incidents.

## Security Posture

### SQL Injection Prevention

OPSCORD uses **Prisma ORM** for all database interactions. Prisma inherently protects against SQL injection by using parameterized queries under the hood. Raw queries (e.g., `$queryRaw`) are strictly linted and avoided.

### Rate Limiting Strategy

Redis-backed sliding window rate limiters protect the platform:

- **`/api/v1/auth/*`**: Strict limits (e.g., 5 attempts / 15 mins) to prevent brute force attacks.
- **`/api/v1/ingest/*`**: Tier-based high-throughput limits (e.g., 1000/min on free, 10000/min on Pro) to prevent noisy neighbor DDoS attacks.
- **Standard API routes**: 100 requests per minute per IP.

### Input Validation

All incoming HTTP requests (Body, Query params, Route params) are validated against strict **Zod schemas** before reaching the controller logic. Invalid payloads are rejected with `400 Bad Request` before consuming memory.

### Secret Management

- Developer environments use `.env` files (ignored by Git).
- Production environments securely inject environment variables via Vercel Secrets or AWS Secrets Manager.
- System-critical secrets (like `JWT_SECRET`) must be 256-bit high-entropy random strings.

## Observability & Monitoring

OPSCORD monitors itself using its own best practices:

- **Sentry Integration:** Captures unhandled promise rejections and errors across all Node.js and Next.js services.
- **Structured Logging:** Uses `pino` for fast JSON logging formatted for SIEM platforms.
- **No Sensitive Data in Logs:** Passwords, API Keys, and JWTs are scrubbed from logs via Pino redaction paths.
