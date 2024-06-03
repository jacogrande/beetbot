import { COMMANDS } from "@/commands/definitions";
import { ChatInputCommandInteraction } from "discord.js";

export const handleChatCommand = async (
  interaction: ChatInputCommandInteraction,
) => {
  const command = COMMANDS.find((cmd) => cmd.name === interaction.commandName);
  if (!command) return;

  await command.execute(interaction);
};
