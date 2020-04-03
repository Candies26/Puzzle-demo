$(document).ready(function() {
    var audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'audio/pi.mp3');
    audioElement.setAttribute('autoplay', 'autoplay'); //打开自动播放
    //audioElement.load()

    $.get();

    audioElement.addEventListener("load", function() {
        audioElement.play();
    }, true);

    $('#puzzle').click(function() {
        audioElement.play();
    });

});