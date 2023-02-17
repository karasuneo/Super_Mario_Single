let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");

let can = document.getElementById("can");
let con = can.getContext("2d");

//裏画面
vcan.width  = SCREEN_SIZE_W;
vcan.height = SCREEN_SIZE_H;

//実画面
can.width  = SCREEN_SIZE_W*3;
can.height = SCREEN_SIZE_H*3;

//アップコンバートをさせないための処理
con.mozimageSmoothingEnabled    = false;
con.msimageSmoothingEnabled     = false;
con.webkitimageSmoothingEnabled = false;
con.imageSmoothingEnabled       = false;


//フレームレート維持
let frameCount = 0;
let startTime;

// マリオの残機計算
// let ojiInit = Math.random() * 10 + 1;
let ojiInit = 0;
localStorage.setItem('ojiInit',JSON.stringify(ojiInit));
let p_ojiCount = localStorage.getItem('ojiInit');
let ojiCount = parseInt(p_ojiCount + 5);

let chImg = new Image();
chImg.src = "../image/sprite.png";
//chImg.onload = draw;

//キーボード
let keyb={};

//おじさんを作る
let ojisan = new Ojisan(100,100);

//フィールドを作る
let field = new Field();

//ブロックのオブジェクト
let block = [];
let item = [];
let kilar = []
let enemy=[];
let enemy2=[];
let taiho=[];
let buble=[];
let bulos=[];
let pata=[];
let hunmer=[];
let togeso=[];
let fire=[];
let ax=[];
let jugem=[];
let noko=[];
let kupa=[];
let bigban=[];
let bless=[];
let koura=[];
let fallobj=[];
let kfire=[];
let peach=[];
function updateObj(obj){
	//スプライトのブロックを更新
	for(let i=obj.length-1; i>=0; i--){//配列を逆向きに回してエラーをなくす
		obj[i].update();
		if(obj[i].kill == true){
			obj.splice(i, 1);//splice:指定した配列を消す
		}
	}

}

//更新処理
function update()
{
	//マップの更新
	field.update();

	
	updateObj(enemy);
	updateObj(kilar);
	updateObj(buble);
	updateObj(taiho);
	updateObj(togeso);
	updateObj(pata);
	updateObj(fire);
	updateObj(enemy2);
	updateObj(noko);
	updateObj(jugem);
	updateObj(peach);
	updateObj(hunmer);
	updateObj(koura);
	updateObj(bulos);
	updateObj(bigban);
	updateObj(ax);
	updateObj(bless);
	updateObj(block);
	updateObj(fallobj);
	updateObj(kupa);
	updateObj(kfire);
	updateObj(item);
	

	//おじさんの更新
	ojisan.update();
}

//スプライトの描画
function drawSprite(snum,x,y){
	let sx = (snum&15)<<4;//スプライトデータの読み込み位置の設定(横列のキャラクター数が16だから一度16で割っている)
	let sy = (snum>>4)<<4;
	
	vcon.drawImage(chImg,sx,sy,16,32, x,y,16,32);//左:スプライトデータの表示位置　右:キャラクターの画面表示位置設定
}

function drawObj(obj){
	//スプライトのブロックを表示
	for(let i=0; i<obj.length; i++){
		obj[i].draw();
	}
}

//描画処理
function draw(){
	//画面を水色でクリア
	vcon.fillStyle="#66AAFF";
	vcon.fillRect(0,0,SCREEN_SIZE_W,SCREEN_SIZE_H);
	
	//マップを表示
	field.draw();

	drawObj(enemy);
	drawObj(enemy2);
	drawObj(kilar);
	drawObj(buble);
	drawObj(bulos);
	drawObj(hunmer);
	drawObj(koura);
	drawObj(togeso);
	drawObj(taiho);
	drawObj(fire);
	drawObj(pata);
	drawObj(fallobj);
	drawObj(noko);
	drawObj(kupa);
	drawObj(ax);
	drawObj(peach);
	drawObj(kfire);
	drawObj(bigban);
	drawObj(bless);
	drawObj(jugem);
	drawObj(block);
	drawObj(item);
	//おじさんを表示
	ojisan.draw();
	
	//デバッグ情報を表示
	vcon.font="24px 'Impact'";
	vcon.fillStyle="white";
	//vcon.fillText("FRAME:"+frameCount,10,20);

	let stage = window.localStorage.getItem("stage");
	vcon.fillText("stage: " + Number(stage) + "-1",10,20)

	//マリオの残機表示
	let stock = window.localStorage.getItem("result");
	vcon.fillText("stock: " + Number(stock),110,20);
	
	//仮想画面から実画面へ拡大転送
	con.drawImage(vcan,0,0,SCREEN_SIZE_W,SCREEN_SIZE_H,
		0,0,SCREEN_SIZE_W*3,SCREEN_SIZE_H*3);//左:スプライトデータの表示位置　右:キャラクターの画面表示位置設定
}


//setInterval(mainLoop,1000/60);

//ループ開始
window.onload = function(){
	startTime = performance.now();
	mainLoop();
}

//メインループ
function mainLoop(){
	let nowTime  = performance.now();
	let nowFrame = (nowTime-startTime) / GAME_FPS;

	
	if( nowFrame > frameCount ){
		let count = 0;
		while( nowFrame > frameCount ){
			//今何フレームかを数える
			frameCount++;

			//更新処理
			update();

			//nowFrameがframeCountを大きく上回ってしまった時、1フレームで4フレーム分動く(4倍速で)
			if(++count >= 4){
				break;
			};
		};

		//描画処理
		draw();
		count++;
	}
	requestAnimationFrame(mainLoop);//指定した関数を実行する
}


//キーボードが押された時に実行
document.onkeydown = function (e){
    if (e.key === "ArrowLeft"){
        keyb.Left = true;
    };
    if (e.key === "ArrowRight"){
        keyb.Right = true;
    };
    if(e.key == "ArrowUp"){
        keyb.ABUTTON  = true;
    };
    if(e.key == "ArrowDown"){
        keyb.BBUTTON = true;
    };
	if(e.key == 'a' || e.key == 'A'){
		keyb.a = true;
	};
};
		

//キーボードが離された時に実行
document.onkeyup = function (e){
    if (e.key === "ArrowLeft"){
        keyb.Left = false;
    };
    if (e.key === "ArrowRight"){
        keyb.Right = false;
    };
    if(e.key == "ArrowUp"){
		if(jump.ended==true){
			jump.load();
		}
        keyb.ABUTTON  = false;
    };
    if(e.key == "ArrowDown"){
        keyb.BBUTTON = false;
    };
	if(e.key == 'a' || e.key == 'A'){
		if(fi.ended==true){
			fi.load();
		}
		keyb.a = false;
	};
};