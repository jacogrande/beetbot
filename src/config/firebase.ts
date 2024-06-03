import serviceAccount from "@@/beetbot-service-key.json";
import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

export const db = admin.firestore();
