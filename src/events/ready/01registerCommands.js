const { Client } = require('discord.js')
const { server } = require('../../../config.json')
const getLocalCommands = require('../../utils/getLocalCommands')
const getApplicationCommands = require('../../utils/getApplicationCommands')
const areCommandsDifferent = require('../../utils/areCommandsDifferent')

/**
 * @param {Client} client
 */

module.exports = async (client) => {
	try {
		const localCommands = getLocalCommands()
		const applicationCommands = await getApplicationCommands(client, server)

		for (const localCommand of localCommands) {
			const { name, description, options } = localCommand

			const existingCommand = await applicationCommands.cache.find((cmd) => cmd.name === name)

			if (existingCommand) {
				if (localCommand.deleted) {
					await applicationCommands.delete(existingCommand.id)
					console.log(`🗑️ Delted command "${name}"`)
					continue
				}

				if (areCommandsDifferent(existingCommand, localCommand)) {
					await applicationCommands.edit(existingCommand.id, {
						description,
						options,
					})

					console.log(`🔁 Command "${name}" was edited`)
				}
			} else {
				if (localCommand.deleted) {
					console.log(`⏩ Skipping registering command "${name}" as it's set to delete`)
					continue
				}

				await applicationCommands.create({
					name,
					description,
					options,
				})

				console.log(`✅ Registered command "${name}"`)
			}
		}
	} catch (error) {
		console.log(`🔴 ${error}`)
	}
}
