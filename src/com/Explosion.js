var Explosion = cc.Layer.extend(
{
	ctor:function(type)
	{
		this._super();
		this.zinit(type);
		this.setAnimation(0);
	},
	zinit:function(type)
	{
		this.setContentSize(cc.size(44,49));
		this.type = type;
		if ( this.type == GlobValue.EXPLOSIONENEMY )
		{
			MusicUtil.playExplosionEnemyEffect();
		}
		else if ( this.type == GlobValue.EXPLOSIONPLAYER )
		{
			MusicUtil.playExplosionPlayerEffect();
		}
	},
	setAnimation:function(m)
	{
		var child = this.getChildByTag(10), num = 0;
		if ( child ){child.removeFromParent();}
		if ( this.type == GlobValue.EXPLOSIONENEMY )
		{
			var sp = cc.Sprite.create("res/pic/explosionEnemy.png", cc.rect(m*this.width,0,this.width, this.height));
			num = 6;
		}
		else if ( this.type == GlobValue.EXPLOSIONPLAYER )
		{
			var sp = cc.Sprite.create("res/pic/explosionPlayer.png", cc.rect(m*42,0,42, this.height));
			num = 4;
		}
		
		sp.setPosition(this.getContentSize().width/2, this.getContentSize().height/2);
		this.addChild(sp, 10);
		if ( m == num )
		{
			this.removeFromParent();
			return;
		}
		m++;
		this.scheduleOnce(function(){
			this.setAnimation(m);
		}, 0.05);
	}
});