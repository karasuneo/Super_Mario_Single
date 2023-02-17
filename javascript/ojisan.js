
const ANIME_STAND = 1;
const ANIME_WALK = 2;
const ANIME_BRAKE = 4;
const ANIME_JUMP = 8;
const GRAVITY = 4;
const MAX_SPEED = 32;
const ANIME_GOAL = 9;
const ANIME_DEAD  = 9;
const TYPE_MINI = 1;
const TYPE_BIG = 2;
const TYPE_FIRE = 4
const TYPE_DEAD=5;
let Checkstart=0;
let flag = 0;
let mcount=0;
var stock;
var stage;
var dc;
var ds;

class Ojisan {
	constructor(x, y) {
		this.x = x << 4;//小数点をなくすため16進数で表現
		this.y = y << 4;//小数点をなくすため16進数で表現

		this.ay = 16;

		//キャラクターのサイズ
		this.w = 16;
		this.h = 16;
		this.vx = 0;
		this.vy = 0;
		this.anim = 0;//キャラクターが動いている(1)か立ち止まっている(0)かを判定
		this.snum = 0;//スプライトデータの番号
		this.acou = 0;//キャラクターのアニメーションを表現するための変数
		this.dirc = 0;//キャラクターの向いている方向を判定　右(0)左(1)
		this.jump = 0;
		this.goal = 0;
		this.goal3 = 0;
		this.goalpef = 0;
		this.end = 0;
		this.acou2 = 0;
		//アイテムとぶつかった時
		this.kinoko = 0;
		//マリオの状態を判定
		this.damage = 0;
		this.muteki=0;
		this.sstop=0;
		this.type = TYPE_MINI;

	}

	checkFloor() {
		//空中にいる時は判定しない
		if (this.vy <= 0) {
			if (this.type == TYPE_MINI) {
				jump.play();
			} else {
				jumpB.play();
			}
			return;
		};
		//一番左上を表している
		let lx = ((this.x + this.vx) >> 4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y + this.vy) >> 4);//ドット単位からブロック単位にするためのビットシフト

		let p = this.type == TYPE_MINI ? 2 : 0;

		//キャラクターの足元(左下1pxまたは右下1px)にブロックが当たる時
		if (field.isBlock(lx + 1 + p, ly + 31) || field.isBlock(lx + 14 - p, ly + 31)) {
			//ぶつかった瞬間に空中から地上の動作に変える
			if (this.anim == ANIME_JUMP) {
				this.anim = ANIME_WALK;
			};
			this.jump = 0;
			this.vy = 0;
			this.y = ((((ly + 31) >> 4) << 4) - 32) << 4;//床と同じ座標にする
			if (this.goal == 1) {
				this.goalpef = 1;
				this.anim = ANIME_STAND;
			}
		};
	};

	//横の壁
	checkWall() {

		//一番左上を表している
		let lx = ((this.x + this.vx) >> 4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y + this.vy) >> 4);//ドット単位からブロック単位にするためのビットシフト

		let p = this.type == TYPE_MINI ? 16 + 8 : 9;

		//キャラクターの右側にブロックが当たる時
		if (field.isBlock(lx + 15, ly + p) || (this.type != TYPE_MINI && (field.isBlock(lx + 15, ly + 15) || field.isBlock(lx + 15, ly + 24)))) {
			this.vx = 0;
			this.x -= 8;

		} else if (field.isBlock(lx, ly + p) || (this.type != TYPE_MINI && (field.isBlock(lx, ly + 15) || field.isBlock(lx, ly + 24)))) {
			this.vx = 0;
			this.x += 8;

		}
	};
	checksEnemy(){
		let bl;
		for(let i=0;i<16;i++){
			for(let j=0;j<15;j++){
				bl=field.isEnemy((i*16),(j*16));
				switch(bl){
					case 174:
						fieldData[(((j*16+1)>>4)*FIELD_SIZE_W+((i*16)>>4))]=367;
						buble.push(new Buble(174,(i*16)>>4,(j*16)>>4,0,0));
					break;
					case 102:
						// console.log("kuri");
						fieldData[(((j*16+1)>>4)*FIELD_SIZE_W+((i*16)>>4))]=367;
						enemy.push(new Enemy(102,(i*16)>>4,(j*16)>>4,0,0));
						break;
				}
			}
		}
	}
	//敵の召喚
	checkEnemy(){
		let lx = ((this.x+this.vx)>>4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y+this.vy)>>4);
		let bl;
		for(let i=0;i<16;i++){
			bl=field.isEnemy(lx+160,i*16+1)
			switch(bl){
				//バブル
				case 174:
					fieldData[(((i*16+1)>>4)*FIELD_SIZE_W+((lx+160)>>4))]=367;
					buble.push(new Buble(174,(lx+160)>>4,(i*16+1)>>4,0,0));
					break;
				//城クリボー
				case 102:
					// console.log("kuri");
					fieldData[(((i*16+1)>>4)*FIELD_SIZE_W+((lx+160)>>4))]=367;
					enemy.push(new Enemy(102,(lx+160)>>4,(i*16+1)>>4,0,0));
					break;
				case 96:
					// console.log("kuri");
					fieldData[(((i*16+1)>>4)*FIELD_SIZE_W+((lx+160)>>4))]=367;
					enemy2.push(new Enemy2(96,(lx+160)>>4,(i*16+1)>>4,0,0));
					break;
				//キラー大砲
				case 456:
					// console.log("taiho");
					fieldData[(((i*16+1)>>4)*FIELD_SIZE_W+((lx+160)>>4))]=367;
					taiho.push(new Taiho(456,(lx+160)>>4,(i*16+1)>>4,0,0));
					break;
				//ブロス
				case 182:
					fieldData[(((i*16+1)>>4)*FIELD_SIZE_W+((lx+160)>>4))]=367;
					fieldData[((((i*16+1)>>4)-1)*FIELD_SIZE_W+((lx+160)>>4))]=367;
					bulos.push(new Bulos(182,(lx+160)>>4,(i*16+1)>>4,0,0));
					break;
				//パタパタ
				case 160:
					fieldData[(((i*16+1)>>4)*FIELD_SIZE_W+((lx+160)>>4))]=367;
					fieldData[((((i*16+1)>>4)+1)*FIELD_SIZE_W+((lx+160)>>4))]=367;
					pata.push(new Pata(160,(lx+160)>>4,(i*16+1)>>4,0,0));
					break;
				//のこのこ
				case 162:
					fieldData[(((i*16+1)>>4)*FIELD_SIZE_W+((lx+160)>>4))]=367;
					fieldData[((((i*16+1)>>4)+1)*FIELD_SIZE_W+((lx+160)>>4))]=367;
					noko.push(new Noko(162,(lx+160)>>4,(i*16+1)>>4,0,0));
					break;
				//ジュゲム
				case 169:
					fieldData[(((i*16+1)>>4)*FIELD_SIZE_W+((lx+160)>>4))]=367;
					jugem.push(new Jugem(169,(lx+160)>>4,(i*16+1)>>4,0,0));
					break;
				//クッパ
				case 224:
					fieldData[(((i*16+1)>>4)*FIELD_SIZE_W+((lx+160)>>4))]=367;
					fieldData[((((i*16+1)>>4)+1)*FIELD_SIZE_W+((lx+160)>>4))]=367;
					fieldData[(((i*16+1)>>4)*FIELD_SIZE_W+(((lx+160)>>4))+1)]=367;
					fieldData[((((i*16+1)>>4)+1)*FIELD_SIZE_W+(((lx+160)>>4))+1)]=367;
					kupa.push(new Kupa(224,(lx+160)>>4,(i*16+1)>>4,0,0));
					break;
				//とげそー
				case 122:
					fieldData[(((i*16+1)>>4)*FIELD_SIZE_W+((lx+160)>>4))]=367;
					togeso.push(new Togeso(122,(lx+160)>>4,(i*16+1)>>4,0,0));
					break;
				//斧
				case 469:
					fieldData[(((i*16+1)>>4)*FIELD_SIZE_W+((lx+160)>>4))]=367;
					ax.push(new Ax(469,(lx+160)>>4,(i*16+1)>>4,0,0));
					break;
			}
			
			// if(field.isEnemy(lx+160,i*16+1)==true){
			// 	console.log("delate");
			// 	fieldData[(((i*16+1)>>4)*FIELD_SIZE_W+((lx+160)>>4))]=367;
			// 	// fieldData[(((i*16+1)<<4)*FIELD_SIZE_W+((lx+160)<<4))]=367;
			// 	buble.push(new Buble(174,(lx+160)>>4,(i*16+1)>>4,0,0));
			// }
		}
	}
	//天井の判定
	checkCeil() {
		//空中にいる時は判定しない
		if (this.vy >= 0) {
			return;
		};
		//一番左上を表している
		let lx = ((this.x + this.vx) >> 4);//ドット単位からブロック単位にするためのビットシフト
		let ly = ((this.y + this.vy) >> 4);//ドット単位からブロック単位にするためのビットシフト

		let ly2 = ly + (this.type == TYPE_MINI ? 21 : 5);

		let bl;

		//キャラクターの頭にブロックが当たる時
		if (bl = field.isBlock(lx + 8, ly2)) {
			this.jump = 15;
			this.vy = 0;

			let x = (lx + 8) >> 4;
			let y = (ly2) >> 4;
			blb.play();
			//？ブロックかどうか判定
			if (bl == 368 || bl == 369 ||bl == 370) {
				block.push(new Block(bl, x, y, 1, 0, 0));
				if (this.type == TYPE_MINI) {
					item.push(new Item(218, x, y, 0, 0, 0));
					ap.play();					
				} else {
					item.push(new Item(250, x, y, 0, 0, 1));
					ap.play();			
				}
			} else if (bl == 371 || bl == 450 || bl == 466) {
				if(this.type == TYPE_MINI){
					block.push(new Block(bl, x, y, 0, 0, 0));
				}else {
					//左上、左下、右上、右下にブロックを散らす
					block.push(new Block(bl, x, y, 1, 20, -60));
					block.push(new Block(bl, x, y, 1, -20, -60));
					block.push(new Block(bl, x, y, 1, 20, -20));
					block.push(new Block(bl, x, y, 1, -20, -20));
					bre.play();
				};
			} else {
				return;
			};
		};
	};

	//ゴールの判定
	checkGoal() {
		let lx = ((this.x + this.vx) >> 4);
		let ly = ((this.y + this.vy) >> 4);

		let p = this.type == TYPE_MINI ? 16 + 8 : 9;

		if (field.isGoal(lx + 4, ly + p) ||
			(this.type == TYPE_BIG) &&
			field.isGoal(lx + 4, ly + 15) ||
			field.isGoal(lx + 4, ly + 24)) {
			// if(this.goal==0){
			//     this.vx +=10;
			// }
			this.vx = 0;
			this.x += 8;
			this.jump = 0;
			this.goal = 1;
			this.anim = ANIME_GOAL;
			rollup.play();
		}
	}
	checkEnd() {
		let lx = ((this.x + this.vx) >> 4);
		let ly = ((this.y + this.vy) >> 4);

		let p = this.type == TYPE_MINI ? 16 + 8 : 9;

		if (field.isEnd(lx, ly + p) ||
			(this.type == TYPE_BIG) &&
			field.isEnd(lx, ly + 15) ||
			field.isEnd(lx, ly + 24)) {
			this.end = 1;
			this.snum = 10000;
			setTimeout(() => {
				if(flag==0){
					flag = 1;
					stage = window.localStorage.getItem("stage");
					ds = Number(stage) + 1;
					//alert(ds);
					window.localStorage.setItem("stage", ds);
					document.location = 'senni.html';
				}
			}, 5000);
		}
	}

	//ファイヤー処理
	//ファイヤー処理
	updateFire() {
		if (this.type != TYPE_FIRE) {
			return;
		}
		if (frameCount % 10 == 0) {
			let lx = ((this.x + this.vx) >> 4);//ドット単位からブロック単位にするためのビットシフト
			let ly = ((this.y + this.vy) >> 4);//ドット単位からブロック単位にするためのビットシフ
			let x = (lx + 2) >> 4;
			let y = (ly) >> 4;
			if (keyb.a == true) {
				fi.play();
				if (this.dirc == 0) {
					fire.push(new Fire(112, x, y, 20, 0, 2, 0));
				} else {
					fire.push(new Fire(112, x, y, 20, 0, 2, 1));
				};
			};
		};
	};


	//ジャンプ処理	
	updateJump(){
        //ジャンプ
        if( keyb.ABUTTON ){
            if(this.vy <= 0){
                if(this.jump==0){
                    this.anim = ANIME_JUMP;
                    this.jump = 1;
                };
                if (this.jump < 10) {
                    this.vy = -(74- this.jump);
                };
                if(this.jump <= 15 ){//大ジャンプか小ジャンプを判定
                    this.jump++
                };
            };
        };
    };

	//横方向の移動
	updateWalkSub(dir) {
		//最高速まで加速
		if (dir == 0 && this.vx < MAX_SPEED) {//キャラクターの速度上限の設定
			this.vx++;
		};
		if (dir == 1 && this.vx > -MAX_SPEED) {//キャラクターの速度上限の設定
			this.vx--;
		};

		//ジャンプしてない時
		if (!this.jump) {
			//立ちポーズだった時はカウンタリセット
			if (this.anim == ANIME_STAND) {
				this.acou = 0;
			}

			//アニメを歩きアニメ
			this.anim = ANIME_WALK;

			//方向を設定
			this.dirc = dir;

			//逆方向の時はブレーキをかける
			if (dir == 0 && this.vx < 0) {
				this.vx++;
			};
			if (dir == 1 && this.vx > 0) {
				this.vx--;
			};

			//逆に強い加速の時はブレーキアニメ
			if (dir == 1 && this.vx > 8 || dir == 0 && this.vx < -8) {
				this.anim = ANIME_BRAKE;
			};

		};
	};

	//歩く処理
	updateWalk() {
		//横移動
		if (keyb.Left) {
			this.updateWalkSub(1);
		} else if (keyb.Right) {
			this.updateWalkSub(0);
		} else {
			if (!this.jump) {
				if (this.vx > 0) {
					this.vx -= 1;
				};
				if (this.vx < 0) {
					this.vx += 1;
				};
				if (this.vx == 0) {
					this.anim = ANIME_STAND;
				};
			};
		};
	};

	//スプライトを変える処理
	updateAnim() {
		//スプライトの決定
		switch (this.anim) {
			case ANIME_STAND:
				this.snum = 0;
				break;
			case ANIME_WALK:
				this.snum = 2 + ((this.acou / 6) % 3);//スプライトデータの2,3,4番目を連続して表示(this.acouを割っているのはフレームを調節するため)
				break;
			case ANIME_JUMP:
				this.snum = 6;
				break;
			case ANIME_BRAKE:
				this.snum = 5;
				break;
			case ANIME_GOAL:
				this.snum = 7;
				break;
		}
		//ちびマリオのときはスプライト番号を＋32
		if (this.type == TYPE_MINI) {
			this.snum += 32;
		} else if (this.type == TYPE_FIRE) {
			this.snum += 256;
		}
		//左向きの時は＋４８を使う
		if (this.dirc == 1) {
			this.snum += 48;
		}
	}


	GoalPef() {
		this.vy = 15;
		this.y += this.vy;
		if (this.goalpef == 1 && this.end == 0) {
			this.vx = 10;
			this.x += this.vx;
			this.anim = ANIME_WALK;
			pauseBGM(rollup);
			goalBGM();
		}
	}


	//毎フレーム毎の更新処理
	update() {
		//きのこを取った時のエフェクト
		//アイテムを取った時のエフェクト
		if (this.kinoko != 0) {
			let anim_kino = [32, 14, 32, 14, 32, 14, 0, 32, 14, 0];
			let anim_flo = [256, 0, 256, 0, 256, 0, 256, 256, 0, 256];
			playBGM(pUp);
			if (this.type == TYPE_MINI) {
				this.snum = anim_kino[this.kinoko >> 2];
				this.h = this.snum == 32 ? 16 : 32;

				//左向きの時は＋４８を使う
				if (this.dirc) {
					this.snum += 48;
				}

				//animのアニメーションを終わらせる
				if (++this.kinoko == 40) {
					this.type = TYPE_BIG
					this.ay = 0;
					this.kinoko = 0;
				}

			} else if (this.type == TYPE_BIG || this.type == TYPE_FIRE) {
				this.snum = anim_flo[this.kinoko >> 2];
				//this.h = this.snum == 32?16 :32;

				//左向きの時は＋４８を使う
				if (this.dirc) {
					this.snum += 48;
				}

				//animのアニメーションを終わらせる
				if (++this.kinoko == 40) {
					this.type = TYPE_FIRE
					this.ay = 0;
					this.kinoko = 0;
				}

			}
			return;
		}
		//ファイヤーでダメージを食らった時
		if(this.damage != 0 && this.type == TYPE_FIRE){
			pDown.play();
			let anim_flo = [256, 0, 256, 0, 256, 0, 256, 256, 0, 256];
			this.snum = anim_flo[this.kinoko >> 2];

			//左向きの時は＋４８を使う
			if(this.dirc){
				this.snum += 48;
			}

			//animのアニメーションを終わらせる
			if(++this.damage == 40){
				this.type = TYPE_BIG
				this.ay = 0;
				this.damage=0;
				this.muteki=1;
			}
			return;
		}
		//キノコでダメージ食らった時
		if(this.damage != 0 && this.type == TYPE_BIG){
			pDown.play();
			
			let anim = [0, 14, 32, 0, 32, 14, 32, 14, 32];

			this.snum = anim[this.damage>>2];

			this.h = this.snum == 32?16 :16;

			//左向きの時は＋４８を使う
			if(this.dirc){
				this.snum += 48;
			}

			//animのアニメーションを終わらせる
			if(++this.damage == 40){
				this.type = TYPE_MINI
				this.ay = 16;
				this.damage=0;
				this.muteki=1;
			}
			return;
		}
		//敵に当たって死亡
		if(this.damage == 1&&this.type==TYPE_MINI){
			this.type=TYPE_DEAD;
			this.anim=ANIME_DEAD;
			this.damage=0;
			pauseBGM(music);
			deadBGM();
		}
		if(this.muteki==1){
			mcount++;
			if(mcount==50){
				mcount=0;
				this.muteki=0;
			}
		}
		//でかい時にキノコをとった時
		if (this.kinoko != 0 && this.type != TYPE_MINI) {
			this.ay = 0;
			this.kinoko = 0;
			return;
		}

		//アニメ用のカウンタ
		this.acou++;

		//最高速になった時アニメーションを倍速にする
		if (Math.abs(this.vx) == MAX_SPEED) {
			this.acou++;
		}
		if (this.goal != 1 && this.type!=TYPE_DEAD) {
			this.updateJump();
			this.updateWalk();
			this.updateFire();

			this.checkGoal();
			//重力
			if (this.vy < 64) {
				this.vy += GRAVITY;
			}
		}
		this.checksEnemy();
		this.updateAnim();
		//横のチェック
		if(this.type!=TYPE_DEAD){
			this.checkWall();

		//床のチェック
			this.checkFloor();

		//天井のチェック
			this.checkCeil();

			this.checkEnemy();
		}
		this.checkEnd();
		if (this.goal != 1) {
			//実際に座標を変えてる
			this.x += this.vx;
			this.y += this.vy;
		}
		if (this.goal == 1) {
			pauseBGM(music);
			this.GoalPef();
		}
		if(this.type==TYPE_DEAD){
			this.vx=0;
			if(this.acou2==0){
				this.vy= -50;
			}
			this.vy+=4
			this.snum=46;
			this.acou2++;
		}

		//キャラクターが床の座標より下にある時
		//if( this.y > 160<<4 ){
		//ぶつかった瞬間に空中から地上の動作に変える
		//if(this.anim == ANIME_JUMP){
		//this.anim = ANIME_WALK;
		//};
		//this.jump = 0;
		//this.vy   = 0;
		//this.y    = 160<<4;//床と同じ座標にする
		//};

		if (this.y >= 224 << 4) {
				deadBGM();
			setTimeout(()=>{
			stock = window.localStorage.getItem("result");
			dc = Number(stock) - 1;
			//alert(dc);
			window.localStorage.setItem("result", dc);
			document.location = 'senni.html';
		},ddur);
	}
		if((this.x-(field.scx<<4)) <=0 && this.dirc == 1){
			this.vx = 0;
			this.x += 8;
		}
		// console.log(this.muteki);
	};

	//毎フレーム毎の描画処
	draw() {
		//スクロールに合わせてキャラクターを表示
		let px = (this.x >> 4) - field.scx;
		let py = (this.y >> 4) - field.scy;
		let sx = (this.snum & 15) << 4;//スプライトデータの読み込み位置の設定(横列のキャラクター数が16だから一度16で割っている)
		let sy = (this.snum >> 4) << 4;

		let w = this.w;
		let h = this.h;

		py += (32 - h);

		vcon.drawImage(chImg, sx, sy, w, h, px, py, w, h);//左:スプライトデータの表示位置　右:キャラクターの画面表示位置設定
	};
};