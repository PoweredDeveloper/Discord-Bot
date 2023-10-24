const { Client } = require('discord.js')

module.exports = {
	name: 'random',
	description: 'Отправит вам случайное число от 1 до 6)',

	/**
	 * @param {Client} client
	 * @param {import("discord.js").Interaction} interaction
	 */
	callback: (client, interaction) => {
		let randomNumber = Math.ceil(Math.random() * 6)
		interaction.reply(`✅ Вам выпало число: **${randomNumber}** 🍀\n\n*Могу еще чем-то помочь?*`)
	},
}
