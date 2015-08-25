//"use strict"

var uploadDebug=2; 

var ID3_genres = [
"Blues","Classic Rock","Country","Dance","Disco","Funk","Grunge",
"Hip-Hop","Jazz","Metal","New Age","Oldies","Other","Pop","R&B",
"Rap","Reggae","Rock","Techno","Industrial","Alternative","Ska",
"Death Metal","Pranks","Soundtrack","Euro-Techno","Ambient",
"Trip-Hop","Vocal","Jazz+Funk","Fusion","Trance","Classical",
"Instrumental","Acid","House","Game","Sound Clip","Gospel",
"Noise","AlternRock","Bass","Soul","Punk","Space","Meditative",
"Instrumental Pop","Instrumental Rock","Ethnic","Gothic",
"Darkwave","Techno-Industrial","Electronic","Pop-Folk",
"Eurodance","Dream","Southern Rock","Comedy","Cult","Gangsta",
"Top 40","Christian Rap","Pop/Funk","Jungle","Native American",
"Cabaret","New Wave","Psychadelic","Rave","Showtunes","Trailer",
"Lo-Fi","Tribal","Acid Punk","Acid Jazz","Polka","Retro",
"Musical","Rock & Roll","Hard Rock","Folk","Folk-Rock",
"National Folk","Swing","Fast Fusion","Bebob","Latin","Revival",
"Celtic","Bluegrass","Avantgarde","Gothic Rock","Progressive Rock",
"Psychedelic Rock","Symphonic Rock","Slow Rock","Big Band",
"Chorus","Easy Listening","Acoustic","Humour","Speech","Chanson",
"Opera","Chamber Music","Sonata","Symphony","Booty Bass","Primus",
"Porn Groove","Satire","Slow Jam","Club","Tango","Samba",
"Folklore","Ballad","Power Ballad","Rhythmic Soul","Freestyle",
"Duet","Punk Rock","Drum Solo","Acapella","Euro-House","Dance Hall"
];

var _uploadingFile;

$( '#upload' ).live( 'pagebeforecreate', function(event){
    
    for ( var i = 0; i < ID3_genres.length; i++ ) {
        $('#style').append('<option value="'+i+'">'+ID3_genres[i]+'</option>');
    }
    $('#style option[value='+12+']').attr('selected', 'selected');
});

function upload(){
    
    var formData = new FormData($('form')[0]);
    $.ajax({
        url: '/ZikAppWS/webresources/track/upload',  //server script to process data
        type: 'POST',
        xhr: function() {  // custom xhr
            myXhr = $.ajaxSettings.xhr();
            if(myXhr.upload){ // check if upload property exists
                myXhr.upload.addEventListener('progress',progressHandlingFunction, false); // for handling the progress of the upload
            }
            return myXhr;
        },
        //Ajax events
        beforeSend: beforeSendHandler,
        success: completeHandler,
        error: errorHandler,
        // Form data
        data: formData,
        //Options to tell JQuery not to process data or worry about content-type
        cache: false,
        contentType: false,
        processData: false
    });
}



function onTrackFileChange(){
    var file = $('#track')[0].files[0];
    
    _uploadingFile = new Object();
    
    name = file.name;
    size = file.size;
    type = file.type; 
    
    if(uploadDebug)  console.log("FILE TO UPLOAD:");
    if(uploadDebug)  console.log(file);
    
    var reader = new FileReader();
    
    reader.onload = function(e) {
        var dv = new jDataView(this.result);
        
        // "TAG" starts at byte -128 from EOF.
        // See http://en.wikipedia.org/wiki/ID3
        if (dv.getString(3, dv.byteLength - 128) == 'TAG') {
            
            _uploadingFile.title = dv.getString(30, dv.tell());
            _uploadingFile.artist = dv.getString(30, dv.tell());
            _uploadingFile.album = dv.getString(30, dv.tell());
            _uploadingFile.year = dv.getString(4, dv.tell());
            var comment = dv.getString(28, dv.tell());
            var nullChar = dv.getString(1, dv.tell());
            var trackNum = dv.getString(1, dv.tell());
            var genreIndex = dv.getString(1, dv.tell()); //Index in a list of genres, or 255
            _uploadingFile.genre = ID3_genres[genreIndex];
            
            if(uploadDebug)  console.log('title:'+_uploadingFile.title);
            if(uploadDebug)  console.log('year:'+_uploadingFile.year);
            if(uploadDebug)  console.log('artist:'+_uploadingFile.artist);
            if(uploadDebug)  console.log('album:'+_uploadingFile.album);
            if(uploadDebug)  console.log('nullChar:'+nullChar);
            if(uploadDebug)  console.log('genreIndex:'+genreIndex);
            if(uploadDebug)  console.log('genre:'+_uploadingFile.genre);
            if(uploadDebug)  console.log('trackNum:'+trackNum);
            if(uploadDebug)  console.log('comment:'+comment);
            
            $('#title').val(_uploadingFile.title); 
            $('#year').val(_uploadingFile.year);
            $('#author').val(_uploadingFile.artist);
            $('#album').val(_uploadingFile.album);
            
            $('#style option[value='+genreIndex+']').attr('selected', 'selected');
            $('#style').selectmenu('refresh', true);
            
             
            
            // Obtenir la couverture de l'album par webservice
            //
            wsSetAlbumCover(_uploadingFile.artist, _uploadingFile.album, '#MY_ALBUM_COVER', 3);
            
        //wsSetArtistImage (artist, '#MY_ALBUM_COVER', 1);
        } else {
        // no ID3v1 data found.
        }
    };
    
    reader.readAsArrayBuffer(file);


}

function onCoverFileChange(){
    console.log('onCoverFileChange');
    var file = $('#cover')[0].files[0];
    console.log(file);
    if(file!=null && file!=undefined){
        
        // Enlever l'input pr cover_ulr (pr webservice)
        //
        $('#cover_url').remove();
    }
}


function progressHandlingFunction(e){
    if(e.lengthComputable){
        $('progress').attr({
            value:e.loaded,
            max:e.total
        });
    }
}

function beforeSendHandler(e){
    $("#loading").html('<img src="./resources/img/smallloading.gif" alt="loading" />');
    if(uploadDebug)  console.log("Upload Started");
    $('progress').show();
}

function completeHandler(e){
    if(uploadDebug)  console.log("Upload Completed");
    $("#loading").html('<img src="./resources/img/success.png" alt="success" />');
}

function errorHandler(e){
    
    alert("Erreur occured cannot upload the file ");
}

function onCoverImgClick(){
    toggleCoverInput(1, null);
}
 
function attribUploadCover(url, imgId){
    console.log(url);
    
    // Sauver l'url pr upload
    //
    toggleCoverInput(3, url);
}

function toggleCoverInput(cmd, param){
    // Cas d'un fichier
    //
    if(cmd==1){
        console.log("PRPARE FILE INPUT");
        $("#COVER_INPUT").html('<input id="cover" name="cover" type="file"  data-clear-btn="true" onChange="toggleCoverInput(2, this.files[0]);"/>');
        document.getElementById('cover').click();
    }
    if(cmd==2){
        console.log("FILE:");
        console.log(param);
        $("#cover_url").remove();
        
        showCoverFile(param);
    }
    // Cas d'une url acquise par webservice
    //
    else if(cmd==3){
        console.log("URL:");
        console.log(param);
        $("#cover").remove();
        
        // Afficher l'image
        //
        $('#MY_ALBUM_COVER').attr("src", param);
        $("#COVER_INPUT").html('<input id="cover_url" name="cover_url" type="text"/>'); 
        $("#cover_url").val(param);
    }
    else{
    // TODO EX
    }
}


function showCoverFile(file){
     
    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
        return function(e) {
            
            $('#MY_ALBUM_COVER').attr("src", e.target.result);
        };
    })(file);

    // Read in the image file as a data URL.
    reader.readAsDataURL(file);
   
 
}