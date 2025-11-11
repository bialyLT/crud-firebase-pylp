import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin only if credentials are available
let adminDb: ReturnType<typeof getFirestore> | null = null;

function initializeAdminApp() {
  const apps = getApps();
  
  // Check if credentials are available
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.warn('Firebase Admin SDK credentials not found. Admin features will be disabled.');
    return null;
  }

  if (!apps.length) {
    try {
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: privateKey.replace(/\\n/g, '\n'),
        }),
      });
    } catch (error) {
      console.error('Failed to initialize Firebase Admin:', error);
      return null;
    }
  }

  return getFirestore();
}

// Only initialize in runtime, not during build
if (typeof window === 'undefined' && process.env.NODE_ENV !== 'production') {
  adminDb = initializeAdminApp();
}

function getAdminDb() {
  if (!adminDb) {
    adminDb = initializeAdminApp();
  }
  return adminDb;
}

export { getAdminDb, adminDb };
