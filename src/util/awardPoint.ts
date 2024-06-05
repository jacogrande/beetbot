import { areDatesInSameWeek } from "@/util/areDatesInSameWeek";
import { FirestoreUser } from "@/util/types";
import { firestore } from "firebase-admin";
import { DocumentReference, Timestamp } from "firebase-admin/firestore";

export const awardPoint = async (
  ref: DocumentReference,
  user: FirestoreUser,
): Promise<boolean> => {
  const lastAwardedAt = user.lastAwardedAt?.toDate() || null;
  const updates: Partial<FirestoreUser> = {
    score: user.score + 1,
    weeklyScore: user.weeklyScore + 1,
    lastAwardedAt: firestore.FieldValue.serverTimestamp() as Timestamp,
  };

  // check if the user has a streak (within a day)
  if (lastAwardedAt && isAStreak(lastAwardedAt)) {
    updates.streak = user.streak + 1;
  }

  if (lastAwardedAt && !areDatesInSameWeek(lastAwardedAt, new Date())) {
    updates.weeklyScore = 1;
    updates.weeklyStreak = 0;
  }

  await ref.set(updates, { merge: true });
  return true;
};

const isAStreak = (lastAwardedAt: Date) => {
  const lastAwardedDateCopy = new Date(lastAwardedAt);
  lastAwardedDateCopy.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = today.getTime() - lastAwardedDateCopy.getTime();
  return diff <= 24 * 60 * 60 * 1000;
};
