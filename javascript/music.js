// written by Hayate Sakai k21056
// 基本的な方針としては、HTMLファイル名に応じて流す音楽を変える処理をしています
// ファイル名取得
var str = window.location.href.split('/').pop();
//音楽再生用変数を定義
var main = new Audio("../ogg/main_theme.ogg");
var main2 = new Audio("../ogg/atletic.ogg");
var cas = new Audio("../ogg/castle.ogg");
var go = new Audio("../ogg/gameover.ogg");
var coin = new Audio("../ogg/coin.ogg");
var oneup = new Audio("../ogg/oneup.ogg");
var dead = new Audio("../ogg/dead.ogg");
var hurry = new Audio("../ogg/hurryup.ogg");
var jump = new Audio("../ogg/jump.ogg");
var jumpB = new Audio("../ogg/jumpbig.ogg");
var clearW = new Audio("../ogg/world_clear.ogg");
var clearC = new Audio("../ogg/course_clear.ogg");
var pUp = new Audio("../ogg/power_up.ogg");
var pDown = new Audio("../ogg/power_down.ogg");
var ap = new Audio("../ogg/appear.ogg");
var blb = new Audio("../ogg/block.ogg");
var bur = new Audio("../ogg/burst.ogg");
var bre = new Audio("../ogg/break.ogg");
var fi = new Audio("../ogg/fire.ogg");
var press = new Audio("../ogg/press.ogg");
var rollup = new Audio("../ogg/rollup.ogg");
let music = null;
let ddur = 2900;

function playBGM(music) {
    music.play();
};
function pauseBGM(music) {
    music.pause();
};

function hurryBGM(music) {
    var timeoutID = setTimeout(() => {
        hurry.load();
        music.pause();
        hurry.play();
        clearTimeout(timeoutID);
    }, 5000);
    setTimeout(() => {
        music.load();
        music.play();
    }, 8000);
};

function goalBGM() {
    main.pause();
    clearC.play();
}

function deadBGM() {
    music.pause();
    dead.play();
}


// index.
if (str == "index.html") {
    //playメソッドで変数に入っている音楽を再生
   music = coin;
}
// main.
if (str == "mario1.html") {
    music = main;
}
// main2.
if (str == "mario2.html") {
    music = main2;
}
//castle.
if (str == "mario3.html") {
    music = cas;
}
// gameover.
if (str == "gameover.html") {
    go.play();
}

//playメソッドで変数に入っている音楽を再生
playBGM(music);
//10000m秒後に停止。    
// hurryBGM(music);




