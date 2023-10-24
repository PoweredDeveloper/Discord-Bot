const Level = require('../../models/Level')
const { ApplicationCommandOptionType, Client, Interaction, AttachmentBuilder } = require('discord.js')
const calculateLevelXp = require('../../utils/calculateLevelXp')
const canvacord = require('canvacord')

module.exports = {
	name: 'level',
	description: 'Отправит ваш нынешний уровень',

	options: [
		{
			name: 'user',
			description: 'Пользователь, уровень которого будет показан',
			type: ApplicationCommandOptionType.Mentionable,
		},
	],

	/**
	 * @param {Client} client
	 * @param {Interaction} interaction
	 */
	callback: async (client, interaction) => {
		await interaction.deferReply()

		const mentionedUser = interaction.options.get('user')?.value
		const targetUserId = mentionedUser || interaction.member.id
		const targetUserObj = await interaction.guild.members.fetch(targetUserId)

		const fetchedLevel = await Level.findOne({
			userId: targetUserId,
			guildId: interaction.guild.id,
		})

		if (!fetchedLevel) {
			interaction.editReply(
				mentionedUser
					? `${targetUserObj.user} еще не имеет уровня`
					: `У вас еще нет уровня, попробуйте написать что-нибудь в чат`
			)
			return
		}

		let allLevels = await Level.find({ guildId: interaction.guild.id }).select('-_id userId level xp')

		allLevels.sort((a, b) => {
			if (a.level == b.level) {
				return b.xp - a.xp
			} else {
				return b.level - a.level
			}
		})

		let curentRank = allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1

		const rank = new canvacord.Rank()
			.setAvatar(targetUserObj.user.displayAvatarURL({ size: 512 }))
			.setBackground('IMAGE', './src/images/rankBackground.jpeg')
			.setRank(curentRank)
			.setProgressBarTrack('#276b64')
			.setLevel(fetchedLevel.level)
			.setCurrentXP(fetchedLevel.xp)
			.setRequiredXP(calculateLevelXp(fetchedLevel.level))
			.setStatus(targetUserObj.presence.status)
			.setProgressBar('#ffffff', 'COLOR')
			.setUsername(targetUserObj.user.username)

		const data = await rank.build()
		const attachment = new AttachmentBuilder(data)
		interaction.editReply({ files: [attachment] })
	},
}
