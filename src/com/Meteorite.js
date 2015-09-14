//陨石
var Meteorite = cc.Layer.extend(
{
	ctor:function(that)
	{
		this._super();
		this.zinit();
		this.setVariable(that);
		this.scheduleUpdate();
	},
	zinit:function()
	{
		this.setContentSize(70, 70);
	},
	setVariable:function(that)
	{
		this.meteorite = cc.Sprite.create("#Rock0.png");
		this.meteorite.setPosition(this.getContentSize().width/2, this.getContentSize().height/2);
		this.addChild(this.meteorite, 0);
		this.speed = 3;
		
		this.that = that;
	},
	update:function()
	{
		this.x -= this.speed;
		this.meteorite.rotation += this.speed;
		if ( this.x < -this.width/2 )
		{
			this.changePosBack();
		}
		//飞机与陨石碰撞
		var rect = this.getBoundingBox();
		var rect1 = this.that.airPlane.getBoundingBox();
		if ( cc.rectIntersectsRect(rect1, rect) )
		{
			GlobValue.LIVIES--;
			if ( GlobValue.LIVIES < 0 )
			{
				this.that.bg.speed = 20;
				this.that.gameOver();
				return;
			}
			this.that.livies.setString("体验:"+GlobValue.LIVIES);
			this.playPlayerExplosionAnimation();
			this.changePosBack();
		}
	},
	//播放飞机与陨石爆炸动画
	playPlayerExplosionAnimation:function()
	{
		var exp = new Explosion(GlobValue.EXPLOSIONPLAYER);
		exp.setPosition(this.getPosition())
		this.parent.addChild(exp);
	},
	changePosBack:function()
	{
		this.setPosition(DefWin.windowWidth()+100, (DefWin.windowHeight() - this.height)*Math.random());
	}
});