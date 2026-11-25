// Adversarial Security Rules Verification Spec (Dirty Dozen)
// Covers all 6 Firestore paths in firebase-blueprint.json

export interface DirtyDozenCase {
  id: number;
  name: string;
  collection: string;
  operation: 'get' | 'list' | 'create' | 'update' | 'delete';
  expected: 'PERMISSION_DENIED';
  payload: Record<string, unknown>;
}

export const dirtyDozenCases: DirtyDozenCase[] = [
  {
    id: 1,
    name: 'Unauthenticated read on productionLogs',
    collection: 'productionLogs',
    operation: 'list',
    expected: 'PERMISSION_DENIED',
    payload: { auth: null },
  },
  {
    id: 2,
    name: 'Unverified email creating productionLog',
    collection: 'productionLogs',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    payload: { auth: { uid: 'userA', token: { email_verified: false } }, ownerId: 'userA' },
  },
  {
    id: 3,
    name: 'Identity spoofing: User A sets ownerId to User B',
    collection: 'productionLogs',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    payload: { auth: { uid: 'userA' }, ownerId: 'userB', product: 'Croissants' },
  },
  {
    id: 4,
    name: 'Shadow field injection on user profile',
    collection: 'users',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    payload: { uid: 'userA', isAdmin: true },
  },
  {
    id: 5,
    name: 'Self-assigned admin role escalation',
    collection: 'users',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    payload: { uid: 'userA', role: 'admin' },
  },
  {
    id: 6,
    name: 'Resource poisoning via oversized document ID',
    collection: 'customRecipes',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    payload: { docId: 'a'.repeat(200) },
  },
  {
    id: 7,
    name: 'Client timestamp spoofing on createdAt',
    collection: 'temperatureLogs',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    payload: { createdAt: '1999-01-01T00:00:00Z' },
  },
  {
    id: 8,
    name: 'Cross-user query scraping on temperatureLogs',
    collection: 'temperatureLogs',
    operation: 'list',
    expected: 'PERMISSION_DENIED',
    payload: { queryFilter: 'none' },
  },
  {
    id: 9,
    name: 'Cross-user PII get on users/{otherUid}',
    collection: 'users',
    operation: 'get',
    expected: 'PERMISSION_DENIED',
    payload: { targetUid: 'userB', authUid: 'userA' },
  },
  {
    id: 10,
    name: 'Mutating immutable ownerId on customRecipes',
    collection: 'customRecipes',
    operation: 'update',
    expected: 'PERMISSION_DENIED',
    payload: { ownerId: 'userB' },
  },
  {
    id: 11,
    name: 'Mutating completed terminal productionLog',
    collection: 'productionLogs',
    operation: 'update',
    expected: 'PERMISSION_DENIED',
    payload: { existingStatus: 'completed', status: 'in_progress' },
  },
  {
    id: 12,
    name: 'Value poisoning on sensoryEvaluations rating > 5',
    collection: 'sensoryEvaluations',
    operation: 'create',
    expected: 'PERMISSION_DENIED',
    payload: { appearance: 99, overall: 5 },
  },
];
