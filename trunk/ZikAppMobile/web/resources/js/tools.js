// Enleve la barre d'adresse sur portables
//

$(document).on('pageshow', function(event){
    // window.addEventListener('load',function() {
    // Set a timeout...
    setTimeout(function(){
        // Hide the address bar!
        window.scrollTo(0, 1);
    }, 0);
});


$(document).on('scrollstop_', function(event){
    // window.addEventListener('load',function() {
    // Set a timeout...
    setTimeout(function(){
        // Hide the address bar!
        //window.scrollTo(0, 1);
        //if(window.screenTop==0){
        window.scrollTo(0, 1); 
    //}
    //console.log(window.screenTop);
    }, 0);
});


/*
// This only works for one sound for simplicity's sake
function playSound(sound){
    
    var audio = document.getElementById('player')
    audio.src = sound;
    audio.play();
}
//*/


function objectToArray(obj){
    
    //console.log("***** OBJECT *******");
    //console.log(obj);
    
    var innerArray = [];
    for (property in obj) {
        innerArray.push(obj[property]);
    }
    
    //console.log("***** ARRAY *******");
    //console.log(innerArray);
    //console.log(innerArray[0]);
    return innerArray;
}

function getRemoteUrl(url){
    if(url==undefined){
        return url;
    }
    
    var host = window.location.hostname;
    //console.log(host);
    var value = url.replace('localhost', host);
    return value;
}

function getURLParameter(url, sParam){
    var sPageURL = url;
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            console.log("PARAMETER "+sParam+":"+sParameterName[1]);
            return sParameterName[1];
        }
    }
    
    return '';
}

 
function makeAddPlaylistMarkup(item){
   
    return 'addPlaylist'+_makePlaylistFunctionMarkup(item);
}
function makeAddPlaylistPlayMarkup(item){
    return 'addPlaylistPlay'+_makePlaylistFunctionMarkup(item);
}


function makePlayTrackMarkup(item){
    return 'playTrack'+_makeTrackFunctionMarkup(item);          
}
function makeAddTrackMarkup(item){
    return 'addTrack'+_makeTrackFunctionMarkup(item);
}
function makeAddTrackPlayMarkup(item){
    return 'addTrackPlay'+_makeTrackFunctionMarkup(item);
}

function _makePlaylistFunctionMarkup(item){
 
    var str=  '(\''+item.id+'\');'; 
    //console.log(str);
    return str;
}

function _makeTrackFunctionMarkup(item){
 
    protectItemStrings(item);
 
    var str=  '(\'track'+item.id+'\',\''+getRemoteUrl(item.webPath)+'\', \''+item.title+'\',\''+item.album+'\',\''+item.years+'\',\''+item.author+'\',\''+item.style+'\',\''+item.coverPath+'\');'; 
    //console.log(str);
    return str;
}

function protectItemStrings(item){
    // Proteger les chaines
    //

    jQuery.each(item, function(i, val) {
        //console.log(i);
        //console.log(val);
        if( val.indexOf("\\'") != -1){ 
            return; // deja protege    
        }
        item[i]=val.replace("'", "\\'");
    });
}