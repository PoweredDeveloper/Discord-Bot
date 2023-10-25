const { Client, Interaction, EmbedBuilder } = require('discord.js')
const Level = require('../../models/Level')

module.exports = {
	name: 'ranking',
	description: 'Отправит рейтинг участников сервера',

	/**
	 * @param {Client} client
	 * @param {Interaction} interaction
	 */
	callback: async (client, interaction) => {
		await interaction.deferReply()

		const allLevels = await Level.find({ guildId: interaction.guild.id }).select('-_id userId level')

		allLevels.sort((a, b) => {
			if (a.level == b.level) {
				return b.xp - a.xp
			} else {
				return b.level - a.level
			}
		})

		let playersRanking = []
		for (const [index, rank] of allLevels.entries()) {
			const member = await interaction.guild.members.fetch(rank.userId)
			playersRanking.push(`${index}. Уровень: **${rank.level}**  |  ${member}`)
		}

		const embedRanking = new EmbedBuilder()
			.setColor('Gold')
			.setTitle('Топ По Уровням')
			.setDescription(`Список игроков: \n${playersRanking.join('\n')}`)
			.setFooter({ text: 'Отправлено командой /ranking' })

		interaction.editReply({ embeds: [embedRanking] })
	},
}
