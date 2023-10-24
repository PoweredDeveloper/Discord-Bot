const { Client, Interaction, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const Level = require('../../models/Level')
const { activityTypes, presenceStateTypes } = require('../../utils/getPresenceLocale')
const calculateLevelXp = require('../../utils/calculateLevelXp')

module.exports = {
	name: 'info',
	description: 'Отправит информацию о вас',
	options: [
		{
			name: 'user',
			description: 'Пользователь, информация о котором будет показана',
			type: ApplicationCommandOptionType.Mentionable,
		},
	],

	devOnly: true,
	testOnly: true,

	/**
	 * @param {Client} client
	 * @param {Interaction} interaction
	 */
	callback: async (client, interaction) => {
		await interaction.deferReply()

		const mentionedUserId = interaction.options.get('user')?.value
		const targetUserId = mentionedUserId || interaction.member.id
		const targetUser = await interaction.guild.members.fetch(targetUserId)

		if (targetUser.user.bot) {
			interaction.editReply('❌  Вы не можете просмотреть информацию о боте')
			return
		}

		const activityField = {
			name: 'Активность',
			value: targetUser.presence
				? `ㅤ  ${activityTypes[targetUser.presence.activities[0].type]} **${targetUser.presence.activities[0].name}**`
				: 'Нет',
			inline: true,
		}

		const rolesOfTheMember =
			targetUser.roles.cache
				.sort((a, b) => b.position - a.position)
				.map((r) => r)
				.filter((r) => r.name != '@everyone')
				.join(' / ') || 'Нет ролей'

		const fetchedLevel = await Level.findOne({
			userId: targetUserId,
			guildId: interaction.guild.id,
		})
		let allLevels = await Level.find({ guildId: interaction.guild.id }).select('-_id userId level xp')
		let curentRank = allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1

		allLevels.sort((a, b) => {
			if (a.level == b.level) {
				return b.xp - a.xp
			} else {
				return b.level - a.level
			}
		})

		const embedUserInfo = new EmbedBuilder()
			.setTitle(`Информация о ${targetUser.displayName}`)
			.setColor(targetUser.displayColor || 'Blurple')
			.setThumbnail(targetUser.displayAvatarURL({ size: 2048 }))
			.setFields(
				{
					name: 'Общая информация',
					value: `ㅤ  Имя: ${targetUser.displayName} [${
						targetUser.user.tag
					}]\n\nㅤ  На сервере с: *${targetUser.joinedAt.toLocaleString('ru', {
						day: '2-digit',
						month: 'short',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
					})}*\nㅤ  В Дискорде с: *${targetUser.user.createdAt.toLocaleString('ru', {
						day: '2-digit',
						month: 'short',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
					})}*\n`,
					inline: false,
				},
				{
					name: 'Статус',
					value: `ㅤ  ${presenceStateTypes[targetUser.presence ? targetUser.presence.status : 'invisible']}`,
					inline: true,
				},
				activityField,
				{
					name: `Роли [${targetUser.roles.cache.size - 1}]`,
					value: rolesOfTheMember,
					inline: false,
				},
				{
					name: 'Уровень',
					value: `ㅤ  ✨  Уровень: ${fetchedLevel.level}\nㅤ  💫  Xp: ${fetchedLevel.xp}/${calculateLevelXp(
						fetchedLevel.level
					)} (Осталось: ${calculateLevelXp(fetchedLevel.level) - fetchedLevel.xp})\nㅤ  Ранг: ${curentRank}`,
					inline: false,
				}
			)
			.setFooter({ text: `ID: ${targetUserId}` })

		interaction.editReply({ embeds: [embedUserInfo] })
	},
}
