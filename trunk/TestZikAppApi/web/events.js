/**
 * 
 * @author Amine HALLILI <amine.hallili@gmail.com>
 */

$(':file').change(function(){
    var file = this.files[0];
    name = file.name;
    size = file.size;
    type = file.type;
    //your validation
});

function progressHandlingFunction(e){
    if(e.lengthComputable){
        $('progress').attr({value:e.loaded,max:e.total});
    }
}

function beforeSendHandler(e){
    $("#loading").html('<img src="./smallloading.gif" alt="loading" />');
    $('progress').show();
}

function completeHandler(e){
    $("#loading").html('<img src="./Success.png" alt="success" />');
}

function errorHandler(e){
    alert("Erreur occured cannot upload the file ");
}


$(document).ready(function(){
    $('progress').hide();
    $(':button').click(function(){
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
    });
});