import { Client, GatewayIntentBits } from "discord.js";
import ready from "./listeners/ready";
import interactionCreate from "./listeners/interactionCreate";

const token = process.env["DISCORD_TOKEN"];

console.log("Bot is starting...");

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// register event listeners
ready(client);
interactionCreate(client);

// login with token
client.login(token);
