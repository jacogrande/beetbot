import { award } from "@/commands/util/award";
import { participate } from "@/commands/util/participate";
import { ping } from "@/commands/util/ping";
import { ChatInputCommandInteraction } from "discord.js";

export type Strategy = (
  interaction: ChatInputCommandInteraction,
) => Promise<void>;

export type Command = {
  name: string;
  description: string;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
  userOptionMessage?: string;
};

export const COMMANDS: Command[] = [
  {
    name: "ping",
    description: "Replies with Pong!",
    execute: ping,
  },
  {
    name: "award",
    description: "Award the user with a point",
    userOptionMessage: "The user to award",
    execute: award,
  },
  {
    name: "participate",
    description: "Opt in to the weekly competition",
    execute: participate,
  },
] as const;
