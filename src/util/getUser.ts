import { db } from "@/config/firebase";
import { FirestoreUser } from "@/util/types";

export const getUser = async (
  userId: string,
): Promise<{
  user: FirestoreUser | null;
  ref: FirebaseFirestore.DocumentReference;
}> => {
  const userRef = db.collection("users").doc(userId);
  const userDoc = await userRef.get();
  return { user: (userDoc.data() as FirestoreUser) || null, ref: userDoc.ref };
};
