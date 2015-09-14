var Bullet = cc.Layer.extend(
{
	ctor:function(that, type)
	{
		this._super();
		this.zinit();
		this.setVariable(that, type);
		this.scheduleUpdate();
	},
	zinit:function()
	{
		this.setContentSize(cc.size(17, 29));
	},
	setVariable:function(that, type)
	{
		this.bullet = cc.Sprite.create("#bullet.png");
		this.bullet.setPosition(this.getContentSize().width/2, this.getContentSize().height/2);
		this.addChild(this.bullet, 0);
		this.bullet.setRotation(90);
		
		this.that = that;
		this.type = type;
		this.speed = 10;
	},
	update:function()
	{
		this.x += this.speed;
		if ( this.type == GlobValue.BULLETTOP )
		{
			this.y += this.speed/4;
		}
		if ( this.type == GlobValue.BULLETLEFT )
		{
			this.y -= this.speed/4;
		}
		if ( (this.x > DefWin.windowWidth()+this.width) || this.y < 0 || this.y > DefWin.windowHeight() )
		{
			this.removeThis();
			return;
		}
		for ( var i = 0; i < this.that.meteoriteArr.length; i++ )
		{
			var rect = this.that.meteoriteArr[i].getBoundingBox();
			if (this && cc.rectContainsPoint(rect, this.getPosition()) )
			{
				GlobValue.SCORE += 100;
				this.that.score.setString("战绩:"+GlobValue.SCORE);
				this.playExplosinAnimation();
				this.removeThis();
				this.that.meteoriteArr[i].changePosBack();
				break;
			}
		}
		
	},
	removeThis:function()
	{
		for ( var i = 0; i < this.that.bulletArr.length; i++ )
		{
			if ( this == this.that.bulletArr[i] )
			{
				this.that.bulletArr.splice(i, 1);
				this.removeFromParent();
			}
		}	
	},
	//播放子弹与陨石爆炸动画
	playExplosinAnimation:function()
	{
		var exp = new Explosion(GlobValue.EXPLOSIONENEMY);
		exp.setPosition(this.getPosition())
		this.parent.addChild(exp);
	}
});