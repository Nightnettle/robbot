const config = require('../config.json');
const fs = require('fs');
const moment = require('moment');

// INFO: The command will execute whether or not the bot can send messages to the channel.

exports.main = function(bot, msg, cooldown, botPerm, userPerm, chalk) {
	var command = "setUsername";
	if (cooldown.onCooldown(msg.author.id, msg)) return;
	if(msg.author.id !== config.ownerID) return msg.reply("you are not authorized to use this command!").then(msg => msg.delete(2000));
	var timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
	var arg = msg.content.substr(config.commandPrefix.length + command.length + 2);
	if(msg.content.length == config.commandPrefix.length + command.length + 1) return msg.reply("specify a username to set the bot to!");
	bot.user.setUsername(arg);
	fs.appendFileSync(`${config.logPath}${config.profileLog}`, `\n[${timestamp}][USERNAME] ${msg.author.username}#${msg.author.discriminator} successfully used the "${msg.content.substr(config.commandPrefix.length + 1, command.length)}" command on the '${msg.guild}' server!`); // ...and log command use, when and by whom.
	console.log(`[${timestamp}]${chalk.magenta("[USERNAME]")} ${bot.user.username}'s username set to '${arg}' ! (${msg.author.username}#${msg.author.discriminator} on '${msg.guild}')`);
	msg.reply(`successfully set my username to '${arg}' ! \n(May not have worked if ratelimit capped)`);
};

exports.desc = "change the bot's username [Bot owner only]";
exports.syntax = "<username to set the bot to>";