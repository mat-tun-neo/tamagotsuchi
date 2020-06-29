/*
 * メインシーン
 */
phina.define("NameScene", {
  // 継承
  superClass: 'DisplayScene',
  // コンストラクタ
  init: function() {
    console.log("NameSceneクラスinit");
    // 親クラス初期化
    this.superInit();
    // 背景
    this.back = Sprite('background').addChildTo(this);
    this.back.setPosition(this.gridX.center(),this.gridY.center());
    this.back.width = SCREEN_WIDTH;
    this.back.height = SCREEN_HEIGHT;
    // ラベル位置
    this.x = 0;
    this.y = 0;
    // ルームラベル
    var roomlabel = Label({text: "なまえをえらんでください"}).addChildTo(this);
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
    // 名前ラベル
    this.namelabels = [];
    // 名前の取得
    this.names = null;
    axios.post("./php/getname.php", ONLINE)
    .then(function (response) {
      console.log("getname - responseログ：");
      console.log(response);
      this.names = response.data.names;
      // 名前ラベル描画
      this.putName();
    }.bind(this))
    .catch(function (error) { console.log("error!:" + error); })
    .finally(function () {});
    // 名前メッセージスプライト
    let pattern = zeroPadding(Math.floor( Math.random() * Object.keys(ASSETS.spritesheet.adult.animations).length ), 3);
    this.subplayer = MySprite("adult", pattern, this.gridX.center(), this.gridY.center()).addChildTo(this);
    this.subplayer.changeLocation();
    this.subplayer.addNameLabel(NAME_MESSAGE[Math.floor( Math.random() * NAME_MESSAGE.length )], "white");
    // ボタンスプライト
    this.putXButton();
    this.putBButton();
    // 全部入れ替えラベル
    this.allChangeLabel();
  },
  // 更新
  update: function(app) {
    // プレイヤースプライトを最全面へ
    this.removeChild(this.subplayer);
    this.subplayer.addChildTo(this);
    // 部屋メッセージ更新
    if (app.frame % 200 == 0) {
      this.subplayer.setNameLabel(NAME_MESSAGE[Math.floor( Math.random() * NAME_MESSAGE.length )], "white");
    };
  },
  // Xボタン描画
  putXButton: function() {
    console.log("NameSceneクラスputXButton");
    this.xbutton = Sprite('xbutton').addChildTo(this);
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
    this.bbutton = Sprite('bbutton').addChildTo(this);
    this.bbutton.setPosition(BUTTON_SIZE / 2, BUTTON_SIZE / 2);
    //console.log(this.bbutton.x + "/" + this.bbutton.y);
    // Bボタン押下時
    this.bbutton.setInteractive(true);
    this.bbutton.onclick = function() {
      this.exit("Room");
    }.bind(this);
  },
  // 名前ラベル描画
  putName: function() {
    console.log("NameSceneクラスputName");
    // 名前配列シャッフル
    for (let i = this.names.length - 1; i > 0; i--){
      let r = Math.floor(Math.random() * (i + 1));
      let tmp = this.names[i];
      this.names[i] = this.names[r];
      this.names[r] = tmp;
    }
    if (ONLINE.sessionid.name != null) {
      this.names[0] = ONLINE.sessionid.name;
    }
    //console.log(this.names);
    for (let i = 0; i < 50; i++) {
      if (this.y < 20) {
        let namelabel = Label({text: this.names[i]}).addChildTo(this);
        this.namelabels.push(namelabel);
        namelabel.fill = "white";
        namelabel.fontSize = 30;
        namelabel.stroke = "black";
        namelabel.strokeWidth = 12;
        // 実際のサイズを算出
        namelabel.width = namelabel.calcCanvasWidth();
        namelabel.height = namelabel.calcCanvasHeight();
        this.changeLocation(namelabel, i);
          // 名前ラベル押下時
        namelabel.setInteractive(true);
        namelabel.onclick = function() {
          console.log("NameSceneクラスnamelabel.onclick" + i);
          ONLINE.sessionid.name = namelabel.text
          // スプライト番号をランダム選択
          ONLINE.sessionid.baby = Math.floor( Math.random() * Object.keys(ASSETS.spritesheet.baby.animations).length );
          ONLINE.sessionid.toddlers = Math.floor( Math.random() * Object.keys(ASSETS.spritesheet.toddlers.animations).length );
          ONLINE.sessionid.teens = Math.floor( Math.random() * Object.keys(ASSETS.spritesheet.teens.animations).length );
          ONLINE.sessionid.adult = Math.floor( Math.random() * Object.keys(ASSETS.spritesheet.adult.animations).length );
          ONLINE.sessionid.seniors = Math.floor( Math.random() * Object.keys(ASSETS.spritesheet.seniors.animations).length );
          ONLINE.sessionid.flower = Math.floor( Math.random() * Object.keys(ASSETS.spritesheet.flower.animations).length );
          axios.post("./php/setname.php", ONLINE)
          .then(function (response) {
            console.log("setname - responseログ：");
            console.log(response);
            // プレイヤー値を更新
            ONLINE.sessionid = JSON.parse(JSON.stringify(response.data));
            this.exit("Main");
          }.bind(this))
          .catch(function (error) { console.log("error!:" + error); })
          .finally(function () {});
        }.bind(this);
      }
    }
  },
  // ラベル位置変更
  changeLocation: function(label, i) {
    console.log("NameSceneクラスchangeLocation");
    var bx = 50;
    var by = 180;
    if ((this.x + label.text.length + 2) * label.fontSize > SCREEN_WIDTH) {
      this.x = 0;
      this.y = this.y + 2;
    }
    this.x += label.text.length / 2;
    //console.log("NameSceneクラスchangeLocation: x,y " + this.x + "/" + this.y + "/" + label.text);
    label.setPosition(this.x * label.fontSize + bx , this.y * label.fontSize + by);
    this.x += label.text.length / 2 + 1;
  },
  // 全部入れ替えラベル
  allChangeLabel: function() {
    console.log("NameSceneクラスallChangeLabel");
    let allchangelabel = Label({text: "ぜんぶきにいらない"}).addChildTo(this);
    allchangelabel.fill = "white";
    allchangelabel.fontSize = 30;
    allchangelabel.stroke = "blue";
    allchangelabel.strokeWidth = 12;
    // 実際のサイズを算出
    allchangelabel.width = allchangelabel.calcCanvasWidth();
    allchangelabel.height = allchangelabel.calcCanvasHeight();
    allchangelabel.setPosition(180, 850);
    allchangelabel.setInteractive(true);
    allchangelabel.onclick = function() {
      console.log("NameSceneクラスallchangelabel.onclick");
      // ラベル削除
      for (let namelabel of this.namelabels) {
        namelabel.remove();
      }
       this.namelabels = [];
      // ラベル位置
      this.x = 0;
      this.y = 0;
      // 名前ラベル描画
      this.putName();
    }.bind(this);  }
});
