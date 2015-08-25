"use strict"

var playerDebug;


var _ffDelta=15*1000; // sec

// Playliste et lecture en cours
////////////////////////////////////////
var g_playList = [];
var g_playListCurrentIndex = -1;
var _autoId=0;

// g_currentPlayedSound[0] = g_playList[g_playListCurrentIndex] SAUF si track non ajoutée en playlist
// est un tableau pour simuler un pointeur (car pointeur necessaire dans data.js _dataAttributes
var g_currentPlayedSound = [null]; 

// Représentations Html
/////////////////////////////////////////
var _htmlTrackTitle;
var _htmlCurrentTime;
var _htmlDuration;
var _htmlTimeSlider;



// ************************************************************************************************
// *                                        INIT
// ************************************************************************************************

$(document).on('pageinit', function(event){
    
    soundManager.setup({
        url: 'resources/lib/soundmanager',
        ontimeout: function() {
            // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
            alert("impossible de lire le morceau votre navigateur ne supporte pas l'audio");
        }
    });
    
    $(".closepopup").click(function(){
        $(this).parent().parent().popup("close");
    });
    
});






// ************************************************************************************************
// *                                        COMMANDES - PRINCIPALES
// ************************************************************************************************


/**
 * PLAY
 */
function cmdPlay()
{
    
    if(playerDebug>=1) console.log("PLAYER CMD: PLAY");
        
    // Cas d'un morceau en cours
    //
    if(g_currentPlayedSound[0]!=null){
        _managerResume(g_currentPlayedSound[0]);
    }
    // Cas d'aucun morceau en cours => prendre le prmeier de la playlist
    //
    else if(g_playList.length > 0)
    {
        g_playListCurrentIndex = 0;
        g_currentPlayedSound[0] = g_playList[g_playListCurrentIndex];
        
        _managerPlaySound(g_currentPlayedSound[0]);
    }
    // Cas d'un playliste vide
    //
    else
    {
        //TODO EX
        return;
    }
    
    // _refreshAll();
}

/*
function cmdPlayPause(){
    if (_btnPlayState=='play'){
        cmdPlay();
    }else{
        cmdPause();
    }
}
//*/

/**
 * PAUSE
 */
function cmdPause()
{
    if(playerDebug>=1) console.log("PLAYER CMD: PAUSE");
    
    _managerPause();
    
    // _refreshAll();
}

/**
 * STOP
 */
function cmdStop()
{
    
    if(playerDebug>=1) console.log("PLAYER CMD: STOP");
    
    soundManager.stopAll();
    
    g_currentPlayedSound[0]=null;
    g_playListCurrentIndex=-1;
    
    // _refreshAll();
}

/**
 * NEXT TRACK
 */
function cmdNext()
{
    if(playerDebug>=1) console.log("PLAYER CMD: NEXT TRACK");
    
    if(g_playList.length==0){
        // TODO
        return;
    }
   
    // Incrémenter l'index
    //
    g_playListCurrentIndex++;
        
    // Cas de la fin de playlist grand=> index=0
    //
    if(g_playListCurrentIndex >= g_playList.length){
        g_playListCurrentIndex=0;
    }
       
    // Stopper la lecture courante
    //
    soundManager.stopAll();
       
    // Lancer le morceau
    //
    if(playerDebug) console.log("CURRENT INDEX:"+g_playListCurrentIndex);
    g_currentPlayedSound[0] = g_playList[g_playListCurrentIndex];
    _managerPlaySound(g_currentPlayedSound[0]);
    
    // _refreshAll();
}

/**
 * PREVIOUS TRACK
 */
function cmdPrevious()
{
    if(playerDebug>=1) console.log("PLAYER CMD: PREVIOUS TRACK");
    
    if(g_playList.length==0){
        // TODO
        return;
    }

    // Décrementer l'index
    //
    g_playListCurrentIndex--;
        
    // Cas de la fin de playlist grand=> index=0
    //
    if(g_playListCurrentIndex <0){
        g_playListCurrentIndex=g_playList.length-1;
    }
       
    // Stopper la lecture courante
    //
    soundManager.stopAll();
       
    // Lancer le morceau
    //
    if(playerDebug) console.log("CURRENT INDEX:"+g_playListCurrentIndex);
    g_currentPlayedSound[0] = g_playList[g_playListCurrentIndex];
    _managerPlaySound(g_currentPlayedSound[0]);
    
    // _refreshAll();
}




/**
 * FAST FORWARD
 */
function cmdFastForward(){
    
    if(playerDebug>=1) console.log("PLAYER CMD: FF");
    
    if(g_currentPlayedSound[0]==null || g_currentPlayedSound[0]==undefined){
        return;
    }
    _managerGoTo(g_currentPlayedSound[0].position+_ffDelta);
 
    _refreshPlaying();
}

/**
 * FAST BACKWARD
 */
function cmdFastBackward()
{
    
    if(playerDebug>=1) console.log("PLAYER CMD: FB");
    
    if(g_currentPlayedSound[0]==null || g_currentPlayedSound[0]==undefined){
        return;
    }
    _managerGoTo(g_currentPlayedSound[0].position-_ffDelta);
 
    _refreshPlaying();
}

function cmdSlider(value){
    
    if(g_currentPlayedSound[0]==null || g_currentPlayedSound[0]==undefined){
        return;
    }
    
    var milliSecondPosition = value/100* g_currentPlayedSound[0].duration;
    if(playerDebug>=1) console.log("PLAYER CMD: SLIDER(val:"+value+" millisecond:"+milliSecondPosition+")");
    
    _managerGoTo(milliSecondPosition);
    _refreshPlaying();
}
// ************************************************************************************************
// *                                        COMMANDES - OPTIONS
// ************************************************************************************************


function togleOptionRepeat(){
    if(playerDebug) console.log("togleOptionRepeat");
    $("#tstBtn").addClass("ui-btn-down-c");
 
}
function togleOptionShuffle(){
    $(this).addClass('ui-btn-down-b');
   
}


 


// ************************************************************************************************
// *                                        GESTION TRACKS
// ************************************************************************************************


// @R FIXED AdTrack ajoute à la playliste
function addTrack(id, webPath, title, album, years, author, style, coverPath)
{
    if(playerDebug) console.log("addTrack("+id+", "+webPath+", "+title+ ", "+album+", "+ years+", "+ author+", "+ style+", "+ coverPath+", );");
    
    var sound = _managerMakeTrack(id, webPath, title, album, years, author, style, coverPath);
    
    g_playList.push(sound);
    var index= g_playList.length-1;
    sound.index = index;
    
    return index;
}


function playTrack(id, webPath, title, album, years, author, style, coverPath)
{
    if(playerDebug) console.log("playTrack("+id+", "+webPath+", "+title+ album+", "+ years+", "+ author+", "+ style+", "+ coverPath+", );");

    g_currentPlayedSound[0] = _managerMakeTrack(id, webPath, title, album, years, author, style, coverPath);
     
    _managerPlaySound(g_currentPlayedSound[0]);
    
    // _refreshAll();
}


function playTrackAlreadyInList(index){
 
    cmdStop();
 
    g_currentPlayedSound[0] = g_playList[index];
    
    _managerPlaySound(g_currentPlayedSound[0]);
    
    // _refreshAll();
}

function addTrackPlay(id, webPath, title, album, years, author, style, coverPath)
{
    if(playerDebug) console.log("addTrackPlay("+id+", "+webPath+", "+title+ ", "+album+", "+ years+", "+ author+", "+ style+", "+ coverPath+", );");
    soundManager.stopAll();
    
    // @R FIXED
    //var sound = addTrack(id, webPath, title); 
    g_playListCurrentIndex  = addTrack(id, webPath, title, album, years, author, style, coverPath);
    
    playTrackAlreadyInList(g_playListCurrentIndex);

}

// ************************************************************************************************
// *                                    GESTION PLAYLIST
// ************************************************************************************************

function addPlaylist(id){
    var callBack= function(data){
        for(var i=0; i<data.tracks.length; i++){
            var track = data.tracks[i].track;
            addTrack(track.id, track.webPath, track.title, track.album, track.years, track.author, track.style, track.coverPath);
        }
    };
    dataGet('playlist', callBack, id, null, null);
}

function addPlaylistPlay(id){
    var callBack= function(data){
        for(i=1; i<data.tracks.length; i++){
            var track = data.tracks[i].track;
            addTrack(track.id, track.webPath, track.title, track.album, track.years, track.author, track.style, track.coverPath);
        }
        
        if(data.tracks.length>=1){
            track = data.tracks[0].track;
            addTrackPlay(track.id, track.webPath, track.title, track.album, track.years, track.author, track.style, track.coverPath);
        }
    };
    
    dataGet('playlist', callBack, id, null, null);
}



// ************************************************************************************************
// *                                        CORE
// ************************************************************************************************
var _refreshCallBack =  function (){
    _refreshPlaying();
}

var _finishCallback = function(){
    
        
    // Cas d'ue morceaux restants
    //
    if(g_playListCurrentIndex+1 < g_playList.length){
        cmdNext();
    }
    // Cas d'une fin de playliste
    //
    else{
        _btnPlayState='play';
        _refreshAll();
    }
}
function _managerResume(sound){
    _btnPlayState='pause';
    _refreshPlayButton();
    soundManager.resume(sound.id);
}

function _managerPlaySound(sound)
{
    soundManager.stopAll();
    _btnPlayState='pause';
    _refreshPlayButton();
   
    
    sound.play({
        whileplaying: _refreshCallBack,
        onfinish: _finishCallback
    });
    
}

function _managerPause()
{
 
    //soundManager.pause(g_currentPlayedSound[0].id);
    soundManager.pauseAll();
    _btnPlayState='play';
    _refreshPlayButton();
     
}

// @R FIXED => make track n'ajoute pas à la playliste
function _managerMakeTrack(id, webPath, title, album, years, author, style, coverPath)
{
    if(playerDebug>=2) console.log("_managerMakeTrack("+id+", "+webPath+", "+title+", "+ album+", "+ years+", "+ author+", "+ style+", "+ coverPath+", );");
    _autoId++;
    var aSound = soundManager.createSound({
        id: _autoId,
        url: webPath
    });
    // ca c'est pour Régis' //@R MERCI
    aSound.idTrack = id.split("track")[1];
    aSound.title = title;
    aSound.album= album,
    aSound.years= years,
    aSound.author= author,
    aSound.style= style,
    aSound.coverPath= coverPath
    
    return aSound;
}

function _managerGoTo(value)
{
    if(g_currentPlayedSound[0]==null || g_currentPlayedSound[0]==undefined){
        return;
    }

    if(playerDebug>=1) console.log("PLAYER GO TO:"+value/1000+' / '+g_currentPlayedSound[0].duration/1000);
 
    g_currentPlayedSound[0].setPosition(value);
   
}



// ************************************************************************************************
// *                                        HTML
// ************************************************************************************************

function _refreshAll (){
    
    _refreshPlaying();
    
    // Etat du bouton play
    //
    _refreshPlayButton();
}

function _refreshPlaying(){
     
    var currentSec;
    var totalSec;
    var sliderPos ;
    
    // Cas d'un lecture en cours
    //
    if(g_currentPlayedSound[0]!=null){
       
        currentSec =g_currentPlayedSound[0].position/1000;
        totalSec = g_currentPlayedSound[0].duration/1000;
        sliderPos = g_currentPlayedSound[0].position/g_currentPlayedSound[0].duration*100;
    
    
        //console.log("PLAYING: "+currentSec+" / "+totalSec+" _ "+sliderPos);
               
        // Titre
        //
        if(_htmlTrackTitle) {
            _htmlTrackTitle.innerHTML = g_currentPlayedSound[0].title;
        }
        
        // Temps courant
        //
        if(_htmlCurrentTime){
            _htmlCurrentTime.innerHTML = formatSecondsAsTime(currentSec);
        }
        
        // Temps total
        //
        if(_htmlDuration){
            _htmlDuration.innerHTML = formatSecondsAsTime(totalSec);
        }
        
        // Position du slider
        //
        if(_htmlTimeSlider){
            _htmlTimeSlider.value = sliderPos;
        }

    }
    // Cas d'aucun morceau
    //
    else{
        
        // Titre
        //
        if(_htmlTrackTitle) {
            _htmlTrackTitle.innerHTML = "--";
        }
        
        // Temps courant
        //
        if(_htmlCurrentTime){
            _htmlCurrentTime.innerHTML = "00:00";
        }
        // Temps total
        //
        if(_htmlDuration){
            _htmlDuration.innerHTML = "00:00";
        }
        // Position du slider
        //
        if(_htmlTimeSlider){
            _htmlTimeSlider.value = 0;
        }
    }
 
}

 
    
    
$(document).bind( "pagechange", function( event, data ) {
    //DBG
    /*
    if(playerDebug) console.log("!!!!!!!!!!! EVENT MPLAYER pagechange  !!!!!!!!!!!!!!!!!");
    if(playerDebug) console.log(" ---------- pagechange event ------------ ");
    if(playerDebug) console.log(event);
    if(playerDebug) console.log(" ---------- pagechange data ------------ ");
    if(playerDebug) console.log(data);
    if(playerDebug) console.log(" ---------- pagechange g_playList ------------ ");
    if(playerDebug) console.log(g_playList);
    //*/
    
    var $page;
    if(typeof data.toPage == 'string'){
         
    }
    else{
        $page=data.toPage;
    }

    _bindHtml($page);
    _refreshAll();
});

function _bindHtml($page){
    if(playerDebug>=2) console.log("PLAYER: bindHtml");
    
    _htmlTimeSlider = $page.find(".timeslide")[0]; 
    _htmlCurrentTime = $page.find(".currenttime")[0]; 
    _htmlDuration = $page.find(".trackduration")[0]; 
    _htmlTrackTitle = $page.find(".tracktitle")[0]; 
    
    
}


var _btnPlayState='play';
function _refreshPlayButton(){
    
    var $btnPlay, $btnPause;
    
   
    if(_btnPlayState == 'pause'){
    
       if(playerDebug>=2) console.log("CreatePauseBtn");

        $btnPlay = $(document).find('.play');
        $btnPlay.hide();
        
        $btnPause = $(document).find('.pause');
        $btnPause.show();
        

    }else{
       if(playerDebug>=2) console.log("CreatePlayBtn");
        $btnPause = $(document).find('.pause');
        $btnPause.hide();
        
        $btnPlay = $(document).find('.play');
        $btnPlay.show();
        
    }
       

}


// ************************************************************************************************
// *                                        UTILS
// ************************************************************************************************

function formatSecondsAsTime(secs) {
    var hr  = Math.floor(secs / 3600);
    var min = Math.floor((secs - (hr * 3600))/60);
    var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

    if (min < 10){ 
        min = "0" + min; 
    }
    if (sec < 10){ 
        sec  = "0" + sec;
    }

    return min + ':' + sec;
}
