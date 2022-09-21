
var myDelayOnFade = 750;
var myDelayInFade = 5000;
var fadeOutDelay = 750;
var fadeInDelay = 1000;

$(document).ready(() => {
	$('#penis1').fadeOut();
	$('#penis2').fadeOut();
	$('#penis3').fadeOut();
	$('#penis4').fadeOut();
	$('#penis5').fadeOut();
	$('#penis6').fadeOut();
	$('#penis7').fadeOut();
	executeOnce();
});

async function sleep(millis) {
  return new Promise(resolve => {
    setTimeout(resolve, millis);
  });
}

async function executeOnce() {
	while(true) {
		sleep(2000);
    });
	}
}