# Security Specification & Payload TDD

## 1. Data Invariants
1. **Strict Ownership**: Every document in `productionLogs`, `temperatureLogs`, `sensoryEvaluations`, `customRecipes`, and `users/{userId}/bookmarks/{recipeSlug}` belongs to a single verified `request.auth.uid` (`ownerId`).
2. **PII Isolation**: User profiles (`users/{userId}`) contain email and personal display name; reads and writes are restricted strictly to `isOwner(userId)` (`list` is denied).
3. **Immutable Ownership & Creation Timestamps**: `ownerId` and `createdAt` can never be modified after document creation. `createdAt` and `updatedAt` must equal `request.time`.
4. **Verified Email Gate**: All mutations require `request.auth != null && request.auth.token.email_verified == true`.
5. **No Shadow Fields**: Every `create` checks `keys().hasAll(...)` and `keys().hasOnly(...)`; every `update` uses `affectedKeys().hasOnly(...)` combined with `isValid[Entity](incoming())`.
6. **Bounded Arrays & Strings**: Every string enforces `.size()` bounds; every array enforces `.size() <= MAX` and checks element types on index 0 when non-empty.
7. **Terminal State Lock**: `productionLogs` with `status == 'completed'` cannot transition back or be mutated.

## 2. Dirty Dozen Attack Payloads
1. Unauthenticated read/list on `productionLogs` -> PERMISSION_DENIED
2. Unverified email (`email_verified: false`) attempting `create` on `productionLogs` -> PERMISSION_DENIED
3. Identity spoofing: User A creating `productionLogs` with `ownerId: UserB` -> PERMISSION_DENIED
4. Shadow field injection: Adding `isAdmin: true` on `users/{userId}` create -> PERMISSION_DENIED
5. Role escalation: Setting `role: 'admin'` on `users/{userId}` -> PERMISSION_DENIED
6. Resource poisoning: Document ID > 128 chars or containing `/` / `$` -> PERMISSION_DENIED
7. Timestamp spoofing: `createdAt` set to client date instead of `request.time` -> PERMISSION_DENIED
8. Cross-user query scraping: `list` on `temperatureLogs` without `where('ownerId', '==', uid)` -> PERMISSION_DENIED
9. Cross-user `get` on `users/{otherUid}` -> PERMISSION_DENIED
10. Updating `ownerId` or `createdAt` on `customRecipes` -> PERMISSION_DENIED
11. Mutating a terminal `productionLogs` entry where `status == 'completed'` -> PERMISSION_DENIED
12. Value poisoning: Submitting `sensoryEvaluations` with `appearance: 99` (> 5) or `ingredients` list > 40 items -> PERMISSION_DENIED
