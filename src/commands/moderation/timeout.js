const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits, time } = require('discord.js')
const ms = require('ms')

module.exports = {
	name: 'timeout',
	description: 'Заглушает пользователя',

	options: [
		{
			name: 'user',
			description: 'Пользователь который будет заглушен',
			type: ApplicationCommandOptionType.Mentionable,
			require: true,
		},
		{
			name: 'duration',
			description: 'Время на которое пользователь будет заглушен (30m, 1h, 1 day)',
			type: ApplicationCommandOptionType.String,
		},
		{
			name: 'reason',
			description: 'Причина по который пользователь будет заглушен',
			type: ApplicationCommandOptionType.String,
		},
	],

	permissionsRequired: [PermissionFlagsBits.MuteMembers],
	botPermissons: [PermissionFlagsBits.MuteMembers],

	/**
	 * @param {Client} client
	 * @param {Interaction} interaction
	 */
	callback: async (client, interaction) => {
		const targetUserId = interaction.options.get('user').value
		const duration = interaction.options.get('duration').value
		const reason = interaction.options.get('reason')?.value || 'Причина не предоставлена'

		await interaction.deferReply()
		const targetUser = await interaction.guild.members.fetch(targetUserId)

		if (!targetUser) {
			await interaction.editReply('❌  Этого пользователя нет на сервере')
			return
		}

		if (targetUser.user.bot) {
			await interaction.editReply('❌  Вы не можете заглушить бота')
			return
		}

		if (targetUser.id === interaction.guild.ownerId) {
			await interaction.editReply('❌  Вы не можете заглушить владельца сервера')
			return
		}

		const msDuration = ms(duration)

		if (isNaN(msDuration)) {
			await interaction.editReply('❌  Укажите верный формат времени')
			return
		}

		if (msDuration < 5000 || msDuration > 2.419e9) {
			await interaction.editReply('❌  Время не может быть меньше 5 секунд или больше 28 дней')
			return
		}

		const targetUserRolePosition = targetUser.roles.highest.position // Highest role of the target user
		const requestUserRolePosition = interaction.member.roles.highest.position // Highest role of the user running the cmd
		const botRolePosition = interaction.guild.members.me.roles.highest.position // Highest role of the bot

		if (targetUserRolePosition >= requestUserRolePosition) {
			await interaction.editReply(`❌  Вы не можете заглушить ${targetUser}. Его права равны/выше ваших`)
			return
		}

		if (targetUserRolePosition >= botRolePosition) {
			await interaction.editReply(`❌  Я не могу заглушить ${targetUser}. Его права равны/выше моих`)
			return
		}

		try {
			const { default: prettyMs } = await import('pretty-ms')

			if (targetUser.isCommunicationDisabled()) {
				await targetUser.timeout(msDuration, reason)
				await interaction.editReply(
					`🔴  Тайм-аут ${targetUser} был обновлен до ${prettyMs(msDuration, { verbose: true })}\n\nПричина: ${reason}`
				)
				return
			}

			await targetUser.timeout(msDuration, reason)
			await interaction.editReply(
				`🔴  ${targetUser} был заглушен на ${prettyMs(msDuration, { verbose: true })}.\n\nПричина: ${reason}`
			)
		} catch (error) {
			console.log(`🔴 ${error}`)
		}
	},
}
