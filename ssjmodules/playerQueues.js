let player_queue = [];

module.exports.joinCommand = "!joinqueue";
module.exports.leaveCommand = "!leavequeue";
module.exports.queueCommand = "!queue";

module.exports.joinQueue = function(player) {
	if(player_queue.indexOf(player) != -1) {
		return player_queue
	}
	
	player_queue.push(player)

	return player_queue;
}

module.exports.leaveQueue = function(player) {
	if(player_queue.indexOf(player) != -1) {
		player_queue = player_queue.filter(e => e !== player);
	}
	
	return player_queue;
}

module.exports.getListText = function() {
	return player_queue.toString();
}

module.exports.getList = function () {
	return player_queue;
}