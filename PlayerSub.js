phina.define('PlayerSub', {
  superClass: 'MySprite',

  // コンストラクタ
  init: function(sessionid, width=CHAR_XSIZE, height=CHAR_YSIZE) {
    console.log("PlayerSubクラスinit");
    var pdata = players[sessionid];
    console.log("pdata:");
    console.log(pdata);
    this.mode = pdata.period + pdata.ghost;
    this.pattern = zeroPadding(pdata[this.mode], 3);
    console.log(sessionid + "/" + this.mode + "/" + this.pattern);
    this.superInit(this.mode, this.pattern, width, height);
    // 初期位置
    this.sprite.x = pdata.x;
    this.sprite.y = pdata.y;
    this.targetX = pdata.x;
    this.targetY = pdata.y;
    // サブプレイヤーの名前ラベル
    this.addNameLabel(pdata.name + "(" + pdata.age + ")", "white");
    // サブプレイヤーのID
    this.id = sessionid;
  },
  // 更新
  update: function(app) {
    //console.log("MySpriteクラスupdate");
    var xDiff = this.targetX - this.sprite.x;
    var yDiff = this.targetY - this.sprite.y
    if (this.mode != "flower") {
      if (xDiff < 10 && yDiff < 10) {
        this.changeLocation();
      }
      // 徐々に次の位置に近づける
      this.sprite.moveBy(xDiff * 0.01, yDiff * 0.01);
      if (this.nameLabel != null) {
        this.nameLabel.moveBy(xDiff * 0.01, yDiff * 0.01);
      }
    }
  }
});