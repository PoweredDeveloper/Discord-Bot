const { Client } = require('discord.js')
const { embedGarticPhoneEvent } = require('../../data/embed_templates')

module.exports = {
	name: 'events',
	description: 'Отправит вам информацию о предстоящем событии)',

	/**
	 * @param {Client} client
	 * @param {import("discord.js").Interaction} interaction
	 */
	callback: (client, interaction) => {
		interaction.channel.send({ embeds: [embedGarticPhoneEvent] })
		interaction.reply('✅   Отправил близжайшее событие\n\n*Могу еще чем-то помочь?*')
	},
}
