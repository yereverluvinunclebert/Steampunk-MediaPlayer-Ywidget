//===========================================================================
// mediaPlayer.js
// Steampunk Media Player Widget  1.0.14
// Written and Steampunked by: Dean Beedell
// Vitality code, Mac compatibility, external player, rejigging, advice, code
// enhancements and patience from Harry Whitfield
//
// aqqc35@dsl.pipex.com
//===========================================================================
// || <- don't delete these please, I don't have a key on my keyboard that can generate these characters
/*
   Background:
   
   When a folder is selected, the contents of that folder are read into an array. That
   array is the playlist. When files are dragged and dropped onto the playlist area then
   the array is replaced. Single files are also played using the playlist by creating a 
   new temporary playlist with the new file in the current location, then copying the 
   temporary playlist to the current playlist.
   
*/
// 1.0.4
// created sourceforge page
// added drag and drop of files, single file or folder.
// added restriction to the drive root folders
// added restriction to 10,000 file playlists.
// added support for .flv','.avi','.mp4','.mpg','.m4a file types
// added 5 favourite folders to play to the menu
// added read the play list and display a chunk of the tracks
// added hover over effects as per the widget vault
// added setting of the play list tooltips
// added some checks when playing a folder to see if it exists
// store the current play list location in hidden prefs - playlistLocationPref

// 1.0.5
// added the volume control through the up and down keys
// added the next/previous track control through the N and K keys
// added the play/pause track control through the space bar
// added the track advance/retard control through the left/right keys
// scroll the current track in the playlist
// highlight the currently selected track in the playlist
// double clicking on a selected track in the playlist now plays the track.
// highlight the chosen track in grey.
// add the capability to determine which chunk is being displayed
// playlist can resize, box, text and buttons
// added next/previous buttons to select chunks, the code to select the next chunk works
// added chain to select the playlist
// selected track to rotate in the play list, same as mouseover
// fixed bug whereby the positiontimer would be kicked off during next/back tracks, timer is now turned off during keypress
// fixed bug to highlight the currently selected trackwhen on subsequent pages of the playlist
// added the code to select the last tracks in the very last chunk when you select the end of the play list
// now counts the valid tracks correctly, previously was over-estimating
// double clicking on the folder name will open that folder
// after shuffle button, re-read the playlist
// start and end buttons for the playlist
// add the functionality to change font as per the weather widget
// add the functionality to change fontsize as per the weather widget
// update function descriptions
// width of playlist text to be fixed
// fixed the scaling flattening the font size
// fixed playlist exit button moves when resized
// single click on a track highlights it
// determine exactly what is 100% with regard to overall size
// when a previous folder is selected via the menu, the playlist display should be updated
// when a track is single-clicked the scrolling is not removed from the currently playing track
// allow drag and drop onto the play list
// create a routine to clear the playlist
// when a new folder is selected the folder name does not change immediately, needs a restart
// highlight the currently running track when new chunk selected
// placed the music folders in their own preference group

// 1.06
// if the folder does not exist - play the last folder/playlist
// if the folder exists but there is nothing to play then deal with that condition
// when a new folder is selected the playlist does not display immediately, needs a restart
// test the saving and re-use of previously played folders
// dragging and dropping onto the playlist area does not yet display the new playlist - tested, it does
// fixed bug in showing the playlist on small groups of files dragged/dropped or in a folder,no longer generates an error
// ".mpeg",".mp4",".mpg added to the possible file types that can be played
// add a file limit capture to the recursive folder search that is done at the beginning, new function to count
// playfolder function tests for valid types in the same way as the other functions
// when opening an alternate folder the chunk list needs to be reset to 1
// change the displayed default folder when dragging/dropping a set of files to the folder location where the files came from
// when the widget restarts it is picking up the wrong folder name, now checks two locations
// opening a new folder fails from the speaker but works from the menu
// mousewheel scrolling on the playlist should roll a chunk - fixed
// fixed the final bugs with the recursive file count
// shuffle isn't shuffling - fixed
// pulling chain causes the playlist to be re-generated so a shuffle playlist is unshuffled
// added save and open buttons for the playlist
// additional button to clear the play list
// shuffle not working on start up
// fixed some bugs trying to set slider position when there is no currently playing media for the WMplayer
// add image to tell users that the reading of folders is underway...
// added save and open functionality saving as XML
// add roll over buttons for the bottom set
// fix the clicking on a track name sometimes does not pull up the google listing
// fixed bugs with opening and saving play list files
// removed duplicate code calling the playlist twice on startup
// fixed bug where only a partial playlist is being read, not reading the filecount from the XML and then not using it.
// fix to the currently highlighted track bug
// remove the wpl remote playlist types that seem to be unsupported in WMP
// test with non-existent folder - works OK
// test with empty folder - works OK
// test with my music folder - works OK
// test with a CD - plays
// CD does not show the list of tracks in the play list
// fix the track number display when unshuffled
// fix the track number display when a CD is loaded
// explain the black box that can be shown when accessing a large series of files on a slow system - instructions added
// when playing a CD, the stuck position code might need to be ignored as CDs do pause when initialising.
// playing a CD - needs to show the CD/album title
// audio CD track tooltips added
// audio CD title tooltips added
// restart after playing a CD shows an empty track list due to chosen folder pointing to a CD drive
// opening a playlist file after playing a CD does not update the list of tracks in the play list
// audio CD second page not showing correctly, still showing first page items
// when shuffling a CD it restores the last used folder information
// added a routine to wipe the play list that helps when debugging.
// reset the page number when opening a CD.
// reset the page number when opening a new playlist.
// shuffling a CD does not yet work, shuffled the code a little!
// added support for .m4a file types
// dragging a single file does not update the playlist
// after dragging a single file a multiple file drop does not show on the playlist

// 1.0.7

// created Xwidget version 2.0 RC from 1.0.7
// autoplay disable was broken, always started playing, now awaits a track selection or play button to be pressed
// drag and drop on the playlist adds to existing list rather than replace altogether
// uppercase file suffixes, eg .MP3 need to be catered for
// handles CDs when selected using the file explorer
// fixed bug in playing a single track, it refused to play it at all when autoplay was disabled
// valid types was not functioning for single file selection, did not display any media files at all

// 1.0.8

// tooltips for all items
// checks for valid folder before playing
// when saving a playlist, checks it is an XML file.
// default music folder should be C:\Users\Public\Music
// selecting a CD from the folder menu works from the menu too.
// unknown file types such as .aac if Windows will not play the filetype then pop up an error message.
//
// 1.0.9
//
// the playbutton  needs to be modified to respect the startup flag - done
// hints enabled/disabled correctly on demand - done
// resizing when using the CTRL key on the playlist now works
// tested using codecs to recognise the latest file types - done
// checks CD drive present for non-CD equipped systems
// synch. with the Xwidget version
// when you drop a second folder after dropping a single file, it does not update the playlist, a refresh required
// replaced the resizing code, removing a lot of variable declarations and using a more elegant function to resize.
// the function that checks whether the track is stuck needs to be modified to respect the startup flag
// dragging and dropping a folder does not always update the folder name

// 1.0.10

// added a message when a root folder is selected.
// added a preference to allow the bottom tracklist buttons to be retained on screen.
// added deletion buttons
// changed red tap to a hints toggle
// added sounds for the chain pull and the keypresses
// bundle the Centurion SF light font with the widget
// added the extraction of the font and the menu option to install
// bug when cancelling after pressing the F to read an XML file - fixed
// allow deletion of a track from the playlist via a pop up metal/red X when the mouse hovers over a track
// grouped the bottom keys, to correspond to the Xwidget changes that allow correct fade
// modify the drop position to take into account the page number
// added the ability to delete a track from the playlist
// fixed a bug with the zorder of the position slider

// 1.0.11

// added support for Mac OS/X using Harry's code.

// 1.0.12

// Changes to handling of playing single files which are now added to the current playList
// Corrections to playlist code
// JSLinting of code files.
// Added preference to control direction of playlist scrolling
// revised the code for the repetitive elements such as the playlist texts and delete buttons
// improved the graphics on the button mechanism
// added animated folder selection key to the playlist
// added animated file selection key to the playlist
// playlist scrolls a page automatically when the selected item is on the next page
// alt+click on play a file now opens a dialog box allowing opening of a remote item
// the playlist now handles industry standard xspf files
// changed debug code
// allows video files to be opened in a separate player window
// allows internal drag and drop allowing tracks to be dragged to different locations in the playlist

// only shows folder selection at the correct time during drag and drop
// respects the page number when an internal drag and drop occurs
// red lamp indicates that the track may not be playable
// playing a single track by double click should not cause autoplay, automatic play is now controlled by a preference
// physical switch for autoplay, replaced the help toggle
// added a sound to any keypress that takes you to the the final page in the play list
// moved the help call to the right click menu
// moved the help to a separate window
// fixed a couple of very minor graphical issues
// put the trackname shadow back again, somehow it got lost, allows the track text to be seen on light backgrounds
// when chosenfolder empty an error is shown in the debug log, needs to be handled
// fixed a bug in the internal dragging/dropping, sometimes it thinks a drop is going on when just looking through the playlist - fixed by resetting both drag and drop positions on a single click
// occasional first play of a track has a problem - s - probably catchfiledrop - fixed by resetting both drag and drop positions on a single click
// made the page number a little more visible on dark backgrounds
// when a track is less than six seconds long do not roll the timer
// added a tooltip to the delete buttons
// added a tooltip to the page no. indicator
// restricting access to the root made non system specific with regard to the default music folder
// the stored folders now display in native formats (slashes, backslashes) on both o/s.
// tooltip to state that the red lamp indicates that the track may/may not be playable
// dynamic resizing causes the volume slider to reappear in the wrong maximum position, cablestretch needs to be called
// ctrl + doubleclick to open a track in the video player
// Ctrl+F allows a search for a track inputbox to pop up
// F3 is captured to allow subsequent searches for the same string in the playlist
// the logic for the busy timer needs to be tested as it sometimes rolls for too long and at the wrong time, disabled at new track selection
// oval button to perform a search, tooltip needs to be modified
// the top frame no longer displays larger size on startup after Harry's changes

// 1.0.13 RC

// physical switch for external video player
// restored connection between the Macintosh external player volume state, the widget tracks it
// remove the play video in remote player switch for Macintosh only
// removed run command in background triggered by a double click
// add a page number section on the playlist - makes the page number clearer
// change all foreach loops to for loopsfor compatibility with Xwidget - abandoned as Xwidgets is crippled,
//     does not allow functions to be assigned to objects in code
//     does not allow an array to alias an existing object of the same name
// allow the scrolling text to be turned off to save CPU as per xwidget  - done
// move the glass playlist down a few pixels - done
// remove javascript code from .kon file to .js - done
// add confirm dialog on delete
// playing videos in external player sometimes happens inadvertently - check logic
// key fade bug seems to require a widget restart
// key fade to be applied to new lower switch mounting
// menus - sort them to sub-menus
// automatic play and the autoplay lug, when it is switched off the automatic play should stop
// add the clear playlist functionality via a physical switch
// add some pipes/cables to the play list to connect the player
// when the tracklist is short (less than one page) only the tracks are present should display delete buttons
// quieter keyclicks on bottom keys
// add sound for search
// new help page for the playlist - WIP
// ctrl/c and ctrl/v to allow copy and paste of tracks around the playlist
// ctrl/x and ctrl/v to allow cut and paste of tracks around the playlist
// rotator on startup?
// check function comments and descriptions
// add dprints to all the recent functions to be consistent

// 1.0.14 Done

// jslint it
// update sourceforge
// fix bug in storing position when the locking pin was clicked
// when a folder has no files but still has sub-folders within it requests to turn recursive searching on and rescan
// fixed a bug with some CDs that have no track information causing no track title to trim()
// implement the folder menu for the file selection as well

// TODO : TBD in 1.0.14b?

// fix the about page links
// Winamp integration - 

// When pulling over a single track into a play list at position 1 the next/previous buttons are disabled

// Clear the temporary playlist at the point the new playlist has been successfully created, in order to save memory

// when in no-regressive mode, finding no files in a folder causes a pop up but then selects that empty folder in the drop down list - it should not. The previous selection should be retained.
// set menu the new method
// fix tooltips for Macs - underlying image that takes the tooltip
// when the timer is positionTimer checking the validity of the track,
// if the user selects the next track by double-clicking on the next track the timer is not always aborted
// when dragging an internal track to a new position use the adjacent tracks to display the dragged track
// playing track highlight lost when mouse moves over the track

// expose the valid files list to allow users to add new types

//  -oOo-

/*jslint for, multivar, this */

/*property
    Item, MouseWheelPref, Playlist, URL, Value, Width, activate, altKey,
    autoPlayStatePref, autoPlayVolumePref, autoStart, backgroundColor, caption,
    cdromCollection, ceil, concat, connectObject, controls, count,
    createLicence, createObject, ctrlKey, currentMedia, currentMusicFolderPref,
    currentPosition, data, debugflgPref, disconnectObject, driveSpecifier,
    duration, errorMessagesPref, evaluate, event, filecount, files, firstChild,
    floor, focus, font, fontSize, forEach, fromCharCode, fullScreen,
    fullscreenPref, getDirectoryContents, getFileList, getItemInfo, hOffset,
    height, hidden, hoffset, imageCmdPref, imageEditPref, indexOf, interval,
    isDirectory, item, itemExists, join, keyCode, lastIndexOf, length, locked,
    maxLength, maxWidthPref, minLength, mouseWheelScrollingPref,
    mouseWheelVolumePref, musicFolderPref, musicFolderPref2, musicFolderPref3,
    musicFolderPref4, musicFolderPref5, mute, name, onClick, onDragDrop,
    onKeyDown, onMouseDown, onMouseDrag, onMouseEnter, onMouseExit, onMouseMove,
    onMouseUp, onMouseWheel, onMultiClick, onMulticlick, onPreferencesChanged,
    onRunCommandInBgComplete, onTimerFired, onUnload, onWakeFromSleep, onload,
    opacity, open, openFileInApplication, parse, path, pause, platform, play,
    playListKeysPref, playListPref, playing, playlistFormatPref, pop,
    popupPanelFont, popupPanelFontSizePref, push, qtAllowPref,
    qtMiniaturizePref, quit, random, readFile, recurseFoldersPref, replace,
    reveal, round, scrollDelta, scrolling, scrollingPref, setMode, settings,
    shuffleStatePref, soundpref, sourceURL, split, src, startupPlayStatePref,
    style, substr, substring, text, ticking, ticks, titlePref, toLowerCase,
    toUpperCase, tooltip, tooltipPref, trackPath, userMusicFolder, vOffset,
    value, visible, voffset, volume, volumePref, widgetLockPref, width,
    wmpAllowPref, wmpApplicationPref, writeFile
*/

"use strict";

var mainWindow, cableWheelSet, cable, pipes, bell, indicatorRed, speaker, bar,
        sliderSet, percentTextShadow, percentText, resize, mainScreen, setmenu, settooltip, buildVitality,
        checkTimer, volumePlaque, volumePlaqueX, volumeTick,
        volumeNoTick, chain, WMPlayer, WMP, startupFlg, createLicence, playlistFrame, busy, busyBlur,
        playListTitle, playListPage, playListText0, playListText1, playListText2,
        playListText3, playListText4, playListText5, playListText6, playListText7,
        playListText8, playListText9, playListText10, playListText11, positionSlider,
        playButton, pauseButton, stuckcyclecount,
        mediapopupplaque, trackNameText, trackNoText, pipesRight, lockArea,
        lockAreaLocked, deleteButton0, deleteButton1, deleteButton2,
        deleteButton3, deleteButton4, deleteButton5, deleteButton6, deleteButton7,
        deleteButton8, deleteButton9, deleteButton10, deleteButton11, tap,
        deleteLayer, nextChunk, prevChunk, firstChunk, lastChunk, buttonConfig, keyf, keyd,
        oButton, sButton, ovalButton, restrictRootFolder, cdPlaylistArtists,
        cdPlaylistTitles, inputForm, searchForm, cdMenuItem, runningTask, trackNameShadow,
        keyViewScreen, keyFullScreen, checkAutoPlayState, endPipe, bracket, playListSlider,
        helpLayer1, helpLayer2, textLinktoHelp2, textLinktoHelp1, mediaPlaylistHelp, mediaPlayerHelp,
        prevButton, nextButton, playlistArea, playListTap, LICENCE,
        keyu, selectFolderToPlay, deletePosition, fileSystemElementSelected, readFolderList,
        textLinktoClose1, textLinktoClose2;

var scale = Number(preferences.maxWidthPref.value) / 100;

var perc = 0;
var fontDefault = preferences.popupPanelFontSizePref.value;

//resizing variables
var mainWindowwidthDefault = mainWindow.width;
var mainWindowheightDefault = mainWindow.height;
var chainvoffsetDefault = chain.voffset;     // retained

var currIcon = "Resources/volume-dock.png";

var buzzer = "Resources/sounds/buzzer.mp3";
var zzzz = "Resources/sounds/zzzz.mp3";
var tingingSound = "Resources/tingingsound.mp3";
var ting = "Resources/ting.mp3";
var lock = "Resources/sounds/lock.mp3";
var winding = "Resources/sounds/winding.mp3";
var creturn = "Resources/sounds/creturn.mp3";
var keypress = "Resources/sounds/keypress.mp3";
var steamSound = "Resources/sounds/steamsound.mp3";
var slidingClunk = "Resources/sounds/slidingclunk.mp3";
var mistake = "Resources/sounds/mistake.mp3";
var thhhh = "Resources/sounds/thhhh.mp3";
var ting = "Resources/sounds/ting.mp3";
var page = "Resources/sounds/page-turn.mp3";

var thePlayList;
var theFolder = [];
//var tmfolderList= [];

var widgetName = "Steampunk MediaPlayer Ywidget.widget";
 
var IsPlaylist = false;
var playIndex = 0;
var isMacintosh = system && (system.platform === "macintosh");

if (isMacintosh) {
    include("macWMPsp.js");
    WMPlayer = WMP();
} else {
    // create COM object
    //WMPlayer = COM.createObject("wmplayer.ocx"); //original but this does not always exist on all o/s
    
    // ======================================================================
    // WMPLAYER  
    // plugin for WMPlayer you must instantiate the COM object 
    WMPlayer = COM.createObject("{6BF52A52-394A-11d3-B153-00C04F79FAA6}"); // the correct class ID for Windows Media Player 7
    // note: there MUST be a corresponding entry in the widget.xml
    // <com name="Windows Media Player">{6BF52A52-394A-11d3-B153-00C04F79FAA6}</com>
    // ======================================================================
 
    // ======================================================================
    // WINAMP  gen_scripting plugin for Winamp you must instantiate the object
    // 
    /*
    try {
        WinAmp = COM.createObject("gen_scripting.WinAmp");
    } catch (e) {
        hprint(e); // Unable to create object: Invalid class string
    }
    */
    // note: there MUST be a corresponding entry in the widget.xml of this type:
    // <com>gen_scripting.WinAmp</com>
    //
    // cd C:\Program Files (x86)\Winamp\Plugins // the plugin must be placed in this location
    // regsvr32.exe gen_scripting.dll // this registering needs to be done before it can be accessed
    // ======================================================================

    // var x = WinAmp.GetVersion(); // currently fails due to 32bit nature of the plugin
    // print(x);
    // WinAmp.ButtonPlay(); // currently fails due to 32bit nature of the plugin
    
    // ======================================================================


    // ======================================================================
    // WINAMP  winamp_plugger plugin for Winamp you must instantiate the object
    // 
    /*
    try {
        var Winamp = COM.createObject("WinampPlugger.Winamp");
    } catch (e) {
        hprint(e);  // Unable to create object: Invalid class string
    }
    */
    //print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> "+Winamp.trackTitle);
    
    // cd C:\Program Files (x86)\Winamp\Plugins // the plugin must be in this location
    // regsvr32.exe winamp_plugger.dll // this needs to be done before it can be accessed

        /*
            Winamp.setTrackRating(cTrackRating);
            Winamp.setVolume(cVolume);
            Winamp.setPlayerPosition(cSeekPos);
            Winamp.playerStatus;
            Winamp.running
            Winamp.volume;                          WMPlayer.settings.volume = volume;
            Winamp.shuffle==true) {
            Winamp.repeat==true) {
            Winamp.trackRating;
            Winamp.trackTitle;                      WMPlayer.currentMedia.name
            Winamp.trackArtist
            Winamp.trackAlbum
            Winamp.trackBitrate;
            Winamp.trackSamplerate;
            Winamp.playerPosition;                  WMPlayer.controls.currentPosition) 
            Winamp.trackLength;                     WMPlayer.currentMedia.duration 
            Winamp.doBackTrack();
            Winamp.doNextTrack();
            Winamp.doClose();
            Winamp.doOpen();
            Winamp.doStop();
            Winamp.doPlayPause();                   WMPlayer.controls.pause();   WMPlayer.controls.play(
            Winamp.shuffle
            Winamp.setShuffle(false);
            Winamp.repeat
            Winamp.setRepeat(false);    
            
                  WMPlayer.URL)) >= 0);
                  WMPlayer.fullScreen = true;
                  WMPlayer.settings.mute); 
                  WMPlayer.controls.quit();           // stop the QTPlayer app
                
        */  
    
    // ======================================================================
 
     // var x = WinAmp.trackTitle(); // succeeds
     // print(x);
     // WinAmp.ButtonPlay(); // succeeds
     

    
    // ======================================================================
    //VLCPlayer = COM.createObject("{9BE31822-FDAD-461B-AD51-BE1D1C159921}");
        // note: there MUST be a corresponding entry in the widget.xml
        // <com name="VLC Player">{9BE31822-FDAD-461B-AD51-BE1D1C159921}</com>
    //uncaught exception: createObject: Access denied: COM
    /*
    
    regsvr32 "E:\Program Files (x86)\VideoLAN\VLC\axvlc.dll"
    object classid="clsid:9BE31822-FDAD-461B-AD51-BE1D1C159921" 
    9BE31822-FDAD-461B-AD51-BE1D1C159921 - VLC
    [HKEY_CLASSES_ROOT\CLSID\{9BE31822-FDAD-461B-AD51-BE1D1C159921}]
@="VideoLAN VLC ActiveX Plugin v2"
    */
    // ======================================================================

    include("winWMPsp.js");
}

WMPlayer.settings.setMode("loop", false);
WMPlayer.settings.autoStart = false;
WMPlayer.settings.mute = false;

//Winamp.setRepeat(false);        


var CDROM = WMPlayer.cdromCollection;
var cdRomNo = 0;
var CDROMcount = CDROM.count;
var isAudioCD = false;

var isFolder = false;
var filePlayList = 0;
var currentFile;
var playListfileCount = 0;
var sliderSetClicked = false;
var positionSliderClicked = false;
var drvCnt = 0;
var playerState = "none";
var dropPosition = 0; // where to drag to
var dragPosition = 0; // where to drag from
var storedWMPpos = 0;
var stuckCycleCount = 0;
var zeroCycleCount = 0;
var playOverride = false;

var trackNumber = [];
var trackName = [];
var fullTrackName = [];
var chunkSize = 12;
var chunkIndex = 0;
var debugFlg = preferences.debugflgPref.value;
//var debugFlg = 0;
var chosenFolder = ""; 
var chosenFile = ""; 
var previousChosenFolder = "";
var fileCountLimit = 20000;
var path = null;

// this list takes into account accidental renaming of suffixes to capitalised state
// the list is simply duplicated, uppercase-d and doubled up.

var validTypesLcase = [".mpeg", ".mp4", ".m4a", ".mpg", ".flv", ".mp3", ".aac", ".wav", ".wma", ".aif", ".aiff", ".au", ".snd"];
var validTypesUcase = validTypesLcase.join(",").toUpperCase().split(",");
var validTypes = validTypesLcase.concat(validTypesUcase);

var videoTypesLcase = [".mpeg", ".mp4", ".mpg", ".flv"];
var videoTypesUcase = videoTypesLcase.join(",").toUpperCase().split(",");
var videoTypes = videoTypesLcase.concat(videoTypesUcase);                   // for use later for auto miniaturization

var file_extension = "";

var createNewList = 0; // this determines whether you can drag/drop or not.
var trackFailCnt = 0;
var filePlayedWell = 0;

preferences.errorMessagesPref.Value = "enabled"; // at the mo' reset whenever the widget is restarted

var busyCounter = 1;
var startupTimeout = 1;

var ctrlPressed = 0;
var searchString = "";
var searchStringPosition = 0;

//drag and drop vars
var dragDropFlg = 0;
var trackClickedFlg = 0;
var savedReplacedTrack = 0;
var partlySelectedTrack = 0;
var fullTrackNameToDrop = "";

var partlySelectedFullTrack = 0;
var playlistSliderDragged = false;
var savFullTrackName;

var miniaturize = false;    // used only on Macintosh
var wmpAllowApp = (preferences.wmpAllowPref.value === "1");

var currentButtonStatus;

var globals = this;
var playListText = (function () {   // defines an array playListText which aliases playListText0..11
    var plt = [], i;

    for (i = 0; i < chunkSize; i += 1) {
        plt.push(globals["playListText" + i]);
    }
    return plt;
}());

var deleteButton = (function () {   // defines an array deleteButton which aliases deleteButton0..11
    var db = [], i;

    for (i = 0; i < chunkSize; i += 1) {
        db.push(globals["deleteButton" + i]);
    }
    return db;
}());

//===========================================
// end variable declarations
//===========================================


//============================================
// function to workaround current Mac engine limitations re: debugging
//============================================
function hprint(s) {    // use in body of file instead of print(s)
    if (isMacintosh) {
        filesystem.writeFile("~/Desktop/media-player.log", s + "\n", true); // debug printing on Sierra
    } else {
        print(s);
    }
}
//=====================
//End function
//=====================

//============================================
// function to workaround current Mac engine limitations re: debugging
//============================================
function lprint(s) {    // use in body of file instead of log(s)
    if (isMacintosh) {
        hprint(new Date() + ": " + s);
    } else {
        log(s);
    }
}
//=====================
//End function
//=====================


//============================================
// function to conditionally print diagnostics
//============================================
function dprint(s) {
    if (debugFlg === "1") {
        hprint(s);
    }
}
//=====================
//End function
//=====================

//===================================
// function to trim a string both ends
//===================================
function trim(s) {
    return s.replace(/^\s+|\s+$/g, "");
}
//=====================
//End function
//=====================

//=================================
// widget inline button timer setup
//=================================
var positionTimer = new Timer();
positionTimer.ticking = false;
positionTimer.interval = 5;
//=================================
// timer ends
//=================================

//=================================
// widget inline button timer setup
//=================================
var sliderTimer = new Timer();
sliderTimer.ticking = false;
sliderTimer.interval = 1;
//=================================
// timer ends
//=================================

//=================================================================
// these functions are used to run a video file in the WMPlayer App
//=================================================================
var openFileInApplicationResult = "";

filesystem.openFileInApplication = function (file, application, params) {
    function esc(path) {
        return path.replace(/([\W])/g, "\\$1");
    }

    function quotePath(path) {
        return "\"" + convertPathToPlatform(path).replace(/"/g, "\\\"") + "\"";
    }

    var command;
    var result;

    if (application) {
        hprint("opening file " + file + " in application " + application);
        if (system.platform === "macintosh") {
            command = "open -a " + esc(application) + " " + esc(file);
        } else {
            if (params) {
                hprint("params: " + params);
                params = " " + params;
            } else {
                params = "";
            }
            command = quotePath(application) + " " + quotePath(file) + params;
        }
        hprint("openFileInApplication:command " + command);
        runCommandInBg(command, "openFileInApplicationResult");
    } else {
        hprint("opening file " + file + " in default application");
        result = filesystem.open(file);
        result = (result)
            ? "OK"
            : "Failed";
        hprint("openFileInApplication:result: " + result);
    }
};

function playInWMPApp(file, fullscreen) {
    var params = "";

    if (fullscreen) {
        params = "/fullscreen";
    }
    filesystem.openFileInApplication(file, preferences.wmpApplicationPref.value, params);
}
//=====================
//End functions
//=====================

//=================================
// Function to extract the extension from a filename string
//=================================
function xtn(s) {
    var ext, idx = s.lastIndexOf(".");

    if (idx > 0) {
        ext = s.substring(idx);
        if (ext.length > 1) {
            return ext;
        }
    }
    return null;    // was "*ext"
}
//=================================
// end function
//=================================

//===================================
// function to tell the WMP to pause
//===================================
function pauseTrack() {
    dprint("%-I-INFO, pauseTrack");
    if (playListfileCount > 0) {
        trackNameText.scrolling = "off";
        trackNameShadow.scrolling = "off";
        WMPlayer.controls.pause();
        //Winamp.doPlayPause();
        //stop the timers, no point in them running
        sliderTimer.ticking = false;
        positionTimer.ticking = false;
    }
}
//=====================
//End function
//=====================

//=================================
// pause timer setup
//=================================
var pauseTimer = new Timer();
pauseTimer.ticking = false;
pauseTimer.interval = 0.25;
//=================================
// timer ends
//=================================

//=====================================
// function to play audio or video file
//=====================================
function masterPlay() {
    var video = (videoTypes.indexOf(xtn(WMPlayer.URL)) >= 0);
    var fullscreen = (preferences.fullscreenPref.value === "1");

    if (isMacintosh) {
        WMPlayer.controls.play(miniaturize && !video);
        if (video && fullscreen) {
            WMPlayer.fullScreen = true;
        }
    } else {
        // on Windows even though wmpAllowApp was zero it was still causing the external player to run
        // this is probably due to    === "1"
        if ((video && wmpAllowApp ) || (ctrlPressed === 1)) {
            dprint("video "+video );
            dprint("wmpAllowApp "+wmpAllowApp );
            dprint("preferences.wmpAllowPref.value "+preferences.wmpAllowPref.value );
            dprint("ctrlPressed "+ ctrlPressed);
            ctrlPressed = 0;
            pauseTimer.ticking = true;              // press the pause button
            playInWMPApp(WMPlayer.URL, fullscreen); // play in WMP App
        } else {
            WMPlayer.controls.play();
        }
    }
}
//=====================
//End functions
//=====================

//=================================
// timer to pause the player
//=================================
pauseTimer.onTimerFired = function () {
    pauseTimer.ticking = false;
    startupFlg = 0;     // same as pauseButton.onMouseUp()
    pauseTrack();
    playButton.visible = true;
    pauseButton.visible = false;
    buildVitality(currIcon, parseInt(percentTextShadow.data, 10), WMPlayer.settings.mute); // build the dock vitality
};
//=====================
//End function
//=====================

//=================================
// busy icon timer setup
//=================================
var busyTimer = new Timer();
busyTimer.interval = 0.1;
busyTimer.ticking = false;
//=================================
// timer ends
//=================================
//=================================
// busy icon timer setup
//=================================
var busyIconStartupTimer = new Timer();
busyIconStartupTimer.interval = 0.1;
busyIconStartupTimer.ticking = false;
//=================================
// timer ends
//=================================

//=================================
// widget inline button timer setup
//=================================
var fadeTimer = new Timer();
fadeTimer.ticking = false;
fadeTimer.interval = 0.4;
//=================================
// timer ends
//=================================


//=================================
// timer to fade the buttons
//=================================
fadeTimer.onTimerFired = function () {
    nextChunk.opacity = nextChunk.opacity - 5;
    prevChunk.opacity = nextChunk.opacity - 5;
    firstChunk.opacity = nextChunk.opacity - 5;
    lastChunk.opacity = nextChunk.opacity - 5;
    buttonConfig.opacity = buttonConfig.opacity - 5;
    keyu.opacity = keyu.opacity - 5;
    keyf.opacity = keyf.opacity - 5;
    keyd.opacity = keyd.opacity - 5;
    if (preferences.playlistFormatPref.value === "xml") {
        oButton.opacity = oButton.opacity - 5;
        sButton.opacity = sButton.opacity - 5;
    }
    ovalButton.opacity = ovalButton.opacity - 5;
    if (nextChunk.opacity <= 0) {
        fadeTimer.ticking = false;
    }
    keyViewScreen.opacity = keyViewScreen.opacity - 5;
    keyFullScreen.opacity = keyFullScreen.opacity - 5;
    bracket.opacity = bracket.opacity - 5;
};
//=====================
//End function
//=====================

//===========================================
// Function to stop the rotating timers
//===========================================
function busyStop() {
    busyTimer.ticking = false;
    busy.visible = false;
    busyBlur.visible = false;

    indicatorRed.src = "Resources/indicatorGreen.png";
    indicatorRed.tooltip = "Playing track successfully";

}
//=====================
//End function
//=====================

//===================================
// this routine is here for cleanliness during debugging, it wipes the play list
//===================================
function wipePlayList() {
    var i, j;

    dprint("%-I-INFO, wipePlayList");
    for (i = 0; i < chunkSize; i += 1) {
        j = i + (chunkSize * chunkIndex);
        trackNumber[j] = j;
        // this is the track as displayed in the track list
        trackName[j] = "";
        // this is the full track path converted to native format
        fullTrackName[j] = "";
        //}
    }
    dprint("%-I-INFO, wipePlayList finished");
}
//=====================
//End function
//=====================

//===================================
// function to read the play list
//===================================
function clearPlayList() {
    dprint("%-I-INFO, clearPlayList");
    trackName = [];
    fullTrackName = [];
    playListTitle.text = "";
    playListText.forEach(function (ele) {
        ele.data = "";
    });

}
//=====================
//End function
//=====================

//===================================
// function to get the filename only
//===================================
function getFileOnly(str) {
    //print("str" + str);
    if (str !== undefined) {
		file_extension = str.split(".").pop();
		return str.replace(/^.*[\\\/]/, "");
    }
}
//=====================
//End function
//=====================

//===================================
// read the play list
//===================================
function readPlayList() {
    var i, j;

    dprint("%-I-INFO, readPlayList");
    trackNoText.data = "track " + WMPlayer.currentMedia.name.substring(0, 6);

    if (playListfileCount === 1) { //single file
        trackName[0] = getFileOnly(thePlayList[0].sourceURL);
        fullTrackName[0] = convertPathToPlatform(thePlayList[0].sourceURL);

    } else { //multiple files
        for (i = 0; i < chunkSize; i += 1) {
            j = i + (chunkSize * chunkIndex);
            trackNumber[j] = j;
            //dprint("playListfileCount " + playListfileCount);

            if (j <= playListfileCount - 1) {
                if (isAudioCD) {
                    trackName[j] = j + 1 + " " + trim(cdPlaylistTitles[j]);
                } else {
                    // this is the track as displayed in the track list
                    trackName[j] = getFileOnly(thePlayList[j].sourceURL);
                    //dprint("trackName[" + j + "] " + trackName[j]);
                }
                // this is the full track path converted to native format
                fullTrackName[j] = convertPathToPlatform(thePlayList[j].sourceURL);
                //dprint("fullTrackName[" + j + "] " + fullTrackName[j]);
            } else {
                trackName[j] = null;
            }
        }
    }
    dprint("%-I-INFO, readPlayList finished");
}
//=====================
//End function
//=====================

//===================================
//  function to remove play list scrolling
//===================================
function removePlayListScrolling() {
    dprint("%-I-INFO, removePlayListScrolling");
    // stop anything scrolling

    playListText.forEach(function (ele) {
        ele.scrolling = "off";
    });
}
//=====================
//End function
//=====================

//===================================
//  function to remove play list styling
//===================================
function removePlayListStyling() {
    dprint("%-I-INFO, removePlayListStyling");
    // style the page number background
    //playListPage.style.backgroundColor = "rgba(255,255,255,0.3)";
    // get rid of any background styling

    playListText.forEach(function (ele) {
        ele.style.backgroundColor = "transparent";
    });
}
//=====================
//End function
//=====================

//===================================
// display a chunk of the tracks
//===================================
function showPlayList() {
    dprint("%-I-INFO, showPlayList");
    playListPage.data = "  Page no. " + (chunkIndex + 1);
    playListPage.tooltip = "  Page no. " + (chunkIndex + 1 + " ");
    if (playListfileCount === 1) { //single file
        dprint("9 chunkIndex " + chunkIndex);
        playListText0.data = trackName[0];
    } else {
        dprint("chunkIndex " + chunkIndex);

        playListText.forEach(function (ele, i) {
            if (trackName[i + (chunkSize * chunkIndex)] !== null) {
                ele.data = trackName[i + (chunkSize * chunkIndex)].toLowerCase();
            }
        });
    }
    dprint("%-I-INFO, showPlayList finished");
}
//=====================
//End function
//=====================

//=================================
// Function to clear the tooltips
//=================================
function clearPlayListHints() {
    playListTitle.tooltip = "";
    playListText.forEach(function (ele) {
        ele.tooltip = "";
    });
}
//=================================
// end function
//=================================

//===================================
// set the play list tooltips
//===================================
function setPlayListTooltip() {
    dprint("%-I-INFO, setPlayListTooltip");
    if (isAudioCD) {
        if (preferences.tooltipPref.value === "enabled") {
            playListTitle.tooltip = "CD drive : " + playListTitle.data;
            playListText.forEach(function (ele, i) {
                ele.tooltip = "CD track : " + trackName[i + (chunkSize * chunkIndex)];
            });
        } else {
            clearPlayListHints();
        }
    } else {
        if (playListfileCount === 1) { //single file
            if (preferences.tooltipPref.value === "enabled") {
                playListText0.tooltip = fullTrackName[0];
            } else {
                playListText0.tooltip = "";
            }
        } else {
            if (preferences.tooltipPref.value === "enabled") {
                playListTitle.tooltip = "Double click here to open selected folder";
                playListText.forEach(function (ele, i) {
                    ele.tooltip = fullTrackName[i + (chunkSize * chunkIndex)];
                });
            } else {
                clearPlayListHints();
            }
        }
    }
}
//=====================
//End function
//=====================

//===================================
// function to make the invisi-buttons visible when a mouseover event occurs
//===================================
function buttonOpacity() {
    //if (debugFlg === "1") {dprint("%-I-INFO, buttonOpacity");}
    nextChunk.opacity = 255;
    prevChunk.opacity = 255;
    firstChunk.opacity = 255;
    lastChunk.opacity = 255;
    buttonConfig.opacity = 255;
    keyf.opacity = 255;
    keyd.opacity = 255;
    keyu.opacity = 255;
    if (preferences.playlistFormatPref.value === "xml") {
      oButton.opacity = 255;
      sButton.opacity = 255;
    } else {
      oButton.opacity = 1;
      sButton.opacity = 1;
    }
    ovalButton.opacity = 255;
    keyViewScreen.opacity = 255;
    keyFullScreen.opacity = 255;
    bracket.opacity = 255;
}
//=====================
//End function
//=====================

//===================================
// give the currently selected track a light grey background
//===================================
function highlightSelectedTrack() {
    dprint("%-I-INFO, highlightSelectedTrack");
    if (playListfileCount === 1) { //single file
        if (preferences.scrollingPref.Value === "enabled" ) {
           playListText0.scrolling = "left";
        }
        playListText0.style.backgroundColor = "rgb(255,255,255)";
    } else {
        // set the background styling for the selected track

        playListText.forEach(function (ele, i) {
            if (playIndex === i + (chunkSize * chunkIndex)) {
                if (preferences.scrollingPref.Value === "enabled" ) {
                  ele.scrolling = "left";
                }
                ele.style.backgroundColor = "rgb(255,255,255)";
            }
        });
    }
}
//=====================
//End function
//=====================

//===================================
// function to update the play list
//===================================
function updatePlayList() {
    dprint("%-I-INFO, updatePlayList");
    wipePlayList();
    clearPlayList();
    readPlayList();
    removePlayListScrolling();
    removePlayListStyling();
//  lprint("chosenFolder " + chosenFolder);
    playListTitle.data = chosenFolder; //db05
    if (chosenFolder === "") {
        playListTitle.data = preferences.musicFolderPref.value; // just in case the playlist is absent due to invalid or missing files
    }
    playListTitle.data = convertPathToPlatform(chosenFolder); //db06

//  lprint("IsPlaylist " + IsPlaylist);
    if (IsPlaylist || playListfileCount === 1) {
        showPlayList();
    }
    setPlayListTooltip();
    buttonOpacity();
    highlightSelectedTrack();
}
//=====================
//End function
//=====================

//===================================
//  function to scroll individual items on the play list
//===================================
function scrollPlayList() {
    dprint("%-I-INFO, scrollPlayList");
    // stop anything scrolling
    removePlayListScrolling();
    removePlayListStyling();
    highlightSelectedTrack();
}
//=====================
//End function
//=====================

//=========================================================
// Function to stretch the cable
//=========================================================
function stretchCable() {
//now calculate the stretch of the cable
    cable.hOffset = sliderSet.hOffset + (sliderSet.width);
    cable.Width = (cableWheelSet.hOffset + cableWheelSet.width) - (cable.hOffset);
}
//=====================
//End function
//=====================

//===================================
// function to set the volume to that stored in the volumePref preference
//===================================
function setVolumeSlider(volume) {
    var volPercent = Math.round(volume);

    WMPlayer.settings.volume = volume;
    sliderSet.hOffset = bar.hoffset + 25 * scale + volume * 1.05 * scale;
    percentTextShadow.data = volPercent + "%";
    percentText.data = volPercent + "%";
    stretchCable();
}
//=====================
//End function
//=====================

//===================================
// function to play any media CD or playlist, called by nextButton, prevButton etc
//===================================
function playMedia(i) {
    var artist;

    dprint("%-I-INFO, playMedia");
    if (playListfileCount > 0) {
        playIndex = i;
        dprint("playListfileCount " + playListfileCount);
        dprint("playIndex " + playIndex);
        dprint("thePlayList[i].sourceURL " + thePlayList[i].sourceURL);

        WMPlayer.URL = thePlayList[i].sourceURL;

        // set the track display data

        if (isAudioCD) {
            //dprint("Audio CD " +WMPlayer.currentMedia.duration);
            artist = trim(cdPlaylistArtists[i]);
            if (artist !== "") {
                artist = ": " + artist;
            }
            trackNameText.data = trim(cdPlaylistTitles[i]) + artist;
            trackNameShadow.data = trim(cdPlaylistTitles[i]) + artist;
            trackNoText.data = "track " + WMPlayer.currentMedia.name.substring(0, 6);
        } else {
            if (preferences.titlePref.value === "filename only") {
                trackNameText.data = "   " + getFileOnly(WMPlayer.URL);
                trackNameShadow.data = "   " + getFileOnly(WMPlayer.URL);
            } else {
                trackNameText.data = "   " + WMPlayer.URL;
            }

            //if the random button is pressed then
            if (preferences.shuffleStatePref.value === "enabled") {
                trackNoText.visible = false;
            } else {
                trackNoText.data = "track " + String(playIndex + 1);
                trackNoText.visible = true;
            }
        }

        dprint("trackNameText.data " + trackNameText.data);
        dprint("trackNoText.data " + trackNoText.data);

        if (!playOverride) {
            // DB06
            if (preferences.autoPlayStatePref.value === "enabled") {
                positionTimer.ticking = true;
            }
            // DB06
            sliderTimer.ticking = true;
            //dprint("2. WMPlayer.controls.play ");
            masterPlay();
            setVolumeSlider(Number(preferences.volumePref.value));
            playButton.visible = false;
            pauseButton.visible = true;
        }
        // this next call is absolutely necessary, removes the styling at the point the track is selected and playing
        scrollPlayList();
    }
    dprint("WMPlayer.URL " + WMPlayer.URL);
}
//=====================
//End function
//=====================

//===================================
// function called by the position timer every 2 secs to check the current media player position and select the next track when this track ends
//===================================
function checkPosition() {
    var answer;
    var triggerNext = 0;
    // To allow for WMP's bad handling of flv files.
    // if the currentPosition value has not changed for two cycles, select the next track
    // dprint("checking position");

    // increment the stuck count
    if (storedWMPpos === WMPlayer.controls.currentPosition) {
        dprint("incrementing the stuck cycle count");
        stuckCycleCount = stuckCycleCount + 1;
    }

    if (filePlayedWell === 0 && WMPlayer.controls.currentPosition === 0) {
        dprint("Found Beginning of Track");
        busyTimer.ticking = true;
    }

    if (filePlayedWell === 1 && WMPlayer.controls.currentPosition === 0) {
        dprint("Found End of Track");
        if (preferences.autoPlayStatePref.value === "enabled") {
           busyTimer.ticking = true;
        } else {
             positionTimer.ticking = false;
             playButton.visible = true;
             pauseButton.visible = false;
                busyStop();
        }
    }
    //dean
    // if the file has been successfully played but the file is stuck at the beginning of the track
    if (filePlayedWell === 1 && stuckCycleCount >= 2) {
        dprint("file played so incrementing the stuck cycle count");

        triggerNext = 1;
        stuckCycleCount = 0;
        if (!isAudioCD) {
            // something later
            //throw new Error("checkPosition");
            hprint("checkPosition: empty block");
        }
    }

    // if the file hasn't yet been played and the cycle is stuck then the codec isn't installed
    if (storedWMPpos === WMPlayer.controls.currentPosition && filePlayedWell === 0 && stuckCycleCount >= 2) {
        dprint("file hasn't yet been played and the cycle is stuck ");
        if ((WMPlayer.currentMedia.duration <= 6) && (WMPlayer.currentMedia.duration >= 0)) {
            // when a track is less than six seconds long do not roll the timer
            triggerNext = 1;
            stuckCycleCount = 0;
        } else {
            positionTimer.ticking = false; // pause the position timer to prevent multiple messages
            triggerNext = 1;
            stuckCycleCount = 0;
            if (!isAudioCD) {
                if (preferences.errorMessagesPref.Value === "enabled") {
                    answer = alert("Trying to play this file " + WMPlayer.URL + String.fromCharCode(13) + String.fromCharCode(13) + "However, your version of Windows does not recognise this type of file ." + file_extension + String.fromCharCode(13) + "Search internet for codecs that will support this file type? ", "Open Browser Window", "No Thanks");
                    if (answer === 1) {
                        openURL("https://www.google.co.uk/?gws_rd=ssl#q=windows+media+player+codecs+for+" + file_extension);
                    }
                }
                trackFailCnt = trackFailCnt + 1;
                if ((preferences.errorMessagesPref.Value === "enabled") && (trackFailCnt >= 2)) {
                    answer = alert("Do you want me to stop these annoying error messages? ", "Yes please!", "No Thanks");
                    if (answer === 1) {
                        preferences.errorMessagesPref.Value = "disabled";
                    } else {
                        trackFailCnt = 0;
                    }
                }
            }
            positionTimer.ticking = true;  // restart the position timer to allow future checks
        }
    }

/*
 	 else {
        //dprint("storedWMPpos " + storedWMPpos);
        //dprint("WMPlayer.controls.currentPosition " + WMPlayer.controls.currentPosition);
        //dprint("stuckCycleCount " + stuckCycleCount);
        //dprint("filePlayedWell " + filePlayedWell);
        //hprint("checkPosition: empty block");
    }
*/
    // check the value of the WMP current position and store it
    storedWMPpos = WMPlayer.controls.currentPosition;
    if (storedWMPpos > 0) {
        filePlayedWell = 1;
    }

    //if (debugFlg === "1") {dprint("checking every 2 secs ");}

    // the WMP end of track is indicated by a zero position but obviously the start is too -
    // so we have a short delay before we select the next track
    // if the trigger has been set then select the next track
    //only automati1cally play the next track when the autoplay lug is set


    if (triggerNext === 1) {
        if (preferences.autoPlayStatePref.value === "enabled") {
            dprint("WMPlayer.controls.currentPosition " + WMPlayer.controls.currentPosition);
            dprint("zeroCycleCount " + zeroCycleCount);
            dprint("triggerNext " + triggerNext);

            zeroCycleCount = 0;
            WMPlayer.controls.currentPosition = 0;
            positionTimer.ticking = true;
            //if playing a single track set the buttons
            if (playerState === "single") {
                playButton.visible = true;
                pauseButton.visible = false;
            } else {
                // only skip the track if not a CD, CDs can be slow to initialise
                if (!isAudioCD) {
                    // cause the next track to play if a folder selected
                    if (playIndex + 1 < playListfileCount) {
                        playIndex += 1;
                        if (playIndex % chunkSize === 0) {
                            chunkIndex = Math.floor(playIndex / chunkSize);
                            updatePlayList();
                        }
                    } else {
                        playIndex = 0;
                        chunkIndex = 0;
                        updatePlayList();
                    }
                    filePlayedWell = 0;
                    dprint("Automatically playing next track ");
                }
                dprint("playMedia Call no. 1");
                playMedia(playIndex);
                positionTimer.ticking = true;   //<<<<<<<<<<<<<<<<<<<<<<<<<<<,
                busyStop();
            }
        } else {
            stuckcyclecount = 0;
        }
    } else {
        stuckcyclecount = 0;
        //busyStop();
    }
    zeroCycleCount = zeroCycleCount + 1;
}
//=====================
//End function
//=====================

//=================================
// timer to fade the buttons
//=================================
positionTimer.onTimerFired = function () {
            checkPosition();
};
//=====================
//End function
//=====================

//===================================
// function called by the sliderTimer on a small interval, it sets the graphical slider position automatically to correspond with the Windows Media player actual position
//===================================
function setSliderPosition() {
    var positionSliderRightmost,
        positionSliderLeftMost,
        positionSliderSliderwidth,
//        positionSliderCurrpos,
//        positionSliderperc,
        wmplayerPerc;
        //dprint("setSliderPosition counting");

    if (!positionSliderClicked && WMPlayer.currentMedia) {
        positionSliderRightmost = (120 * scale) + positionSlider.width; //positionSliderLeftMost limit
        positionSliderLeftMost = (55 * scale); // positionSliderRightmost limit
        positionSliderSliderwidth = positionSliderRightmost - positionSliderLeftMost;

        wmplayerPerc = (WMPlayer.controls.currentPosition / WMPlayer.currentMedia.duration) * 100;
        positionSlider.hOffset = ((positionSliderSliderwidth * wmplayerPerc) / 100) + positionSliderLeftMost;
        // dprint("positionSliderSliderwidth " +positionSliderSliderwidth);
        // dprint("positionSliderLeftMost " +positionSliderLeftMost);
        // dprint("wmplayerPerc " +wmplayerPerc);
        // dprint("positionSlider.hOffset " +positionSlider.hOffset);
    }
}
//=====================
//End function
//=====================

//=================================
// timer to fade the buttons
//=================================
sliderTimer.onTimerFired = function () {
            setSliderPosition();
};
//=====================
//End function
//=====================

//=================================
// updateTimer timer setup
//=================================
var updateTimer = new Timer();
updateTimer.ticking = false;
updateTimer.interval = 1.0;
//=================================
// timer ends
//=================================


//=====================
// the busy timer changes the busy icon on startup
//=====================
busyIconStartupTimer.onTimerFired = function () {
    mediapopupplaque.visible = true;
    busyTimer.ticking = true;
    startupTimeout = startupTimeout + 1;
    //dprint("startupTimeout " + startupTimeout);
    if (startupTimeout >= 35) {
        busyStop();
        busyIconStartupTimer.ticking = false;
        mediapopupplaque.visible = false;
    }
};
//=====================
//End function
//=====================


//=====================
// the busy timer changes the busy icon
//=====================
busyTimer.onTimerFired = function () {
    //dprint("XXXXXXXXXXXXX busyCounter running");
    indicatorRed.src = "Resources/indicatorRed.png";
    indicatorRed.tooltip = "Checking to see if this track can be played";
    busy.visible = true;
    busyBlur.visible = true;
    busyCounter = busyCounter + 1;
    if (busyCounter >= 7) {
        busyCounter = 1;
    }
    busy.src = "Resources/busy-F" + busyCounter + "-32x32x24.png";

};
//=====================
//End function
//=====================



//===========================================
// function to test whether the media player is muted
//===========================================
function testmute() {
    dprint("%-I-INFO, testmute");
    lprint("testmute: " + WMPlayer.settings.mute);
    if (WMPlayer.settings.mute) {
        indicatorRed.src = "Resources/indicatorRed.png";
        indicatorRed.tooltip = "The media player is muted";
    } else {
        indicatorRed.src = "Resources/indicatorGreen.png";
        indicatorRed.tooltip = "";
    }
}
//=====================
//End function
//=====================

//=========================================================
// Function to determine the media layer sound levels at startup
//=========================================================
function startVolume() {
    dprint("%-I-INFO, startVolume");
    testmute();
    //autoplay levels
    //set the last used volume level in percent from the slider.
    preferences.volumePref.value = preferences.autoPlayVolumePref.value;
    //default levels (stored)
    WMPlayer.settings.volume = preferences.volumePref.value;
    //dprint("WMPlayer.settings.volume " + WMPlayer.settings.volume);
    sliderSet.hOffset = ((bar.hoffset + (25 * scale)) + ((WMPlayer.settings.volume * 1.05) * scale));
    perc = parseInt(WMPlayer.settings.volume, 10);
    percentTextShadow.data = perc + "%";
    percentText.data = perc + "%";
    stretchCable();

}
//=====================
//End function
//=====================

//===================================
// function to check the music folder path
//===================================
function checkPath() {
    dprint("%-I-INFO, checkPath");
    dprint("preferences.musicFolderPref.value " + preferences.musicFolderPref.value);
    if (preferences.musicFolderPref.value === "") {
        preferences.musicFolderPref.value = system.userMusicFolder;
    }
    //now restrict the user from selecting the root folders
    restrictRootFolder();   // This is windows specific ********
    dprint("preferences.musicFolderPref.value " + preferences.musicFolderPref.value);
    path = preferences.musicFolderPref.value;
}
//=====================
//End function
//=====================

//===================================
// set the widget lock status if pinned
//===================================
function checkLocked() {
    dprint("%-I-INFO, checkLocked");
    if (preferences.widgetLockPref.value === "1") {
        mainWindow.locked = true;
        lprint("Setting the locking pin ", lockArea.vOffset);
        lockArea.visible = false;
        lockAreaLocked.visible = true;
        if (preferences.soundpref.value === "enabled") {
            play(lock, false);
        }
    }
}
//=====================
//End function
//=====================

//=================================
// Function to count the folder contents folder by folder
//=================================
function countDirContents(path) {
    var totalFilesCount = 0;
    var files;
    var i;

    dprint("%-I-INFO, countDirContents");
    dprint("recursively checking the contents of this folder - " + path);

    // define the getFileList function
    filesystem.getFileList = function (path, limit) {
        var result = [];

        if (!filesystem.isDirectory(path)) {
            return result;
        }

        if (limit === undefined) {
            limit = 10000;    // default limit, if limit parameter omitted
        }

        function getFileList(path) {
            var paths;
            var j;
            var fpath;

            paths = filesystem.getDirectoryContents(path, false);
            for (j = 0; j < paths.length; j += 1) {
                fpath = paths[j];
                if (limit <= 0) {
                    throw new Error("Limit Exceeded!");
                }

                //fpath = path + "/";
                if (filesystem.isDirectory(fpath)) {
                    getFileList(fpath);
                } else {
                    result.push(fpath);
                    limit -= 1;             // counts files found
                }
            }
        }
        // this attempts to extract a file list but if it fails does not collapse in heap
        try {
            getFileList(path);
        } catch (e) {
            hprint(e);
        }
        return result;
    };


    files = filesystem.getFileList(path, fileCountLimit);
    for (i = 0; i < files.length; i += 1) {
        totalFilesCount += 1;
    }
    dprint("Interim manual file count prior to automatic recursive search " + totalFilesCount);
    return totalFilesCount;
}
//=================================
// end function
//=================================

//===================================
// function to select the URL for WMP given a path
//===================================
function FileMedia(path) {
    this.sourceURL = path;
}
//=====================
//End function
//=====================

/*
//===================================
// function to emulate LTrim
//===================================
function ltrim(str) {
    var whitespace = " \t\n\r";
    var s = String(str);
    var j;
    var i;

    if (whitespace.indexOf(s.charAt(0)) !== -1) {
        j = 0;
        i = s.length;
        while (j < i && whitespace.indexOf(s.charAt(j)) !== -1) {
            j += 1;
        }
        s = s.substring(j, i);
    }
    return s;
}
//=====================
//End function
//=====================

//===================================
// function to emulate rtrim
//===================================
function rtrim(str) {
    var whitespace = " \t\n\r";
    var s = String(str);
    var i;

    if (whitespace.indexOf(s.charAt(s.length - 1)) !== -1) {
        i = s.length - 1;
        while (i >= 0 && whitespace.indexOf(s.charAt(i)) !== -1) {
            i -= 1;
        }
        s = s.substring(0, i + 1);
    }
    return s;
}
//=====================
//End function
//=====================

//===================================
// function to trim a string both ends
//===================================
function trim(str) {
    return rtrim(ltrim(str));
}
//=====================
//End function
//=====================
*/


//===================================
// function to shuffle an existing play list or file list
//===================================
function randomPlay() {
    var i;
    var j;
    var tempi;
    var tempj;
    var objSongi;
    var objSongj;

    dprint("%-I-INFO, randomPlay");
    if (playerState === "folder" || playerState === "AudioCD") {
        i = playListfileCount;
        if (i === 0) {
            return false;
        }
        while (i > 0) {
            i -= 1;
            j = Math.floor(Math.random() * (i + 1));
            tempi = thePlayList[i];
            tempj = thePlayList[j];
            thePlayList[i] = tempj;
            thePlayList[j] = tempi;
            if (isAudioCD) {
                objSongi = cdPlaylistTitles[i];
                objSongj = cdPlaylistTitles[j];
                cdPlaylistTitles[i] = objSongj;
                cdPlaylistTitles[j] = objSongi;
            }
        }
        dprint("playMedia Call no. 7");
        playMedia(0);
        playerState = "folder"; //this is to ensure that shuffle mode is respected
        //dprint("1^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ path " + path);
        dprint("Randomising done ");
        updatePlayList();
        //dprint("2 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^path " + path);
    }
}
//=====================
//End function
//=====================

//===================================
// set the saved shuffle status
//===================================
function checkShuffleState() {
    dprint("%-I-INFO, checkShuffleState");
    if (preferences.shuffleStatePref.value === "enabled") {
        //dprint("1. ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ preferences.shuffleStatePref.value " + preferences.shuffleStatePref.value);
        pipesRight.src = "Resources/pipesRightClicked.png";
        if (preferences.tooltipPref.value === "enabled") {
            pipesRight.tooltip = "pulled out - shuffle is now enabled";
        } else {
            pipesRight.tooltip = "";
        }
        randomPlay();
    } else {
        if (preferences.tooltipPref.value === "enabled") {
            pipesRight.tooltip = "pushed in - shuffle is now disabled";
        } else {
            pipesRight.tooltip = "";
        }
    }
}
//=====================
//End function
//=====================

//===================================
// function to open a folder and recursively read its contents into a playlist
//===================================
function readFolderRecursively(path) {
    var i;
    var convertedPath;
    var tmfilePlayList;
    var idxFile;
    var IsSong;
    var foldersFound = false; 


    dprint("%-I-INFO, readFolderRecursively");
    isFolder = true;

    chunkIndex = 0;

    isAudioCD = false;
    IsPlaylist = false;
//  chosenFolder = path;
    var fs = null;

    busyIconStartupTimer.ticking = true;  // show the busy timer

    if (preferences.recurseFoldersPref.value === "enabled") {
        // the getDirectoryContents when performed recursively can hang the widget in a loop until resources are used up
        // Instead the countDirContents function does that but when it reaches a limit of 10000 it aborts and generates an error.

        var interimFileCount = countDirContents(path);
        //dprint("interimFileCount prior to recursive search " + interimFileCount);
        //dprint("fileCountLimit " + fileCountLimit);

        if (interimFileCount >= fileCountLimit) {
            alert("In this folder and below there are more than \"" + fileCountLimit + "\" files the media player has to search through in order to build a playlist. This is too many. The widget will fail due to excessive memory usage. Select a sub-folder with less than \"" + fileCountLimit + "\" valid files or disable recursive search.");
            mediapopupplaque.visible = false;
            return;
        }
        fs = filesystem.getDirectoryContents(path, true);
    } else {
        fs = filesystem.getDirectoryContents(path, false);
    }

    mediapopupplaque.visible = false;
    //busyTimer.ticking = false;

    playListfileCount = fs.length;
    dprint("Filesystem recursive search file count " + playListfileCount);

    tmfilePlayList = [];

    idxFile = 0;

    for (i = 0; i < fs.length; i += 1) {
        convertedPath = convertPathToPlatform(path + "/" + fs[i]);
        if (!filesystem.isDirectory(convertedPath)) {
            IsSong = (validTypes.indexOf(xtn(fs[i])) >= 0);
            if (IsSong) {
                tmfilePlayList[idxFile] = new FileMedia(convertedPath);
                idxFile += 1;
            }
        } else {
            foldersFound = true; 
            //print(">>>>>>>>>>>>>> folders found"+convertedPath);
        }
    }
    dprint("Filesystem valid file count - adding " + idxFile + " valid files to list.");
    playListfileCount = idxFile;

    if (idxFile > 0) {
        thePlayList = [];   // new Array(idxFile);
        for (i = 0; i < idxFile; i += 1) {
            thePlayList[i] = tmfilePlayList[i];
            IsPlaylist = true;
        }
        dprint("playMedia Call no. 3");
        playMedia(0);
    } else {
        if (foldersFound === true ) {
            answer = alert("The media player has looked in this folder \"" + path + "\" and found there are no audio files the media player can use. However, there are sub-folders, shall I attempt to play these? ", "Yes please!", "No Thanks");
            if (answer === 1) {
                preferences.recurseFoldersPref.value = "enabled"
                readFolderRecursively(path);
            } else {
                selectFolderToPlay();
            }          
        } else {
            alert("The media player has looked in this folder \"" + path + "\" and found there are no audio files the media player can use. Please select a sub-folder or another location where your music resides.");            
            selectFolderToPlay();
        }
        // dean
    }
    checkShuffleState();
}
//=====================
//End function
//=====================

//===================================
// set the autoplay state read the default folder
//===================================
function checkStartupPlayState() {
    playerState = "folder"; //this is to ensure that shuffle mode is respected
    if (startupFlg === 1 && preferences.startupPlayStatePref.value === "disabled") {
        playOverride = true;
        positionTimer.ticking = false;
    }
    path = preferences.musicFolderPref.value;
    chosenFolder = preferences.musicFolderPref.value;
    readFolderRecursively(preferences.musicFolderPref.value);
}
//=====================
//End function
//=====================

//===========================================
// Function to set the font for the playlist
//===========================================
function setFont() {
    dprint("%-I-INFO, setFont");
    playListTitle.font = preferences.popupPanelFont.value;
    playListPage.font = preferences.popupPanelFont.value;

    playListText.forEach(function (ele) {
        ele.font = preferences.popupPanelFont.value;
    });
}
//=====================
//End function
//=====================

//=================================
// Function to check the fullScreen value and set the toggle
//=================================
function checkFullScreen() {
    if (preferences.fullscreenPref.value === "1") {
        keyFullScreen.tooltip = "pulled out - external video full screen mode is enabled";
        keyFullScreen.src = "Resources/indicatorRodOut.png";
    } else {
        keyFullScreen.tooltip = "external video full screen mode is disabled";
        keyFullScreen.src = "Resources/indicatorRod.png";
    }
    if (preferences.soundpref.value === "enabled") {
        play(steamSound, true);
    }
    if (preferences.tooltipPref.value !== "enabled") {
        keyFullScreen.tooltip = "";
    }
}
//=================================
// end function
//=================================

//=================================
// Function to check the keyViewScreen value and set the toggle
//=================================
function checkViewScreen() {
    if (isMacintosh) {
        if (preferences.qtAllowPref.value === "1") {
            keyViewScreen.tooltip = "pulled out - external video is enabled";
            keyViewScreen.src = "Resources/indicatorRodOut.png";
        } else {
            keyViewScreen.tooltip = "external video is disabled";
            keyViewScreen.src = "Resources/indicatorRod.png";
        }
    } else {
       //dprint("preferences.wmpAllowPref.value " + preferences.wmpAllowPref.value);

        if (preferences.wmpAllowPref.value === "1") {
            keyViewScreen.tooltip = "pulled out - external video is enabled";
            keyViewScreen.src = "Resources/indicatorRodOut.png";
        } else {
            keyViewScreen.tooltip = "external video is disabled";
            keyViewScreen.src = "Resources/indicatorRod.png";
        }
        wmpAllowApp = parseFloat(preferences.wmpAllowPref.value);
    }
    if (preferences.soundpref.value === "enabled") {
        play(steamSound, true);
    }
    if (preferences.tooltipPref.value !== "enabled") {
        keyViewScreen.tooltip = "";
    }
}
//=================================
// end function
//=================================

//===========================================
// Function to set the media player volume
//===========================================
function checkFadeState() {
    if (preferences.playListKeysPref.value === "solid") {
        fadeTimer.ticking = false;
    } else {
        fadeTimer.ticking = true;
    }
}
//=====================
//End function
//=====================

//===========================================
// this function runs on startup, called by a timer
//===========================================
function startup() {
    dprint("%-I-INFO, startup");
    debugFlg = preferences.debugflgPref.value;
    if (debugFlg === "1") {
		preferences.imageEditPref.hidden=false;
	} else {
		preferences.imageEditPref.hidden=true;
	}

    startupFlg = 1;
    resize();                      // resize if required
    mainScreen();                  // check the widget is on-screen
//  createLicence(mainWindow);     // create the licence window
    startVolume();                 // check the start volume levels
    checkPath();
    setmenu();                     // build the menu
    settooltip();                  // build the tooltips
    buildVitality(currIcon, perc, WMPlayer.settings.mute); // build the dock vitality
    checkLocked();                 // set the widget lock status if pinned
    // the saved shuffle status is set during the check of the play state below
    checkStartupPlayState();       // set the autoplay state - if autoplay then reads the default folder
    checkAutoPlayState();
    if (preferences.playListPref.value === "enabled") {
        playlistFrame.visible = true;
    } else {
        playlistFrame.visible = false;
    }
    // update the playlist only when not shuffled as the same routine is called after the re-shuffling
    if (preferences.shuffleStatePref.value !== "enabled") {
        updatePlayList();
    }
    setFont();                     // set the font used on the playlist
    checkFullScreen();             // Function to check the fullScreen value and set the toggle
    checkViewScreen();             // Function to check the keyViewScreen value and set the toggle
    checkFadeState();

    //busyStop();                    // stop the busy timer if it is running
}
//=====================
//End function
//=====================



//===========================================
// Function to set the media player volume
//===========================================
function setVol() {
    //if (debugFlg === "1") {dprint("%-I-INFO, setVol");}

    WMPlayer.settings.volume = perc;
    preferences.volumePref.value = perc;
    //if (WMPlayer.settings.mute) muteIt();
}
//=====================
//End function
//=====================

//===========================================
// Function to determine what happens when the mouse is pressed on the position slider
//===========================================
function positionSliderOnMouseDown() {
//  lprint("Running function sliderSetOnMouseDown");
    positionSliderClicked = true;
//  lprint("Leaving function sliderSetOnMouseDown " +clicked);
}
//=====================
//End function
//=====================

//===========================================
// Function to determine what happens when the mouse is lifted from the position slider
//===========================================
function positionSliderOnMouseUp() {
    if (positionSliderClicked) {
        positionSliderClicked = false;
        positionSlider.onMouseMove = null;
    }
//  lprint("Running function sliderSetOnMouseUp clicked is now " + clicked);
}
//=====================
//End function
//=====================

//===================================
// function to move/constrain the track position slider
//===================================
function constrainPositionSlider() {
    var positionSliderRightmost,
        positionSliderLeftMost,
        positionSliderSliderwidth,
        positionSliderCurrpos,
        positionSliderperc;

    //determine slider travel limits
    positionSliderRightmost = (120 * scale) + positionSlider.width; //positionSliderLeftMost limit
    //dprint("positionSliderRightmost " +positionSliderRightmost);
    //dprint("positionSlider.width " +positionSlider.width);
    positionSliderLeftMost = (55 * scale); // positionSliderRightmost limit
    //dprint("positionSliderLeftMost " +positionSliderLeftMost);
    if (positionSlider.hOffset >= positionSliderRightmost) { //568
        positionSlider.hOffset = positionSliderRightmost;
    }
    if (positionSlider.hOffset <= positionSliderLeftMost) { //262
        positionSlider.hOffset = positionSliderLeftMost;
    }
    //calculate the percentage
    positionSliderSliderwidth = positionSliderRightmost - positionSliderLeftMost;
    positionSliderCurrpos = positionSlider.hOffset - positionSliderLeftMost;
    positionSliderperc = parseInt((positionSliderCurrpos / positionSliderSliderwidth) * 100, 10);
    if (positionSliderperc < 0) {
        positionSliderperc = 0;
    }
    WMPlayer.controls.currentPosition = (positionSliderperc * WMPlayer.currentMedia.duration) / 100;
}
//=====================
//End function
//=====================

//===========================================
// Function to slide the graphical position slider
//===========================================
function positionSliderOnMouseMove(event) {
    if (positionSliderClicked) {
        positionSlider.hOffset = event.hOffset - 25 * scale;
        constrainPositionSlider();
    }
}
//=====================
//End function
//=====================

//===========================================
// Function to constrain the main volume slider and set the media player volume accordingly
//===========================================
function constrainSliderSet() {
    var rightmost,
        leftmost,
        sliderwidth,
        currpos;

    //determine slider travel limits
    rightmost = bar.hOffset + bar.width - 100 * scale; //leftmost limit
    leftmost = bar.hOffset + 25 * scale; // rightmost limit
    if (sliderSet.hOffset >= rightmost) { //568
        sliderSet.hOffset = rightmost;
    }
    if (sliderSet.hOffset <= leftmost) { //262
        sliderSet.hOffset = leftmost;
    }
    stretchCable();

    //calculate the percentage
    sliderwidth = rightmost - leftmost;
    currpos = sliderSet.hOffset - leftmost;
    perc = Math.floor(100 * currpos / sliderwidth);
    if (perc < 0) {
        perc = 0;
    }
    setVol();

    percentTextShadow.data = perc + "%";
    percentText.data = perc + "%";
    buildVitality(currIcon, perc, WMPlayer.settings.mute); // build the dock vitality
    //if (preferences.soundpref.value === "enabled") {
        //play(zzzz, false);
    //}
    //dprint("sliderSet.hOffset " +sliderSet.hOffset);
}
//=====================
//End function
//=====================

//===========================================
// Function to slide the volume slider according to mouse scrollwheel position
//===========================================
function sliderSetOnMouseWheel(event) {
    var delta = event.scrollDelta;
    if (!event.ctrlKey) {  //only if the user is not selecting the control key
        if (delta !== 0) {
            if (preferences.mouseWheelVolumePref.value === "right") {
                sliderSet.hOffset += (delta * 2) * scale;
            } else {
                sliderSet.hOffset -= (delta * 2) * scale;
            }
            constrainSliderSet();
        }
        setVol();
    }
}
//=====================
//End function
//=====================

//===========================================
// Function to slide the volume slider according to mouse position when moving
//===========================================
function sliderSetOnMouseMove(event) {
    if (sliderSetClicked) {
        sliderSet.hOffset = event.hOffset - 35 * scale;
        constrainSliderSet();
    }
}
//=====================
//End function
//=====================

//===========================================
// Function to determine what happens when the mouse is pressed on the size slider
//===========================================
function sliderSetOnMouseDown() {
//  lprint("Running function sliderSetOnMouseDown");
    sliderSetClicked = true;
//  lprint("Leaving function sliderSetOnMouseDown " +clicked);
}
//=====================
//End function
//=====================

//===========================================
// Function to determine what happens when the mouse is lifted from the size slider
//===========================================
function sliderSetOnMouseUp() {
    setVol();
    if (sliderSetClicked) {
        sliderSetClicked = false;
        sliderSet.onMouseMove = null;
    }
//  lprint("Running function sliderSetOnMouseUp clicked is now " + clicked);
}
//=====================
//End function
//=====================

//===================================
// function to save the last used music folder path
//===================================
function saveFolder(path) {
    dprint("%-I-INFO, saveFolder");
    if (path === "") {
        return;
    }
    // if the new folder is the same as that stored move on and do not store
    // if the path is different then move all the stored paths down one.
    if (path !== preferences.musicFolderPref.value) {
        if (preferences.musicFolderPref.value !== "") { // if pref is already full then move the value to the next folder
            if (preferences.musicFolderPref2.value !== "") {
                if (preferences.musicFolderPref3.value !== "") {
                    if (preferences.musicFolderPref4.value !== "") {
                        preferences.musicFolderPref5.value = preferences.musicFolderPref4.value;
                    }
                    preferences.musicFolderPref4.value = preferences.musicFolderPref3.value;
                }
                preferences.musicFolderPref3.value = preferences.musicFolderPref2.value;
            }
            preferences.musicFolderPref2.value = preferences.musicFolderPref.value;
        }
        preferences.musicFolderPref.value = path;
    }
}
//=====================
//End function
//=====================

//===========================================
// function to accept a file on drag and drop
//===========================================
function catchFileDrop(event, fileName) {
    var dropData = [],
        i,
        dropType,
        validFound = 0,
        f,
        j,
        path2,
        idxFile,
        isFolder2,
        tmpfilePlayList,
        conjoinedPlayList,
        biggerPlayListSize,
        n,
        currentDropPosition;

    if (event) {
        n = event.data.length;
    } else {
        n = 2;
    }

    dprint("%-I-INFO, catchFileDrop");
    dprint("Reading dropped items: " + (n - 1));

    //only read less than 20,000 individual files
    if (n <= fileCountLimit) {
        if (event) {
            for (i = 0; i < n; i += 1) {
                dropData[i] = event.data[i];
            }
        } else {
            dropData[0] = "filenames";
            dropData[1] = fileName;
        }
    } else {
        alert("In this drag/drop operation there are more than \"" + fileCountLimit + "\" files. Please select a much smaller number!");
        return;
    }

    hprint("dropData[0] " + dropData[0]);
    hprint("dropData[1] " + dropData[1]);
    hprint("%-I-INFO, dropPosition " + dropPosition);
    //hprint("%-I-INFO, dragPosition " + dragPosition);
    //hprint("n " + n);

    //if (event) {
        // modify the drop position to take into account the page number
    currentDropPosition = dropPosition + (chunkSize * chunkIndex);
    //}

    // otherwise dropPostion === 0 from addSingleTrack and playFile(fileName)

    f = dropData[1];

    if (filesystem.isDirectory(f)) {
        dropType = "folder";
        isFolder2 = true;
        chosenFolder = f;  //DB05 - moved to here to only show folder selection at the correct time.
        var answer = alert("Dragging this folder " + chosenFolder + String.fromCharCode(13) + String.fromCharCode(13) + "Will replace the current playlist. "  + String.fromCharCode(13) + "Do you want to proceed? ", "Yes Please", "No Thanks");
        if (answer !== 1) {
           return;
        }
    } else {
        dropType = "filenames";
        isFolder2 = false;
    }

    if (dropType === "folder") {
        //dprint("chosenFolder" +f);
        //dprint("chosenFolder" +chosenFolder);
        // If a folder is dropped, its contents will be added to the list
        if (isFolder2) {
            //add the files to the playlist
            readFolderRecursively(f);
            saveFolder(f);                    // essential to rebuild the menu afterward
            updatePlayList();
            setmenu();                        // rebuild the menu
        }
        return;
    }

    if (dropType === "filenames") {
        // dropped file or files  -- could actually be a mixture of files and folders
        //dropType = dropData[0];
        //n = dropData.length;

        // add multiple files to the playlist
        tmpfilePlayList = [];   // new Array(n);
        idxFile = 0;
        IsPlaylist = true;
        for (i = 1; i < n; i += 1) {   // loop starts from one as the zero location contains type
            path2 = dropData[i];
            dprint("path2 " + path2 + " ");
            if (validTypes.indexOf(xtn(path2)) >= 0) {
                validFound = 1;
                //add to the temporary play list
                tmpfilePlayList[idxFile] = new FileMedia(path2);
                dprint("Added " + path2 + " to the play list");
                idxFile += 1;
            }
        }
        if (validFound === 1) {
            // drag and drop on the playlist adds to existing list rather than replace altogether
            if (createNewList === 0) {
                // create a new playlist the current size but with the additional elements added - idxfile + playlist.length
                biggerPlayListSize = idxFile + playListfileCount;
                conjoinedPlayList = []; // new Array(biggerPlayListSize);

                // copy all the old elements to the new playlist up to the point where the drop has occurred - dropPosition
                for (i = 0; i < currentDropPosition; i += 1) {   // loop from 0 to the drop point
                    conjoinedPlayList[i] = thePlayList[i];
                    //dprint("*********** 1 conjoinedPlayList[" + i + "] " + conjoinedPlayList[i].sourceURL);
                }

                //if (n === 1) {  // single file
                //  conjoinedPlayList[dropPosition] = tmpfilePlayList[j];
                //} else {

                // drop the new elements at this point - idxfile is the count of the valid items
                j = 0;
                for (i = currentDropPosition; i < (currentDropPosition + idxFile); i += 1) {
                    conjoinedPlayList[i] = tmpfilePlayList[j];
                    j += 1;
                    //dprint("*********** 2 conjoinedPlayList[" + i + "] " + conjoinedPlayList[i].sourceURL);
                }


                // copy the rest of the old elements to the new playlist after the new items have been dropped

                j = currentDropPosition;
                for (i = currentDropPosition + idxFile; i < biggerPlayListSize; i += 1) {
                    if (thePlayList[i] !== null) {
                        conjoinedPlayList[i] = thePlayList[j];
                        //conjoinedPlayList[i] = "";
                        j += 1;
                        //dprint("*********** 3 conjoinedPlayList[" + i + "] " +conjoinedPlayList[i].sourceURL);
                    }
                }

                //dprint("*********** playListfileCount " +playListfileCount);
                playListfileCount = biggerPlayListSize;

                //add to the final play list
                for (i = 0; i < biggerPlayListSize; i += 1) {
                    if (conjoinedPlayList[i] !== null) {
                        thePlayList[i] = conjoinedPlayList[i];
                        //dprint("*********** 4 thePlayList[i] " +thePlayList[i].sourceURL);
                    }
                }

                dprint("playMedia Call no. 8");
                //playMedia(0); // play from the first track in the WMP playlist
                //chunkIndex = 0;
                //chunkIndex = Math.floor(playIndex / chunkSize);

                updatePlayList();
            }
        } else {
            alert("That selection does not contain a music file that the media player can use.");
        }
    }
    //dropPosition = 0;
}
//=====================
//End function
//=====================

//===================================
// function to play a single music file
//===================================
function playFile(fileName) {
    isFolder = false;   //  var isFolder = false;
    dprint("%-I-INFO, playFile");
    dprint(" playFile fileName");
    if (fileName === "" || fileName === null) {
        return;
    }
    playIndex = 0;
    playerState = "single";
    isAudioCD = false;
    WMPlayer.URL = fileName;
    sliderTimer.ticking = true;
    if (preferences.titlePref.value === "filename only") {
        trackNameText.data = "   " + getFileOnly(WMPlayer.URL);
        trackNameShadow.data = "   " + getFileOnly(WMPlayer.URL);
    } else {
        trackNameText.data = "   " + WMPlayer.URL;
        trackNameShadow.data = "   " + WMPlayer.URL;
    }
    //dprint("playMedia Call no. 2");
    dropPosition = 0;
    catchFileDrop(null, fileName);
    setVolumeSlider(Number(preferences.volumePref.value));
    playIndex = 0;
    playButton.visible = false;
    pauseButton.visible = true;
    dprint("%-I-INFO, playFile finished");
}
//=====================
//End function
//=====================

//===================================
// function to read the data from an audio CD into the playlist
//===================================
function playAudioCD(cdDriveName, cdRomPlayList) {
    var i;
    var artist;
    var oCDROM;
    var colPlaylist;
    var objSong;

    // this function is the CD equivalent of readFolderRecursively
    dprint("%-I-INFO, playAudioCD");
    isAudioCD = true;
    isFolder = false;
    IsPlaylist = true;
    playerState = "AudioCD";
    oCDROM = CDROM.Item(cdDriveName);
    colPlaylist = oCDROM.Playlist;
    chunkIndex = 0;

    cdPlaylistTitles = [];  // new Array(cdRomPlayList.count);
    cdPlaylistArtists = []; // new Array(cdRomPlayList.count);
    playListfileCount = cdRomPlayList.count;
    if (playListfileCount !== 0) {
        for (i = 0; i < cdRomPlayList.count; i += 1) {
            if (!colPlaylist.Item(i)) {
                alert("CD drive is having a problem");
            }
            objSong = colPlaylist.Item(i);

            cdPlaylistTitles[i] = objSong.getItemInfo("title");
            cdPlaylistArtists[i] = objSong.getItemInfo("artist");

            thePlayList[i] = cdRomPlayList.Item(i);
            WMPlayer.URL = thePlayList[i].sourceURL;
            //dprint("thePlayList[i].sourceURL " +thePlayList[i].sourceURL);
            dprint("thePlayList[i].sourceURL " +thePlayList[i].sourceURL);
            if (thePlayList[i].sourceURL != "") {                
                artist = trim(cdPlaylistArtists[i]);
            }
            if (artist !== "") {
                artist = ": " + artist;
            }
            dprint("cdPlaylistTitles[i] " +cdPlaylistTitles[i]);
            trackName[i] = i + 1 + " " + trim(cdPlaylistTitles[i]);
        }
    } else {
        alert("CD drive is not loaded");
        return;
    }

    playListTitle.data = "Audio CD Drive " + CDROM.Item(cdRomNo).driveSpecifier;
    dprint("playAudioCD " +WMPlayer.URL);
    if (cdPlaylistArtists[i] != undefined) {                
        dprint("cdPlaylistArtists[i] "+cdPlaylistArtists[i]);
        artist = trim(cdPlaylistArtists[i]);
    }
    if (artist !== "") {
        artist = ": " + artist;
    }

    if (preferences.shuffleStatePref.value === "enabled") {
        //randomPlay();
        hprint("playAudioCD: randomPlay();");
    }

    // provide the track information to the track data above the slider itself
    trackNoText.data = "track " + WMPlayer.currentMedia.name.substring(0, 6);

    dprint("trackNameText.data " + trackNameText.data);

    //trackNameText.data is derived from chosenfolder used during updatePlayList function
    chosenFolder = CDROM.Item(cdRomNo).driveSpecifier + " " + objSong.getItemInfo("AlbumID");
    dprint("playMedia Call no. 4");

    // now it calls the function that actually plays the CD
    playMedia(0);
    //finally it updates the playlist
    updatePlayList();
}
//=====================
//End function
//=====================

//===================================
// function to play currently selected track
//===================================
function playTrack() {
    dprint("%-I-INFO, playTrack");
    if (preferences.scrollingPref.Value === "enabled" ) {
       trackNameText.scrolling = "left";
       trackNameShadow.scrolling = "left";
    }
    if (playListfileCount >= 1) {
        playButton.visible = false;
        pauseButton.visible = true;
        if (WMPlayer.controls.currentPosition === WMPlayer.currentMedia.duration) {
            WMPlayer.controls.currentPosition = 0;
        }
        //dprint("3. WMPlayer.controls.play ");
        masterPlay();
        setVolumeSlider(Number(preferences.volumePref.value));
        playOverride = false;
        positionTimer.ticking = true;
        sliderTimer.ticking = true;
        buildVitality(currIcon, parseInt(percentTextShadow.data, 10), WMPlayer.settings.mute); // build the dock vitality
        dprint("player.currentMedia.duration " + WMPlayer.currentMedia.duration);
    }
}
//=====================
//End function
//=====================

//===================================
// function to add a single track for immediate playing
//===================================
function addSingleTrack(trackType) {
    var fileName;
    var res;

    dprint("%-I-INFO, addSingleTrack");
    if (preferences.soundpref.value === "enabled") {
        //play(winding, false);
    }

    if (trackType === "url") {
        res = inputForm("Remote Media File", "Play", "Cancel");
        if ((res === null) || (res === "http://")) {
            return;
        }
        fileName = encodeURI(res);
        // a validate type check is not strictly required here as the validation is performed within chooseFile
        dprint("fileName " + fileName);
        playOverride = false;               //<< DB01
        playFile(fileName);        
    } else {
        //selectFileToPlay(); // new method
        /*
        fileName = chooseFile(validTypes); //old method
        if (fileName === null) {
            return;
        }
        */
    }
    //chosenFolder = "";
    dprint("%-I-INFO, addSingleTrack finished");
}
//=====================
//End function
//=====================


//===================================
// function to search for a particular track name
//===================================
function searchForTrack() {
    // CTRL+F to search
    // loop through the tracknames as displayed in the playlist
    var trackExtracted, stringPosition, res, i;

    folderWindow.opacity = 0; // workaround to searchForm bug that spontaneously raises the folderWindow
    res = searchForm("Track Search", "Search", "Cancel");
    folderWindow.visible = false; // workaround to searchForm bug
    folderWindow.opacity = 255;   // workaround to searchForm bug

    if ((res === null) || (res === "")) {
        return;
    }

    mainWindow.focus();
    searchString = res;
    searchStringPosition = 0;
    searchString = searchString.toLowerCase();

    //lprint("searchString: " + searchString);
    for (i = 0; i < playListfileCount; i += 1) {
        trackExtracted = getFileOnly(thePlayList[i].sourceURL);
        trackExtracted = trackExtracted.toLowerCase();
        stringPosition = trackExtracted.lastIndexOf(searchString);
        if (stringPosition >= 0) {
            folderWindow.opacity = 255;
            //lprint("trackExtracted: " + trackExtracted);
            //lprint("stringPosition: " + stringPosition);
            playIndex = i;
            searchStringPosition = i;
            chunkIndex = Math.floor(playIndex / chunkSize);
            updatePlayList();
            busyStop();
            // stops any busy timer that may be running when each track is selected
            playMedia(playIndex);
            return;
        }
        searchStringPosition = 0;
    }


    if (searchStringPosition === 0) {
        alert("There are no occurrences of " + searchString + " in your current playlist, " + String.fromCharCode(13) + "press CTRL+F to perform a new search.", "OK");
        mainWindow.focus();
    }
}
//=====================
//End function
//=====================


//===================================
// function to search for a particular track name
//===================================
function searchSameTrack() {
    // F3 to search
    // loop through the tracknames as displayed in the playlist
    // uses searchString and searchStringPosition to continue the search
    var trackExtracted, stringPosition, i;

    if ((searchString === null) || (searchString === "")) {
        return;
    }
    for (i = searchStringPosition + 1; i < playListfileCount; i += 1) {
        trackExtracted = getFileOnly(thePlayList[i].sourceURL);
        trackExtracted = trackExtracted.toLowerCase();
        stringPosition = trackExtracted.lastIndexOf(searchString);
        if (stringPosition >= 0) {
            //lprint("trackExtracted: " + trackExtracted);
            //lprint("stringPosition: " + stringPosition);
            playIndex = i;
            searchStringPosition = i;
            chunkIndex = Math.floor(playIndex / chunkSize);
            updatePlayList();
                busyStop();
            // stops any busy timer that may be running when each track is selected
            playMedia(playIndex);
            return;
        }
        searchStringPosition = 0;
    }
    if (searchStringPosition === 0) {
        alert("There are no more occurrences of " + searchString + String.fromCharCode(13) + " in your current playlist, press F3 to search from the top or CTRL+F to perform a new search.", "OK");
        mainWindow.focus();
        //play(mistake, false);
    }
}
//=====================
//End function
//=====================


//===================================
// function to select the previous track
//===================================
function previousTrack() {
    dprint("%-I-INFO, previousTrack");
    positionTimer.ticking = false;
    playOverride = false;
    //dprint("playListfileCount " +playListfileCount);
    //dprint("playIndex " +playIndex);
    //dprint("playerState " +playerState);
    if (preferences.scrollingPref.Value === "enabled" ) {
       trackNameText.scrolling = "left";
       trackNameShadow.scrolling = "left";
    }
    if (!WMPlayer.URL) {
        return;
    }
    if (playerState === "single") {
        //dprint("4. WMPlayer.controls.play ");
        masterPlay();
        setVolumeSlider(Number(preferences.volumePref.value));
        positionTimer.ticking = true;
        sliderTimer.ticking = true;
        return;
    }
    if (playIndex > 0) {
        playIndex -= 1;
        if (playIndex % chunkSize === (chunkSize - 1)) {
            chunkIndex = Math.floor(playIndex / chunkSize);
            updatePlayList();
        }
    } else {
        playIndex = playListfileCount - 1;
        chunkIndex = Math.ceil(playListfileCount / chunkSize) - 1;
        updatePlayList();
    }
    dprint("playMedia Call no. 5");
    playMedia(playIndex);
    //dprint("WMPlayer.URL" + WMPlayer.URL);
    positionTimer.ticking = true;
}
//=====================
//End function
//=====================

//===================================
// function to select the next track
//===================================
function nextTrack() {
    dprint("%-I-INFO, nextTrack");
    positionTimer.ticking = false;
    playOverride = false;
    if (preferences.scrollingPref.Value === "enabled" ) {
       trackNameText.scrolling = "left";
       trackNameShadow.scrolling = "left";
    }
    if (!WMPlayer.URL) {
        return;
    }
    if (playerState === "single") {
        //dprint("5. WMPlayer.controls.play ");
        masterPlay();
        setVolumeSlider(Number(preferences.volumePref.value));
        positionTimer.ticking = true;
        return;
    }
    if (playIndex + 1 < playListfileCount) {
        playIndex += 1;
        if (playIndex % chunkSize === 0) {
            chunkIndex = Math.floor(playIndex / chunkSize);
            updatePlayList();
        }
    } else {
        playIndex = 0;
        chunkIndex = 0;
        updatePlayList();
    }
    dprint("playMedia Call no. 6");
    playMedia(playIndex);
//  positionSliderperc = 0;
//  dprint("WMPlayer.URL" + WMPlayer.URL);
    positionTimer.ticking = true;
}
//=====================
//End function
//=====================

//===================================
// function to shuffle the play list or file list
//===================================
function toggleRandomPlay() {
    dprint("%-I-INFO, toggleRandomPlay");

    if (preferences.shuffleStatePref.value === "disabled") {
        preferences.shuffleStatePref.value = "enabled";
       //dprint("1. ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ preferences.shuffleStatePref.value " + preferences.shuffleStatePref.value);

        pipesRight.src = "Resources/pipesRightClicked.png";
        dprint("toggling the random state to " + preferences.shuffleStatePref.value);
        if (preferences.tooltipPref.value === "enabled") {
            pipesRight.tooltip = "pulled out - shuffle is now enabled";
        } else {
            pipesRight.tooltip = "";
        }
        randomPlay();
    } else { //preferences.shuffleStatePref.value = "enabled"
        //dprint("2. ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ preferences.shuffleStatePref.value " + preferences.shuffleStatePref.value);
        pipesRight.src = "Resources/pipesRight.png";
        preferences.shuffleStatePref.value = "disabled";
        dprint("toggling the random state to " + preferences.shuffleStatePref.value);
        if (preferences.tooltipPref.value === "enabled") {
            pipesRight.tooltip = "pushed in - shuffle is now disabled";
        } else {
            pipesRight.tooltip = "";
        }

        if (!isAudioCD) {
            readFolderRecursively(path);  //only re-read the default folder when not a CD
        } else {
            if (CDROMcount !== 0) {
                playAudioCD(0, CDROM.Item(cdRomNo).Playlist);
            }
        }

        updatePlayList();
    }
    if (preferences.soundpref.value === "enabled") {
        play(lock, false);
    }
}
//=====================
//End function
//=====================

//===================================
// function to resize using mousewheel + CTRL key as per Firefox
//===================================
function capMouseWheel(event) {
    var size = Number(preferences.maxWidthPref.value),
        maxLength = Number(preferences.maxWidthPref.maxLength),
        minLength = Number(preferences.maxWidthPref.minLength),
        ticks = Number(preferences.maxWidthPref.ticks),
        step = Math.round((maxLength - minLength) / (ticks - 1));


    if (event.scrollDelta > 0) {
        if (preferences.MouseWheelPref.value === "up") {
            size -= step;
            if (size < minLength) {
                size = minLength;
            }
        } else {
            size += step;
            if (size > maxLength) {
                size = maxLength;
            }
        }
    } else if (event.scrollDelta < 0) {
        if (preferences.MouseWheelPref.value === "up") {
            size += step;
            if (size > maxLength) {
                size = maxLength;
            }
        } else {
            size -= step;
            if (size < minLength) {
                size = minLength;
            }
        }
    }
    preferences.maxWidthPref.value = String(size);
    //screenwrite("using mousewheel");
    resize();
}
//=====================
//End function
//=====================

//===================================
// function to capture a mousewheel event
//===================================
pipes.onMouseWheel = function (event) {
    if (event.ctrlKey) {
        capMouseWheel(event);    //this event is not captured in the Xwidget version
    } else {
        sliderSetOnMouseWheel(event);
    }
};
//=====================
//End function
//=====================

//===================================
//  function to select the next page
//===================================
function nextChunkClick() {
    var totalChunks = Math.ceil(playListfileCount / chunkSize);

    dprint("%-I-INFO, nextChunkClick");
//  trackIndex = 1;
    if (preferences.soundpref.value === "enabled") {
        play(keypress, true);
    }
    if (chunkIndex < totalChunks - 1) {
        chunkIndex = chunkIndex + 1;
    } else {
        play(mistake, false);
    }

    dprint("chunkIndex " + chunkIndex);
//  dprint("trackIndex " + trackIndex);
    updatePlayList();
}
//=====================
//End function
//=====================

//===================================
//  function to select the previous page
//===================================
function prevChunkClick() {
    dprint("%-I-INFO, prevChunkClick");
    if (preferences.soundpref.value === "enabled") {
        play(keypress, true);
    }
    if (chunkIndex > 0) {
        chunkIndex = chunkIndex - 1;
//      dprint("trackIndex " + trackIndex);
        updatePlayList();
    }
}
//=====================
//End function
//=====================

//===========================================
// Function to slide the volume slider according to mouse scrollwheel position
//===========================================
function playlistFrameOnMouseWheel(event) {
    var delta = event.scrollDelta;

    if (preferences.mouseWheelScrollingPref.value === "up") {
        if (delta > 0) {
            nextChunkClick();
        } else if (delta < 0) {
            prevChunkClick();
        }
    } else {
        if (delta < 0) {
            nextChunkClick();
        } else if (delta > 0) {
            prevChunkClick();
        }
    }
}
//=====================
//End function
//=====================

//===================================
// function to capture a mousewheel event
//===================================
playlistFrame.onMouseWheel = function (event) {
    if (event.ctrlKey) {
        capMouseWheel(event);    //this event is not captured in the Xwidget version
    } else {
        playlistFrameOnMouseWheel(event);
    }
};
//=====================
//End function
//=====================


// DB05
//===================================
// function to delete a selected track
//===================================
function deleteTrack(trackNoToDelete) {
    var i, j;
    var newPlayListSize;

    // modify the drop position to take into account the page number
    trackNoToDelete = trackNoToDelete + (chunkSize * chunkIndex);
    //alert("deleting trackNoToDelete " + trackNoToDelete);

    // create a new playlist the current size but with the element removed
    newPlayListSize = playListfileCount - 1;
    var denudedPlayList = [];   // new Array(newPlayListSize);

    //dprint("%deleteTrack newPlayListSize " +newPlayListSize);

    // copy all the old elements to the new playlist up to the point where the deletion has occurred - trackNoToDelete
    for (i = 0; i < trackNoToDelete; i += 1) {   // loop from 0 to the drop point
        denudedPlayList[i] = thePlayList[i];
        //dprint("*********** 1 denudedPlayList[" + i + "] " + denudedPlayList[i].sourceURL);
    }
    // copy the rest of the old elements to the new playlist after the new items have been dropped
    j = trackNoToDelete + 1;
    for (i = trackNoToDelete; i < newPlayListSize; i += 1) {
        if (thePlayList[i] !== null) {
            denudedPlayList[i] = thePlayList[j];
            //denudedPlayList[i] = "";
            j += 1;
        }
    }

    //dprint("*********** playListfileCount " +playListfileCount);
    playListfileCount = newPlayListSize;

    //add to the final play list
    for (i = 0; i <= newPlayListSize; i += 1) {
        if (denudedPlayList[i] !== null) {
            thePlayList[i] = denudedPlayList[i];
            //dprint("*********** 4 thePlayList[i] " +thePlayList[i].sourceURL);
        }
    }

    dprint("playMedia Call no. 8");
    //playMedia(0); // play from the first track in the WMP playlist
    //chunkIndex = 0;

    updatePlayList();
}
//=====================
//End function
//=====================


//===========================================
// function to accept a file on drag and drop
//===========================================
playlistFrame.onDragDrop = function (/*event*/) {
    hprint("playlistFrame.onDragDrop");
};
//=====================
//End function
//=====================

//===========================================
// function to accept a file on drag and drop
//===========================================
pipes.onDragDrop = function (/*event*/) {
    hprint("pipes.onDragDrop");

};
//=====================
//End function
//=====================

//===========================================
// this function opens Google to search using the track name
//===========================================
trackNameText.onMultiClick = function () {
    dprint("%-I-INFO, trackNameText.onMultiClick");
    //if (debugFlg === "1") {dprint("trackNameText.data " + trackNameText.data);};
    var searchTrack = getFileOnly(trackNameText.data);
    //if (debugFlg === "1") {dprint("searchTrack " + searchTrack);};
    var answer = alert("This opens a browser window and searches the internet for this track name: " + String.fromCharCode(13) + searchTrack + String.fromCharCode(13) + "                            Do you wish to proceed?                         ", "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("https://www.google.co.uk/search?q=" + searchTrack);
        //openURL("https://www.google.co.uk/?gws_rd=ssl#q=" + searchTrack);
    }
};
//=====================
//End function
//=====================

//===========================================
// this function serves to cause the icon to change on a mouseover only, the multiclick event does not change the mouse over icon
//===========================================
trackNameText.onMouseDown = function () {
    dprint("%-I-INFO, trackNameText.onMouseDown");
};
//=====================
//End function
//=====================

//=====================
// functions to add hover over effects to the items in the playlist
//=====================
playListTitle.onMouseEnter = function () {
    if (preferences.scrollingPref.Value === "enabled" ) {
       playListTitle.scrolling = "left";
    }
};
//=====================
//End mouse enter function
//=====================


//DB05
//===================================
// functions to capture onDrag
//===================================
playListText.forEach(function (ele, i) {
    ele.onMouseDrag = function () {  // this event occurs regardless of a drag actually occuring which is bloody annoying
        //hprint("drag in progress");
        dragPosition = i;
        dragDropFlg = 1;

    };
});
//=====================
//End functions
//=====================
//DB05

//===================================
// functions to capture real external onDragDrops
//===================================
playListText.forEach(function (ele, i) {
    ele.onDragDrop = function (event) {
        dropPosition = i;
        catchFileDrop(event, null);
    };
});


//=====================
//End functions
//=====================




//=====================
// functions to add hover over effects to the items in the playlist
//=====================
playListText.forEach(function (ele, i) {
    ele.onMouseEnter = function () {
        ele.style.fontSize = (parseInt(fontDefault) + 1.49) * scale + "px";
        dropPosition = i;   // DB05 to allow internal drop
        if (dragDropFlg === 1 && trackClickedFlg === 1) {  // this is instead of a drag indicator as the drag event always occurs
            //current track name being dragged
            savedReplacedTrack = playListText[i].data;
            playListText[i].data = partlySelectedTrack.toLowerCase();
            // the YWE does it differently as it can modify the background, the Xwidget has three different layers that it makes visible
            if (i !== playIndex) {
              ele.style.backgroundColor = "rgba(0,0,0,0.06)"; //style it with a slight grey background
            }
        } else {              // normal usage for a simple hover
            if (playListText[i].data !== "") {
            	deleteButton[i].opacity = 255;
            }
        }
    };
});
//=====================
//End mouse enter functions
//=====================

//=====================
// function to show the track title back into normal state
//=====================
playListText.forEach(function (ele, i) {
    ele.onMouseExit = function () {
         ele.style.fontSize = (fontDefault) * scale + "px";
         deleteButton[i].opacity = 1;
         if (dragDropFlg === 1 && trackClickedFlg === 1) {  // this is instead of a drag indicator as the drag event always occurs
              //hprint("dragPosition " + dragPosition);
              //current track name being dragged
              playListText[i].data = savedReplacedTrack.toLowerCase();
              ele.style.backgroundColor = "transparent"; //unstyle it
              highlightSelectedTrack();
         }
         if (dragDropFlg === 1 && trackClickedFlg === 1 && dragPosition === i) {
              fullTrackNameToDrop = fullTrackName[dragPosition + (chunkSize * chunkIndex)];
              deleteTrack(i);
         }
    };
});

//=====================
//End mouse exit functions
//=====================

//=====================
// functions to set the background on the single-clicked tracks
//=====================
playListText.forEach(function (ele, i) {
    ele.onMouseDown = function (event) {
        if (event.ctrlKey) {
            ctrlPressed = 1;
        }
        //dprint("%ctrlPressed " + ctrlPressed);
        busyStop();
        // stops any busy timer that may be running when each track is selected
        dragPosition = i;   // this undoes any previous internal drag/drop operation
        dropPosition = i;   // this undoes any previous internal drag/drop operation
        trackClickedFlg = 1;      // this fires even on a right mouse click
        removePlayListStyling();
        ele.style.backgroundColor = "rgba(0,0,0,0.06)"; //style it with a slight grey background
        // selected but not running track
        partlySelectedFullTrack = fullTrackName[i + (chunkSize * chunkIndex)];
        partlySelectedTrack = trackName[i + (chunkSize * chunkIndex)];
        // when there is no tracklist selected the extracted data may be undefined - the xwidget engine does not like
        // working with undefined variables whereas the YWE is OK. This next line sorts this in the Xwidget.
        // if (typeof partlySelectedTrack === 'undefined' ) {
        //   partlySelectedTrack = "";
        // } else {
          // this sorts out the problem with a right click (after clearing the playlist) in Xwidget a right click mistakenly generates a click event
          // checking if the partlySelectedTrack has a value before setting the drag drop flag
          dragDropFlg = 1;
        // }
        savedReplacedTrack = partlySelectedTrack;
        highlightSelectedTrack();
    };
});
//=====================
//  END function
//=====================

//=====================
// functions to play a selected track when a playlist member is double-clicked
//=====================
playListText.forEach(function (ele, i) {
    ele.onMulticlick = function (event) {
        if (event.ctrlKey) {
            ctrlPressed = 1;
        }
        playIndex = i + (chunkSize * chunkIndex);
//      trackIndex = i + 1;
        startupFlg = 0;
        playOverride = false;
        if (preferences.scrollingPref.Value === "enabled" ) {
           trackNameText.scrolling = "left";
           trackNameShadow.scrolling = "left";
        }
        positionTimer.ticking = true;
        playMedia(playIndex);
    };
});
//=====================
//End mouse multi click functions
//=====================

//=====================
// functions to to allow internal drop of items in the playlist
//=====================
playListText.forEach(function (ele) {
    ele.onMouseUp = function () {

       if (trackClickedFlg === 1 && (dragPosition === dropPosition)) {
            dragDropFlg = 0;
       }

       if (dragPosition !== dropPosition) {
           if (dragDropFlg === 1 && trackClickedFlg === 1) {  // this is instead of a drag indicator as the drag event always occurs
                //dprint("%-I-INFO, DROPPING to dragPosition " + dragPosition);
                if (dragPosition > dropPosition) {  // dragging upward
                    deletePosition = dragPosition + 1; // takes it in absolute value and calculates the relative position itself
                } else {  // dragging downward
                    deletePosition = dragPosition;
                    dropPosition = dropPosition; // this allows the track to be dropped at the expected track location
                }
                // use current catch drop to drag to new position using details supplied
                catchFileDrop(null,fullTrackNameToDrop);  // we calculate it ourselves here

                if ((dropPosition < playIndex) && (dragPosition > playIndex)) {
                     playIndex = playIndex + 1;
                }
                trackClickedFlg = 0;
                dragDropFlg = 0;       // cancel the internal drop
            }
       }

       dragDropFlg = 0;       // cancel the internal drop
       //removePlayListStyling();   //dean
       highlightSelectedTrack();
    };
});
//=====================
//End mouse enter functions
//=====================
// DB05



//===========================================
// this function provides the mouse over icon change.
//===========================================
playListTitle.onClick = function () {
    // do not remove this empty function it has a purpose...
    return;
};
//=====================
//End function
//=====================

//===========================================
// this function opens explorer to view the folder
//===========================================
playListTitle.onMultiClick = function () {
    var targetFullPath;

    dprint("%-I-INFO, trackNameText.onMultiClick");
    if (!isAudioCD) {
        if (preferences.tooltipPref.value === "enabled") {
            playListTitle.tooltip = playListTitle.data;
        } else {
            playListText0.tooltip = "";
        }

        targetFullPath = convertPathToPlatform(playListTitle.data) + "/";
        if (filesystem.itemExists(targetFullPath)) {
            //dosCommand = "Explorer.exe /e, /select," + targetFullPath;
            filesystem.reveal(targetFullPath);
        }
    }
};
//=====================
//End function
//=====================

//=====================
// function to show the playlist title back into normal state
//=====================
playListTitle.onMouseExit = function () {
    playListTitle.scrolling = "off";
};
//=====================
//End function
//=====================

//===================================
//  function to select the previous page
//===================================
prevChunk.onMouseDown = function () {
    prevChunkClick();
};
//=====================
//End function
//=====================

//===================================
// function to handle the multiclick - this seems unnecessarily duplicated but it simply overrides the double click for the whole widget
//===================================
prevChunk.onMulticlick = function () {
    prevChunkClick();
};
//=====================
//End function
//=====================

//===================================
//  function to select the next page
//===================================
nextChunk.onMouseDown = function () {
    nextChunkClick();
};
//=====================
//End function
//=====================

//===================================
// function to handle the multiclick - this seems unnecessarily duplicated but it simply overrides the double click for the whole widget
//===================================
nextChunk.onMulticlick = function () {
    nextChunkClick();
};
//=====================
//End function
//=====================

//===================================
//  function to select the first page
//===================================
firstChunk.onMouseDown = function () {
    dprint("%-I-INFO, firstChunk.onMouseDown");
//  trackIndex = 1;
    if (preferences.soundpref.value === "enabled") {
        play(keypress, true);
    }
    chunkIndex = 0;
//  dprint("firstChunk trackIndex " + trackIndex);
    updatePlayList();
};
//=====================
//End function
//=====================

//===================================
//  function to select the last page
//===================================
lastChunk.onMouseDown = function ()
{
    var totalChunks = Math.ceil(playListfileCount / chunkSize);
    dprint("%-I-INFO, lastChunk.onMouseDown");
    dprint("playListfileCount " + playListfileCount);
    dprint("chunkSize " + chunkSize);
    dprint("totalChunks " + totalChunks);
    if (preferences.soundpref.value === "enabled") {
        play(keypress, true);
    }
    chunkIndex = totalChunks - 1;
    updatePlayList();
};
//=====================
//End function
//=====================

//=================================
// Function to search for tracks
//=================================
ovalButton.onMouseDown = function () {
    if (preferences.soundpref.value === "enabled") {
        play(winding, true);
    }
    searchForTrack();
};
//=================================
// end function
//=================================

//=================================
// Function to control tooltips
//=================================
tap.onMouseDown = function () {
    dprint("%-I-INFO, tap.onMouseDown");
    play(steamSound, false);
    if (preferences.tooltipPref.value === "enabled") {
        preferences.tooltipPref.value = "disabled";
    } else {
        preferences.tooltipPref.value = "enabled";
    }
    settooltip();
};
//=================================
// end function
//=================================

//===================================
// function to make the buttons visible when the mouse is on the playlist
//===================================
playlistFrame.onMouseEnter = function () {
    //if (debugFlg === "1") { dprint("%-I-INFO, playlistFrame.onMouseEnter");}
    buttonOpacity();
};
//=====================
//End function
//=====================

//===================================
// function to fade the playlist buttons when the mouse is not on the playlist
//===================================
playlistFrame.onMouseExit = function () {
    //if (debugFlg === "1") {dprint("%-I-INFO, playlistFrame.onMouseExit");}
    if (preferences.playListKeysPref.value === "fade") {
        fadeTimer.ticking = true;
    }
      dragDropFlg = 0; // cancelling the drag/dtop flag anywhere I can
};
//=====================
//End function
//=====================

//===================================
// function to animate the chain and activate the playlist
//===================================
function chainAction() {
    dprint("%-I-INFO, chainAction");
    chain.voffset = chain.voffset + (20 * scale);
    play(creturn, false);
    sleep(100);
    //chain.voffset = chain.voffset - (20 * scale);
    chain.voffset = chainvoffsetDefault * scale;
    // retained as the above voffset calculation is an approx. that causes placement problems

    if (playlistFrame.visible) {
        playlistFrame.visible = false;
        deleteLayer.visible = false;
        preferences.playListPref.value = "disabled";
    } else {
        playlistFrame.visible = true;
        deleteLayer.visible = true;
        preferences.playListPref.value = "enabled";
        // if the playlist needs to be refreshed
        if (chosenFolder === "") {
            chosenFolder = preferences.musicFolderPref.value;
            dprint("*****************chosenFolder " + chosenFolder);
            //readFolderRecursively(chosenFolder);
            //updatePlayList();
        }
    }
}
//=====================
//End function
//=====================

//===================================
// function to handle multiclick on the chain pull
//===================================
chain.onMulticlick = function () {
    chainAction();               // this seems unnecessarily duplicated but it simply overrides the double click for the whole widget
};
//=====================
//End function
//=====================

//===================================
// function to handle a single click on the chain pull
//===================================
chain.onMouseDown = function () {
    chainAction();
};
//=====================
//End function
//=====================


//========================================
// Function to parse an XSPF playlist file
//========================================
function parseXSPFFile(filename) {
    var data = filesystem.readFile(filename, false);
    var dom;
    var items;
    var i;
    var file;
    var playlist = {};
    var files;
    var idx;

    try {
        dom = XMLDOM.parse(data);
    } catch (e) {
        hprint("XMLDOM.parse error: " + e);
        alert("XMLDOM.parse error: " + e);
        return null;
    }

    items = dom.evaluate("playlist/trackList/track");
    if (items !== null) {
        playlist.filecount = items.length;
        playlist.files = [];
        files = playlist.files;
        for (i = 0; i < items.length; i += 1) {
            file = items.item(i).evaluate("string(location)").replace("file://", "");
            files.push(file);
        }
        idx = files[0].lastIndexOf("/");
        playlist.path = files[0].substring(0, idx).replace("file://", "");
    } else {
        hprint("DOM.evaluate error: rss/channel/file");
        alert("DOM.evaluate error: rss/channel/file");
        return null;
    }

    return playlist;
}
//=====================
//End function
//=====================

//=======================================
// Function to parse an XML playlist file
//=======================================
function parseXMLFile(filename) {
    var data = filesystem.readFile(filename, false);
    var dom;
    var items;
    var i;
    var file;
    var playlist = {};
    var files;

    try {
        dom = XMLDOM.parse(data);
    } catch (e) {
        hprint("XMLDOM.parse error: " + e);
        alert("XMLDOM.parse error: " + e);
        return null;
    }

    items = dom.evaluate("rss/channel");
    if (items !== null) {
        playlist.filecount = Number(items.item(0).evaluate("string(filecount)"));
        playlist.path = items.item(0).evaluate("string(path)");
    } else {
        hprint("DOM.evaluate error: rss/channel");
        alert("DOM.evaluate error: rss/channel");
        return null;
    }

    items = dom.evaluate("rss/channel/file");
    if (items !== null) {
        playlist.files = [];
        files = playlist.files;
        for (i = 0; i < items.length; i += 1) {
            file = items.item(i).firstChild.data;
            files.push(file);
        }
    } else {
        hprint("DOM.evaluate error: rss/channel/file");
        alert("DOM.evaluate error: rss/channel/file");
        return null;
    }

    return playlist;
}
//=====================
//End function
//=====================

//==========================================================
// Function to open an XML or XSPF playlist file for reading
//==========================================================
function readSiteRecords(xspf) {    // boolean xspf
    var filename, playlist, files;
    var validSuffix = [".xml", "XML"];

    dprint("%-I-INFO, readSiteRecords");

    if (xspf) {
        validSuffix = [".xspf", "XSPF"];
    }

    chunkIndex = 0;

    isAudioCD = false;

    filename = chooseFile(validSuffix);
    if (filename === null) {
        return;
    }

    if (validSuffix.indexOf(xtn(filename)) === -1) {
        return;
    }

    playlist = (xspf)
        ? parseXSPFFile(filename)
        : parseXMLFile(filename);

    chosenFolder = playlist.path;
    playListfileCount = Number(playlist.filecount);
    files = playlist.files;

    lprint("readSiteRecords: " + chosenFolder + ", " + playListfileCount);

    thePlayList = [];

    files.forEach(function (ele) {
        thePlayList.push(new FileMedia(ele));
    });

    updatePlayList();
    alert("Playlist  \"" + filename + "\" read successfully.");
}
//=================================
// end function
//=================================

//=========================================
// Function to write XSPF records to a file
//=========================================
function writeXSPFRecords(XSPFpath, dict) {
    var head = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<playlist version=\"1\" xmlns=\"http://xspf.org/ns/0/\">\n<trackList>\n",
        tail = "</trackList>\n</playlist>\n",
        body = "",
        output;

    lprint("writeRecords: " + XSPFpath + ", " + dict.length);

    dict.forEach(function (ele) {
        if (ele.trackPath.indexOf("http://") === 0) {
            body += "<track><location>" + ele.trackPath.replace(/&/g, "&amp;") + "</location></track>\n";
        } else {
            body += "<track><location>" + "file://" + ele.trackPath.replace(/&/g, "&amp;") + "</location></track>\n";
        }
    });

    output = head + body + tail;
    if (!isMacintosh) {
        output = output.replace(/\n/g, "\r\n");
    }

    filesystem.writeFile(XSPFpath, output);
}
//=================================
// end function
//=================================

//=================================
// Function to write XML records to a file
//=================================
function writeXMLRecords(XMLpath, dict) {
    var head = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<rss version=\"2.0\">\n<channel>\n",
        tail = "</channel>\n</rss>\n",
        body = "",
        output;

    lprint("writeRecords: " + XMLpath + ", " + dict.length);

    body += "<filecount>" + playListfileCount + "</filecount>\n";
    body += "<path>" + path.replace(/&/g, "&amp;") + "</path>\n";

    dict.forEach(function (ele) {
        body += "<file>" + ele.trackPath.replace(/&/g, "&amp;") + "</file>\n";
    });

    output = head + body + tail;
    if (!isMacintosh) {
        output = output.replace(/\n/g, "\r\n");
    }

    filesystem.writeFile(XMLpath, output);
}
//=================================
// end function
//=================================

//=================================================
// Function to open an XML or XSPF file for writing
//=================================================
function writeSiteRecords(xspf) {   // boolean xspf
    var dict = [], savePath;
    var validSuffix = [".xml", ".XML"];

    dprint("%-I-INFO, writeSiteRecords");

    if (xspf) {
        validSuffix = [".xspf", "XSPF"];
    }

    //savePath = saveAs();    // don't want this as it does not allow a display of valid types in the dialog box
    savePath = chooseFile(validSuffix);  // this is superior as it only displays files valid suffixes which avoids confusion

    if (savePath === null) {    // user cancelled
        return;
    }

    hprint("savePath: " + savePath);

    if (xtn(savePath) === null) {   // user did not supply a suffix
        savePath += (xspf)
            ? ".xspf"
            : ".xml";
    }

    if (validSuffix.indexOf(xtn(savePath)) === -1) {
               alert("Invalid file type, please ensure your output file has " + validSuffix + " as the suffix.");
        return;
    }

    thePlayList.forEach(function (ele) {
        var item = {};
        item.trackPath = convertPathToPlatform(ele.sourceURL);
        dict.push(item);
    });

    if (xspf) {
        writeXSPFRecords(savePath, dict);
    } else {
        writeXMLRecords(savePath, dict);
    }
    alert("Playlist  \"" + savePath + "\" written successfully.");
}
//=================================
// end function
//=================================

//=================================
// Function to open a file
//=================================
oButton.onMouseDown = function (event) {
    if (preferences.soundpref.value === "enabled") {
        //play(winding, true);
    }
    readSiteRecords(event.altKey);
};
//=================================
// end function
//=================================

//=================================
// Function to stop the hour glass
//=================================
busy.onMouseDown = function () {
    busyStop();
};
//=================================
// end function
//=================================

//=================================
// Function to save a file
//=================================
sButton.onMouseDown = function (event) {
    if (preferences.soundpref.value === "enabled") {
        play(winding, true);
    }
    writeSiteRecords(event.altKey);
};
//=================================
// end function
//=================================

//=================================
// Function to open and select a folder on speaker click
//=================================
speaker.onMouseUp = function () {
//print("preferences.currentMusicFolderPref.value"+preferences.currentMusicFolderPref.value);
    //print(">>>>>>>>>>>>>>>> chosenFolder"+chosenFolder);
    preferences.currentMusicFolderPref.value = chosenFolder;
    
    
    fileSystemElementSelected.data = chosenFolder;  //required line prior to readFolderList
    currentFolder = chosenFolder;                   //required lines prior to readFolderList
    fsElementToFind = "folder";                     //required lines prior to readFolderList
    readFolderList(chosenFolder) ;
    
    selectFolderToPlay();
    
    
};
//=================================
// end function
//=================================


//=================================
// Function to open a folder, read it and then play the contents
//=================================
function openFolderToPlay() {
   var o;

   if (chosenFolder === "") {
    	chosenFolder = chooseFolder("");    //YWE function
    }
    path = chosenFolder;
    hprint(">>>>> chosenFolder " +chosenFolder);
    if (chosenFolder !== null) {
        playerState = "folder"; //this is to ensure that shuffle mode is respected
        //  If it is a drive top folder chosen C:\ or d:\ for example
        if (chosenFolder.length <= 3 && chosenFolder.substr(1, 1) === ":") {
            o = chosenFolder.substr(0, 2);
            if (CDROMcount !== 0) {
                if (o === CDROM.Item(cdRomNo).driveSpecifier) {
                    cdMenuItem.caption = "Audio CD Drive (" + CDROM.Item(cdRomNo).driveSpecifier + ")"; //this line does nothing, it should...
                    playAudioCD(0, CDROM.Item(cdRomNo).Playlist);
                } else {
                    stateRoot();
            		speaker.onMouseUp();
                }
            } else {
	            stateRoot();
            }
        } else {
            readFolderRecursively(chosenFolder);
            saveFolder(chosenFolder);         // essential to rebuild the menu
            updatePlayList();
            setmenu();                        // rebuild the menu            
        }
    }
}


//=================================
// Function to tell the user about root limitations
//=================================
function stateRoot() {
	var answer = alert("Player needs a folder not a drive root. If you need to know more press the HELP", "OK", "Help");
	if (answer === 2) {
	   alert("Does not allow selection of a drive root because there is a memory limit on the number of files that can be recursively searched through, instead please select a folder containing your music.");
	}	
}
//=================================
// end function
//=================================
 

//=================================
// Function to perform on unloading the widget
//=================================
widget.onUnload = function () {
    sliderTimer.ticking = false;
    positionTimer.ticking = false;
    WMPlayer = null;
};
//=================================
// end function
//=================================

//=================================
// Function unused, an Xwidget function that could be needed if WMP disconnects
//=================================
function wmpCheckCoreOnUpdate() { // would need a timer to operate
//  var WMPlayer;

    if (WMPlayer === null) {
        //   checking ActiveX access to the windows media player every 2 secs
//      WMPlayer = COM.createObject("wmplayer.ocx");
        WMPlayer = COM.createObject("{6BF52A52-394A-11d3-B153-00C04F79FAA6}");
        COM.connectObject(WMPlayer, "WMP_");
        //alert("IMPORTANT Widget reconnected WMPlayer.");
    }
}
//=================================
// end function
//=================================

//===================================
// functions group to make the deletion taps appear
//===================================
deleteButton.forEach(function (ele, i) {
    ele.onMouseEnter = function () {
        //ele.opacity = 255;
        //dprint("playListText[i].data " + playListText[i].data);
        if (playListText[i].data !== "") {
          ele.opacity = 255;
          ele.tooltip = "Click to delete track " + (i + 1) + " - " + playListText[i].data;
        } else {
          ele.tooltip = "";
        }
    };
});

//=====================
//End functions group
//=====================

//===================================
// functions group to make the deletion taps disappear
//===================================
deleteButton.forEach(function (ele) {
    ele.onMouseExit = function () {
        ele.opacity = 1;
    };
});

//=====================
//End functions group
//=====================

//===================================
// functions group to delete when clicking on a tap
//===================================
deleteButton.forEach(function (ele, i) {
    var answer;

    ele.onMouseDown = function () {
        var trackNoToDelete = i;
        if (playListText[i].data !== "") {
           answer = alert("Removing this track from the playlist " + trackName[(trackNoToDelete + (chunkSize * chunkIndex))] + String.fromCharCode(13) + String.fromCharCode(13) + " Are you sure?  ", "Yes Please", "No Thanks");
           if (answer === 1) {
              deleteTrack(i);
           }
        }
    };
});
//=====================
//End functions group
//=====================

//=======================
// bottom key face toggle
//=======================
buttonConfig.onMouseDown = function () {
    play(lock, false);
    if (preferences.playListKeysPref.value === "fade") {
        preferences.playListKeysPref.value = "solid";
        fadeTimer.ticking = false;
    } else {
        preferences.playListKeysPref.value = "fade";
        fadeTimer.ticking = true;
    }
};
//=====================
//End function
//=====================

//===============================================================
// this function restarts the widget when preferences are changed
//===============================================================
function changePrefs() {
    updateTimer.ticking = isMacintosh && (preferences.qtAllowPref.value === "1");
    if (isMacintosh) {
        miniaturize = (preferences.qtMiniaturizePref.value === "1");
    } else {
        wmpAllowApp = parseFloat(preferences.wmpAllowPref.value === "1");
    }

    lprint("preferences Changed");
    restrictRootFolder();

    savePreferences();
    sleep(1000);
    startup();
}
//=====================
//End function
//=====================

//==========================================================
// this function enables the QT Player to update the widget.
//==========================================================
updateTimer.onTimerFired = function () {
    var playing = WMPlayer.settings.playing;
    var mute = WMPlayer.settings.mute;
    var volume = WMPlayer.settings.volume;
    var duration = WMPlayer.currentMedia.duration;
    var position = WMPlayer.controls.currentPosition;
    var progressRatio = position / duration;
    var volPercent = Math.round(volume);
    var atEnd = (duration === position);

    // local functions

    // set the progress slider position
    function setProgressSlider() {
        positionSlider.hOffset = (65 * scale + positionSlider.width) * progressRatio + 55 * scale;
    }

    //
    function trackVolumeSlider() {
        sliderSet.hOffset = bar.hoffset + 25 * scale + volume * 1.05 * scale;
        percentTextShadow.data = volPercent + "%";
        percentText.data = volPercent + "%";
        stretchCable();
    }

    // set the indicator and tooltip
    function setMuteIndicator() {
        if (mute) {
            indicatorRed.src = "Resources/indicatorRed.png";
            indicatorRed.tooltip = "The media player is muted";
        } else {
            indicatorRed.src = "Resources/indicatorGreen.png";
            indicatorRed.tooltip = "";
        }
    }

    // play the thing
    function setPlayState() {
        startupFlg = 0;
        playTrack();
    }

    // set the pause state and set the vitality
    function setPauseState() {
        startupFlg = 0;
        //playButton.src = "Resources/pause.png";
        pauseTrack();
        playButton.visible = true;
        pauseButton.visible = false;
        buildVitality(currIcon, parseInt(percentTextShadow.data, 10), WMPlayer.settings.mute); // build the dock vitality
    }

    // widget progress slider to track QT Player while paused
    if (!playing) {
        setProgressSlider();
    }
    // widget volume slider to track QT Player
    trackVolumeSlider();

    // mute indicator to track QT Player mute state
    setMuteIndicator();

    // handle QT Player play/pause button
    if (playing && playButton.visible) {
        setPlayState();
    } else if (!atEnd && !playing && !playButton.visible) {
        setPauseState();
    }
};
//=====================
//End function
//=====================


//=====================
//command to run when widget double clicked
//=====================
widget.onRunCommandInBgComplete = function (event) {
    var theTag = event.data;

    if (debugFlg === "1") {
        hprint("onRunCommandInBgComplete for tag: " + theTag);
    }
    //hprint(preferences.imageCmdPref.value);
    
    if (theTag === "runningTask") {
        //if (debugFlg === "1") {
        //    hprint(preferences.imageCmdPref.value + "\n\n" + runningTask);
        //} else {
        //    alert(preferences.imageCmdPref.value + "\n\n" + runningTask);
        //}
    }

    if (theTag === "openFileInApplicationResult") {
        hprint(
            "openFileInApplication:result: " + ((openFileInApplicationResult === "")
                ? "OK"
                : "Failed: " + openFileInApplicationResult)
        );
        if (openFileInApplicationResult === "") {
            // function call to un-pause widget
            //nextTrack();
            //hprint("widget.onRunCommandInBgComplete; empty block");
            return;
        }
    }
};
//=====================
//End function
//=====================


//=====================
//Start timer run before the widget startup routine
//=====================
var startTimer = new Timer();
startTimer.ticking = false;
startTimer.interval = 0.5;
var startTimerState = 1;

preferences.qtAllowPref.hidden = !isMacintosh;
keyViewScreen.visible = !isMacintosh;   //hide the switch if it is on Mac
preferences.qtMiniaturizePref.hidden = !isMacintosh;
preferences.wmpApplicationPref.hidden = isMacintosh;
preferences.wmpAllowPref.hidden = isMacintosh;

//==============================================================================
// this function starts the QT Player before the main startup function is called
//==============================================================================

startTimer.onTimerFired = function () {
    if (isMacintosh) {
        miniaturize = (preferences.qtMiniaturizePref.value === "1");
    }
    switch (startTimerState) {
    case 1:
        if (isMacintosh) {
            WMPlayer.controls.activate();                               // start QT Player
            WMPlayer.URL = resolvePath(".") + "/Resources/zzzz.mp3";    // play any sound
            //dprint("6. WMPlayer.controls.play ");
            WMPlayer.controls.play(miniaturize);
        }
        startTimerState = 2;
        break;
    case 2:
        startTimer.ticking = false;
        updateTimer.ticking = isMacintosh && (preferences.qtAllowPref.value === "1");
        startup();
        break;
    }
};
//=====================
//End function
//=====================

//====================================================================================
// this function stops the QT Player (on mac) or releases the WMPlayer object (on win)
//====================================================================================
widget.onUnload = function () {
    sliderTimer.ticking = false;
    positionTimer.ticking = false;

    if (isMacintosh) {
        updateTimer.ticking = false;
        WMPlayer.controls.quit();           // stop the QTPlayer app
    } else {
        COM.disconnectObject(WMPlayer);     // release the WMPlayer
    }
};
//=====================
//End function
//=====================

//DB04 starts - moved code from .kon and added sounds

//=================================
// Function to add a single track
//=================================
keyf.onMouseDown = function (event) {
    fsElementToFind = "file";
    currentFolder = preferences.currentMusicFolderPref.value;
    readFolderList(currentFolder);
    selectFileToPlay();
    addSingleTrack("local");
};
//=================================
// end function
//=================================


//=================================
// Function to open a folder to play
//=================================
keyd.onMouseDown = function () {
    fsElementToFind = "folder";
    readFolderList(preferences.currentMusicFolderPref.value) ;
    selectFolderToPlay();
};
//=================================
// end function
//=================================



//=================================
// Function to animate the directory key sliding out
//=================================
keyd.onMouseEnter = function () {
    if (preferences.soundpref.value === "enabled") {
        play(slidingClunk, true);
    }
    keyd.src = "Resources/keydHovered.png";
    dragDropFlg = 0; // cancelling the drag/dtop flag anywhere I can
};
//=================================
// end function
//=================================

//=================================
// Function to restore the key image
//=================================
keyd.onMouseExit = function () {
    keyd.src = "Resources/keyd.png";
};
//=================================
// end function
//=================================

//=================================
// Function to animate the file key sliding out
//=================================
keyf.onMouseEnter = function () {
    if (preferences.soundpref.value === "enabled") {
        play(slidingClunk, true);
    }
    keyf.src = "Resources/keyfHovered.png";
    dragDropFlg = 0; // cancelling the drag/dtop flag anywhere I can

};
//=================================
// end function
//=================================


//=================================
// Function to restore the key image
//=================================
keyf.onMouseExit = function () {
    keyf.src = "Resources/keyf.png";
};
//=================================
// end function
//=================================


//=================================
// Function to add a music track
//=================================
endPipe.onMouseUp = function (event) {
    addSingleTrack("local");
};
//=================================
// end function
//=================================

//=================================
// Function to wiggle the end pipe when hovered
//=================================
endPipe.onMouseEnter = function () {
    endPipe.src = "Resources/pipes-endHover.png";
};
//=================================
// end function
//=================================

//=================================
// Function to wiggle the end pipe when hovered
//=================================
endPipe.onMouseExit = function () {
    endPipe.src = "Resources/pipes-end.png";
};
//=================================
// end function
//=================================

//=================================
// Function to style the button
//=================================
prevChunk.onMouseEnter = function () {
    prevChunk.src = "Resources/previousButtonHover.png";
};
//=================================
// end function
//=================================

//=================================
// Function to style the button
//=================================
prevChunk.onMouseExit = function () {
    prevChunk.src = "Resources/previousButton.png";
};
//=================================
// end function
//=================================


//=================================
// Function to toggle the keyViewScreen button
//=================================
keyViewScreen.onMouseDown = function () {
    if (isMacintosh) {
        /*if (preferences.qtAllowPref.value === "1") {
            preferences.qtAllowPref.value = "0";
            keyViewScreen.tooltip = "external player is disabled";
            keyViewScreen.src="Resources/indicatorRod.png";
        } else {
            preferences.qtAllowPref.value = "1";
            keyViewScreen.tooltip = "pulled out - external player is enabled";
            keyViewScreen.src="Resources/indicatorRodOut.png";
        }
        */
        hprint("keyViewScreen.onMouseDown: empty block");
    } else {
        dprint("pressed ");
        if (preferences.wmpAllowPref.value === "1") {
            preferences.wmpAllowPref.value = "0";
            keyViewScreen.src = "Resources/indicatorRod.png";
            keyViewScreen.tooltip = "pulled out - external video is disabled";
            dprint("keyViewScreen.src " + keyViewScreen.src);     // this keeps reporting undefined
        } else {
            preferences.wmpAllowPref.value = "1";
            keyViewScreen.src = "Resources/indicatorRodOut.png";
            keyViewScreen.tooltip = "pulled out - external video is enabled";
            dprint("keyViewScreen.src " + keyViewScreen.src);      // this keeps reporting undefined
        }
        dprint("preferences.wmpAllowPref.value " + preferences.wmpAllowPref.value);

        wmpAllowApp = parseFloat(preferences.wmpAllowPref.value);
    }
    if (preferences.soundpref.value === "enabled") {
        play(steamSound, true);
    }
    if (preferences.tooltipPref.value !== "enabled") {
        keyViewScreen.tooltip = "";
    }
};
//=================================
// end function
//=================================


//=================================
// Function to toggle the keyViewScreen button
//=================================
keyFullScreen.onMouseUp = function () {
    if (preferences.fullscreenPref.value === "1") {
        preferences.fullscreenPref.value = "0";
        keyFullScreen.tooltip = "external video full screen mode is disabled";
        keyFullScreen.src = "Resources/indicatorRod.png";
    } else {
        preferences.fullscreenPref.value = "1";
        keyFullScreen.tooltip = "pulled out - external video full screen mode is enabled";
        keyFullScreen.src = "Resources/indicatorRodOut.png";
    }
    if (preferences.soundpref.value === "enabled") {
        play(steamSound, true);
    }
    if (preferences.tooltipPref.value !== "enabled") {
        keyFullScreen.tooltip = "";
    }
};
//=================================
// end function
//=================================

//=================================
// Function to style the first chunk button
//=================================
firstChunk.onMouseEnter = function () {
    firstChunk.src = "Resources/firstButtonHover.png";
};
//=================================
// end function
//=================================


//=================================
// Function to style the first chunk button
//=================================
firstChunk.onMouseExit = function () {
    firstChunk.src = "Resources/firstButton.png";
};
//=================================
// end function
//=================================



//=================================
// Function to style the first chunk button
//=================================
playListPage.onMouseEnter = function () {
    playListPage.style.backgroundColor = "rgba(255,255,255,0.9)";
    //playListPageBackG.visible = true;
};
//=================================
// end function
//=================================


//=================================
// Function to style the first chunk button
//=================================
playListPage.onMouseExit = function () {
    playListPage.style.backgroundColor = "rgba(255,255,255,0.3)";
    //playListPageBackG.visible = false;
};
//=================================
// end function
//=================================


//===============================================================
// this function catches ctrl+x
//===============================================================
function cutTrack() {
    //dprint("dragPosition "+ dragPosition);
    dprint("cutting " + fullTrackName[dragPosition + (chunkSize * chunkIndex)]);
    savFullTrackName = fullTrackName[dragPosition + (chunkSize * chunkIndex)];
    deleteTrack(dragPosition);
}
//=====================
//End function
//=====================


//===============================================================
// this function catches ctrl+c
//===============================================================
function copyTrack() {
    //dprint("dragPosition "+ dragPosition);
    dprint("copying " + fullTrackName[dragPosition + (chunkSize * chunkIndex)]);
    savFullTrackName = fullTrackName[dragPosition + (chunkSize * chunkIndex)];
}
//=====================
//End function
//=====================


//===============================================================
// this function catches ctrl+v
//===============================================================
function pasteTrack() {
    dprint("chunkSize "+ chunkSize);
    dprint("chunkIndex "+ chunkIndex);
    dprint("pasteing " + savFullTrackName);
    // we calculate it ourselves here
    catchFileDrop(null, savFullTrackName);
}
//=====================
//End function
//=====================


//===============================================================
// this function is called when the widget loads
//===============================================================
widget.onload = function () {
        include("folder.js");
        include("Resources/Licence/Licence.js");
        LICENCE.createLicence(mainWindow);      // create the licence window

        startTimer.ticking = true;              // startup();
};
//=====================
//End function
//=====================


//=================================
// Function to select the plain playlist area
//=================================
playListTap.onMouseDown = function () {
    if (debugFlg === "1") {
    	dprint ("%-I-INFO, playListTap.onMouseDown");
    }
    play(steamSound, false);

    if (preferences.playlistFormatPref.value === "xml") {
          preferences.playlistFormatPref.value = "xspf";
            oButton.tooltip = "Open an XSPF formatted playlist.";
            sButton.tooltip = "Save a playlist in XSPF format.";
            sButton.opacity = 1;
            oButton.opacity = 1;
            playListTap.tooltip = "Click to change the playlist format to XML.";
    } else {
          preferences.playlistFormatPref.value = "xml";
            oButton.tooltip = "Open an XML formatted playlist.";
            sButton.tooltip = "Save a playlist in XML format.";
            sButton.opacity = 255;
            oButton.opacity = 255;
            playListTap.tooltip = "Click to change the playlist format to XSPF.";
    }
    dprint("playlistFormatPref "+ preferences.playlistFormatPref.value);
};
//=================================
// end function
//=================================

//===============================================================
// this function defines the keyboard events captured
//===============================================================
mainWindow.onKeyDown = function(event) {
        if (system.event.keyCode === 88) {
            if (event.ctrlKey) {  //if the user is selecting the control key as well as the C key
                  dprint("%KON-I-INFO, pressing Ctrl+X " + system.event.keyCode);
              cutTrack();
            }
        }
        if (system.event.keyCode === 67) {
            if (event.ctrlKey) {  //if the user is selecting the control key as well as the C key
                  dprint("%KON-I-INFO, pressing Ctrl+C " + system.event.keyCode);
              copyTrack();
            }
        }
        if (system.event.keyCode === 86) {
            if (event.ctrlKey) {  //if the user is selecting the control key as well as the V key
                  dprint("%KON-I-INFO, pressing Ctrl+V " + system.event.keyCode);
              pasteTrack();
            }
        }
        if (system.event.keyCode === 70) {
            if (event.ctrlKey) {  //if the user is selecting the control key as well as the F key
                dprint("%KON-I-INFO, pressing Ctrl+F " + system.event.keyCode);
                searchForTrack();
            }
        }
        if (system.event.keyCode === 114) {
                dprint("%KON-I-INFO, pressing F3 " + system.event.keyCode);
            searchSameTrack();
        }
        if (system.event.keyCode === 116) {
                dprint("%KON-I-INFO, pressing F5 " + system.event.keyCode);
            reloadWidget();
        }
        if (system.event.keyCode === 40) {
            // right volume up
                dprint("%KON-I-INFO, pressing down key " + system.event.keyCode);
            sliderSet.hOffset = sliderSet.hOffset - (10 * scale);
            constrainSliderSet();
        }
        if (system.event.keyCode === 38) {
            //left volume up
                dprint("%KON-I-INFO, pressing up key " + system.event.keyCode);
            sliderSet.hOffset = sliderSet.hOffset + (10 * scale);
            constrainSliderSet();
        }
        if (system.event.keyCode === 78) {
            //next track
                dprint("%KON-I-INFO, pressing N key " + system.event.keyCode);
            nextTrack();
        }
        if (system.event.keyCode === 66) {
            //next track
                dprint("%KON-I-INFO, pressing B key " + system.event.keyCode);
            currentButtonStatus = "previous";
            previousTrack();
        }
        if (system.event.keyCode === 32) {
            //play/pause track
                dprint("%KON-I-INFO, pressing space bar " + system.event.keyCode);
            if (pauseButton.visible === false ) {
                playTrack();
                pauseButton.visible = true;
            } else {
                playButton.src="Resources/play.png";
                pauseTrack();
                playButton.visible = true;
                pauseButton.visible = false;
                buildVitality(currIcon, parseInt(percentTextShadow.data, 10), WMPlayer.settings.mute); // build the dock vitality
            }
        }
        if (system.event.keyCode === 39) {
            //FWD track
                dprint("%KON-I-INFO, pressing right key " + system.event.keyCode);
            positionSlider.hOffset = positionSlider.hOffset + (5 * scale);
            constrainPositionSlider();
        }
        if (system.event.keyCode === 37) {
            //RWD track
                dprint("%KON-I-INFO, pressing left key " + system.event.keyCode);
            positionSlider.hOffset = positionSlider.hOffset - (5 * scale);
            constrainPositionSlider();
        }
   };
//=====================
//End function
//=====================


//===============================================================
// this function is called when the widget prefs are changed
//===============================================================
widget.onPreferencesChanged = function () {
        changePrefs();
};
//=====================
//End function
//=====================

//===============================================================
// this function is called when the widget wakes up
//===============================================================
widget.onWakeFromSleep = function () {
        dprint("Waking Up");
        sleep(7000);     //give the WMPlayer some time to wake up too.
        startup();       //probably overkill but a restart is the default action
};
//=====================
//End function
//=====================

//===============================================================
// this function is called when mousewheel is rotated
//===============================================================
widget.onMouseWheel = function(event) {
       sliderSetOnMouseWheel(event);
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
nextChunk.onMouseEnter = function () {
       nextChunk.src="Resources/nextButtonHover.png";
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
nextChunk.onMouseExit = function () {
       nextChunk.src="Resources/nextButton.png";
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
lastChunk.onMouseEnter = function () {
       lastChunk.src="Resources/lastButtonHover.png";
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
lastChunk.onMouseExit = function () {
       lastChunk.src="Resources/lastButton.png";
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
sButton.onMouseEnter = function () {
       sButton.src="Resources/sButtonHover.png";
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
sButton.onMouseExit = function () {
       sButton.src="Resources/sButton.png";
};
//=====================
//End function
//=====================


//===============================================================
// mouse event function
//===============================================================
oButton.onMouseEnter = function () {
       oButton.src="Resources/oButtonHover.png";
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
oButton.onMouseExit = function () {
       oButton.src="Resources/oButton.png";
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
ovalButton.onMouseEnter = function () {
       ovalButton.src="Resources/ovalButtonHover.png";
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
ovalButton.onMouseExit = function () {
       ovalButton.src="Resources/ovalButton.png";
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
lockArea.onMouseEnter = function () {
       lockArea.src="Resources/lockAreaHover.png";
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
lockArea.onMouseExit = function () {
       lockArea.src="Resources/lockAreaFree.png";
};
//=====================
//End function
//=====================


//===============================================================
// mouse event function
//===============================================================
endPipe.onMouseUp = function(event) {
       addSingleTrack("local");
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
endPipe.onMouseEnter = function () {
       endPipe.src="Resources/pipes-endHover.png";
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
endPipe.onMouseExit = function () {
       endPipe.src="Resources/pipes-end.png";
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
positionSlider.onMouseDown = function () {
                    currentButtonStatus = "positionslider";
                    positionSliderOnMouseDown();
};
//=====================
//End function
//=====================
//===============================================================
// mouse event function
//===============================================================
positionSlider.onMouseDrag = function(event) {
                    positionSliderOnMouseMove(event);
};
//=====================
//End function
//=====================
//===============================================================
// mouse event function
//===============================================================
positionSlider.onMouseUp = function () {
                    currentButtonStatus = "";
                    positionSliderOnMouseUp();
};
//=====================
//End function
//=====================


//===============================================================
// mouse event function
//===============================================================
pipesRight.onMouseDown = function () {
                    pipesRight.src="Resources/pipesRight.png";
};
//=====================
//End function
//=====================
//===============================================================
// mouse event function
//===============================================================
pipesRight.onMouseUp = function () {
                    toggleRandomPlay();
};
//=====================
//End function
//=====================
//===============================================================
// mouse event function
//===============================================================
pipesRight.onMouseEnter = function () {
                    if (preferences.shuffleStatePref.value  === "enabled") {
                        pipesRight.src="Resources/pipesRightClicked.png";
                    } else {
                        pipesRight.src="Resources/pipesRightHover.png";
                    }
};
//=====================
//End function
//=====================
//===============================================================
// mouse event function
//===============================================================
pipesRight.onMouseExit = function () {
                    if (preferences.shuffleStatePref.value === "enabled") {
                        pipesRight.src="Resources/pipesRightClicked.png";
                    } else {
                        pipesRight.src="Resources/pipesRight.png";
                    }
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
playButton.onMouseUp = function () {
                    startupFlg = 0;
                    playTrack();
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
playButton.onMouseEnter = function () {
                    playButton.src="Resources/playHover.png";
};
//=====================
//End function
//=====================


//===============================================================
// mouse event function
//===============================================================
playButton.onMouseExit = function () {
                    playButton.src="Resources/play.png";
};
//=====================
//End function
//=====================


//===============================================================
// mouse event function
//===============================================================
playButton.onMultiClick = function () {
                    // dummy capture of double click to prevent the underlying double click on the frame for operating
                    playTrack();
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
pauseButton.onMouseUp = function () {
                    startupFlg = 0;
                    //playButton.src="Resources/pause.png";
                    pauseTrack();
                    playButton.visible = true;
                    pauseButton.visible = false;
                    buildVitality(currIcon, parseInt(percentTextShadow.data, 10), WMPlayer.settings.mute); // build the dock vitality
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
pauseButton.onMouseEnter = function () {
                    pauseButton.src="Resources/pauseHover.png";
};
//=====================
//End function
//=====================


//===============================================================
// mouse event function
//===============================================================
pauseButton.onMouseExit = function () {
                    pauseButton.src="Resources/pause.png";
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
pauseButton.onMultiClick = function () {
    // dummy capture of double click to prevent the underlying double click on the frame for operating
	return;
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
speaker.onMultiClick = function () {
    // dummy capture of double click to prevent the underlying double click on the frame from operating
	return;
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
sliderSet.onMouseDown = function () {
	sliderSetOnMouseDown();
};
//=====================
//End function
//=====================
//===============================================================
// mouse event function
//===============================================================
sliderSet.onMouseDrag = function(event) {
	sliderSetOnMouseMove(event);
};
//=====================
//End function
//=====================
//===============================================================
// mouse event function
//===============================================================
sliderSet.onMouseUp = function () {
	sliderSetOnMouseUp();
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
nextButton.onMouseDown = function () {
	currentButtonStatus = "next";
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
nextButton.onMouseEnter = function () {
	nextButton.src="Resources/nextButtonHover.png";
};
//=====================
//End function
//=====================
//===============================================================
// mouse event function button wobble
//===============================================================
nextButton.onMouseExit = function () {
	nextButton.src="Resources/nextButton.png";
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
nextButton.onMouseUp = function () {
	nextTrack();
	currentButtonStatus = "";
};
//=====================
//End function
//=====================

//===============================================================
// mouse event function
//===============================================================
nextButton.onMultiClick = function () {
	currentButtonStatus = "next";
	nextTrack();
	currentButtonStatus = "";
	// dummy capture of double click to prevent the underlying double click on the frame for operating
};
//=====================
//End function
//=====================


//===============================================================
// Previous button wobble
//===============================================================
prevButton.onMouseDown = function () {
     currentButtonStatus = "previous";
};
//=====================
//End function
//=====================

//===============================================================
// Previous button wobble
//===============================================================
prevButton.onMouseEnter = function () {
    prevButton.src="Resources/previousButtonHover.png";
};
//=====================
//End function
//=====================

//===============================================================
// Previous button wobble
//===============================================================
prevButton.onMouseExit = function () {
    prevButton.src="Resources/previousButton.png";
};
//=====================
//End function
//=====================

//===============================================================
// Previous button function
//===============================================================
prevButton.onMouseUp = function () {
        previousTrack();
        currentButtonStatus = "";
};
//=====================
//End function
//=====================

//===============================================================
// dummy capture of double click to prevent the underlying double click on the frame for operating
//===============================================================
prevButton.onMultiClick = function () {
        currentButtonStatus = "previous";
        previousTrack();
        currentButtonStatus = "";

};
//=====================
//End function
//=====================

//===============================================================
// this function
//===============================================================
mediapopupplaque.onMouseDown = function () {
        if (preferences.soundpref.value === "enabled") {
            play(zzzz, false);
        }
};
//=====================
//End function
//=====================


//===============================================================
// this function slides the knob to clear the playlist
//===============================================================
playListSlider.onMouseDrag = function(event) {
    playListSlider.vOffset = event.vOffset -5;
    if (playListSlider.vOffset >= 460 * scale) { //568
        playListSlider.vOffset = 460 * scale;
        playlistSliderDragged = true;
    }
    if (playListSlider.vOffset <= 124 * scale) { //262
        playListSlider.vOffset = 124 * scale;
    }
};
//=====================
//End function
//=====================

//===============================================================
// this function slides the knob back to the top
//===============================================================
playListSlider.onMouseUp = function () {
	var answer;

    playListSlider.vOffset = 124 * scale;

    if (preferences.soundpref.value === "enabled") {
        play(lock, false);
    }

    if (playlistSliderDragged === true ) {

        answer = alert("Clear the current playlist, are you sure? ", "Clear playlist", "No Thanks");
        if (answer === 1) {
    	    clearPlayList();
                alert("The current playlist has been cleared.", "OK");
        }
        playlistSliderDragged = false;
    }

};
//=====================
//End function
//=====================


//=====================
// this function
//=====================
keyu.onMouseEnter = function () {
	if (preferences.soundpref.Value === "enabled") {
        play(slidingClunk, true);
    }
    keyu.src = "Resources/keyuHovered.png";
    dragDropFlg = 0; // cancelling the drag/dtop flag anywhere I can

};
//=================================
// end function
//=================================


//=====================
// this function
//=====================
keyu.onMouseExit = function () {
	keyu.src = "Resources/keyu.png";
};
//=================================
// end function
//=================================


//=====================
// this function
//=====================
keyu.onMouseDown = function()	{
	addSingleTrack("url");
	busyTimer.ticking = true;

};
//=================================
// end function
//=================================


/*
//===============================================================
// this function closes the help window
//===============================================================
mediaPlayerHelp.onMultiClick = function () {
        if (preferences.soundpref.value === "enabled") {
            play(steamSound, false);
        }
        helpLayer1.visible=false;
};
//=====================
//End function
//=====================
*/

/*
//===============================================================
// this function closes the help window
//===============================================================
mediaPlaylistHelp.onMultiClick = function () {
        if (preferences.soundpref.value === "enabled") {
            play(steamSound, false);
        }
        helpLayer2.visible=false;
};
*/
//=====================
//End function
//=====================


//===============================================================
// this function switches between the two help images
//===============================================================
textLinktoHelp1.onMouseDown = function () {
	helpLayer1.visible=false;
	helpLayer2.visible=true;
};
//=====================
//End function
//=====================

//===============================================================
// this function switches between the two help images
//===============================================================
textLinktoHelp2.onMouseDown = function () {
        helpLayer2.visible=false;
        helpLayer1.visible=true;
};
//=====================
//End function
//=====================

textLinktoClose1.onMouseDown = function () {
    print("ARSE!");
	helpLayer1.visible=false;
};

textLinktoClose2.onMouseDown = function () {
    print("ARSE!");
	helpLayer2.visible=false;
};

//===========================================
// this function writes the debug data to a log file
//===========================================
function eprint(s) {
    filesystem.writeFile(system.widgetDataFolder + "/log.txt", s + "\r\n", true);
}
//=====================
//End function
//=====================


//======================================================================================
// END mediaPlayer.js
//======================================================================================

// need to highlight the currently playing track after an internal drag/drop