import { db } from "@/config/firebase";
import { getRandomTheme } from "@/config/themes";
import { client } from "@/index";
import { TextChannel } from "discord.js";

const MINIMUM_WEEKLY_SCORE = 3;
// const TEST_CHANNEL_ID = "825837410155233284";
const BEETBOT_CHANNEL_ID = "826318017163165736";

export const endTheWeek = async () => {
  const winnerIds: string[] = [];
  const loserIds: string[] = [];
  const users = await db.collection("users").get();
  for (const userDoc of users.docs) {
    const user = userDoc.data();
    if (!user.participating) continue;
    let isWinner: boolean;
    if (user.weeklyScore >= MINIMUM_WEEKLY_SCORE) {
      // winner winner beetbot dinner
      winnerIds.push(userDoc.id);
      isWinner = true;
    } else {
      loserIds.push(userDoc.id);
      isWinner = false;
    }
    // update the user doc
    await userDoc.ref.update({
      weeklyScore: 0,
      weeklyStreak: isWinner ? user.weeklyStreak + 1 : 0,
      weeklyScoreRecord: Math.max(user.weeklyScoreRecord, user.weeklyScore),
    });
  }
  if (winnerIds.length === 0 && loserIds.length === 0) return;
  await postScoreAnnouncement(winnerIds, loserIds);
};

const postScoreAnnouncement = async (
  winnerIds: string[],
  loserIds: string[],
) => {
  const winnerMentions = winnerIds.map((id) => `<@${id}>`).join(" ");
  const loserMentions = loserIds.map((id) => `<@${id}>`).join(" ");
  const beetChannel = client.channels.cache.get(
    BEETBOT_CHANNEL_ID,
  ) as TextChannel;
  if (!beetChannel) return;
  const loserShoutout =
    loserIds.length > 0 ? "\n**Better luck next time** " + loserMentions : "";
  const weeklyTheme = getRandomTheme();
  await beetChannel.send(
    "Happy Monday! Here are last week's results.\n" +
      "**#1 Victory Royales**: " +
      winnerMentions +
      loserShoutout +
      "\n" +
      `This week's theme: ${weeklyTheme}`,
  );
};
