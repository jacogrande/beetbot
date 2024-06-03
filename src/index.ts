import * as dotenv from "dotenv";
import { Client, Events, GatewayIntentBits } from "discord.js";
import { handleChatCommand } from "@/commands/handler";
import { handleMessage } from "@/messages/handler";
import * as cron from "node-cron";
import { endTheWeek } from "@/endTheWeek";
dotenv.config();

// Create a new client instance
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on(Events.InteractionCreate, (interaction) => {
  if (interaction.isChatInputCommand()) {
    handleChatCommand(interaction);
  }
});

client.on(Events.MessageCreate, (message) => {
  handleMessage(message);
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
client.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

const token = process.env.DISCORD_TOKEN;

// Log in to Discord with your client's token
client.login(token);

// Configure cron to run every Monday at 12:00 AM
cron.schedule("0 0 * * 1", async () => {
  await endTheWeek();
});
