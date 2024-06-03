import { Strategy } from "@/commands/definitions";
import { createUser } from "@/util/createUser";
import { getUser } from "@/util/getUser";

export const participate: Strategy = async (interaction) => {
  const commandingUser = interaction.user;
  let { user, ref } = await getUser(commandingUser.id);
  if (!user) {
    user = await createUser(commandingUser);
  }
  await ref.update({ participating: true });
  await interaction.reply(`<@${commandingUser.id}> has begun to cook!`);
};
