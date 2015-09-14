var BackGround = cc.LayerColor.extend(
{
	ctor:function()
	{
		this._super();
		this.zinit();
		this.setVariable();
		this.scheduleUpdate();
	},
	zinit:function()
	{
		this.setContentSize(DefWin.windowSize());
		this.setColor(cc.color.BLACK);
	},
	setVariable:function()
	{
		this.bg0 = cc.Sprite.createWithSpriteFrameName("bg0.png");
		this.bg1 = cc.Sprite.createWithSpriteFrameName("bg1.png");
		this.bg0.setAnchorPoint(0, 0);
		this.bg1.setAnchorPoint(0, 0);
		this.bg0.scaleX = this.bg1.scaleX = DefWin.windowWidth()*2/this.bg0.width;
		this.bg0.scaleY = this.bg1.scaleY = DefWin.windowHeight()/this.bg1.height;
		this.addChild(this.bg0);
		this.addChild(this.bg1);
		this.bg1.setPosition(this.bg0.width*this.bg0.scaleX,0);
		this.pos = this.bg1.getPosition();
		this.speed = 10;
	},
	update:function()
	{
		this.bg0.x -= this.speed;
		this.bg1.x -= this.speed;
		if ( this.bg0.x < -this.bg0.width*this.bg0.scaleX )
		{
			this.bg0.setPosition(this.pos);
		}
		if ( this.bg1.x < -this.bg1.width*this.bg1.scaleX )
		{
			this.bg1.setPosition(this.pos);
		}
	}
});