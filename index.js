const tmi = require('tmi.js');
const request = require('request');
const cheerio = require('cheerio');

const modulePlayerQueue = require('./ssjmodules/playerQueues');
const moduleStreamOverlay = require('./ssjmodules/streamOverlay');
const moduleSongRequests = require('./ssjmodules/songRequests');

moduleStreamOverlay.instantiate();

(async () => {
	
	let ranCommand = false;
	let lastOffline = false;
	let ranThisStream = false;

	const client = new tmi.Client({
		options: { debug: true },
		identity: {
			username: 'ssj4justdale',
			password: 'oauth:4zqngoxlwt9kqwy2h7srqc3zs8xfgd'
		},
		channels: [ 'ptlucy' ]
	});

	client.connect();
	
	moduleStreamOverlay.registerTwitchEvents(client);
	moduleSongRequests.registerTwitchEvents(client);
	moduleStreamOverlay.registerSLabsEvents();

	client.on('message', (channel, tags, message, self) => {
		// Ignore echoed messages.
		if(self) return;
		
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
		
		if(modulePlayerQueue) {
			if(message.toLowerCase() === modulePlayerQueue.joinCommand){
				let myQ = modulePlayerQueue.getList()
				if(myQ.indexOf(tags.username) != -1) {
					client.say(channel, '@' + tags.username + ', you are already in the queue');
				} else {
					client.say(channel, '@' + tags.username + ' has joined the queue');
					modulePlayerQueue.joinQueue(tags.username);
				}
			}
			
			if(message.toLowerCase() === modulePlayerQueue.leaveCommand){
				let myQ = modulePlayerQueue.getList()
				if(myQ.indexOf(tags.username) == -1) {
					client.say(channel, '@' + tags.username + ', you are not in the queue');
				} else {
					client.say(channel, '@' + tags.username + ' has left the queue');
					modulePlayerQueue.leaveQueue(tags.username);
				}
			}
			
			if(message.toLowerCase() === modulePlayerQueue.queueCommand){
				let myQ = modulePlayerQueue.getListText()
				client.say(channel, 'Current Players in Queue: ' + myQ);
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
						if(message == "!horny") {
							client.say(channel, `!commands edit !horny -c=1`);
						} else {
							client.say(channel, `!commands edit !horny -c=0`);
						}
						ranCommand = true;
					}
				} else {
					if(ranThisStream == false) {
						if(ranCommand == false) {
							if(message == "!horny") {
								client.say(channel, `!commands edit !horny -c=1`);
							} else {
								client.say(channel, `!commands edit !horny -c=0`);
							}
							ranCommand = true;
						}
						
						lastOffline = false;
						
						ranThisStream = true;
					}
				}
			}
			
	});
	});
})();
	