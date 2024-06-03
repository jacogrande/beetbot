import { FirestoreUser } from "@/util/types";

export const formatAwardMessage = (userId: string, user: FirestoreUser) => {
  return (
    `Let's goooooo <@${userId}>!\n` +
    `> **Weekly Score**: ${user.weeklyScore}\n` +
    `> **Total Score**: ${user.score}\n` +
    `> **Weekly Streak**: ${user.weeklyStreak}`
  );
};
