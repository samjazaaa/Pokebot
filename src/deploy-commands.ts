import { REST, Routes } from "discord.js";
import { exit } from "process";
import { Commands } from "src/Commands";

const commands = Commands;

const token = process.env["DISCORD_TOKEN"];
const clientId = process.env["DISCORD_CLIENT_ID"];

if (!token || !clientId) {
  console.error(
    "Missing discord token! Set the env variables DISCORD_TOKEN and DISCORD_CLIENT_ID!"
  );
  exit(1);
}

const rest = new REST().setToken(token);

(async () => {
  try {
    console.log(
      `Started refreshing ${commands.size} application (/) commands.`
    );

    const bodyData = [...commands.values()].map((executableCommand) => {
      return executableCommand.command.toJSON();
    });

    console.log(bodyData);

    const data = await rest.put(Routes.applicationCommands(clientId), {
      body: [...commands.values()].map((executableCommand) => {
        return executableCommand.command.toJSON();
      }),
    });

    if (Array.isArray(data)) {
      console.log(
        `Successfully reloaded ${data.length} application (/) commands.`
      );
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
})();
