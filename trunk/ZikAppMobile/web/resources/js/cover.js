
var _apiKey = '0b499bc1dbc7f60dddfc3cf20810dfcc';
var _apiSecret = '2ff1b1800c0af2c2a552e6040c7954c5';

function wsSetArtistImage(artist, imgId, imgSize){
    var cache = new LastFMCache();
    var lastfm = new LastFM({
        apiKey    : _apiKey,
        apiSecret : _apiSecret,
        cache     : cache
    });
    
    lastfm.artist.getInfo({
        artist: artist
    },
    {
        success: function(data){
            
            console.log("************ LAST FM DATA *************");        
            console.log(data);
            //console.log(data.artist.image[0]);
            var src;
            src= data.artist.image[imgSize]['#text'];
            
            attribUploadCover(src, imgId);
        
        },
        error: function(code, message){
            console.log("************ LAST FM ERROR *************");        
            console.log(code, message);
        
        }
    });
}

function wsSetAlbumCover(artist, album, imgId, imgSize){
    
    var cache = new LastFMCache();
    var lastfm = new LastFM({
        apiKey    : _apiKey,
        apiSecret : _apiSecret,
        cache     : cache
    });
    
    lastfm.album.getInfo({
        artist: artist,
        album: album
    },
    {
        success: function(data){
            
            console.log("************ LAST FM DATA *************");        
            console.log(data);
            var src;
            src= data.album.image[imgSize]['#text'];
            
            console.log("SRC:" +src);
            if(src!=null && src!='undefined' && src!=''){
                attribUploadCover(src, imgId);
                
            }else{
                // Obtention d'une image de l'artiste
                //
                wsSetArtistImage(artist, imgId, imgSize)
            }
            
        
        },
        error: function(code, message){
            console.log("************ LAST FM ERROR *************");        
            console.log(code, message);
            
            // Obtention d'une image de l'artiste
            //
            wsSetArtistImage(artist, imgId, imgSize);
        }
    });
};
