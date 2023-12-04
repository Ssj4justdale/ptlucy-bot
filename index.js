//Kraken + Cheatingup COde: IH1VYO-W22TGR-SM4EW4

const tmi = require('tmi.js');
const request = require('request');
const cheerio = require('cheerio');

const modulePlayerQueue = require('./ssjmodules/playerQueues');
const moduleStreamOverlay = require('./ssjmodules/streamOverlay');
const moduleSongRequests = require('./ssjmodules/songRequests');
const moduleRandomDaleShit = require('./ssjmodules/randomDaleShit.js');
const moduleAltRanks = require('./ssjmodules/altRanks.js');

const axios = require('axios');

moduleStreamOverlay.instantiate();

(async () => {
	
	let ranCommand = false;
	let lastOffline = false;
	let ranThisStream = false;

	const client = new tmi.Client({
		options: { debug: true },
		identity: {
			username: '',
			password: 'oauth:'
		},
		channels: [ 'ptlucy' ]
	});

	client.connect();
	
	//moduleStreamOverlay.registerTwitchEvents(client);
	moduleSongRequests.registerTwitchEvents(client);
	moduleStreamOverlay.registerSLabsEvents();

	client.on('message', async (channel, tags, message, self) => {
		// Ignore echoed messages.
		if(self) return;
		let messageToLower = message.toLowerCase();
		let cmdExec = messageToLower.split(" ")[0];
		
		if(message === '@ssj4justdale -> The command "!horny" has been edited successfully.'){
			client.say(channel, "---------------------");
			client.say(channel, 'Finished resetting "!horny"');
		}
		
		if(message.toLowerCase() === "!coinflip"){
			let num = Math.random();
			let cF = "";
			
			let hC = 0;
			let tC = 0;
			let fTo = 9;
			
			while(hC < fTo && tC < fTo) {
				num = Math.random();
				if (num < 0.5) {
					hC++;
				} else {
					tC++
				}
			}
			
			cF = hC > tC ? "HEADS" : "TAILS";
				
			//console.log("Tails: " + tC.toString() + " // Heads: " + hC.toString());
			client.say(channel, "Coin flipped and returned " + cF);
		}
		
		if(message.toLowerCase() === "!age"){
			let dob = new Date("06/08/2001");
			let month_diff = Date.now() - dob.getTime();
			let age_dt = new Date(month_diff); 
			let year = age_dt.getUTCFullYear();
			let age = Math.abs(year - 1970);
			client.say(channel, age.toString());
		}
		
		if(modulePlayerQueue) {
			if(message.toLowerCase() === modulePlayerQueue.joinCommand){
				let myQ = modulePlayerQueue.getList()
				if(myQ.indexOf(tags.username) != -1) {
					client.say(channel, '@' + tags.username + ', you are already in the queue');
				} else {
					client.say(channel, '@' + tags.username + ' has joined the queue');
					modulePlayerQueue.joinQueue(tags.username);
				}
			} else if(message.toLowerCase() === modulePlayerQueue.leaveCommand){
				let myQ = modulePlayerQueue.getList()
				if(myQ.indexOf(tags.username) == -1) {
					client.say(channel, '@' + tags.username + ', you are not in the queue');
				} else {
					client.say(channel, '@' + tags.username + ' has left the queue');
					modulePlayerQueue.leaveQueue(tags.username);
				}
			} else if(message.toLowerCase() === modulePlayerQueue.queueCommand){
				let myQ = modulePlayerQueue.getListText()
				client.say(channel, 'Current Players in Queue: ' + myQ);
			}
		}
		
		if(moduleRandomDaleShit) {
			
			if(moduleRandomDaleShit.rollDiceCommand.includes(cmdExec)) {
				let msg = moduleRandomDaleShit.rollDice( moduleRandomDaleShit.getArgument(message.toLowerCase()) );
				client.say(channel, "/me " + tags.username + " " + msg);
			} else if(moduleRandomDaleShit.playlistWheelCommand .includes(cmdExec)){
				let msg = moduleRandomDaleShit.playlistWheel();
				client.say(channel, msg);
			}
		}
		

		request('https://decapi.me/twitch/uptime?channel=ptlucy', function (error, response, html) {
			if (!error && response.statusCode == 200) {
				var $ = cheerio.load(html);
				// Get text 
				console.log("------- with request module -------")
				if($.text() == 'ptlucy is offline') {
					ranThisStream = false;
					if(lastOffline == false) {
						ranCommand = false;
						lastOffline = true;
					}
					if(ranCommand == false) {
						resetHorny(client, channel, (message === "!horny"));
						ranCommand = true;
					}
				} else {
					if(ranThisStream == false) {
						if(ranCommand == false) {
							resetHorny(client, channel, (message === "!horny"));
							ranCommand = true;
						}
						
						lastOffline = false;
						
						ranThisStream = true;
					}
				}
			}
			
		});
	});
	
	
	client.on('subscription', async (channel, username, methods, _message, _userstate) => {
		client.say(channel, "Thank you for subscribing!");
		moduleStreamOverlay.eventList[1][0] = username;
		moduleStreamOverlay.eventList[1][1] = methods.plan;
		moduleStreamOverlay.updateDatabase();
    });
	
	client.on('resub', async (channel, username, months, message, userstate, methods) => {
		client.say(channel, "Thank you for subscribing!");
		moduleStreamOverlay.eventList[1][0] = username;
		moduleStreamOverlay.eventList[1][1] = months + "m " + methods.plan;
		moduleStreamOverlay.updateDatabase();
    });
	
	client.on('cheer', async (channel, userstate, _message) => {
		const bits = parseInt(userstate.bits || "0", 10);
		client.say(channel, "Thanks for the " + bits + " bitties!");
        moduleStreamOverlay.eventList[2][0] = userstate.username;
		moduleStreamOverlay.eventList[2][1] = bits;
		moduleStreamOverlay.updateDatabase();
    });
	
})();

function resetHorny(twitch, channel, defaultHorny) {
	if(defaultHorny === null || defaultHorny === false) {
		defaultHorny = '0';
	} else {defaultHorny = '1';}
	
	twitch.say(channel, 'Resetting "!horny"...');
	twitch.say(channel, "---------------------");
	twitch.say(channel, `!commands edit !horny -c=` + defaultHorny);
}


async function getViewers(twitchChannel) {
	let myStream = await axios.get("http://tmi.twitch.tv/group/user/" + twitchChannel + "/chatters");
	return myStream.data.chatter_count;
}

async function getChatters(twitchChannel) {
	let myStream = await axios.get("http://tmi.twitch.tv/group/user/" + twitchChannel + "/chatters");
	return [...myStream.data.chatters.moderators, ...myStream.data.chatters.vips, ...myStream.data.chatters.viewers];
}
