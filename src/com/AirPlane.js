var AirPlane = cc.Layer.extend(
{
	ctor:function()
	{
		this._super();
		this.zinit();
		this.setVariable();
		this.addTouchListener();
	},
	zinit:function()
	{
		this.setContentSize(cc.size(100, 101));
	},
	setVariable:function()
	{
		this.air = cc.Sprite.create("#player3.png");
		this.air.setPosition(this.getContentSize().width/2, this.getContentSize().height/2);
		this.addChild(this.air, 0);
		this.air.setRotation(90);
	},
	addTouchListener:function()
	{
		var listener = cc.EventListener.create(
		{
			event:cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches:true,
			onTouchBegan:this.onTouchBegan,
			onTouchMoved:this.onTouchMoved
		});
		cc.eventManager.addListener(listener, this);
	},
	onTouchBegan:function(touch, event)
	{
		var target = event.getCurrentTarget();
		var pos = target.convertToNodeSpace(touch.getLocation());
		var rect = cc.rect(0, 0, target.width, target.height);
		if( cc.rectContainsPoint(rect, pos))
		{
			return true;
		}
		return false;
	},
	onTouchMoved:function(touch, event)
	{
		var target = event.getCurrentTarget();
		
		var pos = target.convertToNodeSpace(touch.getLocation());
		var rect = cc.rect(0, 0, target.width, target.height);
		if( !cc.rectContainsPoint(rect, pos))
		{
			return;
		}
		
		var delta = touch.getDelta();
		target.x += delta.x;
		target.y += delta.y;
		if ( target.x < 0 )
		{
			target.x = 0;
		}
		if ( target.x > 400 )
		{
			target.x = 400;
		}
		if( target.y < 0 )
		{
			target.y = 0;
		}
		if ( target.y > DefWin.windowHeight()-target.height )
		{
			target.y = DefWin.windowHeight()-target.height;
		}
	}
});












