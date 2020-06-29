phina.define("MySprite", {
  superClass: "DisplayElement",

  // コンストラクタ
  init: function(mode, pattern, x, y, width=CHAR_XSIZE, height=CHAR_YSIZE) {
    console.log("MySpriteクラスinit");
    this.superInit();
    // スプライトグループ
    this.myspritegroup = DisplayElement().addChildTo(this);
    // スプライト画像作成
    this.changeSprite(mode, pattern, x, y, width, height);
    this.mode = mode;
    this.alive = true;
  },
  // スプライトモード変更
  changeSprite: function(mode, pattern, x, y, width=CHAR_XSIZE, height=CHAR_YSIZE) {
    //console.log("MySpriteクラスchangeSprite");
    // スプライト画像作成
    if (this.sprite != null) {
      x = this.sprite.x;
      y = this.sprite.y;
      this.myspritegroup.removeChild(this.sprite);
      this.sprite.remove();
    }
    this.sprite = Sprite(mode, width, height).addChildTo(this.myspritegroup);
    this.sprite.setImage(mode, width, height)
    this.sprite.x = x;
    this.sprite.y = y;
    this.changePattern(mode, pattern);
    this.mode = mode;
  },
  // スプライトパターン変更
  changePattern: function(mode, pattern) {
    // スプライトにフレームアニメーションをアタッチ
    this.sprite.anim = FrameAnimation(mode).attachTo(this.sprite);
    // スプライトシートのサイズにフィットさせない
    this.sprite.anim.fit = false;
    //アニメーションを再生する
    this.sprite.anim.gotoAndPlay(pattern);
    this.mode = mode;
  },
  // 更新
  update: function(app) {
    //console.log("MySpriteクラスupdate");
    if (this.mode != "flower") {
      var xDiff = this.targetX - this.sprite.x;
      var yDiff = this.targetY - this.sprite.y
      if (xDiff < 10 && yDiff < 10) {
        this.changeLocation();
      }
      // 徐々に次の位置に近づける
      this.sprite.moveBy(xDiff * 0.01, yDiff * 0.01);
      if (this.nameLabel != null) {
        this.nameLabel.moveBy(xDiff * 0.01, yDiff * 0.01);
      }
    }
  },
  // スプライト位置変更
  changeLocation: function() {
    //console.log("MySpriteクラスchangeLocation");
    this.targetX = Math.floor( Math.random() * SCREEN_WIDTH );
    this.targetY = Math.floor( Math.random() * SCREEN_HEIGHT );
  },
  // プレイヤースプライトを最前面へ
  moveFront: function() {
    //console.log("PlayerMainクラスmoveFront");
    this.myspritegroup.removeChild(this.sprite);
    this.sprite.addChildTo(this.myspritegroup);
  },
  // ラベルオブジェクト追加
  addNameLabel: function(str="", color="white") {
    this.nameLabel = Label({
      text: str,
      x: this.sprite.x,
      y: this.sprite.y - 60,
      fontSize: 20,
      fill: color,
      stroke: "black",
      strokeWidth: 5,
    }).addChildTo(this);
  },
  // 名前ラベル設定
  setNameLabel: function(str, color="white") {
    this.nameLabel.text = str;
    this.nameLabel.fill = color;
  },
  // ターゲット位置設定
  setTarget: function(x, y) {
    this.targetX = x;
    this.targetY = y;
  },
  // スプライト消去
  removeSprite: function() {
    this.sprite.remove();
    this.nameLabel.remove();
    this.alive = false;
  },
  // スプライト生死
  isAlive: function() {
    return this.alive
  }
});