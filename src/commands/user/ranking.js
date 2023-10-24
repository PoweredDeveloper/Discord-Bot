const { Client, Interaction } = require('discord.js')

module.exports = {
	name: 'ranking',
	description: 'Отправит рейтинг участников сервера',

	deleted: true,
	devOnly: true,
	testOnly: true,

	/**
	 * @param {Client} client
	 * @param {Interaction} interaction
	 */
	callback: (client, interaction) => {},
}
