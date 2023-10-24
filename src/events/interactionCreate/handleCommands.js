const { Client } = require('discord.js')
const { devs, testChannel } = require('../../../config.json')
const getLocalCommands = require('../../utils/getLocalCommands')

/**
 * @param {Client} client
 * @param {import("discord.js").Interaction} interaction
 */

module.exports = async (client, interaction) => {
	if (!interaction.isChatInputCommand()) return

	const localCommands = getLocalCommands()

	try {
		const commandObject = localCommands.find((cmd) => cmd.name === interaction.commandName)

		if (!commandObject) return

		if (commandObject.devOnly) {
			if (!devs.includes(interaction.member.id)) {
				interaction.reply({
					content: '❌ Только разработчики имеют прво использовать эту комманду',
					ephemeral: true,
				})
				return
			}
		}

		if (commandObject.testOnly) {
			if (!(interaction.channel.id === testChannel)) {
				interaction.reply({
					content: '❌ Эта команда не может быть использована здесь',
					ephemeral: true,
				})
				return
			}
		}

		if (commandObject.permissionsRequired?.length) {
			for (const permission of commandObject.permissionsRequired) {
				if (!interaction.member.permissions.has(permission)) {
					interaction.reply({
						content: '❌ Не достаточно прав',
						ephemeral: true,
					})
					return
				}
			}
		}

		if (commandObject.botPermissions?.length) {
			for (const permission of commandObject.botPermissions) {
				const bot = interaction.guild.members.me

				if (!bot.permissions.has(permission)) {
					interaction.reply({
						content: '❌ У меня не достаточно прав для выполнения этой команды',
						ephemeral: true,
					})
					return
				}
			}
		}
		await commandObject.callback(client, interaction)
	} catch (error) {
		console.log(`🔴 Error Running this command ${error}`)
	}
}
