/*global mainWindow */

/*properties
    appendChild, bgColor, bgOpacity, color, data, display, event, font,
    hOffset, height, interval, Tooltip, onTimerFired, opacity, remove,
    removeChild, size, ticking, vOffset, width, wrap, zOrder
*/

var TOOLTIP = (function (parent, duration) {
	var timer = new Timer(),
		tooltip = null,
		width,
		height,
		itself = {};

	function makeTooltip(obj) {
		var txt = new Text(),
			hOff;
		txt.wrap      = true;
		txt.color     = "#000000";
		txt.bgColor   = "#F6F7C1";
		txt.opacity   = 255;
		txt.bgOpacity = 245;
		txt.data      = obj.myTooltip;
		txt.font      = "Times";
		txt.size      = 12;
		hOff          = obj.hOffset + (obj.width - txt.width) / 2;
		if (hOff < 0) { hOff = 0; }
		txt.hOffset   = hOff;
		txt.vOffset   = system.event.vOffset;
		txt.zOrder    = 100;
		return txt;
	}

	itself.remove = function () {
		timer.ticking = false;
		if (tooltip !== null) {
			parent.removeChild(tooltip);
			tooltip = null;
			parent.width  = width;
			parent.height = height;
		}
	};
	
	itself.display = function () {
		var obj = this;

		itself.remove();
		if (obj.myTooltip) {
			tooltip = makeTooltip(obj);
			width  = parent.width;
			height = parent.height;
			parent.width  += tooltip.width;
			parent.height += tooltip.height;
			parent.appendChild(tooltip);
			timer.ticking = true;
		}
	};
	
	itself.enable = function (obj) {
		obj.onMouseEnter = itself.display;
		obj.onMouseExit  = itself.remove;
	};

	timer.ticking = false;
	timer.interval = duration;
	timer.onTimerFired = itself.remove;
	
	return itself;
	
}(mainWindow, 3));
