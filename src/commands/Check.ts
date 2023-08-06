import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  hyperlink,
  underscore,
} from "discord.js";
import { ExecutableCommand } from "src/Command";
import getMinPrices from "src/util/scrape";

export const Check: ExecutableCommand = {
  command: new SlashCommandBuilder()
    .setName("check")
    .setDescription("Returns the current per pack prices"),
  run: async (interaction: ChatInputCommandInteraction) => {
    interaction.deferReply({ ephemeral: true });
    const minPrices = await getMinPrices();

    let content = "";

    for (const minPrice of minPrices) {
      content +=
        underscore(minPrice.name) +
        "\n" +
        "- Display size:\t" +
        minPrice.displaySize +
        "\n" +
        "- Booster price:\t" +
        minPrice.boosterPrice +
        "€\n" +
        "- Total price:\t" +
        minPrice.totalPrice +
        "€\n" +
        "- Seller:\t" +
        hyperlink(
          minPrice.link.substring(minPrice.link.lastIndexOf("/") + 1),
          minPrice.link
        ) +
        "\n" +
        "\n";
    }

    await interaction.editReply({
      content,
    });
  },
};
