var http = require('http'); 
const puppeteer = require('puppeteer-extra')
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin());

let steams_acts = ['domandmatt', 'arglow0726', 'rafaelmartins12345', 'dominic_capobianco'];
let epics_acts = ['LP-HybridTheory', 'JonSandmanRL', 'EverlitSpotify', 'SpotifyEverlit', 'EverlitOnSpotify', 'SmurfAlt001', 'SmurfAlt002', 'SmurfAlt003', 'OfficerKat',
				  'M0nk4yM00N'];

let steams = steams_acts.sort((a, b) => a.localeCompare(b));
let epics = epics_acts.sort((a, b) => a.localeCompare(b));

(async () => {
  
	const server = http.createServer(async (req, res) => {
		res.writeHead(200, {'Content-Type': 'text/html'}); 
		
		res.write('<head> \
			<title> \
				Alt-Ranks\
			</title>\
			  \
			<style>\
				#MyTable{\
					border: 1px solid white;\
					background: black;\
					color: white;\
				}\
				#MyTable td{\
					border: 1px solid white;\
					padding: 3px;\
					color: white;\
				}\
				.parentCell{\
					position: relative;\
					font-size: 32px;\
				}\
				.tooltip{\
					display: none;\
					position: absolute; \
					z-index: 100;\
					border: 1px;\
					background-color: white;\
					border: 1px solid green;\
					padding: 3px;\
					color: green; \
					top: 35px; \
					left: 35px;\
					width: 175px;\
					font-size: 12px;\
				}\
				.parentCell:hover span.tooltip{\
					display:block;\
				}\
				\
				img {\
					width: 34px;\
					height: 34px;\
					position: relative;\
					padding: 0px;\
					margin: 0px;\
					position: absolute;\
				}\
				\
				body {\
					font-size: 36px;\
					background: #202F27;\
					color: white;\
				}\
			</style>\
		</head> ');
		
		res.write('<body align = "center"> ');
		res.write('<center><table id="MyTable">');
		res.write("<td><center><b>Username</center></b></td> <td><center><b>Platform</center></b></td> <td><center><b>Solos</center></b></td> <td><center><b>Duos</center></b></td> <td><center><b>Standard</center></b></td> <td><center><b>Rumble</center></b></td> <td><center><b>Dropshot</center></b></td> <td><center><b>Hoops</center></b></td> <td><center><b>Snowday</center></b></td> <td><center><b>Tournaments</center></b></td> <td><center><b>Casual</center></b></td><td>&nbsp;</td><td><b><center>Ranked Rewards</b></center></td><td><b><center>Ranked Rewards TNL</b></center></td>")
		for(let i = 0; i < steams.length; i++) {
			let mR = await scrape("steam", steams[i]);
			
			res.write("<tr><td>" + steams[i] + "</td>"); //username
			res.write("<td>STEAM</td>"); //platform
			res.write('<td id = "steam' + steams[i] + '0" class = "parentCell">' + await imgSRC(mR[3][0]) + mR[0][0].toString() + '<span class = "tooltip">' + mR[1][0] + "</span></td>"); //solos
			res.write('<td id = "steam' + steams[i] + '1" class = "parentCell">' + await imgSRC(mR[3][1]) + mR[0][1].toString() + '<span class = "tooltip">' + mR[1][1] + "</span></td>"); //solos
			res.write('<td id = "steam' + steams[i] + '2" class = "parentCell">' + await imgSRC(mR[3][2]) + mR[0][2].toString() + '<span class = "tooltip">' + mR[1][2] + "</span></td>"); //solos
			res.write('<td id = "steam' + steams[i] + '3" class = "parentCell">' + await imgSRC(mR[3][3]) + mR[0][3].toString() + '<span class = "tooltip">' + mR[1][3] + "</span></td>"); //solos
			res.write('<td id = "steam' + steams[i] + '4" class = "parentCell">' + await imgSRC(mR[3][4]) + mR[0][4].toString() + '<span class = "tooltip">' + mR[1][4] + "</span></td>"); //solos
			res.write('<td id = "steam' + steams[i] + '5" class = "parentCell">' + await imgSRC(mR[3][5]) + mR[0][5].toString() + '<span class = "tooltip">' + mR[1][5] + "</span></td>"); //solos
			res.write('<td id = "steam' + steams[i] + '6" class = "parentCell">' + await imgSRC(mR[3][6]) + mR[0][6].toString() + '<span class = "tooltip">' + mR[1][6] + "</span></td>"); //solos
			res.write('<td id = "steam' + steams[i] + '7" class = "parentCell">' + await imgSRC(mR[3][7]) + mR[0][7].toString() + '<span class = "tooltip">' + mR[1][7] + "</span></td>"); //solos
			res.write('<td id = "steam' + steams[i] + '8" class = "parentCell">' + await imgSRC(mR[3][8]) + mR[0][8].toString() + '<span class = "tooltip">' + mR[1][8] + "</span></td>"); //solos
			res.write('<td></td>'); //solos
			res.write('<td id = "steam' + steams[i] + '9" class = "parentCell">' + await imgSRC(mR[4][1]) + mR[4][0].toString() + '<span class = "tooltip">' + mR[4][0] + "</span></td>"); //solos
			res.write('<td id = "steam' + steams[i] + '10" class = "parentCell">' + mR[4][2] + "/10 Wins TNL</td>"); //solos
			
		}
		
		for(let i = 0; i < epics.length; i++) {
			let mR = await scrape("epic", epics[i]);
			
			res.write("<tr><td>" + epics[i] + "</td>"); //username
			res.write("<td>EPIC</td>"); //platform
			res.write('<td id = "epic' + epics[i] + '0" class = "parentCell">' + await imgSRC(mR[3][0]) + mR[0][0].toString() + '<span class = "tooltip">' + mR[1][0] + "</span></td>"); //solos
			res.write('<td id = "epic' + epics[i] + '1" class = "parentCell">' + await imgSRC(mR[3][1]) + mR[0][1].toString() + '<span class = "tooltip">' + mR[1][1] + "</span></td>"); //solos
			res.write('<td id = "epic' + epics[i] + '2" class = "parentCell">' + await imgSRC(mR[3][2]) + mR[0][2].toString() + '<span class = "tooltip">' + mR[1][2] + "</span></td>"); //solos
			res.write('<td id = "epic' + epics[i] + '3" class = "parentCell">' + await imgSRC(mR[3][3]) + mR[0][3].toString() + '<span class = "tooltip">' + mR[1][3] + "</span></td>"); //solos
			res.write('<td id = "epic' + epics[i] + '4" class = "parentCell">' + await imgSRC(mR[3][4]) + mR[0][4].toString() + '<span class = "tooltip">' + mR[1][4] + "</span></td>"); //solos
			res.write('<td id = "epic' + epics[i] + '5" class = "parentCell">' + await imgSRC(mR[3][5]) + mR[0][5].toString() + '<span class = "tooltip">' + mR[1][5] + "</span></td>"); //solos
			res.write('<td id = "epic' + epics[i] + '6" class = "parentCell">' + await imgSRC(mR[3][6]) + mR[0][6].toString() + '<span class = "tooltip">' + mR[1][6] + "</span></td>"); //solos
			res.write('<td id = "epic' + epics[i] + '7" class = "parentCell">' + await imgSRC(mR[3][7]) + mR[0][7].toString() + '<span class = "tooltip">' + mR[1][7] + "</span></td>"); //solos
			res.write('<td id = "epic' + epics[i] + '8" class = "parentCell">' + await imgSRC(mR[3][8]) + mR[0][8].toString() + '<span class = "tooltip">' + mR[1][8] + "</span></td>"); //solos
			res.write('<td></td>');
			res.write('<td id = "epic' + epics[i] + '9" class = "parentCell">' + await imgSRC(mR[4][1]) + mR[4][0].toString() + '<span class = "tooltip">' + mR[4][0] + "</span></td>"); //solos
			res.write('<td id = "epic' + epics[i] + '10" class = "parentCell">' + mR[4][2] + "/10 Wins TNL</td>"); //solos
			
		}
		
		res.write("</table></center></body></html>")
		
		res.end();
	  
	}).listen(8081);
	
	console.log('Node.js web server at port 8081 is running..')
	


	async function remove_first_occurrence(str, searchstr)       {
		var index = str.indexOf(searchstr);
		if (index === -1) {
			return str;
		}
		return str.slice(0, index) + str.slice(index + searchstr.length);
	}
	
	async function imgSRC(str) {
		return '<img src="' + str + '"></img>' + "&nbsp;&nbsp;&nbsp;&nbsp;";
	}

	async function scrape(platform, username) {
		const browser = await puppeteer.launch( {
			headless: true,  ignoreDefaultArgs: ['--disable-extensions'], executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe'
		});
		const page = await browser.newPage();

		const myUrl = 'https://api.tracker.gg/api/v2/rocket-league/standard/profile/' + platform + '/' + username;
		await page.goto(myUrl, { waitUntil: 'networkidle0' });

		await page.content(); 

		innerText = await page.evaluate(() =>  {
			return JSON.stringify(JSON.parse(document.querySelector("body").innerText)); 
		}); 
		
		await browser.close(); 

		if(innerText.search('"errors":') != -1){
			return innerText.toString();
		} else {
		
			let returnThis = await parseRanks(innerText);
				
			return returnThis; 
		}
	}

	async function parseRanks(jsonData) {
		let myJsonObject = JSON.parse(jsonData);
		
		let my_ranks = [];
		my_ranks[0] = 0; //Duels
		my_ranks[1] = 0; //Duos
		my_ranks[2] = 0; //Standard
		my_ranks[3] = 0; //Rumble
		my_ranks[4] = 0; //Hoops
		my_ranks[5] = 0; //Dropshot
		my_ranks[6] = 0; //Snowday
		my_ranks[7] = 0; //Casual
		my_ranks[8] = 0; //Tournaments
		
		let my_ranks_divs = [];
		my_ranks_divs[0] = 0;
		my_ranks_divs[1] = 0;
		my_ranks_divs[2] = 0;
		my_ranks_divs[3] = 0;
		my_ranks_divs[4] = 0;
		my_ranks_divs[5] = 0;
		my_ranks_divs[6] = 0;
		my_ranks_divs[7] = 0;
		my_ranks_divs[8] = 0;
		
		let userInfo = [];
		userInfo[0] = myJsonObject["data"]["platformInfo"]["platformUserHandle"];
		
		let myData;
		
		let icons = [];
		icons[0] = 'https://trackercdn.com/cdn/tracker.gg/rocket-league/ranks/s4-0.png';
		icons[1] = 'https://trackercdn.com/cdn/tracker.gg/rocket-league/ranks/s4-0.png';
		icons[2] = 'https://trackercdn.com/cdn/tracker.gg/rocket-league/ranks/s4-0.png';
		icons[3] = 'https://trackercdn.com/cdn/tracker.gg/rocket-league/ranks/s4-0.png';
		icons[4] = 'https://trackercdn.com/cdn/tracker.gg/rocket-league/ranks/s4-0.png';
		icons[5] = 'https://trackercdn.com/cdn/tracker.gg/rocket-league/ranks/s4-0.png';
		icons[6] = 'https://trackercdn.com/cdn/tracker.gg/rocket-league/ranks/s4-0.png';
		icons[7] = 'https://trackercdn.com/cdn/tracker.gg/rocket-league/ranks/s4-0.png';
		icons[8] = 'https://trackercdn.com/cdn/tracker.gg/rocket-league/ranks/s4-0.png';
		
		let seasonRewards = [];
		seasonRewards[0] = "Unranked";
		seasonRewards[1] = 'https://trackercdn.com/cdn/tracker.gg/rocket-league/ranks/s4-0.png';
		
		let mySRdata = myJsonObject["data"]["segments"][0];
		
		seasonRewards[0] = mySRdata.stats.seasonRewardLevel.metadata.rankName;
		seasonRewards[1] = mySRdata.stats.seasonRewardLevel.metadata.iconUrl;
		seasonRewards[2] = mySRdata.stats.seasonRewardWins.displayValue;
		
		
		for(let iter = -1; iter <= 12; iter++){
			if(myJsonObject["data"]["segments"][iter] !== undefined){
				myData = myJsonObject["data"]["segments"][iter];
				if(myData["metadata"]["name"] == "Ranked Duel 1v1") {
					my_ranks[0] = myData.stats.rating.value;
					my_ranks_divs[0] = myData.stats.tier.metadata.name + ' ' + myData.stats.division.metadata.name;
					icons[0] = myData.stats.tier.metadata.iconUrl;
				} else if(myData["metadata"]["name"] == "Ranked Doubles 2v2") {
					my_ranks[1] = myData.stats.rating.value;
					my_ranks_divs[1] = myData.stats.tier.metadata.name + ' ' + myData.stats.division.metadata.name;
					icons[1] = myData.stats.tier.metadata.iconUrl;
				} else if(myData["metadata"]["name"] == "Ranked Standard 3v3") {
					my_ranks[2] = myData.stats.rating.value;
					my_ranks_divs[2] = myData.stats.tier.metadata.name + ' ' + myData.stats.division.metadata.name;
					icons[2] = myData.stats.tier.metadata.iconUrl;
				} else if(myData["metadata"]["name"] == "Rumble") {
					my_ranks[3] = myData.stats.rating.value;
					my_ranks_divs[3] = myData.stats.tier.metadata.name + ' ' + myData.stats.division.metadata.name;
					icons[3] = myData.stats.tier.metadata.iconUrl;
				} else if(myData["metadata"]["name"] == "Dropshot") {
					my_ranks[4] = myData.stats.rating.value;
					my_ranks_divs[4] = myData.stats.tier.metadata.name + ' ' + myData.stats.division.metadata.name;
					icons[4] = myData.stats.tier.metadata.iconUrl;
				} else if(myData["metadata"]["name"] == "Hoops") {
					my_ranks[5] = myData.stats.rating.value;
					my_ranks_divs[5] = myData.stats.tier.metadata.name + ' ' + myData.stats.division.metadata.name;
					icons[5] = myData.stats.tier.metadata.iconUrl;
				} else if(myData["metadata"]["name"] == "Snowday") {
					my_ranks[6] = myData.stats.rating.value;
					my_ranks_divs[6] = myData.stats.tier.metadata.name + ' ' + myData.stats.division.metadata.name;
					icons[6] = myData.stats.tier.metadata.iconUrl;
				} else if(myData["metadata"]["name"] == "Tournament Matches") {
					my_ranks[7] = myData.stats.rating.value;
					my_ranks_divs[7] = myData.stats.tier.metadata.name + ' ' + myData.stats.division.metadata.name;
					icons[7] = myData.stats.tier.metadata.iconUrl;
				}  else if(myData["metadata"]["name"] == "Un-Ranked") {
					my_ranks[8] = myData.stats.rating.value;
					my_ranks_divs[8] = myData.stats.tier.metadata.name + ' ' + myData.stats.division.metadata.name;
					icons[8] = myData.stats.tier.metadata.iconUrl;
				} 
			}
		}
		
		return [
			my_ranks,
			my_ranks_divs,
			userInfo,
			icons, 
			seasonRewards
		];

	}
	
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

})();



