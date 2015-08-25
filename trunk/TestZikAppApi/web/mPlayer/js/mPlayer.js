/* @Author : Amine HALLILI amine.hallili@gmail.com 
 * un audio player pour le mobile
 * and open the template in the editor.
 */
var timeSlider;
var mySound;
var currentTime;
var duration;
var htmlPlayList;
var htmlTrackTitle;
var htmlPlayListName;
var playList = [];
var currentIndex = 0;
var prevIndex = 0;
window.onload = function(){
    timeSlider = document.getElementById("timeslide"); 
    timeSlider.value = 0;
    
    currentTime = document.getElementById("currenttime");
    duration = document.getElementById("trackduration");
    htmlPlayList = document.getElementById("playlisttracks");
    htmlTrackTitle = document.getElementById("tracktitle");
    htmlPlayListName = document.getElementById("playlistname");
    
    soundManager.setup({
        url: './swf',
        ontimeout: function() {
          // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
          alert("impossible de lire le morceau votre navigateur ne supporte pas l'audio");
        }
      });
};

function playTrack(id, path, name)
{
    playList = [];
    htmlPlayList.innerHTML = "";
    mySound = addTrack(id, path, name);
    playSound(mySound);
}

function playSound(sound)
{
    soundManager.stopAll();
    sound.play({
        whileplaying: function(){
            secs = this.position/this.duration*100;
            timeSlider.value = secs;
            currentTime.innerHTML = formatSecondsAsTime(this.position/1000);
            duration.innerHTML = formatSecondsAsTime(this.duration/1000);
        },
        onfinish: function(){
            timeSlider.value = 0;
            currentTime.innerHTML = "00:00";
            //duration.innerHTML = "00:00";
        }
    });
    updateHtmlTrackName(sound.name);
}

function playCurrent()
{
    if(playList.length > 0)
        {
            if(currentIndex == 0){prevIndex = playList.length-1;}
            playSound(playList[currentIndex]);
        }
    else
        {
            alert("la play list est vide ");
        }
}

function playNext()
{
    if(playList.length > 0)
        {
            var sound;
            if(currentIndex+1 < playList.length)
                {
                    prevIndex = currentIndex;
                    currentIndex += 1; 
                }
            else
                {
                    prevIndex = playList.length-1;
                    currentIndex = 0;
                }
            sound = playList[currentIndex];
            playSound(sound);
        }
    else
        {
            alert("la Play list est vide !!!");
        }
    
}

function playPrev()
{
    if(playList.length> 0)
        {
            var sound = playList[prevIndex];
            currentIndex = prevIndex;
            prevIndex == 0 ? prevIndex=playList.length-1 : prevIndex -=1;
            playSound(sound);
        }
}

function addTrack(id, path, name)
{
    var aSound = soundManager.createSound({
        id: id,
        url: path
      });
      aSound.name = name;
    var index = playList.push(aSound);
    var li = document.createElement("li");
    li.setAttribute("id", id);
    //li.innerHTML = name;
    
    var a = document.createElement("a");
    a.innerHTML = name;
    a.setAttribute("href", "#");
    a.addEventListener("click", function(_event){
        playSound(aSound);
        prevIndex = currentIndex;
        currentIndex = index;
    });
    
    li.appendChild(a);
    
    htmlPlayList.appendChild(li);
    return aSound;
}

function pauseTrack()
{
    soundManager.pauseAll();
}

function stopTrack()
{
    soundManager.stopAll();
    currentTime.innerHTML = "00:00";
    duration.innerHTML = "00:00";
    timeSlider.value = 0;
}

function trackGoTo(value)
{
    var secs = value*mySound.duration/100;
    mySound.setPosition(secs);
    currentTime.innerHTML = formatSecondsAsTime(secs); 
}


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


function updateHtmlTrackName(name)
{
    htmlTrackTitle.innerHTML = name;
}

function updateHtmlPlayListName(name)
{
    htmlPlayListName.innerHTML = name;
}




