import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { ExecutableCommand } from "src/Command";
import getMinPrices from "src/util/scrape";

export const Check: ExecutableCommand = {
  command: new SlashCommandBuilder()
    .setName("check")
    .setDescription("Returns the current per pack prices"),
  run: async (interaction: ChatInputCommandInteraction) => {
    const minPrices = await getMinPrices();

    // TODO return prices in answer

    const content = "Hello there!";

    await interaction.reply({
      ephemeral: true,
      content,
    });
  },
};
