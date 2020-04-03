var progressbar = {
    init: function() {
        $(".start").hide();
        $(".main").hide();
        $(".gameover").hide();
        var fill = document.getElementById('fill');
        var progressbar = document.getElementById('progressbar');
        var count = 0;
        //通过间隔定时器实现百分比文字效果,通过计算CSS动画持续时间进行间隔设置
        var timer = setInterval(function(e) {
            count++;
            fill.innerHTML = count + '%';
            if (count === 100) {
                clearInterval(timer);
                fill.style.display = "none";
                progressbar.style.display = "none";
                $(".start").show(1000);

            }
        }, 17);
    }
};
progressbar.init();

$("#start").click(function() {
    $(".start").css("display", "none");
    $(".main").show(1000);
    $(".gameover").hide(1000);
    setBoard();
    drawTiles();
})