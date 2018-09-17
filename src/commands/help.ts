import { Message } from 'discord.js';
import config from '../config';
import Commands from '../library/commands';
import ICommand from '../library/iCommand';

let Help: ICommand;

export default Help = class {

  /* istanbul ignore next */
  static get description(): string {
    return 'Displays this message';
  }

  public static execute(args: string[], msg: Message) {
    const commands = new Commands();

    let helpMsg = "I am here to help! Well...mostly just make you chuckle at this point, let's be honest.\n\n";
    helpMsg += "Here is a list of the commands that we've got right now:\n";
    helpMsg += '```\n';

    // Find the longest synopsis
    // Considered moving this to the Commands class
    let longest = 0;
    commands.names.map((commandName) => {
      commandName = `${config.messagePrefix}${commandName}`;
      if (commandName.length > longest) {
        longest = commandName.length;
      }
    });

    // Add an extra space
    longest += 1;

    commands.names.map((commandName) => {
      const command = commands.get(commandName);
      helpMsg += `${config.messagePrefix}${commandName}`;
      // TODO: needs args implemented here after they're part of the magic
      const spaces = longest - commandName.length;
      for (let i = 0; i < spaces; i++) {
        helpMsg += ' ';
      }
      helpMsg += '→ ';
      helpMsg += `${command.description}\n`;
    });

    helpMsg += '```';

    msg.reply('sliding into your DMs...');
    msg.author.send(helpMsg);
  }

};
