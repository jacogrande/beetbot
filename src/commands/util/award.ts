import { Strategy } from "@/commands/definitions";
import { awardPoint } from "@/util/awardPoint";
import { createUser } from "@/util/createUser";
import { formatAwardMessage } from "@/util/formarAwardMessage";
import { getUser } from "@/util/getUser";

export const award: Strategy = async (interaction) => {
  const targetUser = interaction.options.getUser("user");
  if (!targetUser) {
    await interaction.reply("You need to tag a user to award them a point.");
    return;
  }
  let { user, ref } = await getUser(targetUser.id);
  if (!user) {
    user = await createUser(targetUser);
  }
  const pointAwarded = await awardPoint(ref, user);
  if (!pointAwarded) {
    await interaction.reply(
      `<@${targetUser.id}> has already been awarded a point today.`,
    );
    return;
  }
  await interaction.reply(
    formatAwardMessage(targetUser.id, {
      ...user,
      score: user.score + 1,
      weeklyScore: user.weeklyScore + 1,
    }),
  );
};
