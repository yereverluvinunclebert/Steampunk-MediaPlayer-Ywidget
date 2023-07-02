//===========================================================================
// functions.js
// Steampunk Media Player widget  1.0.14
// Originally written and Steampunked by: Dean Beedell
// aqqc35@dsl.pipex.com
// Vitality code, Mac compatibility, external player, rejigging, advice, code
// enhancements and patience from Harry Whitfield
//
//===========================================================================

/*jslint for, multivar */

/* property
    Item, Playlist, altKey, contextMenuItems, data, displayLicence,
    driveSpecifier, event, extractFile, fontsize, getDisplayName, hOffset,
    hRegistrationPoint, hasOwnProperty, height, hoffsetpref, imageCmdPref,
    isDirectory, itemExists, locked, maxWidthPref, musicFolderPref,
    musicFolderPref2, musicFolderPref3, musicFolderPref4, musicFolderPref5,
    onMouseDown, onRunCommandInBgComplete, onSelect, open, openFilePref, path,
    push, reveal, round, soundpref, style, title, tooltip, tooltipPref,
    userWidgetsFolder, vOffset, vRegistrationPoint, value, visible,
    voffsetpref, volumes, widgetDataFolder, widgetLockPref, widgetTooltip,
    width
*/

"use strict";

var mainWindow, mainWindowwidthDefault, mainWindowheightDefault,
        cableWheelSet, cableWheelSethoffsetDefault, cableWheelSetvoffsetDefault,
        cableWheelSetwidthDefault, cableWheelSetheightDefault, cable, cablehoffsetDefault,
        cablevoffsetDefault, cablewidthDefault, cableheightDefault, pipes, pipeshoffsetDefault,
        pipesvoffsetDefault, pipeswidthDefault, pipesheightDefault, bell, bellhoffsetDefault,
        bellvoffsetDefault, bellwidthDefault, bellheightDefault, indicatorRed,
        indicatorRedhoffsetDefault, indicatorRedvoffsetDefault, indicatorRedwidthDefault,
        indicatorRedheightDefault, speaker, speakerhoffsetDefault, speakervoffsetDefault,
        speakerwidthDefault, speakerheightDefault, bar, barhoffsetDefault, barvoffsetDefault,
        barwidthDefault, barheightDefault, sliderSet, sliderSethoffsetDefault,
        sliderSetvoffsetDefault, sliderSetwidthDefault, sliderSetheightDefault, percentTextShadow,
        percentTextShadowhoffsetDefault, percentTextShadowvoffsetDefault, percentTextShadowfontDefault,
        percentText, percentTexthoffsetDefault,
        percentTextvoffsetDefault, percentTextfontDefault, tingingSound, startup, scale,
        lockArea, lockAreaLocked, endPipe, positionSlider, pipesRight, autoPlayLug, playButton,
        pauseButton, nextButton, prevButton, trackNameText, trackNoText, playlistArea,
        playListTitle, playListPage, playListText0, playListText1, playListText2,
        playListText3, playListText4, playListText5, playListText6, playListText7,
        playListText8, playListText9, playListText10, playListText11,
        prevChunk, nextChunk, firstChunk, lastChunk, tap, chain, buttonConfig, keyf, keyd, keyv, keyc,
        sButton, oButton, ovalButton, deleteButton0, deleteButton1, deleteButton2,
        deleteButton3, deleteButton4, deleteButton5, deleteButton6, deleteButton7,
        deleteButton8, deleteButton9, deleteButton10, deleteButton11, debugFlg,
        addSingleTrack, selectFolderToPlay, playerState, chosenFolder, path,
        readFolderRecursively, updatePlayList, CDROM, CDROMcount, cdRomNo, playAudioCD,
        LICENCE, busy, lock, hprint, lprint, autoPlayLugEnabled, trackNameShadow,
        keyViewScreen, keyFullScreen, setVolumeSlider, myFrame, helpWindow, isMacintosh,
        connectingChainLeft, connectingChainRight, playListSlider, bracket, playListTap, steamSound,
        playlistFrame, helpLayer2, helpLayer1, partlySelectedFullTrack, searchForTrack,
        speaker0, playListPageBackG, keyu, dprint;
        
        //include("setMenu.js");


//======================================================================================
// Function to move the mainWindow onto the main screen
//======================================================================================
function mainScreen() {
// if the widget is off screen then move into the viewable window
    //preferences.musicFolderPref.value = "C:\Documents and Settings\All Users\Documents\My Music";
    if (preferences.hoffsetpref.value > 0) {
        mainWindow.hOffset = parseInt(preferences.hoffsetpref.value, 10);
    }
    if (preferences.voffsetpref.value > 0) {
        mainWindow.vOffset = parseInt(preferences.voffsetpref.value, 10);
    }

    if (mainWindow.hOffset < 0) {
        mainWindow.hOffset = 10;
    }
    if (mainWindow.vOffset < 32) {
        mainWindow.vOffset = 32; // avoid Mac toolbar
    }
    if (mainWindow.hOffset > screen.width - 50) {
        mainWindow.hOffset = screen.width - mainWindow.width;
    }
    if (mainWindow.vOffset > screen.height - 50) {
        mainWindow.vOffset = screen.height - mainWindow.height; // avoid Mac toolbar
    }
}
//=====================
//End function
//=====================

//======================================================================================
// Function to scale the image
//======================================================================================
function scaleImage(o, hOffset, vOffset, width, height, hRegP, vRegP) {
    scale = Number(preferences.maxWidthPref.value) / 100;   // sets global scale because it is used elsewhere
    o.width = Math.round(scale * width);
    o.height = Math.round(scale * height);
    //hprint("**SCALE**" + scale);
    hRegP = hRegP || 0;                     // hRegP and vRegP are optional parameters
    vRegP = vRegP || 0;

    hOffset += hRegP;
    vOffset += vRegP;

    o.hOffset = Math.round(scale * hOffset);
    o.vOffset = Math.round(scale * vOffset);

    o.hRegistrationPoint = Math.round(scale * hRegP);
    o.vRegistrationPoint = Math.round(scale * vRegP);
}
//=====================
//End function
//=====================

//======================================================================================
// Function to scale the text
//======================================================================================
function scaleText(o, hOffset, vOffset, width, height, fontSize) {
    scale = Number(preferences.maxWidthPref.value) / 100;   // sets global scale because it is used elsewhere
    o.width = Math.round(scale * width);
    o.height = Math.round(scale * height);

    o.hOffset = Math.round(scale * hOffset);
    o.vOffset = Math.round(scale * vOffset);

    o.style.fontsize = (fontSize * scale + "px");
}
//=====================
//End function
//=====================

//===============================
// function to resize all layers
//===============================
function resize() {
    scale = Number(preferences.maxWidthPref.value) / 100;   // sets global scale because it is used elsewhere
    log("Resizing: preferences.maxWidthPref.value: " + preferences.maxWidthPref.value);
    log("scale: " + scale);

    //main_frame.hoffset = 32 * scale;
    //main_frame.voffset = 32 * scale;

    //mainWindow.height = mainWindowheightDefault * scale;
    //mainWindow.width  = mainWindowwidthDefault * scale;

    //scaleImage(o, hOffset, vOffset, width, height, hRegP, vRegP) {
    scaleImage(cableWheelSet, 288, 81, 37, 39);
    scaleImage(cable, 224, 100, 130, 16);
    scaleImage(lockArea, 64, 18, 23, 78);
    scaleImage(lockAreaLocked, 61, 4, 25, 36);
    scaleImage(endPipe, 8, 18, 39, 78);
    scaleImage(pipes, 44, 19, 396, 78);
    scaleImage(positionSlider, 60, 30, 52, 27);
    scaleImage(pipesRight, 365, 72, 30, 17);
    scaleImage(autoPlayLug, 224, 19, 21, 21);
    scaleImage(autoPlayLugEnabled, 224, 3, 25, 36);

    scaleImage(bell, 264, 60, 33, 32);
    scaleImage(playButton, 265, 60, 32, 32);
    scaleImage(pauseButton, 266, 60, 32, 32);
    scaleImage(nextButton, 340, 64, 35, 32);
    scaleImage(prevButton, 317, 64, 35, 32);
    scaleImage(indicatorRed, 301, 65, 25, 25);
    scaleImage(speaker0, 247, 0, 95, 69);
    scaleImage(speaker, 247, 0, 95, 69);
    scaleImage(bar, 31, 66, 230, 29);
    scaleImage(sliderSet, 160, 49, 85, 84);

    scaleText(percentTextShadow, 27, 54, 30, 30, 14);
    scaleText(percentText, 26, 53, 30, 30, 14);
    scaleText(trackNameText, 85, 32, 208, 30, 13);
    scaleText(trackNameShadow, 85, 32, 208, 30, 13);
    scaleText(trackNoText, 10, 34, 47, 30, 13);

    scaleImage(connectingChainLeft, 90, 50, 23, 130);
    scaleImage(connectingChainRight, 290, 90, 23, 130);
    scaleImage(playListSlider, 45, 124, 21, 24);
    scaleImage(playlistArea, 50, 105, 340, 469);
    scaleImage(bracket, 315, 355, 21, 76);
    scaleText(playListTitle, 100, 170, 190, 24, 15);
    scaleText(playListPage, 142, 138, 108, 20, 15);
    scaleText(playListText0, 100, 200, 190, 24, 15);
    scaleText(playListText1, 100, 222, 190, 24, 15);
    scaleText(playListText2, 100, 244, 190, 24, 15);
    scaleText(playListText3, 100, 266, 190, 24, 15);
    scaleText(playListText4, 100, 288, 190, 24, 15);
    scaleText(playListText5, 100, 310, 190, 24, 15);
    scaleText(playListText6, 100, 332, 190, 24, 15);
    scaleText(playListText7, 100, 354, 190, 24, 15);
    scaleText(playListText8, 100, 376, 190, 24, 15);
    scaleText(playListText9, 100, 398, 190, 24, 15);
    scaleText(playListText10, 100, 420, 190, 24, 15);
    scaleText(playListText11, 100, 442, 190, 24, 15);
    scaleText(playListPageBackG, 142, 123, 108, 24, 15);

    scaleImage(prevChunk, 140, 450, 35, 32);
    scaleImage(nextChunk, 216, 450, 35, 32);
    scaleImage(firstChunk, 112, 450, 35, 32);
    scaleImage(lastChunk, 243, 450, 35, 32);
    scaleImage(tap, 296, 129, 20, 20);
    scaleImage(playListTap, 88, 128, 20, 20);
    scaleImage(chain, 326, 61, 23, 130);
    scaleImage(buttonConfig, 50, 90, 340, 468);
    scaleImage(keyu, 280, 185, 113, 47);
    scaleImage(keyf, 280, 222, 113, 47);
    scaleImage(keyd, 280, 259, 113, 47);
    scaleImage(keyViewScreen, 215, 350, 161, 43);
    scaleImage(keyFullScreen, 215, 390, 161, 43);
    scaleImage(sButton, 270, 450, 35, 32);
    scaleImage(oButton, 85, 450, 35, 32);
    scaleImage(ovalButton, 130, 470, 128, 32);

    scaleImage(deleteButton0, 75, 190, 20, 20);
    scaleImage(deleteButton1, 75, 212, 20, 20);
    scaleImage(deleteButton2, 75, 234, 20, 20);
    scaleImage(deleteButton3, 75, 256, 20, 20);
    scaleImage(deleteButton4, 75, 278, 20, 20);
    scaleImage(deleteButton5, 75, 300, 20, 20);
    scaleImage(deleteButton6, 75, 322, 20, 20);
    scaleImage(deleteButton7, 75, 343, 20, 20);
    scaleImage(deleteButton8, 75, 366, 20, 20);
    scaleImage(deleteButton9, 75, 387, 20, 20);
    scaleImage(deleteButton10, 75, 408, 20, 20);
    scaleImage(deleteButton11, 75, 430, 20, 20);

    setVolumeSlider(Number(preferences.volumePref.value));
    myFrame.visible = true;
}
//=====================
//End function
//=====================

//===========================================
// this function opens the online help file
//===========================================
function helpScreen() {
	//print("playlistFrame.visible " + playlistFrame.visible);

  	if (preferences.soundpref.value === "enabled") {
		play(steamSound, false);
  	}
  	if (playlistFrame.visible === true) {
		helpLayer2.visible = true;
  	} else {
		helpLayer1.visible = true;
	}
}
//=====================
//End function
//=====================

//===========================================
// this function opens the online help file
//===========================================
function menuitem1OnClick() {
    var answer = alert("This button opens a browser window and connects to the help page for this widget. Do you wish to proceed?", "Open Browser Window", "No Thanks");
    if (answer === 1) {
		openURL("https://www.facebook.com/profile.php?id=100012278951649");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens the URL for paypal
//===========================================
function menuitem2OnClick() {
    var answer = alert("Help support the creation of more widgets like this, send us a coffee! This button opens a browser window and connects to the Kofi donate page for this widget). Will you be kind and proceed?", "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("https://www.ko-fi.com/yereverluvinunclebert");
    }
}
//=====================
//End function
//=====================
//===========================================
// this function opens my Amazon URL wishlist
//===========================================
function menuitem3OnClick() {
    var answer = alert("Help support the creation of more widgets like this. Buy me a small item on my Amazon wishlist! This button opens a browser window and connects to my Amazon wish list page). Will you be kind and proceed?", "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("http://www.amazon.co.uk/gp/registry/registry.html?ie=UTF8&id=A3OBFB6ZN4F7&type=wishlist");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens other widgets URL
//===========================================
function menuitem5OnClick() {
    var answer = alert("This button opens a browser window and connects to the Steampunk widgets page on my site. Do you wish to proceed", "Open Browser Window", "No Thanks");
    if (answer === 1) {
		openURL("https://www.deviantart.com/yereverluvinuncleber/gallery/59981269/yahoo-widgets");
    }
}
//=====================
//End function
//=====================
//===========================================
// this function opens the download URL
//===========================================
function menuitem6OnClick() {
    var answer = alert("Download latest version of the widget - this button opens a browser window and connects to the widget download page where you can check and download the latest zipped .WIDGET file). Proceed?", "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("https://www.deviantart.com/yereverluvinuncleber/art/Steampunk-MediaPlayer-Ywidget-1-0-14a-780346607");
    }
}
//=====================
//End function
//=====================
//===========================================
// this function opens the browser at the contact URL
//===========================================
function menuitem7OnClick() {
    var answer = alert("Visiting the support page - this button opens a browser window and connects to our contact us page where you can send us a support query or just have a chat). Proceed?", "Open Browser Window", "No Thanks");
    if (answer === 1) {
		openURL("http://www.facebook.com/profile.php?id=100012278951649");
    }
}
//=====================
//End function
//=====================

//===========================================
// this function opens the browser at the contact URL
//===========================================
function facebookChat() {
    var answer = alert("Visiting the Facebook chat page - this button opens a browser window and connects to our Facebook chat page.). Proceed?", "Open Browser Window", "No Thanks");
    if (answer === 1) {
        openURL("http://www.facebook.com/profile.php?id=100012278951649");
    }
}
//=====================
//End function
//=====================

//=====================
// function to carry out a command
//=====================
function performCommand() {

    if (preferences.soundpref.value === "enabled") {
        play(tingingSound, false);
    }

   	print("preferences.imageEditPref.value " + preferences.imageEditPref.value);
   	runCommandInBg(preferences.imageEditPref.value, "runningTask");
}
//=====================
//End function
//=====================

//===========================================
// this function edits the widget
//===========================================
function editWidget() {
    //var answer = alert("Editing the widget. Proceed?", "Open Editor", "No Thanks");
    //if (answer === 1) {
		//uses the contents of editPref to initiate your default editor
	performCommand();
    //}
}
//=====================
//End function
//=====================

//===================================
// function to install the font
//===================================
function installFont() {
//  var extPath =
    widget.extractFile("Centurion Light SF.ttf");
    var answer = alert("I have extracted the centurion font to the widget data folder, the widget cannot install it as it does not have the privileges to do so. You will have to install it yourself by double clicking on it in Windows File Explorer, then clicking install. I will open that folder now. Do you wish to proceed?", "Open File Explorer", "No Thanks");
    if (answer === 1) {
        filesystem.reveal(system.widgetDataFolder + "/Centurion Light SF.ttf");
    }
    /*
    // no longer works under Windows 7 and above for a normal user.
    var objShell = COM.createObject("Shell.Application");
    COM.connectObject(objShell, "SHE_");
    objFolder = objShell.Namespace(system.widgetDataFolder);
    objFolderItem = objFolder.ParseName("Centurion Light SF.ttf");
    objFolderItem.InvokeVerb("Install");
    */
}
//=====================
//End function
//=====================

//===========================================
// this function causes explorer to be opened and the file selected
//===========================================
function findWidget() {

 // temporary development version of the widget
    var widgetFullPath = convertPathToPlatform(system.userWidgetsFolder + "/" + widgetName);
    var alertString = "The widget folder is: \n";
    if (filesystem.itemExists(widgetFullPath)) {
        alertString += system.userWidgetsFolder + " \n\n";
        alertString += "The widget name is: \n";
        alertString += widgetName + ".\n ";

        alert(alertString, "Open the widget's folder?", "No Thanks");

        filesystem.reveal(widgetFullPath);
    } else {
        widgetFullPath = resolvePath(".");   
        filesystem.reveal(widgetFullPath);
        print("widgetFullPath " + widgetFullPath);
    }
}
//=====================
//End function
//=====================

//===================================
// function to set the lock state
//===================================
function openMediaLocation() {
	partlySelectedFullTrack = convertPathToPlatform(partlySelectedFullTrack);
	if (filesystem.itemExists(partlySelectedFullTrack)) {
		// this command works on Xwidget
		//var dosCommand = "Explorer.exe /e, /select," + partlySelectedFullTrack;
		filesystem.reveal(partlySelectedFullTrack);
	}
}
//=====================
//End function
//=====================

//=========================================================================
// this function assigns the menu items
//=========================================================================
function setmenu() {
    var items = [], mItem, cdMenuItem, sItem;

    mItem = new MenuItem();
    mItem.title = "Select a file to play...";
    mItem.onSelect = function () {
        fsElementToFind = "file";
        readFolderList(preferences.currentMusicFolderPref.value) ;
        selectFileToPlay();
        addSingleTrack("local");
    };
    items.push(mItem);

    mItem = new MenuItem();
    mItem.title = "Select a folder to play";
    mItem.onSelect = function () {
        fsElementToFind = "folder";
        readFolderList(preferences.currentMusicFolderPref.value) ;
        selectFolderToPlay();
    };
    items.push(mItem);

    mItem = new MenuItem();
    mItem.title = "Play last used folder - " + convertPathToPlatform(preferences.musicFolderPref.value);
    mItem.onSelect = function () {
        playerState = "folder"; //this is to ensure that shuffle mode is respected
        if (filesystem.isDirectory(preferences.musicFolderPref.value)) {
            chosenFolder = preferences.musicFolderPref.value;
            preferences.currentMusicFolderPref.value = preferences.musicFolderPref.value;
            path = chosenFolder;
        } else {
            if (debugFlg === "1") {
                hprint("folder not found");
            }
            alert("The folder does not exist. Selecting the previous folder/playlist instead.");
        }
        readFolderRecursively(chosenFolder);
        updatePlayList();
    };
    items.push(mItem);

    mItem = new MenuItem();
    mItem.title = "Play previous folder - " + convertPathToPlatform(preferences.musicFolderPref2.value);
    mItem.onSelect = function () {
        playerState = "folder"; //this is to ensure that shuffle mode is respected
        if (filesystem.isDirectory(preferences.musicFolderPref2.value)) {
            chosenFolder = preferences.musicFolderPref2.value;
            preferences.currentMusicFolderPref.value = preferences.musicFolderPref2.value;
            path = chosenFolder;
        } else {
            if (debugFlg === "1") {
                hprint("folder not found");
            }
            alert("The folder does not exist. Selecting the previous folder/playlist instead.");
        }
        readFolderRecursively(chosenFolder);
        updatePlayList();
    };
    items.push(mItem);

    mItem = new MenuItem();
    mItem.title = "Play previous folder - " + convertPathToPlatform(preferences.musicFolderPref3.value);
    mItem.onSelect = function () {
        playerState = "folder"; //this is to ensure that shuffle mode is respected
        if (filesystem.isDirectory(preferences.musicFolderPref3.value)) {
            chosenFolder = preferences.musicFolderPref3.value;
            preferences.currentMusicFolderPref.value = preferences.musicFolderPref3.value;
            path = chosenFolder;
        } else {
            if (debugFlg === "1") {
                hprint("folder not found");
            }
            alert("The folder does not exist. Selecting the previous folder/playlist instead.");
        }
        readFolderRecursively(chosenFolder);
        updatePlayList();
    };
    items.push(mItem);

    mItem = new MenuItem();
    mItem.title = "Play previous folder - " + convertPathToPlatform(preferences.musicFolderPref4.value);
    mItem.onSelect = function () {
        playerState = "folder"; //this is to ensure that shuffle mode is respected
        if (filesystem.isDirectory(preferences.musicFolderPref4.value)) {
            chosenFolder = preferences.musicFolderPref4.value;
            preferences.currentMusicFolderPref.value = preferences.musicFolderPref4.value;
            path = chosenFolder;
        } else {
            if (debugFlg === "1") {
                hprint("folder not found");
            }
            alert("The folder does not exist. Selecting the previous folder/playlist instead.");
        }
        readFolderRecursively(chosenFolder);
        updatePlayList();
    };
    items.push(mItem);

    mItem = new MenuItem();
    mItem.title = "Play previous folder - " + convertPathToPlatform(preferences.musicFolderPref5.value);
    mItem.onSelect = function () {
        playerState = "folder"; //this is to ensure that shuffle mode is respected
        if (filesystem.isDirectory(preferences.musicFolderPref5.value)) {
            chosenFolder = preferences.musicFolderPref5.value;
            preferences.currentMusicFolderPref.value = preferences.musicFolderPref5.value;
            path = chosenFolder;
        } else {
            if (debugFlg === "1") {
                hprint("folder not found");
            }
            alert("The folder does not exist. Selecting the previous folder/playlist instead.");
        }
        readFolderRecursively(chosenFolder);
        updatePlayList();
    };
    items.push(mItem);

    //hprint("CDROM.count " + CDROM.count);
    //hprint(" CDROM.Item(drvCnt).driveSpecifier " + CDROM.Item(drvCnt).driveSpecifier);
    //hprint(" CDROM.Item(drvCnt).Playlist " + CDROM.Item(drvCnt).Playlist);

    if (CDROMcount !== 0) {
        if (CDROM.Item(cdRomNo)) {
            cdMenuItem = new MenuItem();
            cdMenuItem.title = "Audio CD Drive (" + CDROM.Item(cdRomNo).driveSpecifier + ")";
            cdMenuItem.onSelect = function () {
                if (debugFlg === "1") {
                    hprint("Audio CD Drive (" +  CDROM.Item(cdRomNo).driveSpecifier + ")");
                }
                playAudioCD(0, CDROM.Item(cdRomNo).Playlist);
            };
            items.push(cdMenuItem);
        }
    }

    mItem = new MenuItem();
    mItem.title = "Find Current Track Location";
    mItem.onSelect = function () {
        openMediaLocation();
    };
    items.push(mItem);

    mItem = new MenuItem();
    mItem.title = "Search Playlist";
    mItem.onSelect = function () {
        searchForTrack();
    };
    items.push(mItem);

    mItem = new MenuItem();
    mItem.title = "-";
    items.push(mItem);

    mItem = new MenuItem();
    mItem.title = "Install the Centurion Font";
    mItem.onSelect = function () {
        installFont();
    };
    items.push(mItem);
    


    mItem = new MenuItem();
    mItem.title = "-";
    items.push(mItem);

    mItem = new MenuItem();
    mItem.title = "Media Player Help";
    mItem.onSelect = function () {
        helpScreen();
    };
    items.push(mItem);

    mItem = new MenuItem();
    mItem.title = "Online Help and other online options";

    sItem = new MenuItem();
    sItem.title = "Online Help Page";
    sItem.onSelect = function () {
        menuitem1OnClick();
    };
    mItem.appendChild(sItem);

    sItem = new MenuItem();
    sItem.title = "Donate a Coffee with Ko-Fi";
    sItem.onSelect = function () {
        menuitem2OnClick();
    };
    mItem.appendChild(sItem);


    sItem = new MenuItem();
    sItem.title = "See More Steampunk Widgets";
    sItem.onSelect = function () {
        menuitem5OnClick();
    };
    mItem.appendChild(sItem);

    sItem = new MenuItem();
    sItem.title = "Download Latest Version";
    sItem.onSelect = function () {
        menuitem6OnClick();
    };
    mItem.appendChild(sItem);

    sItem = new MenuItem();
    sItem.title = "Contact Support";
    sItem.onSelect = function () {
        menuitem7OnClick();
    };
    mItem.appendChild(sItem);

    sItem = new MenuItem();
    sItem.title = "Chat about Steampunk Widgets on Facebook";
    sItem.onSelect = function () {
        facebookChat();
    };
    mItem.appendChild(sItem);

    items.push(mItem);

    mItem = new MenuItem();
    mItem.title = "Display Licence Agreement...";
    mItem.onSelect = function () {
        LICENCE.displayLicence();
    };
    items.push(mItem);

    mItem = new MenuItem();
    mItem.title = "-";
    items.push(mItem);

    mItem = new MenuItem();
    mItem.title = "Reveal Widget in Windows Explorer";
    mItem.onSelect = function () {
        findWidget();
    };
    items.push(mItem);

    mItem = new MenuItem();
    mItem.title = "Reload Widget (F5)";
    mItem.onSelect = function () {
        reloadWidget();
    };
    items.push(mItem);

    if ((preferences.imageEditPref.value !== "") && (debugFlg === "1")) {
        mItem = new MenuItem();
	    mItem.title = "Edit Widget using " + preferences.imageEditPref.value;
	    mItem.onSelect = function () {
			editWidget();
	    };
	    items.push(mItem);
	}

    mainWindow.contextMenuItems = items;
    //pipes.contextMenuItems = aitems
    //playlistArea.contextMenuItems = items
}
//=====================
//End function
//=====================

//==============================================================
// this function restricts the chosen folder from choosing the root
//==============================================================
function restrictRootFolder() {

    /// new code is non functional on Windows
	/*
    Object.keys(filesystem.volumes).forEach(function (vol) {
    	if (debugFlg === "1") {
        	hprint("drives available " + vol.path);
        }
        if (convertPathToPlatform(preferences.musicFolderPref.value) === vol.path) {
        	if (debugFlg === "1") {
            	hprint("restricting access to the root");
        	}
            preferences.musicFolderPref.value = system.userMusicFolder;   // this is not windows specific
        }
    });
    */
    
    var vols = filesystem.volumes;
    var a;
    //count the drive volumes
    for (a in vols) {
        if (vols.hasOwnProperty(a)) {
            if (debugFlg === "1") {
                hprint("drives available " + vols[a].path);
            }
            if (convertPathToPlatform(preferences.musicFolderPref.value) === vols[a].path) {
                if (debugFlg === "1") {
                    hprint("restricting access to the root");
                }
                preferences.musicFolderPref.value = system.userMusicFolder;   // this is not windows specific
            }
        }
    }
}
//=====================
//End function
//=====================

//==============================================================
// this function sets the tooltip hints
//==============================================================
function settooltip() {
    if (preferences.tooltipPref.value === "enabled") {
        cableWheelSet.tooltip = "";
        lockArea.tooltip = "Click here to lock.";
        lockAreaLocked.tooltip = "Click here to unlock.";
        playListSlider.tooltip = "Slide this lug to the very bottom to clear the playlist.";
        endPipe.tooltip = "Click here to select a single file for playing.\nAlt-click to enter the URL of a remote media file.";
        keyf.tooltip = "Click here to select a single file for playing.";
        keyu.tooltip = "Click here to enter the URL of a remote media file.";
        autoPlayLug.tooltip = "Auto-play next track is disabled";
        autoPlayLugEnabled.tooltip = "Auto-play next track is enabled";
        pipesRight.tooltip = "Shuffle the tracks.";
        pipes.tooltip = "Double click on me to assign a double-click function to this widget.";
        speaker.tooltip = "Click here to select a whole folder for playing.";
        keyd.tooltip = "Click here to select a whole folder for playing. You can also drag/drop onto the playlist.";
        sliderSet.tooltip = "slide me to change the media player sound levels...";
        nextButton.tooltip = "Click me to select the next track.";
        prevButton.tooltip = "Click me to select the preceding track.";
        playButton.tooltip = "Click me to play the current track.";
        pauseButton.tooltip = "Click me to pause the current track.";
        positionSlider.tooltip = "Slide me to select any part of the track.";
        firstChunk.tooltip = "Click to view first page of the playlist.";
        lastChunk.tooltip = "Click to view last page of the playlist.";
        nextChunk.tooltip = "Click to view next page of the playlist.";
        prevChunk.tooltip = "Click to view the previous page of the playlist.";
        if (preferences.playlistFormatPref.value === "xml") {
            oButton.tooltip = "Open an XML formatted playlist.";
            sButton.tooltip = "Save a playlist in XML format.";
            playListTap.tooltip = "Click to change the playlist format to XSPF.";
        } else {
            oButton.tooltip = "Open an XSPF formatted playlist.";
            sButton.tooltip = "Save a playlist in XSPF format.";
            playListTap.tooltip = "Click to change the playlist format to XML.";
        }
        ovalButton.tooltip = "Search for a track here";
        tap.tooltip = "Toggle Hints on/off.";
        chain.tooltip = "Pull me to toggle the playlist.";
        bar.tooltip = preferences.widgetTooltip.value;
        busy.tooltip = "Checking to see if this track can be played - Click to close early.";
        deleteButton0.tooltip = "Click to delete.";
        deleteButton1.tooltip = "Click to delete.";
        deleteButton2.tooltip = "Click to delete.";
        deleteButton3.tooltip = "Click to delete.";
        deleteButton4.tooltip = "Click to delete.";
        deleteButton5.tooltip = "Click to delete.";
        deleteButton6.tooltip = "Click to delete.";
        deleteButton7.tooltip = "Click to delete.";
        deleteButton8.tooltip = "Click to delete.";
        deleteButton9.tooltip = "Click to delete.";
        deleteButton10.tooltip = "Click to delete.";
        deleteButton11.tooltip = "Click to delete.";
        playListTitle.tooltip = "Double click here to open selected folder.";
        if (preferences.fullscreenPref.value === "1") {
            keyFullScreen.tooltip = "pulled out - external player full screen mode is enabled";
        } else {
            keyFullScreen.tooltip = "external player full screen mode is disabled";
        }
        if (isMacintosh) {
	        if (preferences.qtAllowPref.value === "1") {
              	keyViewScreen.tooltip = "pulled out - external player is enabled";
           	} else {
              	keyViewScreen.tooltip = "external player is disabled";
           	}
		} else {
           	if (preferences.wmpAllowPref.value === "1") {
              	keyViewScreen.tooltip = "pulled out - external player is enabled";
           	} else {
              	keyViewScreen.tooltip = "external player is disabled";
           	}
		}
/*
        if (preferences.widgetTooltip.value !== "enabled") {

        } else {
            if (preferences.imageCmdPref.value === "") {
                //speaker.tooltip = "";
            } else {
                //speaker.tooltip = "Current command is - "  +  preferences.imageCmdPref.value;
            }
        }
*/
    } else {
        cableWheelSet.tooltip = "";
        lockArea.tooltip = "";
        playListSlider.tooltip = "";
        cableWheelSet.tooltip = "";
        lockAreaLocked.tooltip = "";
        playListSlider.tooltip = "";
        endPipe.tooltip = "";
        keyf.tooltip = "";
        autoPlayLug.tooltip = "";
        pipesRight.tooltip = "";
        pipes.tooltip = "";
        speaker.tooltip = "";
        keyd.tooltip = "";
        sliderSet.tooltip = "";
        nextButton.tooltip = "";
        prevButton.tooltip = "";
        playButton.tooltip = "";
        pauseButton.tooltip = "";
        positionSlider.tooltip = "";
        firstChunk.tooltip = "";
        lastChunk.tooltip = "";
        nextChunk.tooltip = "";
        prevChunk.tooltip = "";
        oButton.tooltip = "";
        ovalButton.tooltip = "";
        sButton.tooltip = "";
        tap.tooltip = "";
        chain.tooltip = "";
        bar.tooltip = "";
        busy.tooltip = "";
        busy.tooltip = "";
        deleteButton0.tooltip = "";
        deleteButton1.tooltip = "";
        deleteButton2.tooltip = "";
        deleteButton3.tooltip = "";
        deleteButton4.tooltip = "";
        deleteButton5.tooltip = "";
        deleteButton6.tooltip = "";
        deleteButton7.tooltip = "";
        deleteButton8.tooltip = "";
        deleteButton9.tooltip = "";
        deleteButton10.tooltip = "";
        deleteButton11.tooltip = "";
        playListTitle.tooltip = "";
        keyViewScreen.tooltip = "";
        keyFullScreen.tooltip = "";
    }
}
//=====================
//End function
//=====================



//===================================
// function to toggle the lock state
//===================================
function toggleLock() {
    if (!mainWindow.locked) {
        mainWindow.locked = true;
        preferences.widgetLockPref.value = "1";
        lockArea.visible = false;
        lockAreaLocked.visible = true;
        dprint("mainWindow.hoffset " + mainWindow.hoffset);
        preferences.hoffsetpref.value = mainWindow.hoffset;
        preferences.voffsetpref.value = mainWindow.voffset;
    } else {
        mainWindow.locked = false;
        // this does not work yet
        lockArea.visible = true;
        lockAreaLocked.visible = false;
        preferences.widgetLockPref.value = "0";
        preferences.hoffsetpref.value = "";
        preferences.voffsetpref.value = "";
    }

    if (preferences.soundpref.value === "enabled") {
        play(lock, false);
    }
}
//=====================
//End function
//=====================

//==============================
// pins the widget in place
//==============================
lockArea.onMouseDown = function () {
    toggleLock();
};
//=====================
//End function
//=====================

//==============================
// releases the widget
//==============================
lockAreaLocked.onMouseDown = function () {
    toggleLock();
};
//=====================
//End function
//=====================

//===================================
// function to toggle the auto play state
//===================================
function toggleAutoPlay() {
    if (preferences.autoPlayStatePref.value === "disabled") {
        autoPlayLug.visible = false;
        autoPlayLugEnabled.visible = true;
        preferences.autoPlayStatePref.value = "enabled";
    } else {
        autoPlayLug.visible = true;
        autoPlayLugEnabled.visible = false;
        preferences.autoPlayStatePref.value = "disabled";
    }

    if (preferences.soundpref.value === "enabled") {
        play(lock, false);
    }
}
//=====================
//End function
//=====================

//=================================
// Function to wobble the autoplay lug
//=================================
autoPlayLug.onMouseEnter = function () {
	autoPlayLug.src = "Resources/autoPlayLugHover.png";
};
//=================================
// end function
//=================================

//=================================
// Function to wobble the autoplay lug
//=================================
autoPlayLug.onMouseExit = function () {
	autoPlayLug.src = "Resources/autoPlayLug.png";
};
//=================================
// end function
//=================================

//=================================
// Function to toggle the autoplay
//=================================
autoPlayLug.onMouseUp = function () {
	toggleAutoPlay();
};
//=================================
// end function
//=================================

//=================================
// Function to toggle the autoplay
//=================================
autoPlayLugEnabled.onMouseUp = function () {
	toggleAutoPlay();
};
//=================================
// end function
//=================================

//===================================
// function to set the lock state
//===================================
function checkAutoPlayState() {
    if (preferences.autoPlayStatePref.value === "disabled") {
        autoPlayLug.visible = true;
        autoPlayLugEnabled.visible = false;
    } else {
        autoPlayLug.visible = false;
        autoPlayLugEnabled.visible = true;
    }

    if (preferences.soundpref.value === "enabled") {
        play(lock, false);
    }
}
//=====================
//End function
//=====================



//======================================================================================
// END script functions.js
//======================================================================================


