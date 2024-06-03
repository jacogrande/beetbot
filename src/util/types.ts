import { Timestamp } from "firebase-admin/firestore";

export type FirestoreUser = {
  score: number;
  username: string;
  createdAt: Timestamp;
  streak: number;
  weeklyScore: number;
  weeklyStreak: number;
  lastAwardedAt?: Timestamp;
  participating: boolean;
  weeklyScoreRecord: number;
};
