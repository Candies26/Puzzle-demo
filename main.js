var context = document.getElementById('puzzle').getContext('2d');

var img = new Image();
img.src = '1.png';
img.addEventListener('load', drawTiles, false); //load事件侦听，即图片加载完成事件

var boardSize = document.getElementById('puzzle').width; //获取画布宽度

//获取选择的值
var obj = document.getElementById("level"); //定位id
var index = obj.selectedIndex; // 选中索引
var tileCount = obj.options[index].value; // 选中值  

var tileSize = boardSize / tileCount; //计算拼块的大小宽度

var clickLoc = new Object;
clickLoc.x = 0;
clickLoc.y = 0;

var emptyLoc = new Object;
emptyLoc.x = 0;
emptyLoc.y = 0;

var solved = false;

var start = document.getElementsByClassName('start');

var mycanvas = document.getElementById('puzzle');

//实现拼块随机排列
var boardParts = new Object;
setBoard();

function setBoard() {
    boardParts = new Array(tileCount * tileCount);
    for (var i = 0; i < tileCount * tileCount; i++) {
        boardParts[i] = i;
    }
    shift(); //拼块的随机排列
}

function sortNumber(a, b) { //随机排序函数
    return Math.random() > 0.5 ? -1 : 1;
}

function shift() {
    boardParts.sort(sortNumber);
    emptyLoc.x = 0;
    emptyLoc.y = 0;
    solved = false;
}
//绘制所有拼块
function drawTiles() {
    context.clearRect(0, 0, boardSize, boardSize);
    for (var i = 0; i < tileCount; i++) {
        for (var j = 0; j < tileCount; j++) {
            var n = boardParts[i * tileCount + j];
            //计算出编号为n的拼块在原图的位置坐标（行列号）
            var x = parseInt(n / tileCount); //丢弃小数部分，保留整数部分
            var y = n % tileCount;
            console.log(x + ":" + Math.floor(n / tileCount) + ":" + y);
            if (i != emptyLoc.x || j != emptyLoc.y || solved == true) {
                context.drawImage(img, x * tileSize, y * tileSize, tileSize, tileSize,
                    i * tileSize, j * tileSize, tileSize, tileSize);
            }
        }
    }
}
document.getElementById('level').onchange = function() {
    tileCount = this.value;
    tileSize = boardSize / tileCount;
    setBoard();
    drawTiles();
};

document.getElementById('puzzle').onmousemove = function(e) {
    clickLoc.x = Math.floor((e.pageX - this.offsetLeft) / tileSize);
    clickLoc.y = Math.floor((e.pageY - this.offsetTop) / tileSize);
};

document.getElementById('puzzle').onclick = function() {
    if (distance(clickLoc.x, clickLoc.y, emptyLoc.x, emptyLoc.y) == 1) {
        slideTile(emptyLoc, clickLoc); //交换被单击的拼块与空块位置
        drawTiles(); //显示各个拼块
    }
    if (solved) {
        alert("恭喜你完成游戏！");
        setBoard();
        drawTiles();
    }
};

function distance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

function slideTile(emptyLoc, clickLoc) {
    if (!solved) {
        var t;
        t = boardParts[emptyLoc.x * tileCount + emptyLoc.y];
        boardParts[emptyLoc.x * tileCount + emptyLoc.y] = boardParts[clickLoc.x * tileCount + clickLoc.y];
        boardParts[clickLoc.x * tileCount + clickLoc.y] = t;
        emptyLoc.x = clickLoc.x; //emptyLoc重新记录空白块位置
        emptyLoc.y = clickLoc.y;
        checkSolved();
    }
}

function checkSolved() {
    var flag = true;
    for (var i = 0; i < tileCount * tileCount; i++) {
        if (boardParts[i] != i)
            flag = false;
    }
    solved = flag;
}


$(".back").click(function() {
    alert("游戏失败，因为你还没有完成游戏！")
    $(".gameover").show(1000);
    $(".main").hide(1000);
    setBoard();
    drawTiles();
})

$(".gameover").click(function() {
    $(".main").css("display", "none");
    $(".gameover").hide(1000);
    $(".start").show();
    setBoard();
    drawTiles();
})

$(".replay").click(function() {
    setBoard();
    drawTiles();
})