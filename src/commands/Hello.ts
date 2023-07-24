import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { ExecutableCommand } from "src/Command";

export const Hello: ExecutableCommand = {
  command: new SlashCommandBuilder()
    .setName("hello")
    .setDescription("Returns a greeting"),
  run: async (interaction: ChatInputCommandInteraction) => {
    const content = "Hello there!";

    await interaction.reply({
      ephemeral: true,
      content,
    });
  },
};
