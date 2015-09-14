var MusicUtil = 
{
	root:"res/musics/",
	playBgMusic:function()
	{
		var m = Math.floor(Math.random()*16) + 1;
		if ( m < 10 )
		{
			m = "0" + m;
		}
		cc.audioEngine.playMusic(this.root +"music" + m.toString() + ".mp3", true);
	},
	playExplosionPlayerEffect:function()
	{
		cc.audioEngine.setEffectsVolume(1);
		cc.audioEngine.playEffect(this.root + "ExplosionPlayer.wav");
	},
	playExplosionEnemyEffect:function()
	{
		cc.audioEngine.setEffectsVolume(1);
		cc.audioEngine.playEffect(this.root + "ExplosionEnemy.wav");
	},
	playBulletEffect:function()
	{
		cc.audioEngine.setEffectsVolume(0.3);
		cc.audioEngine.playEffect(this.root + "Shoot.wav");
	},
	stopMusic:function()
	{
		cc.audioEngine.stopMusic();
	}
}