/**
 * 
 * @author Amine HALLILI <amine.hallili@gmail.com>
 */

var gurl,gtrackName;
var playList= [];
var audio;
var slider;
var ct;
var td;
var playAll = false;
var playRandom = false;
var playRepeat = false;
var current = -1;
var prev = 0;
var muted = false;

$(document).ready(function(){
    audio  = document.getElementById("audio");
    slider = document.getElementById("timeslide");
    ct     = document.getElementById("currenttime");
    td     = document.getElementById("trackduration");
    audio.volume = 80/100;
    playList.name = "Nouvelle Play List";
    
    
    $("#btnpause").hide();
    $("#btnfastprev").hide();
    $("#btnfastnext").hide();
    $("#btnstop").hide();
    $("#btnplay").show();
    
    $('#playlistmsg').hide();
    
    $("#currentplaylist").dblclick(function(){
        //$(this).html('');
        $("#playlistname").val($("#playlistlabel").html());
        $("#playlistlabel").hide();
        $("#playlistsubmit").show();
        $("#playlistname").focus();
    });
    $("#playlistsubmit").submit(function(){
        $("#playlistlabel").show();
        $("#playlistsubmit").hide();
        $("#playlistlabel").html($("#playlistname").val());
        playList.name = $("#playlistname").val();
        return false;
    });
    $("#playlistname").focusout(function(){
        $("#playlistlabel").show();
        $("#playlistsubmit").hide();
        $("#playlistlabel").html($("#playlistname").val());
        playList.name = $("#playlistname").val();
        return false;
    });
    
    $("body").on("click","#loadPlayList", function(e){
       loadPlayList($($(this).parent())) 
    });
    
    $("#saveplaylist").click(function(){
        $("#inputplaylistname").val($("#playlistlabel").html());
        var data = $("#formplaylisttracks").serializeArray();
        $.post('/ZikAppWS/webresources/playlist',data,function(d) {
            $("#datagridrefresh").click();
            $('#playlistmsg').fadeIn('slow', function(){
                sleep(2000);
            $('#playlistmsg').hide();
            });
            
            console.log(d);
          });
    });
    
    $("#playlisttracks").on("click",".icondeletetrack",function(){
        deleteTrack($(this).parent());
    });
    
    $("#playlisttracks").sortable({
        axis: "y",
        containment: "#playlisttracks",
        cursor: "move",
        revert:true,
        handle: ".icondeplacer"
    });
    
    
});

function sleep(ms)
{
        var dt = new Date();
        dt.setTime(dt.getTime() + ms);
        while (new Date().getTime() < dt.getTime());
}

function setVars(url, trackName)
{
    gurl = url;
    gtrackName = trackName;
}

function stop()
{
    audio.pause();
    slider.value = 0;
    ct.innerHTML = "00:00";
    if(audio.currentTime)
        {
            audio.currentTime = 0;
        }
    $("#btnpause").hide();
    $("#btnfastprev").hide();
    $("#btnfastnext").hide();
    $("#btnstop").hide();
    $("#btnplay").show();
    $(".trackinplaylist").removeClass("currentTrack");
    $(".imginplaylist").remove();
}
function pause()
{
    audio.pause();
    $("#btnplay").show();
    $("#btnpause").hide();
}

function playTracks(url, trackName)
{
    setVars(url, trackName);
    playTrack();
}

function playTrack()
{
    if(!gurl)
        {
            if(playList.length == 0)
                {
                    alert("impossible de jouer un morceau la liste est vide ! vous devez au moin selectionner un morceau ");
                    return;
                }
            else
                {
                    console.log("####### lecture du morceau suivant !!!");
                    playTracks(playList[0].url, playList.name)
                    return; 
                }
        }
        
    var src = document.getElementById("source");
    
    var c = current+1;
    var p = prev+1;
    console.log("####### playing : "+"#track"+c);
   
    $(".imginplaylist").remove();
    $("#track"+c).addClass("currentTrack");
    $("#track"+c).append('<img id="img'+c+'" class="pull-right imginplaylist" style="position: absolute;left: 84%;" src="./resources/img/smallloading.gif" />');
    $(".trackinplaylist").not("#track"+c).removeClass("currentTrack");
    //$(".imginplaylist").not("#img"+c).remove();
    //$("img").not("#track"+c).remove();
    
    $("#btnpause").show();
    $("#btnfastprev").show();
    $("#btnfastnext").show();
    $("#btnstop").show();
    $("#btnplay").hide();
    
    if(src.src == gurl)
        {
            audio.play();
            return;
        }
    else
        {
            audio.load();
        }

    
    audio.removeChild(src);

    var source = document.createElement("source");
    source.setAttribute("type", "audio/mpeg");
    source.setAttribute("src", gurl);
    source.setAttribute("id", "source");
    audio.appendChild(source);

    // mise à jour du skin
    var track = document.getElementById("track");
    track.innerHTML = gtrackName;
    
    audio.addEventListener("loadedmetadata", function(_event) {
        var duration = Math.floor(audio.duration).toString();
        slider.setAttribute("max", duration);
        td.innerHTML = formatSecondsAsTime(duration);
    });
    
    audio.addEventListener("timeupdate", function(_event) {
        var currTime = Math.floor(audio.currentTime).toString(); 
        slider.value = currTime;
        ct.innerHTML = formatSecondsAsTime(currTime);
    });
    
    audio.addEventListener("ended", function(_event){
        playNext(false);
    });
    
   audio.play(); 
}

function trackGoTo(value)
{
    audio.currentTime = value; 
    //audio.duration
}


function formatSecondsAsTime(secs, format) {
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

function addTrack(url,trackName,id)
{
    var track = new Object();
    track.url = url;
    track.name = trackName;
    track.id = id
    playList.push(track);
    
    var li = document.createElement("li");
    li.setAttribute("class", "trackli");
    li.setAttribute("id", playList.indexOf(track));
    //
    var spanMove = document.createElement("span");
    spanMove.setAttribute("class", "icondeplacer icon-move");
    spanMove.setAttribute("title", "Déplacer le morceau");
    //span.innerHTML = "";
    var spanDelete = document.createElement("span");
    spanDelete.setAttribute("class", "icondeletetrack icon-trash pull-right");
    spanDelete.setAttribute("style", "margin-top: -17px;");
    spanDelete.setAttribute("title", "Supprimer le morceau");
    
    
    var a = document.createElement("a");
    a.setAttribute("href", "#");
    a.setAttribute("id", "track"+playList.length)
    a.setAttribute("class", "trackinplaylist")
    //a.setAttribute("rel", trackName);
    a.innerHTML = trackName;
    a.addEventListener("click", function(_event) {
        prev = current;
        current = playList.indexOf(track);
        playTracks(url, trackName);
    });
    
    var spanA = document.createElement("span");
    spanA.setAttribute("class", "spantrackinplaylist");
    spanA.appendChild(a);
    
    var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "inputtrackid");
    input.setAttribute("value", id);
    
    li.appendChild(spanMove);
    li.appendChild(spanA);
    li.appendChild(spanDelete);
    li.appendChild(input);
    
    var playListTracks = document.getElementById("playlisttracks");
    playListTracks.appendChild(li);
    //playListTracks.appendChild(document.createElement("br"));
    
}


function showVolume()
{
    audio.volume = 1;
}

function handleVolume(value)
{
    audio.volume = (value/100);
}


function setPlayAll(value)
{
    playAll = value;
    $(".setplayall").toggle();
}

function setPlayRandom(value)
{
    playRandom = value;
    $(".setplayrandom").toggle();
}

function setPlayRepeat(value)
{
    playRepeat = value;
    $(".setplayrepeat").toggle();
}

function playNext(force)
{
    if(playList.length > 0)
    {
        prev = current;
        if(playAll || force)
            {
                if(playRandom)
                    {
                        current = Math.floor(Math.random()*playList.length);
                        console.log('################ playing a random track : '+'track'+current);
                    }
                else
                    {
                        if(current+1 >= playList.length)
                            {
                                current = 0;
                                if(!playRepeat)return;
                            }
                        else
                            {
                                current++;
                            }
                    }    

                playTracks(playList[current].url, playList[current].name);
                
            }

    }
}

function playPrev()
{
    if(playList.length > 0 )
        {
            if(prev == -1)prev =0;
            playTracks(playList[prev].url, playList[prev].name);
        }
}

function muteTrack()
{
    if(muted)
        {
            audio.volume = 1;
        }
    else
        {
            audio.volume = 0;
        }
    muted = !muted;
}


function playPlayList(addTracks)
{
    if(addTracks)
        {
            playList = null;
        }
    var i=0;
    for (i = 0; i < playList; i++) {
        addTrack(playList[i].url, playList[i].trackName);
    }
}


function loadPlayList(playListElement,playlistname,add)
{
    $("#playlistlabel").html(playlistname);
    playList.name = playlistname;
    $("#inputplaylistname").val(playList.name);
    if(!add)
        {
            stop();
            playList= [];
            $("#playlisttracks").html("");
        }
   $(".tracktoadd",playListElement).each(function(){
       addTrack($(this).attr("dir"), $(this).html(),$(this).attr("title"));
   });
   
   current =0;
   prev = -1;
   if(!add)
       {
          playTracks(playList[0].url, playList[0].name);
       }
    else
        {
            setVars(playList[0].url, playList[0].name);
        }
   
}

function deleteTrack(trackElement)
{
    var index = parseInt($(trackElement).attr("id"));
    
    // re affectation des index pour les li (une marque de fabrique signé HALLILI ^^ )
    $(trackElement).parent().children().each(function(){
        if(parseInt($(this).attr("id")) > index )
            {
                $(this).attr("id", parseInt($(this).attr("id"))-1);
            }
    });
    $(trackElement).fadeOut("slow", function(){
        $(this).remove();
        console.log("index to remove : "+index);
        playList.splice(index, 1);
        console.log(playList);
    });
}













/* Audio/Video Plauer basé sur l'HML5
 * 
 */


/*
 * Classe track basée sur l objet audio de l'HTML5   
 */    
var Track  = {
                audio:new Audio(),
                id:0,
                url:"",
                name:""
             }
/*
 * 
 */             
var Player = {
    playList        : [],
    track           : Track,
    currentIndex    : 0,
    previousIndex   : 0,
    playRandom      : false,
    playAll         : true,
    muted           : false,
    addTrack        : function(id,name,url){
                            this.track.id = id;
                            this.track.name = name;
                            this.track.url = url;
                            this.track.audio.src = url;
                            this.playList.push(this.track);
                        },
   playTrack       : function(){
                            this.playList[this.currentIndex].play();
                        },
   pauseTrack       : function(){
                            this.playList[this.currentIndex].pause();
                        },
   stopTrack        : function(){
                            this.playList[this.currentIndex].stop();
                        }
}

var HtmlPlayer = {
   cover            : document.createElement("img"),
   controls         : document.createElement("div"),
   sliderControl    : document.createElement("div"),
   listName         : document.createElement("div"),
   trackList        : document.createElement("div"),
   setCoverUrl      : function(url){
       this.cover.src = url;
   },
   setListName      : function(name){
       this.listName.innerHTML = name;
   },
   addTrack         : function(li){
       this.trackList.appendChild(li);
   },
   setControls      : function(div){
       this.controls.innerHTML = div;
   },
   setSliderControl : function(div){
       this.sliderControl.innerHTML = div;
   },
   generatePlayer   : function(div,params)
   {
       var htmlPlayer = document.createElement("div");
       htmlPlayer.appendChild(this.cover);
       htmlPlayer.appendChild(this.controls);
       htmlPlayer.appendChild(this.sliderControl);
       htmlPlayer.appendChild(this.listName);
       htmlPlayer.appendChild(this.trackList);
       div.appendChild(div);
   }
}