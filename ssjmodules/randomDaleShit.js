module.exports.rollDiceCommand = ["!roll", "!r"];

module.exports.getArgument = function(message) { 
	return message.split(" ")[1];
}

module.exports.rollDice = function(command) {
	if(command) {
		
		command = command.split("d");
		let numDice = parseInt(command[0]);
		let diceType = parseInt(command[1]);
		
		command = "";
		let myReturn = 0;
		let myAdd = 0;
		
		for (let i = 0; i < numDice; i++) {
			myAdd = Math.floor(Math.random() * diceType) + 1
			myReturn += myAdd;
			command += ((command.length > 2 ? ", " : "") + "d" + diceType + "(" + myAdd + ")");
		}
	
	
	
		return "rolled " + numDice + "d" + diceType + " and got " + myReturn + (numDice < 13 ? " => " + "{" + command + "}" : "");
	}
	return "please follow this format: 1d6";
	
	
}
