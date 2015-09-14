//游戏场景
var GameLayer = cc.LayerColor.extend(
{
	ctor:function()
	{
		this._super();
		this.zinit();
		this.setVariable();
		this.setAirPlane();
		this.setPlayerInfo();
		this.schedule(this.airFiring, 0.3);
		this.schedule(this.meteoriting, 1, 2);
		this.schedule(this.countDowning, 1);
	},
	zinit:function()
	{
		this.setContentSize(DefWin.windowSize());
		this.setColor(cc.color.RED);
		
		var outBtn = ccui.Button.create("Rock1.png","Rock1.png","Rock1.png", ccui.Widget.PLIST_TEXTURE);
		outBtn.setTitleText("OUT");
		outBtn.setTitleFontSize(18);
		outBtn.setPosition(DefWin.windowWidth()-outBtn.width/2, outBtn.height/2);
		this.addChild(outBtn, 10);
		outBtn.addTouchEventListener(function()
		{
			cc.director.end();
		}, this);
	},
	setVariable:function()
	{
		//子弹
		this.bulletArr = [];
		//陨石
		this.meteoriteArr = [];
		//游戏时间
		this.allTimes = 100;
		//背景
		this.bg = new BackGround();
		this.addChild(this.bg, 0);
		//飞机
		this.airPlane = new AirPlane();
		this.addChild(this.airPlane, 20);
		//信息层
		this.infoLayer = cc.Layer.create();
		this.addChild(this.infoLayer, 30);
	},
	setAirPlane:function()
	{
		this.airPlane.setPosition(100,DefWin.windowHeight()/2);
	},
	//开火//散弹
	airFiring:function()
	{
		MusicUtil.playBulletEffect();
		var pos = this.airPlane.getPosition();
		var bullet = new Bullet(this);
		bullet.setPosition(pos.x + this.airPlane.width-10, pos.y + this.airPlane.height/2 - 16);
		this.addChild(bullet, 10);
		this.bulletArr.push(bullet);
		
		var bullet = new Bullet(this,GlobValue.BULLETTOP);
		bullet.setPosition(pos.x + this.airPlane.width-10, pos.y + this.airPlane.height/2 - 16);
		this.addChild(bullet, 10);
		this.bulletArr.push(bullet);
		
		var bullet = new Bullet(this,GlobValue.BULLETLEFT);
		bullet.setPosition(pos.x + this.airPlane.width-10, pos.y + this.airPlane.height/2 - 16);
		this.addChild(bullet, 10);
		this.bulletArr.push(bullet);
		
		GlobValue.MEILI++;
		this.meili.setString("魅力:"+GlobValue.MEILI);
	},
	//实例化陨石
	meteoriting:function()
	{
		var meteorite = new Meteorite(this);
		meteorite.x = DefWin.windowWidth() + 30 + Math.random()*50;
		meteorite.y = (DefWin.windowHeight() - meteorite.height)*Math.random();
		this.addChild(meteorite, 10);
		this.meteoriteArr.push(meteorite);
	},
	setPlayerInfo:function()
	{
		//倒计时显示图片
		this.countImg1 = ccui.ImageView.create();
		this.infoLayer.addChild(this.countImg1,0);
		
		this.countImg2 = ccui.ImageView.create();
		this.infoLayer.addChild(this.countImg2,0);
		
		this.countImg1.x = DefWin.windowWidth()/2 - 15;
		this.countImg2.x = DefWin.windowWidth()/2 + 15;
		this.countImg1.y = this.countImg2.y = DefWin.windowHeight() - 35;
		//得分信息显示
		this.score = ccui.TextBMFont.create("战绩:"+GlobValue.SCORE, "res/pic/bmf_goldtext.fnt");
		this.score.anchorX = 0;
		this.infoLayer.addChild(this.score, 0);
		this.score.setPosition(10, DefWin.windowHeight() - 20);
		//魅力值
		this.meili = ccui.TextBMFont.create("魅力:"+GlobValue.MEILI, "res/pic/bmf_charmtext.fnt");
		this.meili.anchorX = 0;
		this.infoLayer.addChild(this.meili, 0);
		this.meili.setPosition(10, DefWin.windowHeight() - 65);
		//得分信息显示
		this.livies = ccui.TextBMFont.create("体验:"+GlobValue.LIVIES, "res/pic/bmf_goldtext.fnt");
		this.livies.anchorX = 1;
		this.infoLayer.addChild(this.livies, 0);
		this.livies.setPosition(DefWin.windowWidth()-10, DefWin.windowHeight() - 20);
	},
	//倒计时
	countDowning:function()
	{
		this.allTimes--;
		if ( this.allTimes < 0 )
		{
			//游戏结束
			this.gameOver();
		}
		var str = this.allTimes.toString();
		var len = str.length;
		if ( len < 2 )
		{
			this.countImg1.loadTexture(GlobValue.COUNTNUMBER[0], ccui.Widget.PLIST_TEXTURE);
			this.countImg2.loadTexture(GlobValue.COUNTNUMBER[Number(str.substr(0, 1))], ccui.Widget.PLIST_TEXTURE);
			return;
		}
		this.countImg1.loadTexture(GlobValue.COUNTNUMBER[Number(str.substr(0, 1))], ccui.Widget.PLIST_TEXTURE);
		this.countImg2.loadTexture(GlobValue.COUNTNUMBER[Number(str.substr(1, 1))], ccui.Widget.PLIST_TEXTURE);
		cc.log(str);
	},
	//游戏结束
	gameOver:function()
	{
		if ( GlobValue.LIVIES >-1 )
		{
			var winTxt = cc.LabelTTF.create("YOU ARE WIN", "", 40);
			winTxt.setPosition(DefWin.windowWidth()/2, DefWin.windowHeight()/2);
			this.infoLayer.addChild(winTxt, 1);
		}
		else
		{
			var loseTxt = cc.LabelTTF.create("YOU ARE LOSE", "", 40);
			loseTxt.setPosition(DefWin.windowWidth()/2, DefWin.windowHeight()/2);
			this.infoLayer.addChild(loseTxt, 1);
		}
		this.scheduleOnce(function()
		{
			if ( GlobValue.LIVIES >-1 )
			{
				cc.director.runScene(cc.TransitionSlideInL.create(1,Wincene.createScene()));
			}
			else
			{
				cc.director.runScene(cc.TransitionFadeDown.create(1,Losecene.createScene()));
			}
		}, 5);
	},
	onEnter:function()
	{
		this._super();
		MusicUtil.playBgMusic();
	},
	onExitTransitionDidStart:function()
	{
		this._super();
		MusicUtil.stopMusic();
	}
});

//游戏场景
GameLayer.createScene = function()
{
	var scene = cc.Scene.create();
	var layer = new GameLayer();
	scene.addChild(layer);
	return scene;
}

//开始场景
var StartScene = {};
StartScene.createScene = function()
{
	cc.spriteFrameCache.addSpriteFrames("res/pic/images.plist");
	var scene = cc.Scene.create();
	var layer = cc.Layer.extend(
	{
		ctor:function()
		{
			this._super()
			this.zinit();
		},
		zinit:function()
		{
			var txt = cc.LabelTTF.create("click any where to \n enter game", "",40);
			txt.setPosition(DefWin.windowWidth()/2, DefWin.windowHeight()/2 - 50);
			this.addChild(txt, 1);

			var bg = ccui.Button.create("Start.png","Start.png","Start.png",ccui.Widget.PLIST_TEXTURE);
			bg.setScale(DefWin.windowWidth()/bg.width, DefWin.windowHeight()/bg.height);
			bg.setPosition(DefWin.windowWidth()/2,DefWin.windowHeight()/2);
			this.addChild(bg, 0);
			bg.addTouchEventListener(this.startGame, this);

			var outBtn = ccui.Button.create("Rock1.png","Rock1.png","Rock1.png", ccui.Widget.PLIST_TEXTURE);
			outBtn.setTitleText("OUT");
			outBtn.setTitleFontSize(18);
			outBtn.setPosition(DefWin.windowWidth()-outBtn.width/2, outBtn.height/2);
			this.addChild(outBtn, 10);
			outBtn.addTouchEventListener(function()
					{
				cc.director.end();
					}, this);
		},
		startGame:function(target, state)
		{
			if ( state != ccui.Widget.TOUCH_ENDED ){return;}
			cc.director.runScene(cc.TransitionFlipX.create(1,GameLayer.createScene()));
		},
		onEnter:function()
		{
			this._super();
			MusicUtil.playBgMusic();
		},
		onExitTransitionDidStart:function()
		{
			this._super();
			MusicUtil.stopMusic();
		}
	});
	scene.addChild(new layer());
	return scene;
}

//游戏失败
var Losecene = {};
Losecene.createScene = function()
{
	var scene = cc.Scene.create();
	var layer = cc.Layer.extend(
	{
		ctor:function()
		{
			this._super()
			
			var txt = cc.LabelTTF.create("click any where to \n enter game", "",40);
			txt.setPosition(DefWin.windowWidth()/2, DefWin.windowHeight()/2 - 50);
			this.addChild(txt, 1);
			
			var bg = ccui.Button.create("Lose.png","Lose.png","Lose.png",ccui.Widget.PLIST_TEXTURE);
			bg.setScale(DefWin.windowWidth()/bg.width, DefWin.windowHeight()/bg.height);
			bg.setPosition(DefWin.windowWidth()/2,DefWin.windowHeight()/2);
			this.addChild(bg, 0);
			bg.addTouchEventListener(this.startGame, this);
			
			var outBtn = ccui.Button.create("Rock1.png","Rock1.png","Rock1.png", ccui.Widget.PLIST_TEXTURE);
			outBtn.setTitleText("OUT");
			outBtn.setTitleFontSize(18);
			outBtn.setPosition(DefWin.windowWidth()-outBtn.width/2, outBtn.height/2);
			this.addChild(outBtn, 10);
			outBtn.addTouchEventListener(function()
					{
				cc.director.end();
					}, this);
		},
		startGame:function(target, state)
		{
			if ( state != ccui.Widget.TOUCH_ENDED ){return;}
			GlobValue.SCORE = 0;
			GlobValue.LIVIES = 3;
			GlobValue.MEILI = 0;
			cc.director.runScene(cc.TransitionFadeBL.create(1,GameLayer.createScene()));
		},
		onEnter:function()
		{
			this._super();
			MusicUtil.playBgMusic();
		},
		onExitTransitionDidStart:function()
		{
			this._super();
			MusicUtil.stopMusic();
		}
	});
	scene.addChild(new layer());
	return scene;
}

//游戏胜利
var Wincene = {};
Wincene.createScene = function()
{
	var scene = cc.Scene.create();
	var layer = cc.Layer.extend(
	{
		ctor:function()
		{
			this._super();
			var txt = cc.LabelTTF.create("click any where to \n enter game", "",40);
			txt.setPosition(DefWin.windowWidth()/2, DefWin.windowHeight()/2 - 50);
			this.addChild(txt, 1);
			
			var bg = ccui.Button.create("Win.png","Win.png","Win.png",ccui.Widget.PLIST_TEXTURE);
			bg.setScale(DefWin.windowWidth()/bg.width, DefWin.windowHeight()/bg.height);
			bg.setPosition(DefWin.windowWidth()/2,DefWin.windowHeight()/2);
			this.addChild(bg, 0);
			bg.addTouchEventListener(this.startGame, this);
			
			var outBtn = ccui.Button.create("Rock1.png","Rock1.png","Rock1.png", ccui.Widget.PLIST_TEXTURE);
			outBtn.setTitleText("OUT");
			outBtn.setTitleFontSize(18);
			outBtn.setPosition(DefWin.windowWidth()-outBtn.width/2, outBtn.height/2);
			this.addChild(outBtn, 10);
			outBtn.addTouchEventListener(function()
					{
				cc.director.end();
					}, this);
		},
		startGame:function(target, state)
		{
			if ( state != ccui.Widget.TOUCH_ENDED ){return;}
			GlobValue.SCORE = 0;
			GlobValue.LIVIES = 3;
			GlobValue.MEILI = 0;
			cc.director.runScene(cc.TransitionMoveInB.create(1,GameLayer.createScene()));
		},
		onEnter:function()
		{
			this._super();
			MusicUtil.playBgMusic();
		},
		onExitTransitionDidStart:function()
		{
			this._super();
			MusicUtil.stopMusic();
		}
	});
	scene.addChild(new layer());
	return scene;
}



















