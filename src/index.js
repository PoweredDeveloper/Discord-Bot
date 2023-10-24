const { Client, IntentsBitField } = require('discord.js')
const mongoose = require('mongoose')
const eventHandler = require('./handlers/eventHandler.js')
require('dotenv').config()

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
		IntentsBitField.Flags.GuildPresences,
	],
})

;(async () => {
	try {
		mongoose.set('strictQuery', false)
		await mongoose.connect(process.env.MONGODB_URI)
		console.log(`🗃️ Connected to Database Successfully!`)

		eventHandler(client)

		client.login(process.env.TOKEN)
	} catch (error) {
		console.log(`🔴 ${error}`)
	}
})()
