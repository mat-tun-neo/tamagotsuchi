/*
 * メインシーン
 */
phina.define("RoomScene", {
  // 継承
  superClass: "DisplayScene",
  // コンストラクタ
  init: function() {
    console.log("RoomSceneクラスinit");
    // 親クラス初期化
    this.superInit();
    // 背景
    this.back = Sprite("background").addChildTo(this);
    this.back.setPosition(this.gridX.center(),this.gridY.center());
    this.back.width = SCREEN_WIDTH;
    this.back.height = SCREEN_HEIGHT;
    // ルームラベル
    var roomlabel = Label({text: "へやをせんたくしてください"}).addChildTo(this);
    roomlabel.tweener.clear().setLoop(1).to({alpha:0}, 500).to({alpha:1}, 500);
    roomlabel.setPosition(SCREEN_WIDTH / 2, 100);
    roomlabel.fill = "white";
    roomlabel.fontSize = 40;
    roomlabel.stroke = "blue";
    roomlabel.strokeWidth = 15;
    // たまごつちラベル
    var titlelabel = Label({text: "卵土\nたまごつち"}).addChildTo(this);
    titlelabel.setPosition(460, 820);
    titlelabel.fill = "white";
    titlelabel.fontSize = 40;
    titlelabel.stroke = "red";
    titlelabel.strokeWidth = 15;
    // ルームスプライト
    this.putRoom();
    // ボタンスプライト
    this.putXButton();
    // 部屋メッセージスプライト
    let pattern = zeroPadding(Math.floor( Math.random() * Object.keys(ASSETS.spritesheet.adult.animations).length ), 3);
    this.subplayer = MySprite("adult", pattern, this.gridX.center(), this.gridY.center()).addChildTo(this);
    this.subplayer.changeLocation();
    this.subplayer.addNameLabel(ROOM_MESSAGE[Math.floor( Math.random() * ROOM_MESSAGE.length )], "white");
    // セッション情報チェック
    if (ONLINE.sessionid.timestamp == null) {
      console.log("setroom43 - ONLINE：");
      console.log(ONLINE);
      axios.post("./php/getroom.php", ONLINE)
      .then(function (response) {
        console.log("getroom - responseログ：");
        console.log(response);
        // プレイヤー値を更新
        if (response.data != null && response.data != "") {
          ONLINE.sessionid = JSON.parse(JSON.stringify(response.data));
        }
        console.log("setroom51 - ONLINE：");
        console.log(ONLINE);
          console.log("roomno/name = " + ONLINE.sessionid.roomno + "/" + ONLINE.sessionid.name);
        if (ONLINE.sessionid.roomno != null) {
          if (ONLINE.sessionid.name != null) {
            this.exit("Main");
          } else {
            this.exit("Name");
          }
        };
      }.bind(this))
      .catch(function (error) { console.log("error!:" + error); })
      .finally(function () {});
    }
  },
  // 更新
  update: function(app) {
    // プレイヤースプライトを最全面へ
    this.removeChild(this.subplayer);
    this.subplayer.addChildTo(this);
    // 部屋メッセージ更新
    if (app.frame % 200 == 0) {
      this.subplayer.setNameLabel(ROOM_MESSAGE[Math.floor( Math.random() * ROOM_MESSAGE.length )], "white");
    };
  },
  // Xボタン描画
  putXButton: function() {
    console.log("RoomSceneクラスputXButton");
    this.xbutton = Sprite("xbutton").addChildTo(this);
    this.xbutton.setPosition(SCREEN_WIDTH - BUTTON_SIZE / 2, BUTTON_SIZE / 2);
    //console.log(this.xbutton.x + "/" + this.xbutton.y);
    // Xボタン押下時
    this.xbutton.setInteractive(true);
    this.xbutton.onclick = function() {
      this.exit("Exit");
    }.bind(this);
  },
  // ルーム描画
  putRoom: function() {
    //console.log("RoomSceneクラスputRoom");
    // スプライト画像作成
    for(let i = 0; i < Object.keys(ASSETS.spritesheet.room.animations).length; i++) {
      var room = this.putSprite("room", i, 144, 192).addChildTo(this);
      // ルーム押下時
      room.setInteractive(true);
      room.onclick = function() {
        console.log("RoomSceneクラスroom.onclick" + i);
        console.log("setroom98 - ONLINE：");
        console.log(ONLINE);
        ONLINE.sessionid.roomno = i
        axios.post("./php/setroom.php", ONLINE)
        .then(function (response) {
          console.log("setroom - responseログ：");
          console.log(response);
        }.bind(this))
        .catch(function (error) { console.log("error!:" + error); })
        .finally(function () {});
        this.exit("Name");
      }.bind(this);
    }
  },
  // スプライト配置
  putSprite: function(mode, pattern, width=CHAR_XSIZE, height=CHAR_YSIZE) {
    //console.log("RoomSceneクラスputSprite");
    // スプライト画像作成
    var sprite = Sprite(mode, width, height).addChildTo(this);
    this.changeLocation(sprite, pattern);
    // スプライトにフレームアニメーションをアタッチ
    sprite.anim = FrameAnimation(mode).attachTo(sprite);
    // スプライトシートのサイズにフィットさせない
    sprite.anim.fit = false;
    //アニメーションを再生する
    sprite.anim.gotoAndPlay(zeroPadding(pattern, 3));
    return sprite;
  },
  // スプライト位置変更
  changeLocation: function(sprite, pattern) {
    console.log("RoomSceneクラスchangeLocation");
    var ax = 144;
    var bx = 108;
    var ay = 192;
    var by = 240; 
    sprite.x = (pattern % 4) * ax + bx ;
    sprite.y = Math.floor(pattern / 4) * ay + by;
    //console.log("RoomSceneクラスchangeLocation/" + pattern +"/" + sprite.x + "/" + sprite.y);
  }
});
