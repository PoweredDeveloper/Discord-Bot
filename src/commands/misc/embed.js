const { Client, EmbedBuilder, ApplicationCommandOptionType, PermissionFlagsBits } = require('discord.js')

module.exports = {
	name: 'embed',
	description: 'Отправляет ваше сообщение как вложенное',

	permissionsRequired: [PermissionFlagsBits.ManageGuildExpressions],
	botPermissons: [PermissionFlagsBits.ManageGuildExpressions],

	options: [
		{
			name: 'title',
			description: 'Заголовок',
			required: true,
			type: ApplicationCommandOptionType.String,
		},
		{
			name: 'description',
			description: 'Описание',
			required: true,
			type: ApplicationCommandOptionType.String,
		},
		{
			name: 'color',
			description: 'Цвет',
			required: false,
			type: ApplicationCommandOptionType.String,
			choices: [
				{ name: 'Красный', value: '#c21f31' },
				{ name: 'Желтый', value: '#fdd707' },
				{ name: 'Зеленый', value: '#73c65a' },
				{ name: 'Голубой', value: '#18aae5' },
				{ name: 'Синий', value: '#3f51b5' },
				{ name: 'Фиолетовый', value: '#9c27b0' },
				{ name: 'Черный', value: '#000000' },
				{ name: 'Белый', value: '#ffffff' },
			],
		},
	],

	/**
	 * @param {Client} client
	 * @param {import("discord.js").Interaction} interaction
	 */
	callback: (client, interaction) => {
		const title = interaction.options.get('title').value
		const description = interaction.options.get('description').value
		const color = interaction.options.get('color')?.value
		const embed = new EmbedBuilder()
			.setTitle(title)
			.setDescription(description)
			.setColor(color || '#808080')
			.setFooter({
				text: 'Было создано командой /embed',
			})
			.setAuthor({
				name: interaction.user.displayName,
				iconURL: interaction.user.displayAvatarURL().toString(),
			})

		interaction.channel.send({ embeds: [embed] })
		interaction
			.reply({ ephemeral: true, content: '✅ Эмбед был успешно создан и отправлен *Это сообщение скоро пропадет*' })
			.then((message) => {
				setTimeout(() => {
					message.delete()
				}, 5000)
			})
	},
}
