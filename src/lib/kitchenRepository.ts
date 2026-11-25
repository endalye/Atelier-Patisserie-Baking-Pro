import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

export type ProductionStatus = 'scheduled' | 'in_progress' | 'completed';
export type TempCategory = 'chilled' | 'frozen' | 'ambient' | 'oven' | 'proofer' | 'chocolate';
export type TempStatus = 'nominal' | 'warning' | 'critical';

export interface ProductionLogItem {
  id: string;
  ownerId: string;
  date: string;
  product: string;
  batchSize: string;
  startTime: string;
  endTime: string;
  actualYield: string;
  operator: string;
  status: ProductionStatus;
  notes: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface TemperatureLogItem {
  id: string;
  ownerId: string;
  date: string;
  time: string;
  equipment: string;
  category: TempCategory;
  temperatureC: number;
  status: TempStatus;
  correctiveAction: string;
  initials: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface SensoryEvaluationItem {
  id: string;
  ownerId: string;
  recipeTitle: string;
  batchDate: string;
  evaluator: string;
  appearance: number;
  colour: number;
  texture: number;
  flavour: number;
  aroma: number;
  overall: number;
  comments: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface CustomRecipeItem {
  id: string;
  ownerId: string;
  title: string;
  category: string;
  classification: string;
  targetYield: string;
  prepTime: string;
  bakeTime: string;
  ovenTemp: string;
  ingredients: string[];
  methodSteps: string[];
  criticalControlPoints: string;
  qualityStandard: string;
  allergens: string[];
  shelfLife: string;
  portions: number;
  costPerBatch: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface RecipeBookmarkItem {
  id: string;
  ownerId: string;
  recipeSlug: string;
  isFavorite: boolean;
  notes: string;
  updatedAt?: Timestamp;
}

function makeDocId(prefix: string): string {
  const rand = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now()}_${rand}`.replace(/[^a-zA-Z0-9_-]/g, '');
}

export function evaluateTemperatureStatus(category: TempCategory, tempC: number): TempStatus {
  switch (category) {
    case 'chilled':
      if (tempC <= 5 && tempC >= 0) return 'nominal';
      if (tempC > 5 && tempC <= 8) return 'warning';
      return 'critical';
    case 'frozen':
      if (tempC <= -18) return 'nominal';
      if (tempC <= -14) return 'warning';
      return 'critical';
    case 'ambient':
      if (tempC >= 15 && tempC <= 21) return 'nominal';
      if (tempC >= 12 && tempC <= 25) return 'warning';
      return 'critical';
    case 'chocolate':
      if (tempC >= 15 && tempC <= 18) return 'nominal';
      if (tempC >= 13 && tempC <= 21) return 'warning';
      return 'critical';
    case 'proofer':
      if (tempC >= 24 && tempC <= 30) return 'nominal';
      if (tempC >= 20 && tempC <= 34) return 'warning';
      return 'critical';
    case 'oven':
      if (tempC >= 140 && tempC <= 500) return 'nominal';
      if (tempC >= 100 && tempC <= 550) return 'warning';
      return 'critical';
  }
}

export function subscribeOwnerCollection<T extends { id: string }>(
  collectionName: string,
  uid: string,
  onData: (items: T[]) => void,
  onError?: (err: Error) => void
) {
  const q = query(collection(db, collectionName), where('ownerId', '==', uid));
  return onSnapshot(
    q,
    (snapshot) => {
      const rows: T[] = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<T, 'id'>),
      })) as T[];
      onData(rows);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, collectionName);
      } catch (wrapped) {
        if (onError && wrapped instanceof Error) {
          onError(wrapped);
        }
      }
    }
  );
}

export function subscribeBookmarks(
  uid: string,
  onData: (map: Record<string, RecipeBookmarkItem>) => void,
  onError?: (err: Error) => void
) {
  const path = `users/${uid}/bookmarks`;
  const q = query(collection(db, 'users', uid, 'bookmarks'), where('ownerId', '==', uid));
  return onSnapshot(
    q,
    (snapshot) => {
      const map: Record<string, RecipeBookmarkItem> = {};
      for (const d of snapshot.docs) {
        const data = d.data() as Omit<RecipeBookmarkItem, 'id'>;
        map[data.recipeSlug] = { id: d.id, ...data };
      }
      onData(map);
    },
    (error) => {
      try {
        handleFirestoreError(error, OperationType.LIST, path);
      } catch (wrapped) {
        if (onError && wrapped instanceof Error) {
          onError(wrapped);
        }
      }
    }
  );
}

export async function upsertRecipeBookmark(
  uid: string,
  recipeSlug: string,
  isFavorite: boolean,
  notes: string,
  existsAlready: boolean
) {
  const safeSlug = recipeSlug.replace(/[^a-zA-Z0-9_-]/g, '-').slice(0, 80);
  const path = `users/${uid}/bookmarks/${safeSlug}`;
  const ref = doc(db, 'users', uid, 'bookmarks', safeSlug);
  const safeNotes = notes.slice(0, 500);
  try {
    if (existsAlready) {
      await updateDoc(ref, {
        isFavorite,
        notes: safeNotes,
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(ref, {
        ownerId: uid,
        recipeSlug: safeSlug,
        isFavorite,
        notes: safeNotes,
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error) {
    handleFirestoreError(error, existsAlready ? OperationType.UPDATE : OperationType.CREATE, path);
  }
}

export async function createProductionLog(
  uid: string,
  input: Omit<ProductionLogItem, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'>
) {
  const id = makeDocId('prod');
  const path = `productionLogs/${id}`;
  try {
    await setDoc(doc(db, 'productionLogs', id), {
      ownerId: uid,
      date: input.date.slice(0, 10),
      product: input.product.trim().slice(0, 120),
      batchSize: input.batchSize.trim().slice(0, 40),
      startTime: input.startTime.trim().slice(0, 10),
      endTime: input.endTime.trim().slice(0, 10),
      actualYield: input.actualYield.trim().slice(0, 60),
      operator: input.operator.trim().slice(0, 80),
      status: input.status,
      notes: input.notes.trim().slice(0, 500),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function updateProductionLogStatus(
  id: string,
  nextStatus: ProductionStatus,
  actualYield: string,
  endTime: string,
  notes: string
) {
  const path = `productionLogs/${id}`;
  try {
    await updateDoc(doc(db, 'productionLogs', id), {
      status: nextStatus,
      actualYield: actualYield.trim().slice(0, 60),
      endTime: endTime.trim().slice(0, 10),
      notes: notes.trim().slice(0, 500),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
}

export async function deleteOwnerDocument(collectionName: string, id: string) {
  const path = `${collectionName}/${id}`;
  try {
    await deleteDoc(doc(db, collectionName, id));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function createTemperatureLog(
  uid: string,
  input: Omit<TemperatureLogItem, 'id' | 'ownerId' | 'status' | 'createdAt' | 'updatedAt'>
) {
  const id = makeDocId('temp');
  const path = `temperatureLogs/${id}`;
  const clampedTemp = Math.max(-50, Math.min(600, Number(input.temperatureC)));
  const status = evaluateTemperatureStatus(input.category, clampedTemp);
  try {
    await setDoc(doc(db, 'temperatureLogs', id), {
      ownerId: uid,
      date: input.date.slice(0, 10),
      time: input.time.trim().slice(0, 10),
      equipment: input.equipment.trim().slice(0, 80),
      category: input.category,
      temperatureC: clampedTemp,
      status,
      correctiveAction: input.correctiveAction.trim().slice(0, 300),
      initials: input.initials.trim().slice(0, 10),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function createSensoryEvaluation(
  uid: string,
  input: Omit<SensoryEvaluationItem, 'id' | 'ownerId' | 'overall' | 'createdAt' | 'updatedAt'>
) {
  const id = makeDocId('sens');
  const path = `sensoryEvaluations/${id}`;
  const clamp = (v: number) => Math.max(1, Math.min(5, Math.round(v * 10) / 10));
  const a = clamp(input.appearance);
  const c = clamp(input.colour);
  const t = clamp(input.texture);
  const f = clamp(input.flavour);
  const ar = clamp(input.aroma);
  const overall = Math.round(((a + c + t + f + ar) / 5) * 10) / 10;

  try {
    await setDoc(doc(db, 'sensoryEvaluations', id), {
      ownerId: uid,
      recipeTitle: input.recipeTitle.trim().slice(0, 120),
      batchDate: input.batchDate.slice(0, 10),
      evaluator: input.evaluator.trim().slice(0, 80),
      appearance: a,
      colour: c,
      texture: t,
      flavour: f,
      aroma: ar,
      overall,
      comments: input.comments.trim().slice(0, 600),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export async function createCustomRecipe(
  uid: string,
  input: Omit<CustomRecipeItem, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'>
) {
  const id = makeDocId('rec');
  const path = `customRecipes/${id}`;
  const ingredients = input.ingredients
    .map((s) => s.trim().slice(0, 140))
    .filter(Boolean)
    .slice(0, 40);
  const methodSteps = input.methodSteps
    .map((s) => s.trim().slice(0, 400))
    .filter(Boolean)
    .slice(0, 30);
  const allergens = input.allergens
    .map((s) => s.trim().slice(0, 40))
    .filter(Boolean)
    .slice(0, 15);

  try {
    await setDoc(doc(db, 'customRecipes', id), {
      ownerId: uid,
      title: input.title.trim().slice(0, 120),
      category: input.category.trim().slice(0, 60),
      classification: input.classification.trim().slice(0, 80),
      targetYield: input.targetYield.trim().slice(0, 80),
      prepTime: input.prepTime.trim().slice(0, 40),
      bakeTime: input.bakeTime.trim().slice(0, 40),
      ovenTemp: input.ovenTemp.trim().slice(0, 40),
      ingredients: ingredients.length ? ingredients : ['Strong flour — 500 g'],
      methodSteps: methodSteps.length ? methodSteps : ['Mix and bake to golden standard.'],
      criticalControlPoints: input.criticalControlPoints.trim().slice(0, 400),
      qualityStandard: input.qualityStandard.trim().slice(0, 300),
      allergens,
      shelfLife: input.shelfLife.trim().slice(0, 120),
      portions: Math.max(1, Math.min(1000, Math.round(input.portions || 1))),
      costPerBatch: Math.max(0, Math.min(100000, Number(input.costPerBatch || 0))),
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}
