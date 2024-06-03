import { Strategy } from "@/commands/definitions";

export const ping: Strategy = async (interaction) => {
  await interaction.reply("Pong!");
};
