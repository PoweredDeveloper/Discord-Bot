const { Client, ActivityType } = require('discord.js')

/**
 * @param {Client} client
 */

module.exports = (client) => {
	console.log(`✅ ${client.user.tag} is active now!`)
	client.user.setPresence({
		status: 'idle',
		activities: [{ name: 'как помогать', type: ActivityType.Watching }],
	})
}
