window.onload= function() {
        // Ref to the droppable div
    var dropbox = document.querySelector("#dropBox");

    if(dropbox)
        {
            // init event handlers
            dropbox.addEventListener("dragenter", dragEnter, false);
            dropbox.addEventListener("dragexit", dragExit, false);
            dropbox.addEventListener("dragover", dragOver, false);
            dropbox.addEventListener("drop", drop, false);
        }
    
  };

function dragEnter(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    $("#dropBox").css("border-color","red");
}

function dragExit(evt) {
    alert("dhors");
    evt.stopPropagation();
    evt.preventDefault();
    $("#dropBox").css("border-color","black");
    
}

function dragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
}

function drop(evt) {
  console.log("dans drop");
  
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files;
    var count = files.length;

    // Only call the handler if 1 or more files was dropped.
    if (count > 0)
        readFilesAndDisplayPreview(files);
}
  
  function readFilesAndDisplayPreview(files) {
   
    $("#imgloading").html("<img src=\"./resources/css/loading.gif\" />test");
    $("#msg").html("");
    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('mp3')) {
        $("#msg").append("<div class=\"alert alert-danger\">fichier :"+f.name+" non supporté !</div>");
        continue;
      }
      

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
        
          $("#msg").append("<div class=\"alert alert-success\">fichier :"+theFile.name+" chargé !</div>");
          
          
          $("#write").click(function () {
            var filename = theFile;

            $.ajax({
              type: "POST",
              url: "/ZikAppWS/webresources/track",
              enctype: 'multipart/form-data',
              data: {
                file: filename
              },
              success: function () {
                alert("Data Uploaded: ");
              }
            });
          });
          
        };
      })(f);

      $("#imgloading").html("");
      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object
    readFilesAndDisplayPreview(files);
  }

  //document.getElementById('files').addEventListener('change', handleFileSelect, false);
  //document.getElementById('dir').addEventListener('change', handleFileSelect, false);