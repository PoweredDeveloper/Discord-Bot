const activityTypes = ['Играет в', 'Стримит', 'Слушает', 'Смотрит', '', 'Соревнуется в']
const presenceStateTypes = {
	idle: '🟡  Неактивен',
	dnd: '🔴  Не беспокоить',
	invisible: '⚫  Не в сети',
	online: '🟢  В сети',
}

module.exports = { activityTypes, presenceStateTypes }
