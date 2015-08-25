
               
$(document).ready(function(){
    
        audio = document.getElementById("audio");
        
	$('body').on("click","a[rel=get], .getlink",function(e){
		e.preventDefault();
                
                
		// $(this) point to the clicked .sponsorFlip element (caching it in elem for speed):
		var elem = $("#content");
                var url = $(this).attr('href');
                var gcontent = $("#content");
                var contentToFind = "#content";
                
                var index = "index.xhtml";
                var index1 = "ZikApp-war/"
                var currentURL = document.URL;
                
                
               /* if(currentURL.indexOf(index, currentURL.length - index.length) !== -1 || currentURL.indexOf(index1, currentURL.length - index1.length) !== -1)
                    {
                        elem = $("body");
                        gcontent = $("body");
                        //alert("test de reidrection vers new tracks");
                        /*window.location = "/ZikApp-war/newTracks.xhtml";
                        window.location = url;
                        //alert();
                        //return;
                    }
                if(url == "/ZikApp-war/index.xhtml" || url == "/ZikApp-war/")
                    {
                        alert(document.URL);
                        gcontent = $("body");
                        contentToFind = "body";
                        elem = $("body");
                    }*/
                
                // Using the flip method defined by the plugin:

                elem.flip({
                        direction:'lr',
                        speed: 350,
                        color: '#74B1D1',
                        onBefore: function(){
                                //gcontent.html('<img src="./resources/img/bigloading.gif" />');
                                $.get(
                                        url,
                                        function(data)
                                        {
                                                // Ici on crée la regex qui nous permettra de sélectionner le texte entre les balises <title>
                                                var regexp = /<title>(.*)<\/title>/i;
                                                // data.match(regexp)[1] contient le title
                                                document.title = data.match(regexp)[1];
                                                if(url!=window.location){
                                                    window.history.pushState({path:url},'',url);
                                                  }
                                                // Ensuite on peut récupérer le contenu de toutes les div qu'on veut avec cette même requête AJAX
                                                var resp = $("<div></div>").html(data);
                                                var content = resp.find(contentToFind);
                                                var script = $("#scripttoload");
                                                gcontent.html(content.html());
                                        },
                                        "html"
                                );

                                
                        }
                });

                // Setting the flag:
                elem.data('flipped',true);
                return false;
	});
	
});