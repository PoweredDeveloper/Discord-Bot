const { Client } = require('discord.js')

module.exports = {
	name: 'ping',
	description: 'Понг! Покажет вам ваш пинг',

	/**
	 * @param {Client} client
	 * @param {import("discord.js").Interaction} interaction
	 */
	callback: async (client, interaction) => {
		await interaction.deferReply()
		const reply = await interaction.fetchReply()
		const ping = reply.createdTimestamp - interaction.createdTimestamp

		interaction.editReply(`**🏓   Понг!**  *Клиент:  *${ping}ms | *Вебсокет:  *${client.ws.ping}ms`)
	},
}
