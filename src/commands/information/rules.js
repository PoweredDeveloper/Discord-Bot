const { Client } = require('discord.js')
const { embedRules } = require('../../data/embed_templates')

module.exports = {
	name: 'rules',
	description: 'Отправит вам правила этого сервера)',

	/**
	 * @param {Client} client
	 * @param {import("discord.js").Interaction} interaction
	 */
	callback: (client, interaction) => {
		interaction.user.send({ embeds: [embedRules] })
		interaction.reply('✅   Я отправил вам правила данного сервера\n\n*Могу еще чем-то помочь?*')
	},
}
