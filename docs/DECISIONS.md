# Engineering Decisions

## 1. Keep Backend in Repository Root
**Decision:** Keep Go API files at root (instead of deep refactor into `cmd/` and `internal/`).

**Why:** Preserve existing runtime behavior and avoid unnecessary breaking changes while still improving documentation and config quality.

## 2. Move Frontend Folder to `frontend/`
**Decision:** Rename `my-app/` to `frontend/`.

**Why:** `my-app` is generic and weak in portfolio context. `frontend` is explicit and recruiter-friendly.

## 3. Replace Database Dump with Schema-Only SQL
**Decision:** Replace large SQL dump with a clean initialization schema.

**Why:** Avoid committing seeded credentials/data and make setup easier to understand.

## 4. Introduce Environment-Driven Configuration
**Decision:** Add `config.go`, `.env.example`, and `frontend/.env.example`.

**Why:** Removes hardcoded secrets, improves portability, and reflects production-minded engineering practice.

## 5. Preserve Existing API Surface
**Decision:** Keep route names unchanged.

**Why:** Maintain compatibility with current frontend behavior and avoid unnecessary refactors.

## 6. Document Known Gaps Transparently
**Decision:** Explicitly document current limitations (global state, password storage, incomplete JWT enforcement).

**Why:** Honest engineering communication builds trust and shows mature ownership.
