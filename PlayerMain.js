phina.define("PlayerMain", {
  superClass: "MySprite",

  // コンストラクタ
  init: function(mode, pattern, x, y, width=CHAR_XSIZE, height=CHAR_YSIZE) {
    console.log("PlayerMainクラスinit");
    this.superInit(mode, pattern, x, y, width, height);
    // 初期位置
    this.changeLocation();
    this.sprite.x = x;
    this.sprite.y = y;
    // メインプレイヤーのラベル
    this.addNameLabel(ONLINE.sessionid.name + "(" + ONLINE.sessionid.age + ")", "yellow");
  },
  // 画面タップ
  move: function(e) {
    //console.log("PlayerMainクラスmove");
    // 移動先を管理する変数
    this.targetX = e.pointer.x;
    this.targetY = e.pointer.y;
    // プレイヤースプライトを最全面へ
    this.moveFront();
  },
});