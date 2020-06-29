/*
 * メインシーン
 */
phina.define("MainScene", {
  // 継承
  superClass: "DisplayScene",
  // コンストラクタ
  init: function() {
    console.log("MainSceneクラスinit");
    // 親クラス初期化
    this.superInit();
    // 背景
    this.back = Sprite("background").addChildTo(this);
    this.back.setPosition(this.gridX.center(), this.gridY.center());
    this.back.width = SCREEN_WIDTH;
    this.back.height = SCREEN_HEIGHT;
    // 同期タイミング
    this.update_frame = 50;
    // 木スプライト
    //this.putTrees();
    // 部屋スプライト
    this.putRoomSprite();
    // ボタンスプライト
    this.putXButton();
    this.putBButton();
    // プレイヤースプライト
    let mode = ONLINE.sessionid.period + ONLINE.sessionid.ghost;
    let pattern = zeroPadding(ONLINE.sessionid[ONLINE.sessionid.period], 3);
    console.log("mode/pattern:" + mode + "/" + pattern);
    var x = ONLINE.sessionid.x;
    var y = ONLINE.sessionid.y;
    if (x == null) {
      x = this.gridX.center();
    };
    if (y == null) {
      y = this.gridY.center();
    }
    this.player = PlayerMain(mode, pattern, x, y).addChildTo(this);
    this.force = true;
    this.update()
    // スプライトグループ
    this.playerGroup = DisplayElement().addChildTo(this);
    // 画面タップ
    this.onpointstart = function(e) {
      //console.log("onpointstart:" + this.xbutton.x + "/" + this.xbutton.y);
      // プレイヤー移動
      this.player.move(e);
    };
  },
  // 更新
  update: function(app) {
    // プレイヤースプライトを最全面へ
    this.removeChild(this.player);
    this.player.addChildTo(this);
    // プレイヤー更新
    if (this.force || app.frame % this.update_frame == 0) {
      //console.log("update_frame：" + this.update_frame);
      // プレイヤーの描画
      if (this.player.isAlive()) {
        this.updateMyPlayer();
      }
      // 同部屋プレイヤーの描画
      this.updateSubPlayer();
    };
    this.force = false;
  },
  // プレイヤーの描画
  updateMyPlayer: function() {
    var current_mode = ONLINE.sessionid.period;
    ONLINE.sessionid.x = this.player.sprite.x;
    ONLINE.sessionid.y = this.player.sprite.y;
    ONLINE.sessionid.targetX = this.player.targetX;
    ONLINE.sessionid.targetY = this.player.targetY;
    axios.post("./php/setplayer.php", ONLINE)
    .then(function (response) {
      console.log("setplayer - responseログ：");
      console.log(response);
      // プレイヤー値を更新
      ONLINE.sessionid = JSON.parse(JSON.stringify(response.data));
      this.player.setNameLabel(ONLINE.sessionid.name + "(" + ONLINE.sessionid.age + ")", "yellow");
      console.log("ONLINE.sessionid:");
      console.log(ONLINE.sessionid);
      let mode = ONLINE.sessionid.period + ONLINE.sessionid.ghost;
      let pattern = zeroPadding(ONLINE.sessionid[ONLINE.sessionid.period], 3);
      console.log("period + ghost               :" + mode);
      console.log("pattern                      :" + pattern);
      // プレイヤースプライト再描画
      if (this.force || mode != current_mode) {
        this.player.changeSprite(mode, pattern);
      }
    }.bind(this))
    .catch(function (error) {
      console.log("error!:" + error);
      // 寿命を迎えた
      this.player.removeSprite();
      this.putLetter();
      this.letter.setInteractive(true);
      this.letter.onclick = function() {
        initOnlineSession();
        this.exit("Room");
      }.bind(this);
    }.bind(this))
    .finally(function () {});
  },
  // 同部屋プレイヤーの描画
  updateSubPlayer: function() {
    //console.log("MainSceneクラスupdatePlayer");
    axios.post("./php/getplayer.php", ONLINE)
    .then(function (response) {
      console.log("getplayer - responseログ：");
      console.log(response);
      var current_players = JSON.parse(JSON.stringify(players));
      players = JSON.parse(JSON.stringify(response.data));
      Object.keys(players).forEach(function(sessionid) {
        // サブプレイヤースプライトの取得
        var subPlayerSprite = this.getPlayer(sessionid);
        if ( subPlayerSprite == null) {
          var subplayer = PlayerSub(sessionid).addChildTo(this.playerGroup);
        } else {
          subPlayerSprite.setTarget(players[sessionid].targetX, players[sessionid].targetY);
          subPlayerSprite.setNameLabel(players[sessionid].name + "(" + players[sessionid].age + ")");
          // サブプレイヤースプライト再描画
          var current_mode = current_players[sessionid].period;
          var mode = players[sessionid].period + players[sessionid].ghost;
          var pattern = zeroPadding(players[sessionid][players[sessionid].period], 3);
          if (this.force || mode != current_mode) {
            subPlayerSprite.changeSprite(mode, pattern);
          }
        }
      }.bind(this))
    }.bind(this))
    .catch(function (error) { console.log(error); })
    .finally(function () {});
  },
  // 同部屋のサブプレイヤースプライトの取得
  getPlayer: function(sessionid) {
    //console.log("MainSceneクラスgetPlayer");
    //console.log("this.playerGroup.children.length" + this.playerGroup.children.length);
    for (let i = 0; i < this.playerGroup.children.length; i++){
      //console.log("sessionid/this.playerGroup.children[i].id: " + sessionid + "/" + this.playerGroup.children[i].id);
      if (sessionid == this.playerGroup.children[i].id) {
        return this.playerGroup.children[i];
      };
    };
    return null;
  },
  // 木スプライト配置
  putTrees: function() {
    console.log("MainSceneクラスputTrees");
    // スプライト画像作成
    this.pattern0 = zeroPadding(Math.floor( Math.random() * 2 ), 3);
    this.tree0 = this.changeSprite("tree", this.pattern0).addChildTo(this);
    this.tree0.setInteractive(true);
    this.tree0.onclick = function() {
      console.log("MainSceneクラスtree0.onclick");
      console.log(this.pattern0);
      this.changeLocation(this.tree0);
    }.bind(this);
    // var tree1 = this.changeSprite("tree", "001").addChildTo(this);
    // var tree2 = this.changeSprite("tree", "002").addChildTo(this);
    // var tree3 = this.changeSprite("tree", "020").addChildTo(this);
    // var tree4 = this.changeSprite("tree", "021").addChildTo(this);
    // var tree5 = this.changeSprite("tree", "022").addChildTo(this);
  },
  // Xボタン描画
  putXButton: function() {
    console.log("MainSceneクラスputXButton");
    this.xbutton = Sprite("xbutton").addChildTo(this);
    this.xbutton.setPosition(SCREEN_WIDTH - BUTTON_SIZE / 2, BUTTON_SIZE / 2);
    //console.log(this.xbutton.x + "/" + this.xbutton.y);
    // Xボタン押下時
    this.xbutton.setInteractive(true);
    this.xbutton.onclick = function() {
      this.exit("Exit");
    }.bind(this);
  },
  // Bボタン描画
  putBButton: function() {
    console.log("RoomSceneクラスputBButton");
    this.bbutton = Sprite("bbutton").addChildTo(this);
    this.bbutton.setPosition(BUTTON_SIZE / 2, BUTTON_SIZE / 2);
    //console.log(this.bbutton.x + "/" + this.bbutton.y);
    // Xボタン押下時
    this.bbutton.setInteractive(true);
    this.bbutton.onclick = function() {
      this.exit("Name");
    }.bind(this);
  },
  // 部屋スプライト描画
  putRoomSprite: function() {
    console.log("MainSceneクラスputRoomSprite");
    this.room = this.putSprite("room", ONLINE.sessionid.roomno, 144/2, 192/2).addChildTo(this);
    this.room.setPosition(SCREEN_WIDTH - 144/3, SCREEN_HEIGHT - 192/3);
  },
  // 手紙スプライト配置
  putLetter: function() {
    console.log("MainSceneクラスputLetter");
    this.letter = Sprite("letter", 310, 293).addChildTo(this);
    this.letter.setPosition(this.gridX.center(), this.gridY.center());
    var letterLabel = Label({
      text: "育ててくれてありがとう\n\nぼく、土にかえって\nお花になったよ\n\n\n\nタップすると\nタイトルに戻ります",
      x: this.gridX.center(),
      y: this.gridY.center(),
      fontSize: 24,
      fill: "white",
      stroke: "black",
      strokeWidth: 5,
    }).addChildTo(this);
  },
  // スプライト配置
  putSprite: function(mode, pattern, width=CHAR_XSIZE, height=CHAR_YSIZE) {
    //console.log("RoomSceneクラスputSprite");
    // スプライト画像作成
    var sprite = Sprite(mode, width, height).addChildTo(this);
    // スプライトにフレームアニメーションをアタッチ
    sprite.anim = FrameAnimation(mode).attachTo(sprite);
    // スプライトシートのサイズにフィットさせない
    sprite.anim.fit = false;
    //アニメーションを再生する
    sprite.anim.gotoAndPlay(zeroPadding(pattern, 3));
    return sprite;
  },
  // スプライトパターン変更
  changeSprite: function(mode, pattern, width=CHAR_XSIZE, height=CHAR_YSIZE) {
    console.log("MainSceneクラスchangeSprite");
    // スプライト画像作成
    var sprite = Sprite(mode, width, height).addChildTo(this);
    this.changeLocation(sprite);
    // スプライトにフレームアニメーションをアタッチ
    sprite.anim = FrameAnimation(mode).attachTo(sprite);
    // スプライトシートのサイズにフィットさせない
    sprite.anim.fit = false;
    //アニメーションを再生する
    sprite.anim.gotoAndPlay(pattern);
    return sprite;
  },
  // スプライト位置変更
  changeLocation: function(sprite) {
    console.log("MySpriteクラスchangeLocation");
    sprite.x = Math.floor( Math.random() * SCREEN_WIDTH );
    sprite.y = Math.floor( Math.random() * SCREEN_HEIGHT );
  }
});
