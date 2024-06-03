import { COMMANDS } from "@/commands/definitions";
import * as dotenv from "dotenv";
dotenv.config();

type ValidatedEnv = {
  DISCORD_TOKEN: string;
  DISCORD_APPLICATION_ID: string;
};

const validateEnv = (
  env: Record<string, string | undefined>,
): env is ValidatedEnv => {
  if (!env.DISCORD_TOKEN || !env.DISCORD_APPLICATION_ID) {
    console.error("Missing required environment variables");
    return false;
  }
  return true;
};

async function registerCommands() {
  const commands = getCommandsWithoutExecutors();
  const { DISCORD_TOKEN, DISCORD_APPLICATION_ID } = process.env;
  if (!validateEnv(process.env)) {
    return;
  }
  const url = `https://discord.com/api/v10/applications/${DISCORD_APPLICATION_ID}/commands`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${DISCORD_TOKEN}`,
    },
    method: "PUT",
    body: JSON.stringify(commands),
  });

  if (response.ok) {
    console.log(
      "Registered all commands: ",
      commands.map((command) => command.name),
    );
  } else {
    console.error("Error registering commands");
    const text = await response.text();
    console.error(text);
  }
  return response;
}

const getCommandsWithoutExecutors = () =>
  COMMANDS.map((command) => {
    const formattedObject: any = {
      name: command.name,
      description: command.description,
      options: [],
    };
    if (command.userOptionMessage) {
      formattedObject.options = [
        {
          name: "user",
          description: command.userOptionMessage,
          type: 6,
          required: true,
        },
      ];
    }
    return formattedObject;
  });

registerCommands();
