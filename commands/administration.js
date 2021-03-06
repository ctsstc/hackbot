const Command = require('../library/command');

/**
 * Provides commands to help administrate the channels.
 * 
 * @class AdministrationCommand
 * @extends {Command}
 */
class AdministrationCommand extends Command {

  /**
   * Deletes a channel and then recreates it, 
   * giving it a new beginning.
   * 
   */
  static purge(args, msg) {
    const { guild } = msg;

    // Make sure the person doing the command is a Board Member
    const boardRole = guild.roles.find('name', 'Board Member');
    if (msg.member.roles.has(boardRole.id)) {
      // Grab the channels info
      const chan = msg.channel;
      const chanName = chan.name;
      const chanType = chan.type;

      // Delete the channel
      chan.delete()
        .then()
        .catch(console.error);

      // Now re-create the channel with the same name and type
      guild.createChannel(chanName, chanType)
        .then(channel => console.log(`Created new channel ${channel}`))
        .catch(console.error);
    } else {
      return msg.reply('sorry m8, you\'re not authorized to use that command.');
    }
    /* global bot */
    if (!guild.member(bot.user).hasPermission('MANAGE_CHANNELS')) {
      return msg.reply('sorry m8, you\'re not authorized to use that command.');
    }
  }

}


module.exports = AdministrationCommand;
