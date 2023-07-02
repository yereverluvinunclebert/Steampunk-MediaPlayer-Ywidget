/*
    Cross-platform WMP Calling Functions - Macintosh Code
    Copyright  2007-2017 Harry Whitfield

    CD Functions for Mac
    Copyright 2007 Michael Tughan

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

    Cross-platform WMP Calling Functions - version 3.3.4 for Steampunk MediaPlayer Widget
    20 November, 2009 - updated 25 October, 2017
    Copyright  2007-2017 Harry Whitfield
    mailto:g6auc@arrl.net

    Playlist Object and CD Functions
    28 May, 2007
    Copyright 2007 Michael Tughan
    mailto: michaelsprogramming@ca.inter.net
*/

// To play Windows Media using QuickTime Player on the Macintosh, you must
// also install the free Flip4Mac WMV Player, available from Microsoft.
// http://www.microsoft.com/windows/windowsmedia/player/wmcomponents.mspx

/*jslint for, multivar, this */

/*property
    URL, __defineGetter__, __defineSetter__, activate, addItem, autoStart,
    cdromCollection, controls, count, currentMedia, currentPlaylist, floor,
    freeBytes, getDirectoryContents, getDisplayName, getItem, getNumItems,
    indexOf, length, path, pause, play, print, quit, round, setFullScreen,
    setMiniaturized, setMode, settings, substring, theURL, volumes
*/

"use strict";

/*
Playlist Object from wmpPlayer.getCD();

Playlist.getNumItems();         // get the number of items in the playlist
Playlist.getItem(index);        // get an array containing the: song name, artist, album name, source url for use with WMP.setURL
Playlist.print();               // print the playlist
*/

function Playlist(artist, album) {
    var songs = [], urls = [], count = 0, i;

    this.addItem = function (song, url) {
        songs[count] = song;
        urls[count] = url;
        count += 1;
    };

    this.getNumItems = function () {
        return count;
    };

    this.getItem = function (index) {
        return [
            songs[index],
            artist,
            album,
            urls[index]
        ];
    };

    this.print = function () {
        var song;
        var n = this.getNumItems();
        for (i = 0; i < n; i += 1) {
            song = this.getItem(i);
            print("Item[" + i + "]: " + song[0] + ", " + song[1] + ", " + song[2] + ", " + song[3]);
        }
    };
}

function getCDs(sep) {
    var vols = filesystem.volumes, cds = [], i;

    if (sep === undefined) {
        sep = "|";
    }
    for (i = 0; i < vols.length; i += 1) {
        if ((vols[i].freeBytes === 0) && (filesystem.getDirectoryContents(vols[i].path)[0].indexOf(".TOC.plist") >= 0)) {
            cds[cds.length] = i + sep + filesystem.getDisplayName(vols[i].path);
        }
    }
    return cds;
}

function getCD(index) {
    var path = filesystem.volumes[index].path,  // for example "/Volumes/Dolly Parton"
        dir = filesystem.getDirectoryContents(path),
        playlist = new Playlist("Unknown Artist", path.substring(9, path.length)),
        i;

    for (i = 0; i < dir.length; i += 1) {
        if (dir[i] !== ".TOC.plist") {
            playlist.addItem(dir[i].substring(dir[i].indexOf(" ") + 1, dir[i].length - 5), "file://" + path + "/" + dir[i]);
        }
    }
    return playlist;
}

var hprint; // global

var eprint = function (s) {
    //hprint(s);                        // enable if desired
    return s;
};

function WMP() {
    var o = {};
    var TIMEOUT = 5;        // appleScript timeout

    function isFile(url) {
        if (url.indexOf("file:///") === 0) {
            return url.substring(8);
        }
        if (url.indexOf("file://localhost/") === 0) {
            return url.substring(17);
        }
        if (url[0] === "/") {
            return url;
        }
        return null;
    }

    function doScript(script, timeout, defaultValue) {
        var result = appleScript("tell application \"QuickTime Player\"\n" + script + "end tell\n", timeout);

        if (result.indexOf("AppleScript Error") >= 0) {
            eprint(result);
            return defaultValue;
        }
        return result;
    }

    function getURL() {
        eprint("WMP: getURL = " + o.theURL);
        return o.theURL;
    }
    function setURL(url) {
        eprint("WMP: setURL: " + url);
        o.theURL = url;
        if (isFile(url)) {
            doScript("close every document\nopen POSIX file \"" + o.URL + "\"\n", 10, "");
        } else {
            doScript("close every document\nopen URL \"" + o.URL + "\"\n", 10, "");
        }
    }

    function getCurrentPosition() {
        var script = "if not (exists document 1) then return \"0\"\n";
        var res;

        script += "get the current time of document 1 as string\n";
        res = Math.floor(Number(doScript(script, TIMEOUT, "0")));   // 1.0 secs per unit time
        eprint("WMP: getCurrentPosition = " + res);
        return res;
    }
    function setCurrentPosition(seconds) {
        eprint("WMP: setCurrentPosition: " + seconds);
        doScript("if (exists document 1) then set the current time of document 1 to " + (seconds) + "\n", TIMEOUT, ""); // 1.0 secs per unit time
    }

    function duration() {
        var script = "if not (exists document 1) then return \"600\"\n";    // returns 600 (10 minutes) if there is no document
        var res;

        script += "get the duration of document 1 as string\n";
        res = Math.floor(Number(doScript(script, TIMEOUT, "0")));   // 1.0 secs per unit time
        eprint("WMP: currentMedia.duration = " + res);
        return res;
    }

    function mediaName() {  // QT Player does not support this
        var res = "1";
        eprint("WMP: currentMedia.name = " + res);
        return res;
    }

    function getPlaying() {
        var script = "set the playing_state to \"false\"\n";
        var res;

        script += "if (exists document 1) then set the playing_state to (the playing of document 1) as string\n";
        script += "get the playing_state\n";
        res = doScript(script, TIMEOUT, "false") === "true";
        eprint("WMP: getPlaying = " + res);
        return res;
    }

    function getMute() {
        var script = "set the muted_state to \"false\"\n";
        var res;

        script += "if (exists document 1) then set the muted_state to (the muted of document 1) as string\n";
        script += "get the muted_state\n";
        res = doScript(script, TIMEOUT, "false") === "true";
        eprint("WMP: getMute = " + res);
        return res;
    }
    function setMute(flag) {
        var sFlag = "false";

        eprint("WMP: setMute: " + flag);
        if (flag) {
            sFlag = "true";
        }
        doScript("if (exists document 1) then set the muted of document 1 to " + sFlag + "\n", TIMEOUT, "");
    }

    function getVolume() {
        var script = "set the current_volume to \"0\"\n";
        var res;

        script += "if (exists document 1) then set the current_volume to (the audio volume of document 1) as string\n";
        script += "get the current_volume\n";
        res = Math.round(doScript(script, TIMEOUT, "0") * 100);
        eprint("WMP: getVolume = " + res);
        return res;
    }
    function setVolume(volume) {    // volume 0..100
        eprint("WMP: setVolume: " + volume);
        doScript("if (exists document 1) then set the audio volume of document 1 to " + (0.01 * volume) + "\n", TIMEOUT, "");
    }

	function setFullScreen(flag) {
        var sFlag = "false";

        eprint("WMP: setFullScreen: " + flag);
        if (flag) {
            sFlag = "true";
        }
        doScript("if (exists document 1) then set the presenting of document 1 to " + sFlag + "\n", TIMEOUT, "");
    }

    o.theURL = "";
    o.cdromCollection = {};
    o.cdromCollection.count = 0;
    o.controls = {};
    o.settings = {};
    o.currentMedia = {};
    o.currentPlaylist = {};
    o.currentPlaylist.count = 0;
    o.autoStart = false;

    o.__defineGetter__("URL", function () {
        return getURL();
    });
    o.__defineSetter__("URL", function (v) {
        setURL(v);
    });
    o.__defineSetter__("fullScreen", function (v) {
        setFullScreen(v);
    });


    o.controls.__defineGetter__("currentPosition", function () {
        return getCurrentPosition();
    });
    o.controls.__defineSetter__("currentPosition", function (v) {
        setCurrentPosition(v);
    });


    o.controls.activate = function () {
        eprint("WMP: activate");
        doScript("activate\n", TIMEOUT, "");
    };
    o.controls.quit = function () {
        eprint("WMP: quit");
        doScript("quit\n", TIMEOUT, "");
    };

    o.controls.pause = function () {
        eprint("WMP: pause");
        doScript("if not (exists document 1) then return\npause document 1\n", TIMEOUT, "");
    };
    o.controls.play = function (flag) {
        var sFlag = "false";

        eprint("WMP: play: " + flag);
        if (flag) {
            sFlag = "true";
        }
        doScript("if not (exists document 1) then return\nplay document 1\n", TIMEOUT, "");
        doScript("set the miniaturized of window 1 to " + sFlag + "\n", TIMEOUT, "");
    };
    o.controls.setMiniaturized = function (flag) {
        var sFlag = "false";

        eprint("WMP: setMiniaturized: " + flag);
        if (flag) {
            sFlag = "true";
        }
        doScript("set the miniaturized of window 1 to " + sFlag + "\n", TIMEOUT, "");
    };

    o.currentMedia.__defineGetter__("duration", function () {
        return duration();
    });

    o.currentMedia.__defineGetter__("name", function () {
        return mediaName();
    });

    o.settings.__defineGetter__("playing", function () {
        return getPlaying();
    });

    o.settings.__defineGetter__("mute", function () {
        return getMute();
    });
    o.settings.__defineSetter__("mute", function (v) {
        setMute(v);
    });

    o.settings.setMode = function (mode, value) {
        eprint("WMP: setMode: " + mode + ", " + value);
        mode = value;
        return mode;
    };

    o.settings.__defineGetter__("volume", function () {
        return getVolume();
    });
    o.settings.__defineSetter__("volume", function (v) {
        setVolume(v);
    });
/*
    o.settings.__defineGetter__("cds", function (sep) {
        return getCDs(sep);
    });
    o.settings.__defineGetter__("cd", function (index) {
        return getCD(index);
    });
*/
    return o;
}
