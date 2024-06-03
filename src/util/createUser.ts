import { FirestoreUser } from "@/util/types";
import { User } from "discord.js";
import { firestore } from "firebase-admin";
import { Timestamp } from "firebase-admin/firestore";
import { db } from "src/config/firebase";

export const createUser = async (discordUser: User): Promise<FirestoreUser> => {
  const userDoc = db.collection("users").doc(discordUser.id);
  const userData: FirestoreUser = {
    score: 0,
    username: discordUser.username,
    createdAt: firestore.FieldValue.serverTimestamp() as Timestamp,
    streak: 0,
    weeklyScore: 0,
    weeklyStreak: 0,
    participating: false,
    weeklyScoreRecord: 0,
  };
  await userDoc.set(userData, { merge: true });
  return userData;
};
