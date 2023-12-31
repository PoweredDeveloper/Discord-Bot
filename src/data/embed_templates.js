const { EmbedBuilder } = require('discord.js')

const embedBotCommands = new EmbedBuilder()
	.setAuthor({
		name: 'ミキ',
		iconURL:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.sW59N4LEVxj0AHa65qHjWQHaHa%26pid%3DApi&f=1&ipt=642e5def634791b7b28defe5b928f3d240a844aebe56cc4223e6df5fdabc20ce&ipo=images',
	})
	.setTitle('Команды Бота')
	.setDescription('Список доступных команд:')
	.addFields(
		{
			name: '/rules',
			value: 'ㅤ  Отправит вам правила этого сервера)ㅤ\nㅤ  ',
			inline: false,
		},
		{
			name: '/events',
			value: 'ㅤ  Отправит вам информацию о предстоящем событии)ㅤ\nㅤ  ',
			inline: false,
		},
		{
			name: '/random',
			value: 'ㅤ  Отправит вам случайное число от 1 до 6)ㅤ\nㅤ  ',
			inline: false,
		},
		{
			name: '/help',
			value: 'ㅤ  Отправит список команд с их описаниемㅤ\nㅤ  ',
			inline: false,
		},
		{
			name: '/embed',
			value:
				'ㅤ  Отправляет ваше сообщение как вложенное\nㅤ  *Параметры:*\nㅤ  * Title - Заголовок вложенного сообщения\nㅤ  * Description - Описание вложенного сообщения\nㅤ  * Color - Не обязательный параметр, цвет вложенного сообщенияㅤ\nㅤ  ',
			inline: false,
		},
		{
			name: '/ping',
			value: 'ㅤ  Понг! Вернет пингㅤ\nㅤ  ',
			inline: false,
		},
		{
			name: '/level',
			value: 'ㅤ  Отправит ваш или указанного человека уровеньㅤ\nㅤ  ',
			inline: false,
		}
	)
	.setColor('#ba3ab7')
	.setFooter({ text: 'Команды будут менятся со временем' })

const embedGarticPhoneEvent = new EmbedBuilder()
	.setAuthor({
		name: 'ミキ',
		url: 'https://discord.gg/aThT8J8y?event=1164994686411341924',
		iconURL:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.sW59N4LEVxj0AHa65qHjWQHaHa%26pid%3DApi&f=1&ipt=642e5def634791b7b28defe5b928f3d240a844aebe56cc4223e6df5fdabc20ce&ipo=images',
	})
	.setTitle('Gartic Phone Трибуны')
	.setDescription(
		'Время и дату обсудим. 🌐\n\nЖдем всех желающих, особенно тех, кто ставил реакцию на новость о повторной игре) 😉\n\nСначала собираемся на событии, трибуне (📞 Gartic Phone). Ожидаем 30 минут участников, после идем в отдельный канал играть. Рекомендуется зайти с ПК.\n\nВсем удачки) ☺️'
	)
	.setImage(
		'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fesports.as.com%2F2021%2F02%2F15%2Fbonus%2Fvideojuegos%2FGartic-Phone_1438066191_584916_1024x576.png&f=1&nofb=1&ipt=6e349588289886ee65ffabfa9f2d2e271166d16c8ba53ac65e7aaa230743abf5&ipo=images'
	)
	.setColor('#ba3ab7')
	.setFooter({
		text: 'Всех ждем)))',
		iconURL:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.sftcdn.net%2Fimages%2Ft_app-logo-xl%2Cf_auto%2Fp%2F9d55286d-af37-40e7-9c36-e530140cc3df%2F1999625174%2Fgartic-phone-Gartic%2520Phone-icn.png&f=1&nofb=1&ipt=68e8d7a05bcbb8ff78f925b1276accb2b9c6aecd81c3ba3c02d3e9d6be29268f&ipo=images',
	})

const embedRules = new EmbedBuilder()
	.setAuthor({
		name: 'ミキ',
		iconURL:
			'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.sW59N4LEVxj0AHa65qHjWQHaHa%26pid%3DApi&f=1&ipt=642e5def634791b7b28defe5b928f3d240a844aebe56cc4223e6df5fdabc20ce&ipo=images',
	})
	.setTitle('П Р А В И Л А')
	.setURL('https://discord.gg/5W9FQNquwN')
	.setDescription('Прошу прочесть хотя бы раз')
	.addFields(
		{
			name: '1. Общие положения',
			value:
				'ㅤ\nㅤ  1.1. Все участники сервера имеют равные права независимо от их времени нахождения на сервере и занимаемой роли.\n\nㅤ  1.2. Строго запрещены:\nㅤ\nㅤ  * Флуд, злоупотребление матом в сообщениях;\nㅤ  * Использование черезмерного шок-контента и порнографии;\nㅤ  * Оскорбление других пользователей (Если цель обижается);\nㅤ  * Злоупотребление CAPS LOCK.\n\nㅤ  1.3. Владелец сервера и модераторы могут делать исключения в особых случаях.ㅤ\nㅤ  ',
			inline: false,
		},
		{
			name: '2. Ники и аватарки',
			value:
				'ㅤ\nㅤ  2.1. Запрещены ники с действительно обидными оскорблениями (в том числе завуалированными), рекламой или случайным набором символов.\n\nㅤ  2.2. В качестве аватара запрещено использовать религиозную, политическую, экстремистскую и иную символику.\n\nㅤ  2.3. Модераторы могут потребовать изменить ник или аватар, если считают их оскорбительными или нарушающими правила сервера.ㅤ\nㅤ  ',
			inline: false,
		},
		{
			name: '3. Голосовой чат',
			value:
				'ㅤ\nㅤ  3.1. Запрещено включать музыку в микрофон.\n\nㅤ  3.2. Запрещено издавать громкие звуки в микрофон.\n\nㅤ  3.3 Запрещено включать иные посторонние громкие шумы\n\nㅤ  3.4 Модератор имеет право отключить микрофон и звук в любое время, если это потребуетсяㅤ\nㅤ  ',
			inline: false,
		},
		{
			name: '4. Размещение ссылок',
			value:
				'ㅤ\nㅤ  4.1. Ссылки (Реклама) можно размещать только с согласования модераторов.\n\nㅤ  4.2. Запрещена спам-рассылка рекламы.ㅤ\nㅤ  ',
			inline: false,
		},
		{
			name: '5. Ответственность',
			value:
				'ㅤ\nㅤ  5.1. За нарушение правил сервера к участникам применяются меры от предупреждения до ограничения доступа.\n\nㅤ  5.2. Наказания действуют следующим образом:\n\nㅤ  * Предупреждение\nㅤ  * Бан на 3 дня\nㅤ  * Бан на 7 дней\nㅤ  * Бан на 30 дней\nㅤ  * Перманентный бан\n\nㅤ  5.3. Если в течение 7 дней после наказания пользователь совершает повторный проступок – применяется следующее в очереди наказание.\n\nㅤ  5.4. В отдельных случаях могут быть сделаны исключения в зависимости от тяжести проступка (на усмотрение модераторов).ㅤ\nㅤ  ',
			inline: false,
		},
		{
			name: '6. Администрация',
			value:
				'ㅤ\nㅤ  6.1 Администраторы имеют полное право изменять и редактировать правила (Согласовать с @sixseeven)\n\nㅤ  6.2 Роли @Trusted  @Administrator Helper  @Administrator Имеют высшие полномочияㅤ\nㅤ  ',
			inline: false,
		}
	)
	.setImage(
		'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpapercave.com%2Fwp%2Fwp3942550.jpg&f=1&nofb=1&ipt=78575f340d502a5cce403283db713a56d2926af363b8dcce99062f73b9abd7ae&ipo=images'
	)
	.setColor('#ff0080')
	.setFooter({
		text: 'Соблюдайте пж',
	})

module.exports = { embedBotCommands, embedRules, embedGarticPhoneEvent }
