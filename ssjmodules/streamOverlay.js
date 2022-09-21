"use strict";
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const socketio_client = require('socket.io-client');
const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

let eventList = [
"Ssj4justdale",  //Follower
["Ssj4justdale", "T3"],  //Subscriber, Tier
["Ssj4justdale", "3000bits"],  //Bitter, Quantity
["Ssj4justdale", "$3000"],  //Donator, Amount
];

let myServer;

let SLDEBUG = false;

const db = new sqlite3.Database('./data.db');
//const SLtoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IkQ4RjMyRjg5NzhCNDA0OTk2RjYzIiwicmVhZF9vbmx5Ijp0cnVlLCJwcmV2ZW50X21hc3RlciI6dHJ1ZSwidHdpdGNoX2lkIjoiMjkxNTk2MDciLCJ5b3V0dWJlX2lkIjoiVUNxQmk0aFhvbU1zSFJJWWVNZFlnaS1BIn0.jDULbB_1N0bNYcIQ7GPtHZRzpXBH33PLt5MWeDFadLY";
const SLtoken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbiI6IkU0ODM1MzU2OUUxMDlDQTIzNkM5IiwicmVhZF9vbmx5Ijp0cnVlLCJwcmV2ZW50X21hc3RlciI6dHJ1ZSwidHdpdGNoX2lkIjoiMjE1OTU5OTk3In0.W-kk9rrdBSfABe9rlVg33fqwgenwZwqTgDIYei93JW0";

module.exports.instantiate = function() {
	db.run('CREATE TABLE IF NOT EXISTS data (id TEXT, follower TEXT, subscriber TEXT, tier TEXT, bitter TEXT, quantity TEXT, donator TEXT, amount TEXT);');
	db.all("SELECT * FROM data LIMIT 1;", function(err, rows) {
		rows.forEach(function(row) {
			eventList[0] = row.follower;
			eventList[1][0] = row.subscriber;
			eventList[1][1] = row.tier;
			eventList[2][0] = row.bitter;
			eventList[2][1] = row.quantity;
			eventList[3][0] = row.donator;
			eventList[3][1] = row.amount;
		});
	});
	
	const app = express();
	app.use(express.static('Z_website_Z'));
	const server = http.createServer(app);
	const io = new socketio.Server(server);
	io.on('connection', function (socket) {
		//senden an socket dass er verbunden ist
		//socket.emit('userOnline', {message: 'verbunden'});

		//Informationen vom User holen
		myServer = socket;
		socket.on('update', function (color) {
			console.log("Told to update...");
			//console.log(eventList.toString());
			socket.broadcast.emit('updateAll', eventList[0], eventList[1][0], eventList[1][1], eventList[2][0], eventList[2][1], eventList[3][0], eventList[3][1]);
			socket.emit('updateAll', eventList[0], eventList[1][0], eventList[1][1], eventList[2][0], eventList[2][1], eventList[3][0], eventList[3][1]);
		});
		
		socket.broadcast.emit('updateAll', eventList[0], eventList[1][0], eventList[1][1], eventList[2][0], eventList[2][1], eventList[3][0], eventList[3][1]);
		socket.emit('updateAll', eventList[0], eventList[1][0], eventList[1][1], eventList[2][0], eventList[2][1], eventList[3][0], eventList[3][1]);
	});

	server.listen('3000');

	console.log("server listening on port 3000");
	
	myServer = io;
	
	console.log("SLABS Debug Enabled: " + SLDEBUG);
}

module.exports.registerTwitchEvents = function(twitch) {
//	twitch.on('message', (channel, tags, message, self) => {
//		// Ignore echoed messages.
//		if(self) return;
//		twitch.say(channel, "Yep");
//	});
	
//	twitch.on('subgift', (channel, username, streakMonths, recipient, methods, _userstate) => {
//		twitch.say("Thank you for gifting a sub!");
//    });
	
	twitch.on('subscription', (channel, username, methods, _message, _userstate) => {
		twitch.say(channel, "Thank you for subscribing!");
		eventList[1][0] = username;
		eventList[1][1] = methods.plan;
		updateDatabase();
    });
	
	twitch.on('resub', (channel, username, months, message, userstate, methods) => {
		twitch.say(channel, "Thank you for subscribing!");
		eventList[1][0] = username;
		eventList[1][1] = months + "m " + methods.plan;
		updateDatabase();
    });
	
	twitch.on('cheer', (channel, userstate, _message) => {
		const bits = parseInt(userstate.bits || "0", 10);
		twitch.say(channel, "Thanks for the " + bits + " bitties!");
        eventList[2][0] = userstate.username;
		eventList[2][1] = bits;
		updateDatabase();
    });
}

module.exports.registerSLabsEvents = function() {
	console.log(`${SLtoken}`);

	

    const slabs = (0, socketio_client)(`https://sockets.streamlabs.com?token=${SLtoken}`, { transports: ['websocket'] });
    slabs.on('event', (eventData) => {
        var _a;
        if (eventData.type === 'donation') {
            for (const msg of eventData.message) {
                const amount = msg.amount;
                if (amount == null) {
                    console.log(`Error adding donation! Amount seems to be null. Message: ${JSON.stringify(eventData)}`);
                    return;
                }
                //state.addTime(secondsToAdd);
                //state.displayAddTimeUpdate(secondsToAdd, `${msg.name} (tip)`);
				
				eventList[3][0] = msg.name;
				eventList[3][1] = amount;
				
				updateDatabase();
				
				console.log(`${msg.name} donated ${amount}`);			
				
            }
        }
        else if (eventData.type === 'follow') {
            const name = ((_a = eventData.message[0]) === null || _a === void 0 ? void 0 : _a.name) || "undefined";
			console.log(`Streamlabs: ${name} has followed!`);
			eventList[0] = name;
			updateDatabase();
            //state.displayAddTimeUpdate(secondsToAdd, `${name} (follow)`);
        } else if(eventData.type === 'subscription') {
			const name = ((_a = eventData.message[0]) === null || _a === void 0 ? void 0 : _a.name) || "undefined";
			console.log(`Streamlabs: ${name} has subbed!`);
			if(SLDEBUG) {
				eventList[1][0] = name;
				eventList[1][1] = 'T3';
				updateDatabase();
			}
		} else if(eventData.type === 'bits') {
			const name = ((_a = eventData.message[0]) === null || _a === void 0 ? void 0 : _a.name) || "undefined";
			console.log(`Streamlabs: ${name} has cheered!`);
			if(SLDEBUG) {
				eventList[2][0] = name;
				eventList[2][1] = 1000;
				updateDatabase();
			}
		} 
    });
    slabs.on("connect_error", (err) => {
        console.log(`streamlabs connection error: ${err}`);
    });
    slabs.on("reconnecting", (attempt) => {
        console.log(`streamlabs reconnecting (attempt ${attempt})`);
    });
    slabs.on("disconnect", (reason) => {
        console.log(`streamlabs disconnected! (${reason}) is your token valid?`);
    });
	slabs.on("connect", (err) => {
		console.log("CONNECTED to SLABS!!");
	});
}

function updateDatabase() {
	//myServer.broadcast.emit('update', 'lol');//eventList[0], eventList[1][0], eventList[1][1], eventList[2][0], eventList[2][1], eventList[3][0], eventList[3][1]);
	db.all('UPDATE data SET follower=?, subscriber=?, tier=?, bitter=?, quantity=?, donator=?, amount=? WHERE id="1"', [eventList[0], eventList[1][0], eventList[1][1], eventList[2][0], eventList[2][1], eventList[3][0], eventList[3][1]]);
	myServer.emit('updateAll', eventList[0], eventList[1][0], eventList[1][1], eventList[2][0], eventList[2][1], eventList[3][0], eventList[3][1]);

	
}
