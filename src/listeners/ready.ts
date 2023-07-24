import { Client } from "discord.js";
import { Commands } from "src/Commands";

const ready = (client: Client): void => {
  client.on("ready", async () => {
    if (!client.user || !client.application) {
      return;
    }

    console.log(`${client.user.tag} is online!`);
  });
};

export default ready;
