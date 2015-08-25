"use strict"

var cacheDebug;

var _cache =null;
var _rootRestUrl= '/ZikAppWS/webresources/'
var _optionCacheMethod =2; //0: pas de cache, 1:cache tester par nombre entrees 2:timer
var _cacheTime;
var _cacheDelay = 10*1000; // delais de rafraichissement du cache en ms
 

function setDataDirty(type){
    _cache[type+'_dirty']=true;
}

function _isServerUpdated(){
    return true;
}

// FIXME
function _isCacheUpToDate(type, id, from, to){
           
    // Cas d'un cache invalidé
    //
    if(_cache[type+'_dirty']==true){
        return false;
    }
    
    // Cas du cache desactivé
    //
    else if(_optionCacheMethod==0){
        return false;
    }
    
    // Cas d'un test sur le nombre d'elements
    //
    else if (_optionCacheMethod==1){
        var count= 3;
        if (cacheDebug>=2) console.log("CACHE TEST:"+_cache[type+'_length']+" =? "+count);
    
        if(_cache[type+'_length'] != count){
            if(cacheDebug>=1) console.log("CACHE OBSOLETE");
            return false;
        }
        else{
            if(cacheDebug>=1) console.log("CACHE A JOUR");
            return true;
        }
    }
    
    // Cas du test sur la date du cache
    //
    else if (_optionCacheMethod==2){
        
        // Calculer l'ecart depuis la derniere mise à jour
        //
        var currentTime = new Date().getTime();
        var delta = currentTime - _cacheTime;
        
        // Cas d'un cache périmé
        //
        if (cacheDebug>=2) console.log("CACHE TEST: "+delta+" =>? "+_cacheDelay);
        if( delta >= _cacheDelay){
            // Verifier par webservice si le server à été mis à jour
            //
            var serverUpdated = _isServerUpdated();
            
            // Enregistrer la nouvele date du cache
            //
            _cacheTime = new Date().getTime();
            
            return !serverUpdated;
        }
        // Cas d'un cache valide
        //
        else{
            return true;
        }
    } 
    //Defaut
    //
    return false;
}

function dataGet(type, callBack, id, from, to){
         
    // Initialiser le cache si besoin
    //
    if(_cache==null){ 
        _dataInitCache();
    }
 
    var isInCache;
    var data;
    
    // Cas d'un cache obsolete
    //
    if( ! _isCacheUpToDate(type) ){
        isInCache =false;
    }
    // Cas d'un cache à jour
    //
    else{
        // Chercher la data en cache
        //
        data= _findCacheData(type, id, from, to);
         
        isInCache= (data!=null);
    }
    
    // Cas d'une donne non cachée
    //
    if( ! isInCache ){ 
        
        // Valider le cache (anticipé)
        //
        _cache[type+'_dirty']=false;
        
        // Cas d'une liste
        //
        if(id==null){
        
            // Appeler un web sercice en ajax
            //
            var wsUrl = _rootRestUrl+type;
            if(cacheDebug>=2) console.log("WS query:"+wsUrl);
            $.ajax({
                type: 'GET',
                url: wsUrl,
                dataType: "json", // data type of response
                success:function(data){
                    if(cacheDebug>=1) console.log("------ OBTENTION DES DONNEES DEPUIS LE WEBSERVICE("+wsUrl+", "+id+", "+from+", "+to+") -----");
                    if(cacheDebug>=1) console.log(data);
                
                    // Enregistrer les données en cache
                    //
                    var col = data[type];
                    for(var i=0; i<col.length; i++){
                        _putCacheData(type, col[i].id, col[i]);
                    }
                
                    if(data==null || data==undefined || data=='undefined'){
                        console.log("NO DATA");
                    }else{
                        // Retour asynchrone par callBack
                        //
                        callBack(data);
                    }
                }
            });
        
        }
        
        // Cas d'un item
        //
        else { //if(id!=null)
            //
            // Appeler un web sercice
            //
            wsUrl = _rootRestUrl+type+'/'+id;
            if(cacheDebug>=2) console.log("WS query:"+wsUrl);
            $.ajax({
                type: 'GET',
                url: wsUrl,
                dataType: "json", // data type of response
                success: function(data){
                    if(cacheDebug>=1) console.log("------ OBTENTION DES DONNEES DEPUIS LE WEBSERVICE("+wsUrl+", "+id+", "+from+", "+to+") -----");
                    if(cacheDebug>=1) console.log(data);
                
                    // Enregistrer les données en cache
                    //
                    var item = data[type]; /// Necessaire pour respecter le format de daata du webservice Object.type[]
                    _putCacheData(type, id, item);
                     
                
                    if(data==null || data==undefined || data=='undefined'){
                        console.log("NO DATA");
                    }else{
                        // Retour asynchrone par callBack
                        //
                        callBack(data);
                    }
                }
            });
        }
    }
    // Cas d'une data en cache
    //
    else{ 
        
        if(cacheDebug>=1) console.log("------ OBTENTION DES DONNEES DEPUIS LE CACHE("+type+", "+id+", "+from+", "+to+") -----");
        if(cacheDebug>=1) console.log(data);
        callBack(data);
    }
}


function _dataInitCache(){
    _cache = new Object();
    _cache['track'] =new Object;
    _cache['track_length']=0;
    _cache['track_dirty']=true;
    
    _cache['playlist']=new Object;
    _cache['playlist_length']=0;
    _cache['playlist_dirty']=true;
    
    _cache['user']= new Object;
    _cache['user_length']=0;
    _cache['user_dirty']=true;
    
    _cacheTime =  new Date().getTime();
 
}

function _dataGetById(type, id, callBack){
    return dataGet(type, callBack, id, null, null);
}

function _dataGetAll(type, callBack){
    return dataGet(type, callBack, null, null, null);
}


function _putCacheData(type, key, val){
    
    if(cacheDebug>=2) console.log("----- registered in cache ("+type+"-"+key+") --------");
    if(cacheDebug>=2) console.log(_cache);
    
    // Obtenir la collection correspondant au type du cache
    //
    var col = _cache[type];
        
    // Obtenir la valeur courante
    //
    var prevValue = col[key];
    
    // Cas d'une nouvelle valeur
    //
    if(prevValue==undefined || prevValue==null || prevValue=='undefined'){
        // Incrementer le compte des donnees cachees
        //
        _cache[type+'_length']+=1;
        if(cacheDebug>=2) console.log("nouvelle valeur");
    }
 
    // Attribuer la valeur
    //
    col[key] = val;
    
    if (cacheDebug>=2) console.log("CACHE LENGTH:"+_cache[type+'_length']);
}

function _findCacheData(type, id, from, to){
    if(id==null){
        return _findCacheDataAll(type);
    }else{
        return _findCacheDataItem(type, id);
    }
}
function _findCacheDataAll(type){
    // Obtenir la collection correspondant au type du cache
    //
    var col = _cache[type];
        
    // Convertir la collection en tableau
    //
    var itemArray = objectToArray(col);
    var val = new Object;
    val[type]= itemArray;
    
    if(cacheDebug>=2) console.log("----- _findCacheDataAll - found in cache ("+type+") --------");
    if(cacheDebug>=2) console.log(val);

    return val;
}

function _findCacheDataItem(type, key){
    // Obtenir la collection correspondant au type du cache
    //
    var col = _cache[type];
    var val;
    
    // Cas d'une liste
    //
    if(key==null){
        val=col;
    
    }
    // Cas d'un item
    //
    else{
        val = col[key];
    }
    
    if(cacheDebug>=2) console.log("----- found in cache ("+type+"-"+key+") --------");
    if(cacheDebug>=2) console.log(val);
    if(cacheDebug>=2) console.log(_cache);
    
    return val;
}

