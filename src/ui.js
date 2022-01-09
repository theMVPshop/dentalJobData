// Intialize layout
var container = document.getElementById("container");
var content = document.getElementById("content");
var clientWidth = 2782;
var clientHeight = 1000;

// Initialize Scroller
this.scroller = new Scroller(render, {
	zooming: true
});

setInterval(function() {
	var values = scroller.getValues();
}, 500);


var rect = container.getBoundingClientRect();
scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);


// Reflow handling
var reflow = function() {
	clientWidth = container.clientWidth;
	clientHeight = container.clientHeight;
	scroller.setDimensions(clientWidth, clientHeight, contentWidth, contentHeight);
};

window.addEventListener("resize", reflow, false);
reflow();


if ('ontouchstart' in window) {

	container.addEventListener("touchstart", function(e) {
		// Don't react if initial down happens on a form element
		if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i)) {
			return;
		}

		scroller.doTouchStart(e.touches, e.timeStamp);
		e.preventDefault();
	}, false);

	document.addEventListener("touchmove", function(e) {
		scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
	}, false);

	document.addEventListener("touchend", function(e) {
		scroller.doTouchEnd(e.timeStamp);
	}, false);

	document.addEventListener("touchcancel", function(e) {
		scroller.doTouchEnd(e.timeStamp);
	}, false);

} else {

	var mousedown = false;

	container.addEventListener("mousedown", function(e) {
		if (e.target.tagName.match(/input|textarea|select/i)) {
			return;
		}
		
		scroller.doTouchStart([{
			pageX: e.pageX,
			pageY: e.pageY
		}], e.timeStamp);

		mousedown = true;
	}, false);

	document.addEventListener("mousemove", function(e) {
		if (!mousedown) {
			return;
		}
		
		scroller.doTouchMove([{
			pageX: e.pageX,
			pageY: e.pageY
		}], e.timeStamp);

		mousedown = true;
	}, false);

	document.addEventListener("mouseup", function(e) {
		if (!mousedown) {
			return;
		}
		
		scroller.doTouchEnd(e.timeStamp);

		mousedown = false;
	}, false);

	container.addEventListener(navigator.userAgent.indexOf("Firefox") > -1 ? "DOMMouseScroll" :  "mousewheel", function(e) {
		console.log(navigator.userAgent.indexOf("Firefox"));
		scroller.doMouseZoom(e.detail ? (e.detail * -400) : e.wheelDelta, e.timeStamp, e.pageX, e.pageY);
	}, false);

}
