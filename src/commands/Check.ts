import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { ExecutableCommand } from "src/Command";

export const Check: ExecutableCommand = {
  command: new SlashCommandBuilder()
    .setName("check")
    .setDescription("Returns the current per pack prices"),
  run: async (interaction: ChatInputCommandInteraction) => {
    const content = "Hello there!";

    await interaction.reply({
      ephemeral: true,
      content,
    });
  },
};
