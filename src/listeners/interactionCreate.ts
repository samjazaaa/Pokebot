import { ChatInputCommandInteraction, Client, Interaction } from "discord.js";
import { Commands } from "src/Commands";

const interactionCreate = (client: Client): void => {
  client.on("interactionCreate", async (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    await handleSlashCommand(interaction);
  });
};

const handleSlashCommand = async (
  interaction: ChatInputCommandInteraction
): Promise<void> => {
  // find matching command if it exists
  const slashCommand = Commands.get(interaction.commandName);
  if (!slashCommand) {
    interaction.followUp({ content: "An error has occurred" });
    return;
  }

  try {
    await slashCommand.run(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
};

export default interactionCreate;
