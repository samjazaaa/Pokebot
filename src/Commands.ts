import { Collection } from "discord.js";
import { ExecutableCommand } from "./Command";
import { Check } from "./commands/Check";

const commandList: ExecutableCommand[] = [Check];

export const Commands = new Collection(
  commandList.map((command) => {
    return [command.command.name, command];
  })
);
