This is version 1.0.13 of the Steampunk Media Player Konfabulator/Yahoo Widget. 
It is now available for download - click the download link and try it!

The Steampunk Media Player Yahoo Widget is a moveable widget that you can 
move anywhere around the desktop as you require. The widget is usable on 
all Windows.

Originally designed, written and Steampunked by: Dean Beedell.

Major additions to code by Harry Whitfield, Mac OS/X QT Player integration, 
lots of bugfixing, code rationalisation, dock vitality, linting and sorting.

The overall changes in 1.0.13 from 1.0.6.


// 1.0.7

// created Xwidget version 2.0 RC from 1.0.7
// autoplay disable was broken, always started playing, now awaits a track 
   selection or play button to be pressed
// drag and drop on the playlist adds to existing list rather than replace 
   altogether
// uppercase file suffixes, eg .MP3 need to be catered for
// handles CDs when selected using the file explorer
// fixed bug in playing a single track, it refused to play it at all when 
   autoplay was disabled
// valid types was not functioning for single file selection, did not 
   display any media files at all

// 1.0.8

// tooltips for all items
// checks for valid folder before playing
// when saving a playlist, checks it is an XML file.
// default music folder should be C:\Users\Public\Music
// selecting a CD from the folder menu works from the menu too.
// unknown file types such as .aac if Windows will not play the filetype  
   then pop up an error message.
//
// 1.0.9
//
// the playbutton  needs to be modified to respect the startup flag - done
// hints enabled/disabled correctly on demand - done
// resizing when using the CTRL key on the playlist now works
// tested using codecs to recognise the latest file types - done
// checks CD drive present for non-CD equipped systems
// synch. with the Xwidget version
// when you drop a second folder after dropping a single file, it does not  
   update the playlist, a refresh required
// replaced the resizing code, removing a lot of variable declarations and  
   using a more elegant function to resize.
// the function that checks whether the track is stuck needs to be modified  
   to respect the startup flag
// dragging and dropping a folder does not always update the folder name

// 1.0.10

// added a message when a root folder is selected.
// added a preference to allow the bottom tracklist buttons to be retained  
   on screen.
// added deletion buttons
// changed red tap to a hints toggle
// added sounds for the chain pull and the keypresses
// bundle the Centurion SF light font with the widget
// added the extraction of the font and the menu option to install
// bug when cancelling after pressing the F to read an XML file - fixed
// allow deletion of a track from the playlist via a pop up metal/red X  
   when the mouse hovers over a track
// grouped the bottom keys, to correspond to the Xwidget changes that  
   allow correct fade
// modify the drop position to take into account the page number
// added the ability to delete a track from the playlist
// fixed a bug with the zorder of the position slider

// 1.0.11

// added support for Mac OS/X using Harry's code.

// 1.0.12

// Changes to handling of playing single files which are now added to the  
   current playList
// Corrections to playlist code
// JSLinting of code files.
// Added preference to control direction of playlist scrolling
// revised the code for the repetitive elements such as the playlist texts  
   and delete buttons
// improved the graphics on the button mechanism
// added animated folder selection key to the playlist
// added animated file selection key to the playlist
// playlist scrolls a page automatically when the selected item is on the  
   next page
// alt+click on play a file now opens a dialog box allowing opening of a  
   remote item
// the playlist now handles industry standard xspf files
// changed debug code
// allows video files to be opened in a separate player window
// allows internal drag and drop allowing tracks to be dragged to different  
   locations in the playlist

// only shows folder selection at the correct time during drag and drop
// respects the page number when an internal drag and drop occurs
// red lamp indicates that the track may not be playable
// playing a single track by double click should not cause autoplay,  
   automatic play is now controlled by a preference
// physical switch for autoplay, replaced the help toggle
// added a sound to any keypress that takes you to the the final page in  
   the play list
// moved the help call to the right click menu
// moved the help to a separate window
// fixed a couple of very minor graphical issues
// put the trackname shadow back again, somehow it got lost, allows the  
   track text to be seen on light backgrounds
// when chosenfolder empty an error is shown in the debug log, needs to  
   be handled
// fixed a bug in the internal dragging/dropping, sometimes it thinks a  
   drop is going on when just looking through the playlist - fixed by  
   resetting both drag and drop positions on a single click
// occasional first play of a track has a problem - s - probably  
   catchfiledrop - fixed by resetting both drag and drop positions  
   on a single click
// made the page number a little more visible on dark backgrounds
// when a track is less than six seconds long do not roll the timer
// added a tooltip to the delete buttons
// added a tooltip to the page no. indicator
// restricting access to the root made non system specific with regard to  
   the default music folder
// the stored folders now display in native formats (slashes, backslashes)  
   on both o/s.
// tooltip to state that the red lamp indicates that the track may/may not  
   be playable
// dynamic resizing causes the volume slider to reappear in the wrong  
   maximum position, cablestretch needs to be called
// ctrl + doubleclick to open a track in the video player
// Ctrl+F allows a search for a track inputbox to pop up
// F3 is captured to allow subsequent searches for the same string in the  
   playlist
// the logic for the busy timer needs to be tested as it sometimes rolls  
   for too long and at the wrong time, disabled at new track selection
// oval button to perform a search, tooltip needs to be modified
// the top frame no longer displays larger size on startup after Harry's  
   changes

// 1.0.13 RC

// physical switch for external video player
// restored connection between the Macintosh external player volume state,  
   the widget tracks it
// remove the play video in remote player switch for Macintosh only
// removed run command in background triggered by a double click
// add a page number section on the playlist - makes the page number  
   clearer
// change all foreach loops to for loopsfor compatibility with Xwidget  
   - abandoned as Xwidgets is crippled,
//     does not allow functions to be assigned to objects in code
//     does not allow an array to alias an existing object of the same  
   name
// allow the scrolling text to be turned off to save CPU as per xwidget   
// move the glass playlist down a few pixels - done
// remove javascript code from .kon file to .js - done
// add confirm dialog on delete
// playing videos in external player sometimes happens inadvertently -  
   check logic
// key fade bug seems to require a widget restart
// key fade to be applied to new lower switch mounting
// menus - sort them to sub-menus
// automatic play and the autoplay lug, when it is switched off the automatic  
   play should stop
// add the clear playlist functionality via a physical switch
// add some pipes/cables to the play list to connect the player
// when the tracklist is short (less than one page) only the tracks are  
   present should display delete buttons
// quieter keyclicks on bottom keys
// add sound for search
// new help page for the playlist - WIP
// ctrl/c and ctrl/v to allow copy and paste of tracks around the playlist
// ctrl/x and ctrl/v to allow cut and paste of tracks around the playlist
// rotator on startup?
// check function comments and descriptions
// add dprints to all the recent functions to be consistent


No other bugs found or reported so it seems as if it is good to go! 

This is a Steampunk media player Yahoo Konfabulator widget based on my 
original Steampunk XWidget. A widget that will play your music but take 
up only a tiny amount of your desktop. It is a lovely piece of eye-candy 
as well as being useful on your desktop. An old trial widget that I never 
quite completed, knocked into minimal shape. It is being completed now...

REASONS FOR CREATING - I knocked up an Xwidget to finalise an old media 
player design that I conjured up a while back. The Xwidget engine is 
very good in some respects but bits of it suffer from neglect on the part 
of the developer. The Xwidget volume API does not have the full set of 
functionality that it should have so the Xwidget is clunky and awkward 
to use satisfactorily. The Yahoo widget engine has far more functionality 
and so it seemed sensible to convert it so you can have a better Steampunk 
media player.

-oOo-

NOTE: To make it look like the playlist in the screenshots you'll need the 
Centurion light SF font that you can get here: at Ufonts:
http://ufonts.com/fonts/centurion-light-sf.html The widget comes bundled with 
that font and an option to install it from the menu.

You can control the volume level of the media player by moving the slider 
or pause/play the track by clicking on the play button. Next and Previous 
buttons will select the next track to play. There is a help option that
you should display. Then you can start tinkering.

-oOo-

These widgets work with Windows XP SP3, they have also been tested on 
Vista Home, Windows 7 Ultimate 64 bit, Windows 8 and 10 and it should 
work on all these with no problems whatsoever. It will even function on Mac 
OS/X.

You will,  of course, need the Yahoo widget engine for this widget to run. 

http://g6auc.me.uk/ywidgets_sdk_setup.exe  

or the Mac version: 

https://rickyromero.com/widgets/downloads/yahoo-widgets-4.5.2.dmg

========================================================
Instructions for running Yahoo widgets on Mac OS/X, all recent versions 
including Sierra.

Edit the following file:

com.yahoo.widgetengine.plist which is in /Users/xxx/Library/Preferences. 
Look for these lines:    <key>DockOpen</key>
   <string>false</string>

Change to false if it is true.

Then you should be able to start Yahoo! Widgets and the menubar item 
should appear. Widgets can then be started from the menubar or by 
double-clicking them in the usual way.

========================================================

All javascript widgets need an engine to function, in this case the 
widget uses the Yahoo Widget Konfabulator engine. The engine interprets 
the javascript and creates the widget according to the XML description 
and using the images you provide.

This widget works with Windows XP SP3, it has been tested on Vista, 
Windows 7/8, 10 and Mac OS/X. 

o The Steampunk MediaPlayer Ywidget.zip contains the widget zipped up 
(inside is the Steampunk MediaPlayer Ywidget.widget file that you can just
click upon to install as long as you have the widget engine running)

o The Steampunk MediaPlayer Ywidget.widget is the unzipped Yahoo 
Konfabulator widget which you can simply download and run, you can just
click upon to install as long as you have the widget engine running.

o The folder structure has been loaded here so you can see what you are 
downloading.

Below are the normal locations for download and instructions page.

For those that aren't savvy - You'll need to download and install the 
yahoo widget engine FIRST! which for Windows is here:

http://g6auc.me.uk/ywidgets_sdk_setup.exe  

Copyright Notice: If you use the imagery from this image in full or in part
or in any way in your own creations give me a credit for the work and also 
a link back to my site so people can see the original and appreciate my 
work. Have fun!

You may use any of my own images in your own creations but commercially 
only with my permission. In all other non-commercial cases I require a 
credit to the original artists using their/my name or pseudonym and a 
link to their/my sites. With regard to the commercial use of incorporated 
images from other artists, permission would need to be obtained from 
the original owner and that is >ME<.