//===========================================================================
// vitality.js
// Steampunk Media Player Widget  1.0.14
// Written and Steampunked by: Dean Beedell
// aqqc35@dsl.pipex.com
//===========================================================================

/*property
    appendChild, createDocument, createElement, dockOpen, setAttribute,
    setDockItem
*/

/*jslint multivar */

"use strict";

//=========================================================================
// this function builds vitality for the dock
//=========================================================================
function buildVitality(bg, perc, WMPMuteState) {
    var d, v, dock_bg, w, vit;

    if (!widget.dockOpen) {
        return;
    }

    d = XMLDOM.createDocument();
    v = d.createElement("dock-item");
    v.setAttribute("version", "1.0");
    d.appendChild(v);

    dock_bg = d.createElement("image");
    dock_bg.setAttribute("src", bg);
    dock_bg.setAttribute("hOffset", 0);
    dock_bg.setAttribute("vOffset", 0);
    v.appendChild(dock_bg);

    w = d.createElement("text");
    w.setAttribute("hOffset", "5");
    w.setAttribute("vOffset", "20");
    w.setAttribute("hAlign", "left");
    w.setAttribute("style", "text-align: left;font-family: 'Times New Roman'; font-stretch: condensed; font-size: 18px; color: #ffffff; -kon-shadow: 0px -1px rgba( 0, 0, 0, 0.7 )");

    if (!WMPMuteState) {
        vit = String(perc) + "%";
    } else {
        vit = "Muted";
    }
    w.setAttribute("data", vit);
    v.appendChild(w);

    widget.setDockItem(d, "fade");
}
//=====================
//End function
//=====================
