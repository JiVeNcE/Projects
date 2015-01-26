'use strict';

(function () {



    //  creates an <iframe> (and YouTube player)
    //  after the API code downloads.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


    function progress(percent, $element) {
        var progressBarWidth = percent * $element.width() / 100;

        $element.find('div').animate({ width: progressBarWidth });
    }


    // take only the ID from YouTube link
    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match&&match[7].length==11){
            return match[7];
        }else{
            alert("Url incorrecta");
        }
    }

    var input = $('<input placeholder="Enter Youtube url video here" >');
        input.attr('type', 'text');
        input.addClass('srcInput');
        var videoFrameContainer = $('#video-Frame-Container')
        videoFrameContainer.append(input);
        var controls = $('#controls');
        var srcInputVideo =  $(".srcInput");



    srcInputVideo.on("paste", function(){
            setTimeout(function(){

                // call the function to create YouTube player
                createYTPlayer();

                input.hide();

                var videoControls = $('<div id="video-controls">');
                controls.append(videoControls);

                var inputPlay = $('<input type="button"  id="play">').hide();

                var inputPause = $('<input type="button"  id="togglePause">');

                var contrMute = $('<input class="mute"  id="mute">');

                var contrUnmute = $('<input class="unmute" id="unmute">').hide();

                var progressBar = $('<div id="progressBar">');
                var div = $('<div>');


                videoControls.append(inputPlay);
                videoControls.append(inputPause);
                videoControls.append(contrMute);
                videoControls.append(contrUnmute);
                videoControls.append(progressBar);
                progressBar.append(div);


            var player;

                function createYTPlayer() {
                     player = new YT.Player('ytplayer', {
                        height: '270',
                        width: '100%',
                        videoId:  youtube_parser(srcInputVideo.val()),
                        playerVars: {
                            'controls' : 0,
                            'modestbranding' : 1,
                            'rel' : 0,
                            'showinfo' : 0
                        },
                        events: {
                            'onReady': onPlayerReady,
                            'onStateChange': onPlayerStateChange
                        }
                    });
                }

                // The API will call this function when the video player is ready.
                function onPlayerReady(event) {
                    //event.target.playVideo();
                    event.target.pauseVideo();
                }



                //    The API calls this function when the player's state changes.
                //    The function indicates that when playing a video (state=1)

                $('#progressBar').show();
                function onPlayerStateChange(event) {
                    if (event.data == YT.PlayerState.PLAYING) {

                        $("#togglePause").click(function() {
                            player.pauseVideo();
                            $(this).hide();
                            inputPlay.show();
                        });

                        $("#play").click(function(){
                            player.playVideo();
                            $(this).hide();
                            inputPause.show();
                        });

                        $("#mute").click(function() {
                            player.mute();
                            $(this).hide();
                            contrUnmute.show();
                        });

                        $("#unmute").click(function(){
                            player.unMute();
                            $(this).hide();
                            contrMute.show();
                        });

                        var playerTotalTime = player.getDuration();


                        var mytimer = setInterval(function() {
                            var playerCurrentTime = player.getCurrentTime();
                            var playerTimeDifference = (playerCurrentTime / playerTotalTime) * 100;

                            progress(playerTimeDifference, $('#progressBar'));
                        }, 800);
                    } else {
                        clearTimeout(mytimer);
                    }
                }

            }, 50);
        });


        //  open video-pop-up
        $( ".video-pop-up" ).click(function() {
            $('.overlay').css("display", "block");
        });

        //  close video-pop-up
        $( "#close-button" ).click(function() {
            $('.overlay').css("display", "none");
        });


        var videoFrameContainer =  $("#video-Frame-Container");


        //  open video control container
        videoFrameContainer.mouseenter(function () {
            $(this).find("#video-controls").show();
        });

        //  close video control container
        videoFrameContainer.mouseleave(function () {
            $(this).find("#video-controls").hide();
        });


    //  attach a class for scroll - comments
    $( ".comment-content" ).wrap( "<div class='scroll'></div>" );


    //  get Current Data
    function currentDate() {
        var d = new Date();

        var month = d.getMonth()+1;
        var day = d.getDate();
        var hour = d.getHours();
        var minute = d.getMinutes();

        function GetMonthName(monthNumber) {
            var months = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            return months[monthNumber-1];
        }

        var output =
            GetMonthName(month) + ' ' +
            (('' + day).length < 2 ? '0' : '') + day + ', ' +
            d.getFullYear() + ' AT ' +
            (('' + hour).length < 2 ? '0' : '') + hour + ':' +
            (('' + minute).length < 2 ? '0' : '') + minute + ' PM';

        return output;
    }

    //  Knockout template for comments
    $('#comment-reply').bind('keypress', function (e) {
        var commantReply = $("#comment-reply");
        if (e.keyCode == 13) {
            e.preventDefault();
            var $content = commantReply.val();

            //  check if comment is less then 3
            if ($content.length < 3) {
                return
            }
            var $comment =
                '<div class="comment-content-call-container">'
                + '<div class="text-muted">' + currentDate() + '</div>'
                + '<p>' +  $content + '</p>'
                + '<div class="comment-content-button" id="nextCom">'
                + '<a href="#" class="like">LIKE</a>'
                + '<a href="#" class="share ">SHARE</a>'
                + '<a href="#" class="comment ">COMMENT</a>'
                + '<a href="#" class="report ">REPORT</a>'
            $("#nextCom").append($comment);
            commantReply.val('');
        }
    });
})();
