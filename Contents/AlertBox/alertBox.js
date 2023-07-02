/*
    Alert Box
    Copyright © 2018-2019 Harry Whitfield

    This program is free software; you can redistribute it and/or
    modify it under the terms of the GNU General Public License as
    published by the Free Software Foundation; either version 2 of
    the License, or (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public
    License along with this program; if not, write to the Free
    Software Foundation, Inc., 51 Franklin St, Fifth Floor, Boston,
    MA  02110-1301  USA

    Alert Box - version 1.0
    2 February, 2019
    Copyright © 2018-2019 Harry Whitfield
    mailto:g6auc@arrl.net
*/

/*jslint bitwise */

/*property
    appendChild, bgColor, bgOpacity, close, color, data, font, hAlign, hOffset,
    height, interval, level, onMouseDown, onTimerFired, opacity, open,
    setTimeout, size, src, srcHeight, srcWidth, style, textAlign, ticking,
    vOffset, visible, width, wrap
*/

"use strict";

/////////////////////////////////// Alert Box/// Code ////////////////////////////////////

var newAlertBox = function (base, timeout, okCallback, cancelCallback, timeoutCallback) {
	var src = base + "/alertBox.png";
	var ok = base + "/okButton.png";
	var cancel = base + "/cancelButton.png";

	var o = new Window();

	function newImage(parent, src, visible) {
		var oo = new Image();

		oo.src = src;
		oo.hOffset = 0;
		oo.vOffset = 0;
		oo.width = oo.srcWidth;
		oo.height = oo.srcHeight;
		oo.hAlign = "left";
		oo.opacity = 255;
		oo.visible = visible;
		parent.appendChild(oo);
		return oo;
	}

	function newText(parent) {
		var oo = new Text();

		oo.hOffset = 0;
		oo.vOffset = 0;
		oo.width = 280;
		oo.height = 16;
		oo.hAlign = "left";
		oo.color = "#000000";
		oo.opacity = 255;
		oo.bgColor = "#FFFFFF";
		oo.bgOpacity = 0;
		parent.appendChild(oo);
		return oo;
	}

	var img = newImage(o, src, true);
	var okButton = newImage(o, ok, true);
	var cancelButton = newImage(o, cancel, true);
	var title = newText(o);
	var text = newText(o);
	var timer = new Timer();

	okButton.hOffset = 218;
	okButton.vOffset = 178;
	okButton.width = 76;
	okButton.height = 24;

	cancelButton.hOffset = 309;
	cancelButton.vOffset = 178;
	cancelButton.width = 77;
	cancelButton.height = 24;

	title.size = 13;
	title.font = "Arial";
	title.hOffset = 60;
	title.vOffset = 40;
	title.data = "";	// widget.name;

	text.hOffset = 208;
	text.vOffset = 42;
	text.width = 280;
	text.height = 80;
	text.hAlign = "center";
	text.style.textAlign = "center";
	text.font = "Times New Roman";
	text.wrap = true;
	text.size = 12;

	timer.interval = timeout;
	timer.ticking = false;

	o.hOffset = (screen.width >> 1) - 210;
	o.vOffset = 250;
	o.width = img.width;
	o.height = img.height;
	o.level = "topMost";
	o.visible = false;

	o.close = function () {
    	timer.ticking = false;
    	o.visible = false;
	};

	timer.onTimerFired = function () {
    	timer.ticking = false;
    	o.visible = false;
		timeoutCallback();
	};

	okButton.onMouseDown = function () {
    	timer.ticking = false;
    	o.visible = false;
    	okCallback();
	};

	cancelButton.onMouseDown = function () {
    	timer.ticking = false;
    	o.visible = false;
    	cancelCallback();
	};


	o.open = function (theText) {
		text.data = theText;
		o.visible = true;
    	timer.ticking = true;
 	};

 	o.setTimeout = function (timeout) {
 		timer.interval = timeout;
 	};

	return o;
};

/////////////////////////////// End of Alert Window Code /////////////////////////////////

// Test Code Follows
/*
function okCallB() {
	alert("OK button was pressed.");
}

function cancelCallB() {
	alert("Cancel button was pressed.");
}

function timeoutCallB() {
	alert("Timeout fired.");
}

var aw = newAlertBox("/Users/nhw/Desktop/AlertBox", 30, okCallB, cancelCallB, timeoutCallB);
aw.open("This is the Folder Selection Window\nbut you have inadvertently selected a file.\n\nNow press the OK button to select this folder.");
*/
