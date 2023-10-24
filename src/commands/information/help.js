const { Client } = require('discord.js')
const { embedBotCommands } = require('../../data/embed_templates')

module.exports = {
	name: 'help',
	description: 'Отправит список команд с их описанием',

	/**
	 * @param {Client} client
	 * @param {import("discord.js").Interaction} interaction
	 */
	callback: (client, interaction) => {
		interaction.reply({ embeds: [embedBotCommands] })
	},
}
