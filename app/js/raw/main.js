$(document).ready(function() {
	$('#fullpage').fullpage({
		autoScrolling:true,
    anchors:['welcome', 'studio', 'process', 'forthPage', 'fifthPage'],
    menu: '#menu',
    css3: true,
    verticalCentered: false
	});

	//methods
	$.fn.fullpage.setAllowScrolling(true);
})