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

    Cross-platform WMP Calling Functions - version 3.2 for Steampunk MediaPlayer Widget
    20 November, 2009 - update 7 October, 2017
    Copyright  2007-2017 Harry Whitfield
    mailto:g6auc@arrl.net

    Playlist Object and CD Functions
    28 May, 2007
    Copyright 2007 Michael Tughan
    mailto: michaelsprogramming@ca.inter.net
*/

/*jslint for, multivar, this */

/*property
    Count, SourceURL, addItem, cdromCollection, getItem, getItemInfo,
    getNumItems, item, length, name, playlist, print
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

var eprint = function (s) {
//  print(s);
    return s;
};

var WMPlayer; // declared and set in mediaPlayer.js

function getCDs(sep) {
    var cdroms, cds = [], i;

    if (sep === undefined) {
        sep = "|";
    }
    cdroms = WMPlayer.cdromCollection;
    for (i = 0; i < cdroms.Count; i += 1) {
        if (cdroms.item(i).playlist.Count !== 0) {
            cds[cds.length] = i + sep + cdroms.item(i).playlist.getItemInfo("Author") + " - " +
                    cdroms.item(i).playlist.name;
        }
    }
    return cds;
}

function getCD(index) {
    var cd = WMPlayer.cdromCollection.item(index).playlist,
        playlist = new Playlist(cd.getItemInfo("Author"), cd.name),
        i;

    for (i = 0; i < cd.Count; i += 1) {
        playlist.addItem(cd.item(i).name, cd.item(i).SourceURL);
    }
    return playlist;
}
