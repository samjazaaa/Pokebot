import { Collection } from "discord.js";
import { ExecutableCommand } from "./Command";
import { Hello } from "./commands/Hello";

const commandList: ExecutableCommand[] = [Hello];

export const Commands = new Collection(
  commandList.map((command) => {
    return [command.command.name, command];
  })
);
