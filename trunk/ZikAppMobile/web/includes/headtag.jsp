<head> 
    <title>ZikkApp Mobile</title> 

    <meta name="viewport" content="width=device-width, initial-scale=1"/> 
    <link rel="stylesheet" href="resources/lib/jqmobile/jquery.mobile-1.2.0.min.css" />
    <link rel="stylesheet" href="resources/css/icons.css" /><!-- APP -->
    <link rel="stylesheet" href="resources/css/player.css" type="text/css"/>
    <script src="resources/lib/jquery/jquery-1.8.3.min.js"></script>
    <script>
        /*Because the mobileinit event is triggered immediately, you'll need to bind your event handler before jQuery Mobile is loaded. */
     
        $(document).on("mobileinit", function(){
            $.mobile.defaultPageTransition = 'none';
        });
    </script>
    <script src="resources/lib/jqmobile/jquery.mobile-1.2.0.min.js"></script>
    <script src="resources/lib/soundmanager/soundmanager2-nodebug.js" ></script>
    <script src="resources/js/data.js"></script><!-- APP -->
    <script src="resources/js/tools.js"></script><!-- APP -->
    <script src="resources/js/player.js" ></script>
    <script src="resources/js/inject.js"></script><!-- APP -->
    <script src="resources/js/engine.js"></script><!-- APP -->


</head> 