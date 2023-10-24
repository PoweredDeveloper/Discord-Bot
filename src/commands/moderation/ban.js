const { Client, Interaction, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
	name: 'ban',
	description: 'Блокирует пользователя',

	options: [
		{
			name: 'user',
			description: 'Пользователь который будет заблокирован',
			type: ApplicationCommandOptionType.Mentionable,
			require: true,
		},
		{
			name: 'reason',
			description: 'Причина по который пользователь будет заблокирован',
			type: ApplicationCommandOptionType.String,
		},
	],

	permissionsRequired: [PermissionFlagsBits.BanMembers],
	botPermissons: [PermissionFlagsBits.BanMembers],

	/**
	 * @param {Client} client
	 * @param {Interaction} interaction
	 */
	callback: async (client, interaction) => {
		const targetUserId = interaction.options.get('user').value
		const reason = interaction.options.get('reason')?.value || 'Причина не предоставлена'

		await interaction.deferReply()
		const targetUser = await interaction.guild.members.fetch(targetUserId)

		if (!targetUser) {
			await interaction.editReply('❌  Этого пользователя нет на сервере')
			return
		}

		if (targetUser.id === interaction.guild.ownerId) {
			await interaction.editReply('❌  Вы не можете заблокировать владельца сервера')
			return
		}

		const targetUserRolePosition = targetUser.roles.highest.position // Highest role of the target user
		const requestUserRolePosition = interaction.member.roles.highest.position // Highest role of the user running the cmd
		const botRolePosition = interaction.guild.members.me.roles.highest.position // Highest role of the bot

		if (targetUserRolePosition >= requestUserRolePosition) {
			await interaction.editReply(`❌  Вы не можете заблокировать ${targetUser}. Его права равны/выше ваших`)
			return
		}

		if (targetUserRolePosition >= botRolePosition) {
			await interaction.editReply(`❌  Я не могу заблокировать ${targetUser}. Его права равны/выше моих`)
			return
		}

		try {
			await targetUser.ban({ reason })
			await interaction.editReply(`🔴  Пользователь ${targetUser} был заблокирован\n\nПричина: ${reason}`)
		} catch (error) {
			console.log(`🔴 ${error}`)
		}
	},
}
