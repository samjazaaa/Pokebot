import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

// add run function to existing command data interface
export interface ExecutableCommand {
  command: SlashCommandBuilder;
  run: (interaction: ChatInputCommandInteraction) => Promise<void>;
}
