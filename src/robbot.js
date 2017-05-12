const RobbotClient = require('./structures/RobbotClient');
const CommandController = require('./controllers/CommandController');
const DiscordAPIError = require('discord.js/src/client/rest/DiscordAPIError');

const client = new RobbotClient();
const controller = new CommandController();

client
	.once('ready', () => {
		client.logger.info('robbot ready!');
		client.user.setGame(`try '${client.config.commandPrefix} help' !`);
	})
	.on('message', message => {
		controller.handleCommand(message);
	})
	.login(client.config.token);

process.on('unhandledRejection', err => {
	if (!err) return;

	const errorString = 'Uncaught Promise Error:\n';
	if (err instanceof DiscordAPIError) {
		return client.logger.error(`${errorString}${err.code} - ${err.message}`);
	}

	if (err.method && err.path && err.text) {
		return client.logger.error(`${errorString}${err.method}: ${err.path}\n${err.text}`);
	}

	return client.logger.error(errorString + err.stack);
});