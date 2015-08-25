"use strict"

var navDebug;

/**
 * Racine des web services de zikkapp
 **/

var _callBackCount=0;
var _backStack= [];
var _navInited=false;




/**
 * Intercepter le chargement des pages (evenement pagebeforchange)
 * afin d'effectuer un prétraitement d'injection des donnees
 * obtenues en ajax depuis le serveur zikApp
 **/
$(document).bind( "pagebeforechange", function( event, data ) {
    // FIXED
    // Sur lien <a>, pagebeforechange se declenche deux fois
    // 1ere) avec data.toPage= l'url du lien
    // 2eme) avec data.toPage= Objet page Jquery
    // Sur entree de la page en barre d'adresse, il se declenche 1 fois
    // avec data.toPage = Objet page Jquery
     

    //DBG
    //*
    if(typeof data.toPage == 'string'){
        if(navDebug) console.log("!!!!!!!!!!! EVENT pagebeforechange (URL) !!!!!!!!!!!!!!!!!!!!!!!!!");
    }else{ 
        if(navDebug) console.log("!!!!!!!!!!! EVENT pagebeforechange ($PAGE OBJECT)!!!!!!!!!!!!!!!!!!!!!!!!!");
    }
    if(navDebug) console.log(" ---------- pagebeforechange event ------------ ");
    if(navDebug) console.log(event);
    if(navDebug) console.log(" ---------- pagebeforechange data ------------ ");
    if(navDebug) console.log(data);
    //*/
    
   

    // Cas d'une page deja injectée => traitement par defaut
    // => eviter
    //
    if(data.options.data == "INJECTED"){
        //if(navDebug) console.log(" INJECTED => DEFAULT");
        return;
    }
    
    // Obtenir les attributs de la page
    //
    var pageAttributes = _getPageAttributes(data);
     
     
    if(pageAttributes.url.indexOf('index.jsp')!=-1){
        _navInited=true;
    }
    
    // Cas d'une navigation non initiée = jamais passé par index.jsp
    //
    if(_navInited==false){
        
        // Bypasser le traitement par defaut de l'evenement
        //
        event.preventDefault();
                
        window.location = "index.jsp";

    } 
     
    //DBG
    //
    if(navDebug) console.log(" ---------- pagebeforechange pageAttributes ------------ ");
    if(navDebug) console.log(pageAttributes);
    //*/
    
      
    //*
    // Cas d'un appel avec URL
    //    FIXME
    if(typeof data.toPage == 'string'){
        if(navDebug) console.log(" URL => DEFAULT");
        return;
    }
    //*/
    
    // Montrer le widget de chargement (animation)
    //
    //_showProgressBar();
    
    // Mettre en surbrillance le menu dans la navbar correspondant à la page
    //
    _highlightMenu(pageAttributes);
    
    // ajouter le bouton revenir si besoin
    //
    _addBackToMenu(pageAttributes);
    
    // Charger et injecter les donnees
    //
    if(_loadData(pageAttributes)){
        if(navDebug) console.log(" _loadData TRUE ==> preventDefault");

        // Bypasser le traitement par defaut de l'evenement
        //
        event.preventDefault();
        return;
    }
    else{
        if(navDebug) console.log(" _loadData FALSE ==> DEFAULT");
        return;
    }
      
});

/**
 * Montrer la barre de progression lors du chargement
 */
function _showProgressBar(){
    $.mobile.loading( 'show', {
        text: 'Interrogation du serveur ZikApp',
        textVisible: true,
        theme: 'z',
        html: ""
    });
}
function _addBackToMenu(pageAttributes){
    var backUrl;
    // Cas d'une page appellée par un back
    // 
    var backedParam = unescape(getURLParameter(pageAttributes.params, 'backed'));
    var backed=  (backedParam == 'true');
    if(navDebug>=1) console.log("backedParam:"+ backedParam);
    
    if(backed == true){
        // Depiler l'url de back et la virer
        //
        var trash = _backStack.pop();
        if(navDebug>=1) console.log("===>TRASH BACK URL: (TRASH)"+ trash);
        
        backUrl = _backStack[_backStack.length-1];
        if(navDebug>=1) console.log("===>GET BACK URL: (TRASH)"+ backUrl);
    }
    // Cas d'un page normale
    //
    else{
        // Obtenir le parametre de retour échéant
        //
        backUrl = unescape(getURLParameter(pageAttributes.params, 'back'));  
    }
    
    // Cas d'une url de back présente
    //
    if(backUrl!=undefined && backUrl !=""){
        
        // Ajouter le parametre backed=true dans l'url du bouton
        //
        var btnBackUrl;
        if(backUrl.indexOf('?')==-1){
            btnBackUrl=backUrl+'?backed=true';
        }else{
            btnBackUrl=backUrl+'&backed=true';
        }
        
        // Ajouter le bouton à l'entete
        //
        var $header = pageAttributes.$page.children( ":jqmData(role=header)" );
        $header.append('<a href="'+btnBackUrl+'" data-icon="back" class="myBack ui-btn-left" data-theme="b">Back</a>')
        if(navDebug>=1) console.log('------------ ADD BACK TO MENU ------------');
        if(navDebug>=1) console.log("BACK URL:"+backUrl);
        var $button = pageAttributes.$page.find(".myBack");
        //if(navDebug) console.log($button);
        //$button.trigger('create');
        $button.button();
        
        // Ajouter l'url de back à la pile
        //
        
        // Cas d'une url back non depilee
        //
        if(!backed){
            if(navDebug>=1) console.log("===>PUSH BACK URL:"+ backUrl);
            _backStack.push(backUrl);
        }
        
    }
    
    // Cas d'une url de back non présente
    //
    else{
               
        // Retirer le bouton back
        //
        pageAttributes.$page.find(".myBack").remove;
        
        // Vider la pile des back
        //
        _backStack=[];
    }
  
    
}

function _highlightMenu(pageAttributes){
      
    var $header = pageAttributes.$page.children( ":jqmData(role=header)" );
    var $menu = $header.find(".myNavBar");
    //console.log($menu);
    //console.log(pageAttributes.pageName);
    
    //*
    $menu.find('a').each(function(i, value) { 
            
        var menuPage = value.href.substring(value.href.lastIndexOf('/') + 1);
        //console.log(value);
        //console.log(i);
        if( menuPage == pageAttributes.pageName+'.jsp'){
            $(this).addClass("ui-btn-active");
            $(this).addClass("ui-state-persist");
            //console.log(value);
            return;    
        }
    });
} 
 
/** OBTENTION DES ATTRIBUTS DE LA PAGE
 *
 **/ 
function _getPageAttributes(data){
  
    var pageAttributes;
    // Cas de l'evenement qui ne comporte une URL  
    //
    if(typeof data.toPage == 'string'){
        
        var cleanUrl = data.toPage.replace( /\?.*$/, "" );
        var fileName = cleanUrl.substring(data.toPage.lastIndexOf('/') + 1);
        var pageName = fileName.replace('.jsp','') ;
        var url = data.toPage;
        var params = url.lastIndexOf('?') != -1 ? url.substring(url.lastIndexOf('?') + 1): '';
        
        pageAttributes ={
            url: url,
            cleanUrl: cleanUrl,
            pageName: pageName,
            $toPage: data.toPage, // Object(page) ou string(url) dans notre cas le string est bypassé
            $options: data.options,
            $page: $(pageName), //FIXMEEEEEEE
            dataName:  pageName,
            params: params
        }
        
    }
    // Cas de l'evenement qui comporte un objet page
    //
    else{
        var url = data.toPage[0].baseURI; //FIXME
        var params = url.lastIndexOf('?') != -1 ? url.substring(url.lastIndexOf('?') + 1): '';
        
        pageAttributes ={
            url: url,
            cleanUrl: url.replace( /\?.*$/, "" ),
            pageName: data.toPage[0].id,
            $toPage: data.toPage, // Object(page) ou string(url) dans notre cas le string est bypassé
            $options: data.options,
            $page: data.toPage,
            dataName: data.toPage[0].id,
            params: params
        }
    }
   
    return pageAttributes;
}


function _loadData_(pageAttributes, dataAttributes){
    if(injectDebug) console.log("_loadData class:"+dataAttributes.injectClass);
    var callBack;
    
    // Cas d'une collection d'items (liste)
    //
    if(dataAttributes.query == 'all'){
        
        callBack=function(data){    
            _injectData(data[dataAttributes.ws],  pageAttributes, dataAttributes);
        };
        dataGet(dataAttributes.ws, callBack, null, null, null);
        return true;
    }
    
    
    // Cas d'un item unique (details)
    //
    else if(dataAttributes.query == 'id'){
        var id = getURLParameter(pageAttributes.params, 'id');
        callBack=function(data){
            _injectData(data, pageAttributes, dataAttributes);
        };
        dataGet(dataAttributes.ws, callBack, id, null, null); 
        return true;
    }
    
    
    // Cas d'un tableau local
    //
    else if(dataAttributes.query == 'local'){
        _injectData(dataAttributes.ws, pageAttributes, dataAttributes);
        return true;
    }
    
    // Cas d'anomalie
    //
    else{
        return false;
    }
        
}


/**
 * Obtenir en ajax, et mettre au format html les donnees depuis le serveur ZikApp
 * en fonction de la page demandee
 */
function _loadData(pageAttributes){
    var result =false;
     
    //DBG
    /*
    if(navDebug) console.log("---------- _loadData pageAttributes ------------");
    if(navDebug) console.log(pageAttributes);
    //*/
    
    // Attributs liés aux donnees de la page
    //    
    var dataAttributes = _dataAttributes[ pageAttributes.dataName ];
    if(injectDebug) console.log("--------attributes------- ");
    if(injectDebug) console.log(dataAttributes);
    
   
 
    // Cas d'anomalie:  page n'ayant pas de donnees reconnues
    //
    if(! dataAttributes || dataAttributes==undefined){
        if(injectDebug) console.log("! attributes return false;");
        return false;
    }
    else if(dataAttributes instanceof Array){
        
        _callBackCount=dataAttributes.length;
        if(navDebug)console.log("CALLBACK COUNT:"+_callBackCount);
        for(var i=0; i<dataAttributes.length; i++){
            result = _loadData_(pageAttributes, dataAttributes[i]);
        }
    }
    else{
        _callBackCount=1;
        result = _loadData_(pageAttributes, dataAttributes);
    }
    
    return result;
}



/**
 * Injecter les donnees dans la page
 */
function _injectData(data, pageAttributes, dataAttributes)
{
    //DBG
    //*/
    if(injectDebug) console.log("_injectData class:"+dataAttributes.injectClass);
    if(navDebug) console.log("---------- _injectData pageAttributes ------------");
    if(navDebug) console.log(pageAttributes);
    if(injectDebug) console.log("---------- _injectData dataAttributes ------------");
    if(injectDebug) console.log(dataAttributes);
    

    

    var $injectMe = pageAttributes.$page.find('.' + dataAttributes.injectClass);


    var markup='';
    // Cas d'une collection (findAll)
    //
    if(data instanceof Array){
        
        var cItems = data;
        var numItems = cItems.length;
        
        if(injectDebug>=2) console.log("---------- cItems ------------");
        if(injectDebug>=2) console.log(cItems);

        for ( var i = 0; i < numItems; i++ ) {
            markup +=  dataAttributes.callBackMarkup(cItems[i]);
        }
    //markup += "</ul>";
    }
    
    // Cas d'un tuple (findById)
    //
    else{
        var item = data;
        markup =  dataAttributes.callBackMarkup(item);
    //if(injectDebug) console.log(markup);
    }
    // DBG
    //*
    if(injectDebug>=2) console.log("---------- markup ------------");
    if(injectDebug>=2) console.log(markup);
    if(injectDebug>=2) console.log("---------- $injectMe ------------");
    if(injectDebug>=2) console.log($injectMe);
    //*/
    
    // Injecter le code html
    //
    if(markup !=null && markup!="" ){
         
        $injectMe.html( markup );
    }
    // Pages are lazily enhanced. We call page() on the page
    // element to make sure it is always enhanced before we
    // attempt to enhance the listview markup we just injected.
    // Subsequent calls to page() are ignored since a page/widget
    // can only be enhanced once.
    pageAttributes.$page.page();

    
    // Appliquer le theme sur le html frais
    //
    if(dataAttributes.callbackRefresh){
        dataAttributes.callbackRefresh(pageAttributes);
    }
    // Si toutes les callback sont passées 
    // lance le changement de page
    //
    
    _callBackCount--;
    if(navDebug)console.log("CALLBACK COUNT:"+_callBackCount);
    if(_callBackCount<=0){
        _navigate(pageAttributes);
    }
    
}

  
/**
 * Afficher la page fraichement injectee
 */
function _navigate(pageAttributes){
  
    pageAttributes.$options.data="INJECTED";
    pageAttributes.$options.dataUrl = "";// pageAttributes.url;
    
    //DBG
    //*
    if(navDebug) console.log("---------- _navigate pageAttributes ------------");
    if(navDebug) console.log(pageAttributes);
    //*/
    
    $.mobile.changePage( pageAttributes.$page, pageAttributes.$options);
}


/*
$(document).bind( "pageshow", function( event, data ) {
    console.log("*****************BIDOUILLE***************");
    
    var percent = 0.5;
    var pagePosition =0;
    var footerHeight = $(window).height() * percent;
    
    var newHeight = $(window).height() -footerHeight;
    $('#myTestFooter').addClass("top");
        
    $('#myTestFooter').css({
        backgroundColor: 'yellow',
        position: "absolute",
        width:  $(window).width(),
        height: footerHeight,
        top: newHeight+1
      
    }).page();
           

    
    $("#index").css({
        top: '0',
        height: '60',
        maxHeight: '60 !important;'
    });

    
});

$(document).bind('resize', function (event) {
    console.log("***********RESIZE*********");
    /*
    var content_height = $.mobile.activePage.children('[data-role="content"]').height(),
    header_height  = $.mobile.activePage.children('[data-role="header"]').height(),
    footer_height  = $.mobile.activePage.children('[data-role="footer"]').height(),
    window_height  = $(this).height();
   
    $('#index').css('min-height', 60);
    /*
    if (content_height < (window_height - header_height - footer_height)) {
        $.mobile.activePage.css('min-height', (content_height + header_height + footer_height));
        setTimeout(function () {
            $.mobile.activePage.children('[data-role="footer"]').css('top', 0);
        }, 500);
    }
     
    event.stopImmediatePropagation();
    event.preventDefault();
}).trigger('resize');

//*/