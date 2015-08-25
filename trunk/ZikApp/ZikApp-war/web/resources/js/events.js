/**
 * 
 * @author Amine HALLILI <amine.hallili@gmail.com>
 */

$(document).ready(function(){
    $(".PlayListItems").hide();
    $("#playlistsubmit").hide();
    $("#j_idt58_paginator_top").hide();
    
    /*$("#content").on("click",".PlayListButton",function(){
       $(".PlayListItems",$(this).parent()).slideToggle("slow"); 
    });*/

    $(".ui-panel-titlebar").click(function(){
        //$(".PlayListItems",$(this).parent().parent()).hide(); 
        $(".PlayListItems",$(this).parent()).slideToggle("slow"); 
        $(".PlayListButton").not($(this).parent()).parent().toggle();
        
    });
    
    
    
    
    
   $("body").on("click",".showpopup", function(){
       //Faire apparaitre la pop-up et ajouter le bouton de fermeture
       //<a href="#" class="close"><img src="./resources/css/close_pop.png" class="btn_close" title="Close Window" alt="Close" /></a>
	$('.popup_block',$(this).parent()).fadeIn().prepend('');
        
        
	//Effet fade-in du fond opaque
	$('body').append('<div id="fade"></div>'); //Ajout du fond opaque noir
	//Apparition du fond - .css({'filter' : 'alpha(opacity=80)'}) pour corriger les bogues de IE
	$('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();

	return false;
   });
   
    //Fermeture de la pop-up et du fond
    $('a.close, #fade').live('click', function() { //Au clic sur le bouton ou sur le calque...
        $('#fade , .popup_block').fadeOut(function() {
                $('#fade, a.close').remove();  //...ils disparaissent ensemble
        });
        return false;
    });
       

	
    
    var fixHelper = function(e, ui) {
	ui.parent().children().each(function() {
		$(this).width($(this).width());
                //alert(ui.html());
	});
	return ui;
    };
    
    
    $(".ui-datalist-data").sortable({
        axis: "y",
        revert:true,
        stop: function(event,ui){
           globalFadeIn();
           var f = document.createElement("form");
           $("input", ui.item.parent()).each(function(){
              var input = document.createElement("input");
              input.setAttribute("name", "track");
              input.setAttribute("value", $(this).val());
                  
              $(f).append(input); 
           });
           var myform = $(f).serialize();
           
           $.ajax("/ZikAppWS/webresources/playlist/sort",
                {
                    type:"PUT",
                    data: myform,
                    success: function(d){
                        console.log(d);
                        globalFadeOut();
                    },
                    error: function(ev){
                        alert("une erreur est survenue !!!");
                    }
                });
        }
    });
    
    
    
    
    
});


function removeTrackOrder(tr,id)
{
    $.ajax("/ZikAppWS/webresources/trackorder/"+id,
        {
            type:"DELETE",
            success: function(d){
                $(tr).parent().fadeOut('slow',function(){$(this).remove()});
            }
        });
}


function removeTrack(tr,id)
{
    $.ajax("/ZikAppWS/webresources/track/"+id,
        {
            type:"DELETE",
            success: function(d){
                $(tr).parent().parent().parent().fadeOut('slow',function(){$(this).remove()});
            }
        });
}


function removePlayList(tr,id)
{
    $.ajax("/ZikAppWS/webresources/playlist/"+id,
        {
            type:"DELETE",
            success: function(d){
                $(tr).parent().parent().parent().parent().parent().fadeOut('slow',function(){$(this).remove()});
                $(".PlayListItems",$(this).parent()).slideUp("slow"); 
                $(".PlayListButton").not($(this).parent()).parent().show();
            }
        });
}

function showPlayLists(trackId)
{
    $('.popup_block').fadeIn().prepend('');
    //Effet fade-in du fond opaque
    $('body').append('<div id="fade"></div>'); //Ajout du fond opaque noir
    //Apparition du fond - .css({'filter' : 'alpha(opacity=80)'}) pour corriger les bogues de IE
    $('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();
    $(".popup_block").html("");
    $.get(
            "/ZikAppWS/webresources/playlist",
            function(data)
            {
                
                $(data).find("playlist").each(function(index,item){
                    var playlistId = $(item).find("id").text();
                    var a = document.createElement("a");
                    a.setAttribute("href", "#");
                    a.setAttribute("class", "btn span5")
                    a.setAttribute("rel", "/ZikAppWS/playlist/"+playlistId+"/addtrack/"+trackId);
                    a.innerHTML = $(item).find("name").text();
                    a.addEventListener("click", function(){
                        var data = null;
                        $.ajax({
                            url: "/ZikAppWS/webresources/playlist/"+playlistId+"/addtrack/"+trackId,
                            type:"PUT",
                            data: data,
                            success: function(d){
                                //alert(d);
                                $('#fade , .popup_block').fadeOut(function() {
                                    $('#fade, a.close').remove();  //...ils disparaissent ensemble
                                });
                            }

                        });
                    });
                    $(".popup_block").append(a);
                    $(".popup_block").append("<br />");
                    $(".popup_block").append("<br />");
                    
                })
             
            },
            "html"
    );
    
}

function globalFadeIn(){
    //$('.popup_block').fadeIn().prepend('');
    //$(".popup_block").html("");
    //Effet fade-in du fond opaque
    $('body').append('<div id="fade"></div>'); //Ajout du fond opaque noir
    //Apparition du fond - .css({'filter' : 'alpha(opacity=80)'}) pour corriger les bogues de IE
    $('#fade').css({'filter' : 'alpha(opacity=80)'}).fadeIn();
}

function globalFadeOut(){
    $('#fade , .popup_block').fadeOut(function() {
        $('#fade, a.close').remove();  //...ils disparaissent ensemble
    });
}