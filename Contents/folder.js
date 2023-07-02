//===========================================================================
// folder.js
// Steampunk Media Player Widget  1.0.14
// Written and Steampunked by: Dean Beedell
// aqqc35@dsl.pipex.com
//===========================================================================
// Done:

// activate the clicks on a folder icon as well as the folder name
// opening a sub folder for playing - works
// opening the folder above using UP - works
// need to check if current folder is root and disallow that selection
// add a folderSlider allowing selection of folders beyond the 12 - 
// changed the '+ computer' icon.
// fix the reason alert help button for not selecting the root and pulled the code in to a routine
// change the folder display so it displays not just the folders but also all the files
// now allows selection of files but not to drill down into...
// now allows the up and down key selection of tracks/folders
// does not allow the selection to go above or below the list on a key up/down
// if a track is clicked upon or key'd then the default folder is chosen.
// implemented a return to open a sub-folder
// implemented the CTRL+HOME to return to the top screen and select the top track
// implemented the CTRL+END to go to the bottom screen and select the last track
// changed the selected track colour to match the rest of the window
// selection by mouse only allowed on populated folder/tracks
// up icon click now correctly calcualtes from current tree position
// onMouse Scroll movements to select up/and down - WIP
// up icon now checks to see if the folder is a drive, if so now passes a boolean variable to cause the drives to be displayed
// added folder exclusion list to prevent windows folder from being browsed - ERROR!
// the readfolderslist now shows drives
// added a drive icon for drives only
// changed text alert for folders that contain no audio files
// changed the tooltip texts to be more relevant and informative
// changed the play button to a select button
// added ting and page turn sounds to navigation events
// added folder list refresh function to F5
// added back button code to handle the very last folder selection
// remove back icon when showing drives?
// back button functionality fixed
// remove up icon when showing drives
// up to drive e: when the tooltip should say drive root, added code to handle the up icon mouse enter root identification
// added help screen and menu item
// added roll over highlight of the buttons
// added tooltip change to reflect file or folder selection
// created file background with file plaque changed according to type
// fixed the file/folder browser type as called from the various places.
// there is no selected file by default any more
// no file selection does nothing as it should
// double click a file in file mode must play it
// the 2nd and 3rd folders selected should not replicate the first if the folder selected is the same
// right click select fourth saved folder selects the wrong one, now calls setmenu
// save the selected folder to the current prefs so that when opening the new folder selector the previous position is retained.
// back pressed twice, the up location is not set correctly
// macintosh - code to determine parent folder using /
// On Macs ignore files beginning with a dot '.'
// give the explorer an option to display the whole path or just the current folders within this folder.
// tested to see if the external sound resources exist before attempting to play
// add a brass toggle to select the display of long/short folder names
// add a startup routine to set the brass toggle position as the browser initiates

// 1.0.14a
// fixed a bug with file selection causing the currentfolder to empty
// both upIcon functions use the same code to select the up folder
// the upIcon function now only selects a folder if the path is valid
// array variables moved from mediaplayer to folder.js to make folder.js more portable
// new alert for selecting files when folders should be selected
// new busyIcon for the folder.js when selecting an up or down folder
// added a .030 sec sleep to allow the new busyIcon to display
// file selection bug - the selected file has the correct file name but the folder is not from 
//      the folder selected but is built using the folder where it is being dragged to.
// added the current folder name to the top of the page
// there is a // insertion bug when selecting a folder using the Windows default browser
// WIP take the .kon file and translate it to a better more encapsulated method of creating images in javascript WIP
// help image to have a x - to close added to the image and supporting close text
// f5 refresh - causes the folder panel to fade out and in again
// long folder name selection toggle to work for files too? Tried it, abandoned the idea.
// rotate the folder busy instead of the main busy
// place the folder elements, sound, images in their own folder
//   images into the images/folder folder 
//   sounds into the sounds/folder folder
// tested the alternative to a sleep statement to allow the busy animation to rotate, abandoned the idea, 
//  - tried a for loop with the animation within but it would not show the animation until the loop was finished
// fixed the menus                    
// add custom alert code
// reorganised the preferences screens to be more logical
// fixed the home/end and carriage return key presses to match current code
// pulled the code together that captures multi-clicks on the files/folders to allow it to be called by a CR keypress
// pulled the code together that captures single-clicks on the files/folders to make it common.
// fixed a bug that caused the folder /file to be selected prior to the first folder slot
// set the start folderSlot to 0 when selecting a new folder either up or down

// TODO :

// remove the debug statements and set debug to 0

// the folderSlider goes below the selection of folders beyond the 12 displayed - WIP
// bug in selecting beyond the last track using mouse scroll wheel and up/down keys

// bread crumbs - implement a trail - WIP
// bread crumbs always recreate the bread crumbs when opening the browser from scratch

// var sysVol = appleScript("tell application \"Finder\" to get name of startup disk");
// For the Media Player, most, if not all, of the Media will be in /Users/username/Movies or in /Users/username/Music
// The system volume name can be rendered as "/" instead of "/Volumes/Macintosh HD"
// after a folder/file refresh fade the window out then in again.

// and exposing valid filetypes so the user can add/modify the list
// add code to prefs to handle folder exclusions separated by a comma - 
//     this is to do with folders that need to be excluded due to no permissions
//     there is a file system utility that can check permissions before carrying out an act.
//     var canAccess = filesystem.isPathAllowed( path );

// add custom tooltip code

/*jslint for, multivar, this */

/*property
    Item, Playlist, backgroundColor, caption, color, currentMusicFolderPref,
    data, driveSpecifier, font, forEach, getDirectoryContents,
    indexOf, isDirectory, lastIndexOf, length, onMouseDown, onMouseDrag,
    onMouseEnter, onMouseUp, onMultiClick, popupPanelFont, round, soundpref,
    src, style, substr, substring, tooltip, vOffset, value, visible
*/

include("alertBox/alertBox.js");

// the following sounds are used by this include 

var winding = "Resources/sounds/folder/winding.mp3";
var steamSound = "Resources/sounds/folder/steamsound.mp3";
var ting = "Resources/sounds/folder/ting.mp3";
var page = "Resources/sounds/folder/page-turn.mp3";
var lock = "Resources/sounds/folder/lock.mp3";

"use strict";

var fileSystemElementSelected, okButton, cancelButton, xButton, dprint, folderWindow, folderListFrame;     // globals
var theFolder, previousFolder, getFileOnly, previousChosenFolder, chosenFolder;
var folderPath, CDROM, CDROMcount, cdRomNo, cdMenuItem, playAudioCD, upIcon, drivesIcon;
var openFolderToPlay, winding, fileSystemListText, ironSlider, folderSlider, fileSystemIcon, IsSong;
var validTypes, xtn;
var readFolderList = null;  // forward declaration

var folderCount = 0;
var tmfolderList = [];
var breadcrumbList = [];
var breadCrumbPos = 0;
var increment = 0;
var folderSlotNo = 0;
var totalCount = 0;
var currentFolder = "";
var driveFound = false;
var previousFolder = "";
var fsElementToFind = "folder";
var folderBusyCounter = 0;
    
// this code to create the folder specific windows, images and text elements here instead of the .KON file

var globals = this; // this is declared a second time, it is already declared in mediaplayer.js 
                    // it seem to do no harm to redeclare it

folderWindow = new Window();
folderWindow.visible = false;
folderWindow.width = 760;	
folderWindow.height = 700;	
folderWindow.shadow = false;

folderHelpLayer = new Window();
folderHelpLayer.visible = false;
folderHelpLayer.width = 681;	
folderHelpLayer.height = 520;	
folderHelpLayer.shadow = false;

var newImage = function (parent, hOffset, vOffset, width, height, src, zOrder, opacity, hRegP, vRegP) {
    var o = new Image();

    o.src = src;
    o.width  = width;
    o.height = height;
    o.zOrder = zOrder;
    o.opacity = opacity || 255;             // opacity is an optional parameter

    hRegP = hRegP || 0;                     // hRegP and vRegP are optional parameters
    vRegP = vRegP || 0;

    hOffset += hRegP;
    vOffset += vRegP;

    o.hOffset = hOffset;
    o.vOffset = vOffset;

    o.hRegistrationPoint =  hRegP;
    o.vRegistrationPoint =  vRegP;

    parent.appendChild(o);
    return o;
    },
    newText = function (parent, hOffset, vOffset, width, height, data, hAlign, font, style, size, color, opacity, bgColor, bgOpacity, zOrder) {
        var o = new Text();
        
        o.hOffset = hOffset;
        o.vOffset = vOffset;
        o.width = width;
        o.height = height;
        o.data = data;
        o.hAlign = hAlign;
        o.font = font;
        o.style = style;
        o.size = size;
        o.color = color;
        o.opacity = opacity;
        o.bgColor = bgColor;
        o.bgOpacity = bgOpacity;
        o.zOrder = zOrder;
        parent.appendChild(o);
        return o;
    },    
    
    base = "Resources/images/folder/",
    browseFolder = newImage(folderWindow, 0, 0, 480, 489, base + "xp-browse-folder.png", 1),
    scroll = newImage(folderWindow, 21, 48, 417, 364, base + "scroll.png", 3),
    ironSlider  = newImage(folderWindow,  383, 33, 96, 380, base + "ironSlider.png", 5), 
    folderSlider  = newImage(folderWindow, 368, 100, 102, 46, base + "pointer.png", 7),
    explorer  = newImage(folderWindow, 70, 84, 103, 19, base + "explorer.png", 9),
    backIcon  = newImage(folderWindow, 60, 103, 26, 19, base + "backicon.png", 11),
    upIcon = newImage(folderWindow, 80, 103, 26, 19, base + "upicon.png", 13),
    toggle = newImage(folderWindow, 30, 425, 28, 29, base + "toggle.png", 15),
    xButton = newImage(folderWindow, 414, 5, 28, 29, base + "xButton.png", 17),
    hButton = newImage(folderWindow, 389, 5, 28, 29, base + "hButton.png", 19),
    cancelButton  = newImage(folderWindow, 337, 422, 79, 26, base + "cancelbutton.png", 21),
    okButton  = newImage(folderWindow, 251, 422, 79, 26, base + "okbutton.png", 23),

    fileSystemElementSelected = newText(folderWindow, 90, 410, 310, 20, "chosen folder", "left", "TIMES", "", 11, "#000000", 255, "#000000", 0, 27),
    currentFolderSelected = newText(folderWindow, 110, 115, 270, 16, "current folder..", "left", "TIMES", "-kon-text-truncation:end", 11, "#000000", 255, "#000000", 0, 27),

    fileSystemListText0 = newText(folderWindow, 70, 140, 300, 16, "Getting track data for this track...", "left", "TIMES", "", 11, "#000000", 255, "#000000", 0, 27) ,
    fileSystemListText1 = newText(folderWindow, 70, 160, 300, 16, "Getting track data for this track...", "left", "TIMES", "", 11, "#000000", 255, "#000000", 0, 27) ,
    fileSystemListText2 = newText(folderWindow, 70, 180, 300, 16, "Getting track data for this track...", "left", "TIMES", "", 11, "#000000", 255, "#000000", 0, 27) ,
    fileSystemListText3 = newText(folderWindow, 70, 200, 300, 16, "Getting track data for this track...", "left", "TIMES", "", 11, "#000000", 255, "#000000", 0, 27) ,
    fileSystemListText4 = newText(folderWindow, 70, 220, 300, 16, "Getting track data for this track...", "left", "TIMES", "", 11, "#000000", 255, "#000000", 0, 27) ,
    fileSystemListText5 = newText(folderWindow, 70, 240, 300, 16, "Getting track data for this track...", "left", "TIMES", "", 11, "#000000", 255, "#000000", 0, 27) ,
    fileSystemListText6 = newText(folderWindow, 70, 260, 300, 16, "Getting track data for this track...", "left", "TIMES", "", 11, "#000000", 255, "#000000", 0, 27) ,
    fileSystemListText7 = newText(folderWindow, 70, 280, 300, 16, "Getting track data for this track...", "left", "TIMES", "", 11, "#000000", 255, "#000000", 0, 27) ,
    fileSystemListText8 = newText(folderWindow, 70, 300, 300, 16, "Getting track data for this track...", "left", "TIMES", "", 11, "#000000", 255, "#000000", 0, 27) ,
    fileSystemListText9 = newText(folderWindow, 70, 320, 300, 16, "Getting track data for this track...", "left", "TIMES", "", 11, "#000000", 255, "#000000", 0, 27) ,
    fileSystemListText10 = newText(folderWindow, 70, 340, 300, 16, "Getting track data for this track...", "left", "TIMES", "", 11, "#000000", 255, "#000000", 0, 27) ,
    fileSystemListText11 = newText(folderWindow, 70, 360, 300, 16, "Getting track data for this track...", "left", "TIMES", "", 11, "#000000", 255, "#000000", 0, 27) ,

    fileSystemIcon0 = newImage(folderWindow,  30, 130, 15,18, base + "folder.png", 24),
    fileSystemIcon1 = newImage(folderWindow,  30, 150, 15,18, base + "folder.png", 25),
    fileSystemIcon2 = newImage(folderWindow,  30, 170, 15,18, base + "folder.png", 26),
    fileSystemIcon3 = newImage(folderWindow,  30, 190, 15,18, base + "folder.png", 27),
    fileSystemIcon4 = newImage(folderWindow,  30, 210, 15,18, base + "folder.png", 28),
    fileSystemIcon5 = newImage(folderWindow,  30, 230, 15,18, base + "folder.png", 29),
    fileSystemIcon6 = newImage(folderWindow,  30, 250, 15,18, base + "folder.png", 30),
    fileSystemIcon7 = newImage(folderWindow,  30, 270, 15,18, base + "folder.png", 31),
    fileSystemIcon8 = newImage(folderWindow,  30, 290, 15,18, base + "folder.png", 32),
    fileSystemIcon9 = newImage(folderWindow,  30, 310, 15,18, base + "folder.png", 33),
    fileSystemIcon10 = newImage(folderWindow, 30, 330, 15,18, base + "folder.png", 34), 
    fileSystemIcon11 = newImage(folderWindow, 30, 350, 15,18, base + "folder.png", 35), 
    folderBusyBlur = newImage(folderWindow, 180 , 250, 32, 32, base + "busyBlur.png", 36);
    folderBusy = newImage(folderWindow, 170 , 240, 32, 32, base + "busy-F1-32x32x24.png", 37);

    // now create the folder help window
  
    folderHelpWindow = newImage(folderHelpLayer, 0 , 5, 681, 520, base + "folderHelpWindow.png", 1);
    folderHelpWindowClose = newImage(folderHelpLayer, 645 , 25, 28, 29, base + "xButton.png", 1, 255);

// create the arrays necessary to refer to the file/folder text lists and icons in code
var fileSystemListText = (function () {   // defines an array which aliases fileSystemListText..11
    var plt = [], i;

    for (i = 0; i <= 11; i += 1) {
        plt.push(globals["fileSystemListText" + i]);
    }
    return plt;
}());
var fileSystemIcon = (function () {   // defines an array which aliases fileSystemIcon..11
    var db = [], i;

    for (i = 0; i <= 11; i += 1) {
        db.push(globals["fileSystemIcon" + i]);
    }
    return db;
}());

setFolderMenu(); // is... 

fileSystemElementSelected.font = preferences.popupPanelFont.value;
okButton.tooltip = "Click to select the highlighted folder for playing";
cancelButton.tooltip = "Click to close the window";
xButton.tooltip = "Click to close the window";
hButton.tooltip = "Click to open help";
explorer.tooltip = "Click to open o/s default file browser at the root";
fileSystemElementSelected.tooltip = "Clicking Select will ready this folder to play";
scroll.tooltip = "Clicking here will re-select the current file/folder";
toggle.tooltip = "click here to toggle long/short folder names";
folderSlider.tooltip = "Slide up and down to scroll the listing";

if (preferences.showFolderPref.value === "short") {
    toggle.hOffset = 30;
} else {
    toggle.hOffset = 60;
}

//=================================
// busy icon timer setup
//=================================
var folderBusyTimer = new Timer();
folderBusyTimer.interval = 0.1;
folderBusyTimer.ticking = false;
//=================================
// timer ends
//=================================



//=====================
// the busy timer changes the busy icon
//=====================
folderBusyTimer.onTimerFired = function () {
    folderBusy.visible = true;
    folderBusyBlur.visible = true;
    folderBusyCounter = folderBusyCounter + 1;
    if (folderBusyCounter >= 7) {
        folderBusyCounter = 1;
    }
    folderBusy.src = base + "busy-F" + folderBusyCounter + "-32x32x24.png";
};
//=====================
//End function
//=====================



//===================================
//  function to set the initial folder styling
//===================================
function setFolderListStyling() {
    dprint("%-I-INFO, setFolderListStyling");

    fileSystemListText.forEach(function (ele) {
        ele.style = "font-family: " + preferences.popupPanelFont.value;
    });
}
//=====================
//End function
//=====================


//===================================
//  function to remove play list styling
//===================================
function removeFolderListStyling() {
    //dprint("%-I-INFO, removeFolderListStyling");
    // get rid of any background styling

    fileSystemListText.forEach(function (ele) {
        ele.style.color = "black";
        ele.style.backgroundColor = "transparent";
        //fileSystemIcon[i].visible = false;
    });
}
//=====================
//End function
//=====================


//=====================
//function to populate the folder/file list array
//=====================
function folderListPopulate(factor) {
    if (factor < 0) {
        return;
    }
    //if (factor + 11 > folderCount) {return};
    fileSystemListText.forEach(function (ele, i) {
        //print("finalListing[i + factor] "+finalListing[i + factor]);
        //print("finalListing[i + factor] "+finalListing[i + factor]);
        if ((finalListing[i + factor] !== null) && (finalListing[i + factor] !== "") && (finalListing[i + factor] !== undefined)) {
            if (filesystem.isDirectory(finalListing[i + factor])) {
                if (preferences.showFolderPref.value === "short") {
                    ele.data = justFolderName(finalListing[i + factor]);
                } else {
                    ele.data = finalListing[i + factor];                    
                }
        		ele.tooltip = "Double-click to drill down into the folder or click once and then press Select";
                fileSystemIcon[i].src = base + "folder.png";
                if (driveFound === true) {
                    fileSystemIcon[i].src = base + "disc-icon.png";
                }
                fileSystemIcon[i].tooltip = ele.tooltip;
            } else {
                //if the files is a music file then style the button
	            ele.data = getFileOnly(finalListing[i + factor]);
                IsSong = (validTypes.indexOf(xtn(ele.data)) >= 0);
                if (IsSong) {
                    fileSystemIcon[i].src = base + "document-music.png";
                    //print("fsElementToFind "+fsElementToFind);
                    if (fsElementToFind === "file") {
                        ele.tooltip = "This is a file selection - Press Select button below and it will play the selected file.";
                    } else {
                        ele.tooltip = "This is a folder selection - Press Select button below and it will play this whole folder and not just this file.";
                    }
	        		fileSystemIcon[i].tooltip = ele.tooltip;
                } else {
                    fileSystemIcon[i].src = base + "document-unknown.png";
	        		ele.tooltip = "This is an unknown file type";
                }
            }
            fileSystemIcon[i].visible = true;
        } else {
			ele.data = "";
			fileSystemIcon[i].visible = false;
        }
    });
    
    folderBusyStop();  // stop the hourglass timer
}
//=================================
// end function
//=================================




//===================================
// function to open a folder and read its contents searching for folders within
//===================================
readFolderList = function (folderPath) {
    var a;
    var convertedPath;
    var idxFolder = 0;
    var idxFile = 0;
    var fs = [];  

    var tmpFolderList = []; // redim
    var tmpFileList = []; // redim
    var excludedFoldersList = preferences.excludedFoldersList.value;
    
    finalListing = []; // redim   dean

    dprint(" %-I-INFO, readFolderList");

    currentFolderSelected.data = currentFolder;
        
    if (currentFolderSelected.data.length * 5 >= 270) {
        currentFolderSelected.scrolling = "autoleft";                
    } else {
        currentFolderSelected.scrolling = "off";        
    }
    
    currentFolderSelected.tooltip = "Current Folder = " + currentFolder;
    //currentFolderSelected.style = "italic";

    if (fsElementToFind === "folder") {
        fileSystemElementSelected.data = folderPath;
    } else {
        fileSystemElementSelected.data = "";
    }

    folderWindow.visible = true;
    setFolderListStyling();
    //busyTimer.ticking = true;
    
    // if at the root of the computer then select the drives display
    // ie. if a drive is the item passed by the upIcon press
    // instead of getDirectoryContents, create an array fs with the drive types    

    if (driveFound === true) {
        fs = []; //array
        vols = filesystem.volumes;
        
        upIcon.visible = false;
        
        for (a = 0; a < vols.length; a += 1) {
            fs[a] = findParent(vols[a].path); // converts to string array from an array of objects
        }

        //load the drive names
        tmpFileList[idxFile] = ""; // there will be no files
        for (a = 0; a < fs.length; a += 1) {
            //print("fs[a] "+fs[a]);
            if (filesystem.isDirectory(fs[a])) {
                tmpFolderList[idxFolder] = fs[a];
                idxFolder += 1;
            }
        }
    } else {
        fs = filesystem.getDirectoryContents(folderPath, false);
        totalCount = fs.length;
        
        upIcon.visible = true;

        print("totalCount "+totalCount);
        dprint("Filesystem initial search file count " + folderCount);
    
        // this takes a folder listing array and filters out non-folders
        // putting them in a temporary array
        for (a = 0; a < fs.length; a += 1) {
            //print("convertedPath "+convertedPath);
            convertedPath = convertPathToPlatform(folderPath + "/" + fs[a]);
            // the excluded folders list has yet to be properly constructed
            // at the moment it only excludes the windows folder    
            // checking the windows folder causes a fatal error
            excludedFoldersList = preferences.excludedFoldersList.value + "Windows";
            // is the excluded path in the chosen folder
            if (convertedPath.indexOf(excludedFoldersList) === -1) { 
                if (filesystem.isDirectory(convertedPath)) {
                    //print ("found folder " + convertedPath);
                    tmpFolderList[idxFolder] = convertedPath;
                    idxFolder += 1;
                } else {
                    //print ("found file " + convertedPath);
                    if (system.platform === "macintosh") {
                        var nnn = getFileOnly(convertedPath);
                        var idx = nnn.indexOf(".");
                        if (idx === 0) {  // -1 is not found, any other value is the location of the dot
                            // if the filename begins with a dot, don't do anything at all
                        } else { // any other value add the converted filename to the list
                            tmpFileList[idxFile] = convertedPath;
                            idxFile += 1;
                        }
                    } else {
                        tmpFileList[idxFile] = convertedPath;
                        idxFile += 1;                        
                    }
                }                
            }
        }
    }
    
    totalCount = idxFolder + idxFile;
    
    if (totalCount >= 12) {
        ironSlider.visible = true;
        folderSlider.visible = true;
    } else {
        ironSlider.visible = false;
        folderSlider.visible = false;
    }
    
    dprint("Filesystem valid folder count - adding " + idxFolder + " valid folders to list.");    
    for (a = 0; a < idxFolder; a += 1) {
            finalListing[a] = tmpFolderList[a] ;
    }
    dprint("Filesystem valid file count - adding " + idxFile + " valid files to list.");
    j = 0;
    for (a = idxFolder; a < totalCount; a += 1) {
            finalListing[a] = tmpFileList[j] ;
            j+= 1; 
    }

    if (driveFound === true) {
        folderListPopulate(0);
    } else {
        removeFolderListStyling();
        folderListPopulate(0);
        //fileSystemListText[0].style.color = "white";
        //fileSystemListText[0].style.backgroundColor = "#340505";
    }
    
};
//=====================
//End function
//=====================



//=====================
// stub function to set the background on the single-clicked tracks
//=====================
fileSystemListText.forEach(function (ele,i) {
    ele.onMouseDown = function () {
        removeFolderListStyling();
        //only style if the element's data is populated
        if (ele.data != null && ele.data != "" && ele.data != undefined) {
            ele.style.color = "white";
            ele.style.backgroundColor = "#340505";
        }
        selectChosen(ele.data,i); 
    };
});
//=====================
//  END function
//=====================


//=====================
// stub function to select and set the background on the single-clicked tracks using the folder icons
//=====================
fileSystemIcon.forEach(function (ele, i) {
    ele.onMouseDown = function () {
        removeFolderListStyling();
    
        //only style if the element's data is populated
        if (fileSystemListText[i].data != null && fileSystemListText[i].data != "" && fileSystemListText[i].data != undefined) {
            fileSystemListText[i].style.color = "white";
            fileSystemListText[i].style.backgroundColor = "#340505";
        }
        selectChosen(fileSystemListText[i].data,i); 
    };
});
//=====================
//  END function
//=====================


//=====================
// stub function to select and set the background on the single-clicked tracks using the folder icons
//=====================
function selectChosen(partialPath,i) {
    
        var thisFolder = "";
        previousFolder = currentFolder;
        //clear the styling
        folderSlotNo = i;

        // happy to select regardless
        if (fsElementToFind === "folder") {
            if (preferences.showFolderPref.value === "short") {
                thisFolder = currentFolder + "\\" + partialPath;               
            } else {
                thisFolder = partialPath; 
            }
            
            if (filesystem.isDirectory(thisFolder)) {
                //print("is dir");
                fileSystemElementSelected.data = thisFolder;
            } else {
                //print("is file");
                fileSystemElementSelected.data = currentFolder;//findParent(fileSystemElementSelected.data);
            }
        } else { //files
            if (filesystem.isDirectory(partialPath)) {
                //print("is dir");
                //fileSystemElementSelected.data = ele.data;
            } else {
                //print("is file");
                //fileSystemElementSelected.data = currentFolder;//findParent(fileSystemElementSelected.data);
                fileSystemElementSelected.data = currentFolder;
            }
        }
        print("folderSlotNo "+folderSlotNo);
}
//=====================
//  END function
//=====================



//=====================
// stub function to set the background on the multi-clicked tracks and process the folder
//=====================
fileSystemListText.forEach(function (ele) {
    ele.onMultiClick = function () {
        processFileFolder(ele.data);
        
                    
        folderSlotNo = 0;
        increment = 0; 
        
    };
});
//=====================
//  END function
//=====================


//=====================
// stub function to set the background on the multi-clicked tracks but using the folder icons
//=====================
fileSystemIcon.forEach(function (ele, i) {
    ele.onMultiClick = function () {
        processFileFolder(fileSystemListText[i].data);
           
                                folderSlotNo = 0; 
                                increment = 0; 
    };
});
//=====================
//  END function
//=====================


//=====================
// actual functions to set the background on the multi-clicked tracks and process the folder
//=====================
function processFileFolder(partialPathPassed) {
    
        var thisFolder = "";
        backIcon.visible = true;

        folderBusyStart();        
        sleep(30);        
        previousFolder = currentFolder;
                        
        if (preferences.showFolderPref.value === "short" && driveFound === false) {
            thisFolder = currentFolder + "\\" + partialPathPassed;               
        } else {
            thisFolder = partialPathPassed; 
        }

        folderSlotNo = 0; 
        increment = 0; 
        if (filesystem.isDirectory(thisFolder)) {
            if (preferences.soundpref.value === "enabled") {
                if (filesystem.itemExists(page)) {
                    play(page, true);
                }
            }
            //print("drilling down");
            fileSystemElementSelected.data = thisFolder;
            currentFolder = fileSystemElementSelected.data;
            
            breadCrumbPos = breadCrumbPos + 1;
            breadcrumbList[breadCrumbPos] = currentFolder;
            print("breadcrumbList["+breadCrumbPos+"]  "+ breadcrumbList[breadCrumbPos] );
            driveFound = false;

            readFolderList(fileSystemElementSelected.data);
            
        } else {
        
            if (fsElementToFind === "file") {
                okButton.onMouseDown();
            } else {
    
                if (preferences.soundpref.value === "enabled") {
                    if (filesystem.itemExists(ting)) {
                        play(ting, false);
                    }
                }
            
                function okCallB() {
                    //alert("OK button was pressed.");
                }
                
                function cancelCallB() {
                    //alert("Cancel button was pressed.");
                }
                
                function timeoutCallB() {
                    //alert("Timeout fired.");
                }
                
                var aw = newAlertBox("AlertBox", 30, okCallB, cancelCallB, timeoutCallB);
                aw.open("This is the Folder Selection Window\nbut you have inadvertently selected a file.\n\nReturn to the folder window and press the Select button to choose the current folder.");

            }
            folderBusyStop();  // stop the hourglass timer
        }
}
//=====================
//  END function
//=====================



//=====================
//function to select the default folder when clicking on the background
//=====================
scroll.onMouseDown = function () {            
    fileSystemElementSelected.data = currentFolder;//findParent(fileSystemElementSelected.data);
}
//=====================
//  END function
//=====================




//=====================
//function to select the folder for playing and close the folder window
//=====================
okButton.onMouseDown = function () {
    var o;

    folderWindow.visible = false;
    if (fsElementToFind === "file") {
        if (fileSystemElementSelected.data === null || fileSystemElementSelected.data ==="") {
            return;
        }
        chosenFile = convertPathToPlatform(currentFolder + "\\" + fileSystemElementSelected.data);

        // a validate type check is not strictly required here as the validation is performed within chooseFile
        playOverride = false;               //<< DB01
        playFile(chosenFile);        
                
    }
    if (fsElementToFind === "folder") {
        previousChosenFolder = chosenFolder;
        chosenFolder = fileSystemElementSelected.data;
        preferences.musicFolderPref.value = chosenFolder;
        
    	if ((chosenFolder.length === 3) && (folderPath.substr(1, 1) === ":")) { // does it need to do all this consider it has handled later - test
            o = chosenFolder.substr(0, 2);
            if (CDROMcount !== 0) {
                if (o === CDROM.Item(cdRomNo).driveSpecifier) {
                    cdMenuItem.caption = "Audio CD Drive (" + CDROM.Item(cdRomNo).driveSpecifier + ")"; //this line does nothing, it should...
                    playAudioCD(0, CDROM.Item(cdRomNo).Playlist);
                } else {
    				stateRoot();
                }
            } else {
    			stateRoot();
            }
            return; //exit point
        }
        
        openFolderToPlay();
    }
    
};
//=====================
//End function
//=====================

//=====================
//function to cancel the window
//=====================
cancelButton.onMouseDown = function () {
    folderWindow.visible = false;
};
//=====================
//End function
//=====================

//=====================
//function to cancel the window
//=====================
xButton.onMouseDown = function () {
    folderWindow.visible = false;
};
//=====================
//End function
//=====================


//=====================
//function to determine the parent folder
//=====================
function findParent(path) {
    var idx = path.lastIndexOf("\\");
    if (idx >= 0) {
        return path.substring(0, idx);
    }
    idx = path.lastIndexOf("/");            
    if (idx >= 0) {                         
        return path.substring(0, idx);      
    }                                       
    return path;   
}
//=====================
//End function
//=====================


//=====================
//function to extract just the folder name and no file name
//=====================
function justFolderName(path) {
    var idx = path.lastIndexOf("\\");
    if (idx >= 0) {
        return path.substring(idx+1);
    }
    idx = path.lastIndexOf("/");            
    if (idx >= 0) {                         
        return path.substring(idx+1);      
    }                                       
    return path;   
}
//=====================
//End function
//=====================



//=====================
//function to create the folder window menu
//=====================
function setFolderMenu() {
    var items = [], mItem, cdMenuItem, sItem;

    mItem = new MenuItem();
    mItem.title = "File/Folder Help";
    mItem.onSelect = function () {
        folderHelpScreen();
    };
    items.push(mItem);
    
    mItem = new MenuItem();
    mItem.title = "Refresh Folder (F5)";
    mItem.onSelect = function () {
        folderWindow.visible = false;
        refreshFolder();
        folderWindow.visible = true;
    };
    items.push(mItem);


    folderWindow.contextMenuItems = items;
}
//=====================
//End function
//=====================


//=====================
//function to highlight the cancel button
//=====================
cancelButton.onMouseEnter = function () {
    cancelButton.src =  base + "cancelbuttonOver.png";
}
//=====================
//End function
//=====================

//=====================
//function to clear the cancelButton highlight
//=====================
cancelButton.onMouseExit = function () {
    cancelButton.src = base + "cancelbutton.png";
}
//=====================
//End function
//=====================


//=====================
//function to highlight the cancel button
//=====================
okButton.onMouseEnter = function () {
    okButton.src = base + "okbuttonOver.png";
}
//=====================
//End function
//=====================

//=====================
//function to clear the okButton highlight
//=====================
okButton.onMouseExit = function () {
    okButton.src = base + "okbutton.png";
}
//=====================
//End function
//=====================

//=====================
//function to display the path on a hover over the icon
//=====================
upIcon.onMouseEnter = function () {
    var fpath;
    driveFound = false;
    if (currentFolder === "")
    {
        currentFolder = preferences.currentMusicFolderPref.value;
    }
    fpath = currentFolder;
    fpath = convertPathToPlatform(fpath);
   
   
    // check if it is a drive, if so allow the mouseEnter to state drive root
    vols = filesystem.volumes; //objects
    for (a = 0; a < vols.length; a += 1) {
        if (fpath === findParent(vols[a].path)) {
            print(">>>>>>>>>> vols[a].path: " + findParent(vols[a].path));
            driveFound = true;
        }
    }
    fpath = findParent(fpath);
    
    if (driveFound === true) {
        upIcon.tooltip = "Up to drive root";
    } else {
        upIcon.tooltip = "Up to " + fpath;        
    }
};
//=====================
//End function
//=====================

//=====================
//function to select the parent folder above
//=====================
upIcon.onMouseUp = function () {
    var fpath;
    driveFound = false;
    if (currentFolder === "")
    {
        currentFolder = preferences.currentMusicFolderPref.value;
    }
    fpath = currentFolder;
    fpath = convertPathToPlatform(fpath);

    folderBusyStart();
    //newSleep(300);
    sleep(30);

    //busyTimer.ticking = true;
    
    if (preferences.soundpref.value === "enabled") {
        if (filesystem.itemExists(ting)) {
            play(ting, false);
        }
    }
    backIcon.visible = true;

    previousFolder = currentFolder;

    // need to check if root and disallow selection
    removeFolderListStyling();
    
    // check if it is a drive, if so set a flag
    vols = filesystem.volumes; //objects
    for (a = 0; a < vols.length; a += 1) {
        if (fpath === findParent(vols[a].path)) {
            print(">>>>>>>>>> vols[a].path: " + findParent(vols[a].path));
            driveFound = true;
        }
    }

    
    dprint("Drive driveFound " + driveFound);
    
    fpath = currentFolder;
    fpath = convertPathToPlatform(fpath);
    fpath = findParent(fpath);
    
    breadCrumbPos = breadCrumbPos - 1;
    if (breadCrumbPos <=0) {
        breadCrumbPos = 0;
    }
    
    //upIcon.tooltip = fpath;
    
    fileSystemElementSelected.data = fpath;
    currentFolder = fileSystemElementSelected.data;
    
    folderSlotNo = 0;  
    increment = 0;
    
    if (fileSystemElementSelected.data !== "") {
        readFolderList(fileSystemElementSelected.data);        
    } else {
        //print("DEBUG >>>>>>>>>>>>>>>>>>> folder had a wobble, setting the folder list to the default" ); 
        alert("folder had a wobble, setting the folder list to the default")   
        readFolderList(preferences.musicFolderPref.value);        
    }
};
//=====================
//End function
//=====================


//=====================
//function to select the parent folder above (will be breadcrumbs soon)
//=====================
backIcon.onMouseUp = function () {
    var fpath;
    
    //save the currentfolder
    var savCurrentFolder = fileSystemElementSelected.data;
    var newCurrentFolder = previousFolder;
    //read the previous folder as the current and display
    readFolderList(newCurrentFolder);
    currentFolder = newCurrentFolder;
    // the old current folder is now the previous folder
    previousFolder = savCurrentFolder;
    
    fpath = currentFolder;
    fpath = convertPathToPlatform(fpath);
    fpath = findParent(fpath);
    
    
    breadCrumbPos = breadCrumbPos - 1;
    if (breadCrumbPos <=0) {
        breadCrumbPos = 0;
    }
    //breadcrumbList[breadCrumbPos] = currentFolder;
    print("breadcrumbList["+breadCrumbPos+"]  "+ breadcrumbList[breadCrumbPos] );
    
    //currentFolder =  breadcrumbList[breadCrumbPos];
    //readFolderList(currentFolder);
    
        //print(">>>>>>>>>>>>>>>>>>>>>>backIcon.onMouseUp  ");
        //print(">>>>>>>>>>>>>>>>>>>>>>currentFolder "+  currentFolder);
        //print(">>>>>>>>>>>>>>>>>>>>>>previousFolder "+  previousFolder);
    
    
    upIcon.tooltip = fpath;

};
//=====================
//End function
//=====================


//=====================
//function to go show the previous folder when hovered over
//=====================
backIcon.onMouseEnter = function () {
    backIcon.tooltip = "Back to " + previousFolder;
    
    //print(">>>>>>>>>>>>>>>>>>>>>>backIcon.onMouseEnter  ");
    //print(">>>>>>>>>>>>>>>>>>>>>>currentFolder "+  currentFolder);
    //print(">>>>>>>>>>>>>>>>>>>>>>previousFolder "+  previousFolder);
    
};
//=====================
//End function
//=====================


//=====================
//function to open default explorer 
//=====================
explorer.onMouseUp = function () {
    var savChosenFolder = chosenFolder ; // this needs to be saved for a main explorer cancel
    folderWindow.visible = false;
    chosenFolder = ""; // this needs to be set for the explorer window to show

    if (fsElementToFind === "folder") {
        openFolderToPlay();
        print("chosenFolder "+chosenFolder);
        if (chosenFolder === null){ //if the user cancels, restores the previous chosen folder
            chosenFolder = savChosenFolder;
        }
    } else {
        var fileName = chooseFile(validTypes); //old method
    }
};
//=====================
//End function
//=====================

//=================================
// Function called externally by mediaplayer that opens this folder window 
//=================================
function selectFolderToPlay() {
    if (preferences.soundpref.value === "enabled") {
        if (filesystem.itemExists(winding)) {
            play(winding, false);
        }
    }
    browseFolder.src = base + "xp-browse-folder.png";
    okButton.tooltip = "Click to select the highlighted folder for playing";
    fileSystemElementSelected.tooltip = "Clicking Select will ready this folder to play";
    
    fsElementToFind = "folder";
    if (preferences.currentMusicFolderPref.value === previousChosenFolder) {
        fileSystemElementSelected.data = preferences.currentMusicFolderPref.value;
    }
    folderWindow.visible = true;
}
//=================================
// end function
//=================================


//=================================
// Function to select a file - simply makes the folder window visible
//=================================
function selectFileToPlay() {
    if (preferences.soundpref.value === "enabled") {
        if (filesystem.itemExists(winding)) {
            play(winding, true);
        }
    }
    browseFolder.src = base + "xp-browse-file.png";
    okButton.tooltip = "Click to select the highlighted file for playing";
    fileSystemElementSelected.tooltip = "Clicking Select will ready this file to play";

    fsElementToFind = "file";
    fileSystemElementSelected.data = "";
    folderWindow.visible = true;
}
//=================================
// end function
//=================================


//=====================
//function to remove Folder List Styling
//=====================
folderSlider.onMouseDown = function () {
	removeFolderListStyling();
};
//=================================
// end function
//=================================


//=====================
//function to handle the indicator dragged down
//=====================
folderSlider.onMouseDrag = function (event) {                                                                     // scaled
    var y = event.vOffset - 30;
    var max = 360;
    var min = 100;
    var factor = 0;
    var sliderFactor = 0;
    

    // before we get here we have read the whole folder list so we know
    // how many file/folder elements are in the folder.
    // get the total number of file/folder elements and show them here
    
    print( "totalCount " +totalCount);
    
    // therefore we know how to proportion the slider in comparison to the 
    // number of files. 
    
    sliderFactor = 260 / totalCount;
    print( "260 / totalCount " + sliderFactor);
   
    
    // height of slider vs no of files - show that here
    
    // the first thing to do is to remove the spring back functiona of the slider
    // done
    

    
    // then add the code to read the position of the slider in proportion to the 
    // potential whole travel and read the file selection from that position
    

    if (y >= max) {
        y = max;
    }
    if (y <= min) {
        y = min;
    }
    folderSlider.vOffset = Math.round(y);
    
        // and position the slider in the location of the current file window.
        
        //folderSlider.voffset = 100+(sliderFactor*);
    
    //factor = parseInt((folderSlider.vOffset - 220) / 10);
    if (y === max) {
        //increment = increment + 1;
        //increment = increment + 1 + factor;
        selectNext();
    }
    if (y === min) {
        //increment = increment - 1;
        //increment = factor;
        selectPrevious();
    }
    if ((y !== max) && (y !== min)) {
        increment = 0;
    }
    
     /*       
        if (increment + folderSlotNo >= totalCount -1) {
            folderSlotNo = (totalCount -1) - increment;
        }
        if (folderSlotNo > 11) {
            folderSlotNo = 11;
            increment = increment + 1;
            if (increment >= totalCount+11) {
                increment = totalCount;
            } 
            folderListPopulate(increment);	    
        }
    */
    
/*    
    if (factor + increment >= totalCount+11) {
        folderListPopulate(increment);
    } else {
        folderListPopulate(factor + increment);
    }
*/
};
//=================================
// end function
//=================================




//=====================
//function to put the slider back to the middle position
//=====================
folderSlider.onMouseUp = function () {
    //folderSlider.vOffset = 220;
    //increment = 0;
};
//=================================
// end function
//=================================


//===================================
// function to capture a mousewheel event
//===================================
browseFolder.onMouseWheel = function (event) {
    if (event.scrollDelta > 0) {
        selectPrevious();
    } else if (event.scrollDelta < 0) {
        selectNext();
    }
};
//=====================
//End function
//=====================


/*
//=====================================================================
// this was an earlier attempt at getting the folder object to function
// no longer works under Windows 7 and above for a normal user.
// still works OK in jscript for Windows but not javascript for webkit as the o/s denies permission
// we could call jscript and get it to do the dirty work but that is a bit of a kludge.

// ** if the COM object was added to the widget.xml security list for allowed COM objects then it might still work **
// ** yet to be tried **

function readFolderList2(folderPath) {
    //var objShell = new ActiveXObject("shell.application"); //xwidget version
    var objShell = COM.createObject("Shell.Application");    //ywidget version
    var ssfWINDOWS = 36;
    var objFolder;

    COM.connectObject(objShell, "SHE_");

    objFolder = objShell.BrowseForFolder(0, "Example", 0, ssfWINDOWS);
    if (objFolder !== null) {
        // Add code here.
    }
}
*/


//===============================================================
// this function defines the keyboard events captured
//===============================================================
folderWindow.onKeyDown = function(event) {
        //dprint("%KON-I-INFO, pressing key " + system.event.keyCode);

        if (system.event.keyCode === 116) {                
            dprint("%KON-I-INFO, pressing F5 key " + system.event.keyCode);
            folderWindow.visible = false;
            refreshFolder();
            folderWindow.visible = true;
        }

        if (system.event.keyCode === 40) {
                //dprint("%KON-I-INFO, pressing Down key " + system.event.keyCode);
                selectNext();
        }
        if (system.event.keyCode === 38) {
            //dprint("%KON-I-INFO, pressing up key " + system.event.keyCode);
                selectPrevious();
        }
    // opens the currently selected folder on a CR
        if (system.event.keyCode === 13) {
            //dprint("%KON-I-INFO, pressing enter key " + system.event.keyCode);
            backIcon.visible = true;

            processFileFolder(fileSystemListText[folderSlotNo].data);
                        
            folderSlotNo = 0; 
            increment = 0; 
    
        }
    // selects the first folder /file in the list
        if (system.event.keyCode === 36) {
            //if (event.ctrlKey) {  //if the user is selecting the control key as well as the C key
                //dprint("%KON-I-INFO, pressing HOME key " + system.event.keyCode);
                folderSlotNo = 0;
                increment = 0;
                
                folderListPopulate(folderSlotNo);	
				removeFolderListStyling();
                fileSystemListText[folderSlotNo].style.color = "white";
				fileSystemListText[folderSlotNo].style.backgroundColor = "#340505";
            //}
        }
        // selects the last folder /file in the list
        if (system.event.keyCode === 35) {
           //if (event.ctrlKey) {  //if the user is selecting the control key as well as the C key
                //dprint("%KON-I-INFO, pressing END key " + system.event.keyCode);

                //folderSlotNo goes from 0 to 11
                folderSlotNo = (totalCount -1) ;
                
                if (totalCount > 11) {
                    folderSlotNo = 11;
            
                    var readPoint = totalCount - 12;
                    folderListPopulate(readPoint);	    
                }
                
                print("folderSlotNo "+folderSlotNo);
                print("readPoint "+readPoint);

                if (filesystem.isDirectory(fileSystemListText[folderSlotNo].data)) {
                    fileSystemElementSelected.data = fileSystemListText[folderSlotNo].data;
                } else {
                    fileSystemElementSelected.data = currentFolder;
                }
                //clear and set the styling
                removeFolderListStyling();
                fileSystemListText[folderSlotNo].style.color = "white";
                fileSystemListText[folderSlotNo].style.backgroundColor = "#340505";
        }
    // press &Play
        if (system.event.keyCode === 80) {
            okButton.onMouseDown(); // play it        
        }
    //  press &Cancel
        if (system.event.keyCode === 67) {
            cancelButton.onMouseDown();         
        }
    //  press Escape
        if (system.event.keyCode === 27) {
            cancelButton.onMouseDown();         
        }
   };
//=====================
//End function
//=====================

//=====================
// Function to select the next folder in the list using scrolldown
//=====================
 function selectNext() {
    folderSlotNo = folderSlotNo + 1;
        
    if (increment + folderSlotNo >= totalCount -1) {
        folderSlotNo = (totalCount -1) - increment;
    }
    if (folderSlotNo > 11) {
    	folderSlotNo = 11;
        increment = increment + 1;
        if (increment >= totalCount+11) {
            increment = totalCount;
        } 
        folderListPopulate(increment);	    
    }
    
    print("folderSlotNo "+folderSlotNo);
    print("increment "+increment);
   
    if (preferences.showFolderPref.value === "short" && driveFound === false) {
         thisFolder = currentFolder + "\\" + fileSystemListText[folderSlotNo].data;               
     } else {
         thisFolder = fileSystemListText[folderSlotNo].data; 
     }

    if (filesystem.isDirectory(thisFolder)) {
        fileSystemElementSelected.data = thisFolder;
        //fileSystemElementSelected.data = fileSystemListText[folderSlotNo].data;   
    } else {
        fileSystemElementSelected.data = currentFolder;
    }
    //clear and set the styling
    removeFolderListStyling();
    fileSystemListText[folderSlotNo].style.color = "white";
    fileSystemListText[folderSlotNo].style.backgroundColor = "#340505";
    
 }
//=====================
//End function
//=====================

//=====================
// re-read the file/folder list
//=====================
 function refreshFolder() {
            readFolderList(currentFolder);
 }
//=====================
//End function
//=====================


//=====================
// Function to select the previous folder in the list using scrolldown
//=====================
function selectPrevious() { 
    folderSlotNo = folderSlotNo - 1;

    //not correct yet
    if (folderSlotNo <= 0) {
    	folderSlotNo = 0;
        increment = increment - 1;
        if (increment <= 0) {
            increment = 0;
        }
        folderListPopulate(increment);	    
    }
    print("folderSlotNo "+folderSlotNo);
    print("increment "+increment);

    if (preferences.showFolderPref.value === "short" && driveFound === false) {
         thisFolder = currentFolder + "\\" + fileSystemListText[folderSlotNo].data;               
     } else {
         thisFolder = fileSystemListText[folderSlotNo].data; 
     }

    if (filesystem.isDirectory(thisFolder)) {
        fileSystemElementSelected.data = thisFolder;
        //fileSystemElementSelected.data = fileSystemListText[folderSlotNo].data;   
    } else {
        fileSystemElementSelected.data = currentFolder;  //only shows the current folder
    }

    //clear the styling
    removeFolderListStyling();
    fileSystemListText[folderSlotNo].style.color = "white";
    fileSystemListText[folderSlotNo].style.backgroundColor = "#340505";
 }
//=====================
//End function
//=====================

//===========================================
// this function opens the online help file
//===========================================
function folderHelpScreen() {
	//print("playlistFrame.visible " + playlistFrame.visible);

  	if (preferences.soundpref.value === "enabled") {
		if (filesystem.itemExists(steamSound)) {
            play(steamSound, false);
        }
  	}
		folderHelpLayer.visible = true;
}
//=====================
//End function
//=====================




//=====================
//functions to close the folder help layer
//=====================
folderHelpLayer.onMultiClick = function () {            
		folderHelpLayer.visible = false;
}
folderHelpWindowClose.onMouseDown = function() {
        folderHelpLayer.visible = false;
}
//=====================
//  END function
//=====================

//=====================
//function to select long or short folder names
//=====================
toggle.onMouseDown = function () { 
    if (preferences.soundpref.value === "enabled") {
        if (filesystem.itemExists(lock)) {
            play(lock, false);
        }
    } 
    if (preferences.showFolderPref.value === "short") {
        preferences.showFolderPref.value = "long";
        toggle.hOffset = 60;
        toggle.tooltip = "Click to display short folder names"
    } else {
        preferences.showFolderPref.value = "short";
        toggle.hOffset = 30;
        toggle.tooltip = "Click to display full paths in folder names"
    }
    refreshFolder();
}
//=====================
//  END function
//=====================

//=====================
//function to select the default folder when clicking on the background
//=====================
hButton.onMouseDown = function () { 
    if (preferences.soundpref.value === "enabled") {
        if (filesystem.itemExists(lock)) {
            play(lock, false);
        }
    } 
    folderHelpScreen();
}
//=====================
//  END function
//=====================




//===========================================
// Function to stop the rotating timers
//===========================================
function folderBusyStop() {
    folderBusyTimer.ticking = false;
    folderBusy.visible = false;
    folderBusyBlur.visible = false;

}
//=====================
//End function
//=====================


//===========================================
// Function to start the rotating timers
//===========================================
function folderBusyStart() {
    folderBusyTimer.ticking = true;
    folderBusy.visible = true;
    folderBusyBlur.visible = true;
}
//=====================
//End function
//=====================




//=====================
// end folder.js
//=====================