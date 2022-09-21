
var myDelayOnFade = 750;
var myDelayInFade = 5000;
var fadeOutDelay = 750;
var fadeInDelay = 1000;

$(document).ready(() => {
	$('#follower').fadeOut();
	$('#sub').fadeOut();
	$('#tier').fadeOut();
	$('#bit').fadeOut();
	$('#amt').fadeOut();
	$('#don').fadeOut();
	$('#qua').fadeOut();
	executeOnce();
});

async function sleep(millis) {
  return new Promise(resolve => {
    setTimeout(resolve, millis);
  });
}

async function executeOnce() {
	while(true) {
		$('#content').fadeOut(fadeOutDelay);
		await sleep(myDelayOnFade);
		$('#content').html($('#follower').text() + " <img src=\"./imgs/follow.png\"></img>");
		$('#content').fadeIn(fadeInDelay);
		await sleep(myDelayInFade);
		$('#content').fadeOut(fadeOutDelay);
		await sleep(myDelayOnFade);
		$('#content').html($('#sub').text() + " " + $('#tier').text() + " <img src=\"./imgs/subscriber.png\"></img>");
		$('#content').fadeIn(fadeInDelay);
		await sleep(myDelayInFade);
		$('#content').fadeOut(fadeOutDelay);
		await sleep(myDelayOnFade);
		$('#content').html($('#bit').text() + " " + $('#amt').text() + " <img src=\"./imgs/bit.png\"></img>");
		$('#content').fadeIn(fadeInDelay);
		await sleep(myDelayInFade);
		$('#content').fadeOut(fadeOutDelay);
		await sleep(myDelayOnFade);
		$('#content').html($('#don').text() + " $" + $('#qua').text() + " <img src=\"./imgs/donation.png\"></img>");
		$('#content').fadeIn(fadeInDelay);
		await sleep(myDelayInFade);
	}
}