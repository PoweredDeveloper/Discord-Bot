const { Client } = require('discord.js')
const getAllFiles = require('../utils/getAllFiles')
const path = require('path')

/**
 * @param {Client} client
 */

module.exports = (client) => {
	const eventFolders = getAllFiles(path.join(__dirname, '..', 'events'), true)

	for (const eventFolder of eventFolders) {
		const eventFiles = getAllFiles(eventFolder)
		eventFiles.sort((a, b) => a > b)

		const eventName = eventFolder.replace(/\\/g, '/').split('/').pop()

		client.on(eventName, async (args) => {
			for (const eventFile of eventFiles) {
				const eventFunction = require(eventFile)
				await eventFunction(client, args)
			}
		})
	}
}
