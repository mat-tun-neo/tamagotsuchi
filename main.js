// グローバルに展開
phina.globalize();

// 画面・スプライトサイズ
var SCREEN_WIDTH    = 640;
var SCREEN_HEIGHT   = 960;
var SCREEN_LIMIT = 150;
var CHAR_XSIZE = 96;
var CHAR_YSIZE = 96;
var BUTTON_SIZE = 80;
// URL
var HREF = "https://ayu-study.com/js-programming002-20200627-src";
// 説明メッセージ
var ROOM_MESSAGE = ["部屋はいつでも\n入り直せるよ", "卵土を育てる\n部屋を押してね"];
var NAME_MESSAGE = ["名前はいつでも\nつけ直せるよ", "育てる卵土の\n名前を選んでね"];
// オンライン連携
var ONLINE = {
  "sessionid": {
    "id": null,
    "timestamp": null,
    "roomno": null,
    "name": null,
    "birthday": null,
    "lifespan": null,
    "age": null,
    "period": null,
    "ghost": null,
    "baby": null,
    "toddlers": null,
    "teens": null,
    "adult": null,
    "seniors": null,
    "flower": null,
    "stressval": null,
    "x": null,
    "y": null,
    "targetX": null,
    "targetY": null,
    "itemNo": null,
    "itemX": null,
    "itemY": null,
  }
};
var players = null;
// アセット
var ASSETS = {
  // 画像
  image: {
    "background":    "./images/background.png",
    "baby":          "./images/baby.png",
    "babyghost":     "./images/baby.png",
    "toddlers":      "./images/toddlers.png",
    "toddlersghost": "./images/toddlers.png",
    "teens":         "./images/teens.png",
    "teensghost":    "./images/teens.png",
    "adult":         "./images/adult.png",
    "adultghost":    "./images/adult.png",
    "seniors":       "./images/seniors.png",
    "seniorsghost":  "./images/seniors.png",
    "flower":        "./images/flowers.png",
    "tree":          "./images/tree.png",
    "xbutton":       "./images/xbutton1.png",
    "bbutton":       "./images/bbutton.png",
    "room":          "./images/room.png",
    "letter":        "./images/letter.png",
  },
  // スプライトシート
  spritesheet: {
    "baby":
    {
      "frame": { "width": 96, "height": 96, "cols": 10, "rows": 42 },
      "animations" : {
        "000": {"frames": [0,1,2,3],         "next": "000", "frequency": 10 },
        "001": {"frames": [10,11,12,13],     "next": "001", "frequency": 11 },
      }
    },
    "babyghost":
    {
      "frame": { "width": 96, "height": 96, "cols": 10, "rows": 42 },
      "animations" : {
        "000": {"frames": [8,9],       "next": "000", "frequency": 10 },
        "001": {"frames": [18,19],     "next": "001", "frequency": 11 },
      }
    },
    "toddlers":
    {
      "frame": { "width": 96, "height": 96, "cols": 10, "rows": 42 },
      "animations" : {
        "000": {"frames": [0,1,2,3],         "next": "000", "frequency": 10 },
        "001": {"frames": [10,11,12,13],     "next": "001", "frequency": 11 },
        "002": {"frames": [20,21,22,23],     "next": "002", "frequency": 12 },
        "003": {"frames": [30,31,32,33],     "next": "003", "frequency": 13 },
      }
    },
    "toddlersghost":
    {
      "frame": { "width": 96, "height": 96, "cols": 10, "rows": 42 },
      "animations" : {
        "000": {"frames": [8,9],       "next": "000", "frequency": 10 },
        "001": {"frames": [18,19],     "next": "001", "frequency": 11 },
        "002": {"frames": [28,29],     "next": "002", "frequency": 12 },
        "003": {"frames": [38,39],     "next": "003", "frequency": 13 },
      }
    },
    "teens":
    {
      "frame": { "width": 96, "height": 96, "cols": 10, "rows": 42 },
      "animations" : {
        "000": {"frames": [0,1,2,3],         "next": "000", "frequency": 10 },
        "001": {"frames": [10,11,12,13],     "next": "001", "frequency": 11 },
        "002": {"frames": [20,21,22,23],     "next": "002", "frequency": 12 },
        "003": {"frames": [30,31,32,33],     "next": "003", "frequency": 13 },
        "004": {"frames": [40,41,42,43],     "next": "004", "frequency": 14 },
        "005": {"frames": [50,51,52,53],     "next": "005", "frequency": 15 },
        "006": {"frames": [60,61,62,63],     "next": "006", "frequency": 16 },
        "007": {"frames": [70,71,72,73],     "next": "007", "frequency": 17 },
        "008": {"frames": [80,81,82,83],     "next": "008", "frequency": 18 },
        "009": {"frames": [90,91,92,93],     "next": "009", "frequency": 19 },
        "010": {"frames": [100,101,102,103], "next": "010", "frequency": 10 },
        "011": {"frames": [110,111,112,113], "next": "011", "frequency": 11 },
      }
    },
    "teensghost":
    {
      "frame": { "width": 96, "height": 96, "cols": 10, "rows": 42 },
      "animations" : {
        "000": {"frames": [8,9],       "next": "000", "frequency": 10 },
        "001": {"frames": [18,19],     "next": "001", "frequency": 11 },
        "002": {"frames": [28,29],     "next": "002", "frequency": 12 },
        "003": {"frames": [38,39],     "next": "003", "frequency": 13 },
        "004": {"frames": [48,49],     "next": "004", "frequency": 14 },
        "005": {"frames": [58,59],     "next": "005", "frequency": 15 },
        "006": {"frames": [68,69],     "next": "006", "frequency": 16 },
        "007": {"frames": [78,79],     "next": "007", "frequency": 17 },
        "008": {"frames": [88,89],     "next": "008", "frequency": 18 },
        "009": {"frames": [98,99],     "next": "009", "frequency": 19 },
        "010": {"frames": [108,109],   "next": "010", "frequency": 10 },
        "011": {"frames": [118,119],   "next": "011", "frequency": 11 },
      }
    },
    "adult":
    {
      "frame": { "width": 96, "height": 96, "cols": 10, "rows": 42 },
      "animations" : {
        "000": {"frames": [0,1,2,3],         "next": "000", "frequency": 10 },
        "001": {"frames": [10,11,12,13],     "next": "001", "frequency": 11 },
        "002": {"frames": [20,21,22,23],     "next": "002", "frequency": 12 },
        "003": {"frames": [30,31,32,33],     "next": "003", "frequency": 13 },
        "004": {"frames": [40,41,42,43],     "next": "004", "frequency": 14 },
        "005": {"frames": [50,51,52,53],     "next": "005", "frequency": 15 },
        "006": {"frames": [60,61,62,63],     "next": "006", "frequency": 16 },
        "007": {"frames": [70,71,72,73],     "next": "007", "frequency": 17 },
        "008": {"frames": [80,81,82,83],     "next": "008", "frequency": 18 },
        "009": {"frames": [90,91,92,93],     "next": "009", "frequency": 19 },
        "010": {"frames": [100,101,102,103], "next": "010", "frequency": 10 },
        "011": {"frames": [110,111,112,113], "next": "011", "frequency": 11 },
        "012": {"frames": [120,121,122,123], "next": "012", "frequency": 12 },
        "013": {"frames": [130,131,132,133], "next": "013", "frequency": 13 },
        "014": {"frames": [140,141,142,143], "next": "014", "frequency": 14 },
        "015": {"frames": [150,151,152,153], "next": "015", "frequency": 15 },
        "016": {"frames": [160,161,162,163], "next": "016", "frequency": 16 },
        "017": {"frames": [170,171,172,173], "next": "017", "frequency": 17 },
        "018": {"frames": [180,181,182,183], "next": "018", "frequency": 18 },
        "019": {"frames": [190,191,192,193], "next": "019", "frequency": 19 },
        "020": {"frames": [200,201,202,203], "next": "020", "frequency": 10 },
        "021": {"frames": [210,211,212,213], "next": "021", "frequency": 11 },
        "022": {"frames": [220,221,222,223], "next": "022", "frequency": 12 },
        "023": {"frames": [230,231,232,233], "next": "023", "frequency": 13 },
        "024": {"frames": [240,241,242,243], "next": "024", "frequency": 14 },
        "025": {"frames": [250,251,252,253], "next": "025", "frequency": 15 },
        "026": {"frames": [260,261,262,263], "next": "026", "frequency": 16 },
        "027": {"frames": [270,271,272,273], "next": "027", "frequency": 17 },
        "028": {"frames": [280,281,282,283], "next": "028", "frequency": 18 },
        "029": {"frames": [290,291,292,293], "next": "029", "frequency": 19 },
        "030": {"frames": [300,301,302,303], "next": "030", "frequency": 10 },
        "031": {"frames": [310,311,312,313], "next": "031", "frequency": 11 },
        "032": {"frames": [320,321,322,323], "next": "032", "frequency": 12 },
        "033": {"frames": [330,331,332,333], "next": "033", "frequency": 13 },
        "034": {"frames": [340,341,342,343], "next": "034", "frequency": 14 },
        "035": {"frames": [350,351,352,353], "next": "035", "frequency": 15 },
        "036": {"frames": [360,361,362,363], "next": "036", "frequency": 16 },
        "037": {"frames": [370,371,372,373], "next": "037", "frequency": 17 },
        "038": {"frames": [380,381,382,383], "next": "038", "frequency": 18 },
        "039": {"frames": [390,391,392,393], "next": "039", "frequency": 19 },
        "040": {"frames": [400,401,402,403], "next": "040", "frequency": 10 },
        "041": {"frames": [410,411,412,413], "next": "041", "frequency": 11 },
      }
    },
    "adultghost":
    {
      "frame": { "width": 96, "height": 96, "cols": 10, "rows": 42 },
      "animations" : {
        "000": {"frames": [8,9],       "next": "000", "frequency": 10 },
        "001": {"frames": [18,19],     "next": "001", "frequency": 11 },
        "002": {"frames": [28,29],     "next": "002", "frequency": 12 },
        "003": {"frames": [38,39],     "next": "003", "frequency": 13 },
        "004": {"frames": [48,49],     "next": "004", "frequency": 14 },
        "005": {"frames": [58,59],     "next": "005", "frequency": 15 },
        "006": {"frames": [68,69],     "next": "006", "frequency": 16 },
        "007": {"frames": [78,79],     "next": "007", "frequency": 17 },
        "008": {"frames": [88,89],     "next": "008", "frequency": 18 },
        "009": {"frames": [98,99],     "next": "009", "frequency": 19 },
        "010": {"frames": [108,109],   "next": "010", "frequency": 10 },
        "011": {"frames": [118,119],   "next": "011", "frequency": 11 },
        "012": {"frames": [128,129],   "next": "012", "frequency": 12 },
        "013": {"frames": [138,139],   "next": "013", "frequency": 13 },
        "014": {"frames": [148,149],   "next": "014", "frequency": 14 },
        "015": {"frames": [158,159],   "next": "015", "frequency": 15 },
        "016": {"frames": [168,169],   "next": "016", "frequency": 16 },
        "017": {"frames": [178,179],   "next": "017", "frequency": 17 },
        "018": {"frames": [188,189],   "next": "018", "frequency": 18 },
        "019": {"frames": [198,199],   "next": "019", "frequency": 19 },
        "020": {"frames": [208,209],   "next": "020", "frequency": 10 },
        "021": {"frames": [218,219],   "next": "021", "frequency": 11 },
        "022": {"frames": [228,229],   "next": "022", "frequency": 12 },
        "023": {"frames": [238,239],   "next": "023", "frequency": 13 },
        "024": {"frames": [248,249],   "next": "024", "frequency": 14 },
        "025": {"frames": [258,259],   "next": "025", "frequency": 15 },
        "026": {"frames": [268,269],   "next": "026", "frequency": 16 },
        "027": {"frames": [278,279],   "next": "027", "frequency": 17 },
        "028": {"frames": [288,289],   "next": "028", "frequency": 18 },
        "029": {"frames": [298,299],   "next": "029", "frequency": 19 },
        "030": {"frames": [308,309],   "next": "030", "frequency": 10 },
        "031": {"frames": [318,319],   "next": "031", "frequency": 11 },
        "032": {"frames": [328,329],   "next": "032", "frequency": 12 },
        "033": {"frames": [338,339],   "next": "033", "frequency": 13 },
        "034": {"frames": [348,349],   "next": "034", "frequency": 14 },
        "035": {"frames": [358,359],   "next": "035", "frequency": 15 },
        "036": {"frames": [368,369],   "next": "036", "frequency": 16 },
        "037": {"frames": [378,379],   "next": "037", "frequency": 17 },
        "038": {"frames": [388,389],   "next": "038", "frequency": 18 },
        "039": {"frames": [398,399],   "next": "039", "frequency": 19 },
        "040": {"frames": [408,409],   "next": "040", "frequency": 10 },
        "041": {"frames": [418,419],   "next": "041", "frequency": 11 },
      }
    },
    "seniors":
    {
      "frame": { "width": 96, "height": 96, "cols": 10, "rows": 42 },
      "animations" : {
        "000": {"frames": [0,1,2,3],         "next": "000", "frequency": 10 },
        "001": {"frames": [10,11,12,13],     "next": "001", "frequency": 11 },
        "002": {"frames": [20,21,22,23],     "next": "002", "frequency": 12 },
        "003": {"frames": [30,31,32,33],     "next": "003", "frequency": 13 },
        "004": {"frames": [40,41,42,43],     "next": "004", "frequency": 14 },
        "005": {"frames": [50,51,52,53],     "next": "005", "frequency": 15 },
      }
    },
    "seniorsghost":
    {
      "frame": { "width": 96, "height": 96, "cols": 10, "rows": 42 },
      "animations" : {
        "000": {"frames": [8,9],       "next": "000", "frequency": 10 },
        "001": {"frames": [18,19],     "next": "001", "frequency": 11 },
        "002": {"frames": [28,29],     "next": "002", "frequency": 12 },
        "003": {"frames": [38,39],     "next": "003", "frequency": 13 },
        "004": {"frames": [48,49],     "next": "004", "frequency": 14 },
        "005": {"frames": [58,59],     "next": "005", "frequency": 15 },
      }
    },
    "flower":
    {
      "frame": { "width": 96, "height": 96, "cols": 10, "rows": 4 },
      "animations" : {
        "000": { "frames": [0],  "next": "000", "frequency": 200 },
        "001": { "frames": [1],  "next": "001", "frequency": 200 },
        "002": { "frames": [2],  "next": "002", "frequency": 200 },
        "003": { "frames": [3],  "next": "003", "frequency": 200 },
        "004": { "frames": [4],  "next": "004", "frequency": 200 },
        "005": { "frames": [5],  "next": "005", "frequency": 200 },
        "006": { "frames": [6],  "next": "006", "frequency": 200 }
     },
    },
    "tree":
    {
      "frame": { "width": 96, "height": 96, "cols": 10, "rows": 4 },
      "animations" : {
        "000": { "frames": [0],  "next": "000", "frequency": 200 },
        "001": { "frames": [1],  "next": "001", "frequency": 200 },
        "002": { "frames": [2],  "next": "002", "frequency": 200 },
        "020": { "frames": [20], "next": "020", "frequency": 200 },
        "021": { "frames": [21], "next": "021", "frequency": 200 },
        "022": { "frames": [22], "next": "022", "frequency": 200 }
      }
    },
    "room":
    {
      "frame": { "width": 144, "height": 192, "cols": 12, "rows": 14 },
      "animations" : {
        "000": { "frames": [0,1,2,3,4,5,6,7,8,9,10,11],                       "next": "000", "frequency": 20 },
        "001": { "frames": [12,13,14,15,16,17,18,19,20,21,22,23],             "next": "001", "frequency": 20 },
        "002": { "frames": [24,25,26,27,28,29,30,31,32,33,34,35],             "next": "002", "frequency": 20 },
        "003": { "frames": [36,37,38,39,40,41,42,43,44,45,46,47],             "next": "003", "frequency": 20 },
        "004": { "frames": [48,49,50,51,52,53,54,55,56,57,58,59],             "next": "004", "frequency": 20 },
        "005": { "frames": [60,61,62,63,64,65,66,67,68,69,70,71],             "next": "005", "frequency": 20 },
        "006": { "frames": [72,73,74,75,76,77,78,79,80,81,82,83],             "next": "006", "frequency": 20 },
        "007": { "frames": [84,85,86,87,88,89,90,91,92,93,94,95],             "next": "007", "frequency": 20 },
        "008": { "frames": [96,97,98,99,100,101,102,103,104,105,106,107],     "next": "008", "frequency": 20 },
        "009": { "frames": [108,109,110,111,112,113,114,115,116,117,118,119], "next": "009", "frequency": 20 },
        "010": { "frames": [120,121,122,123,124,125,126,127,128,129,130,131], "next": "010", "frequency": 20 },
        "011": { "frames": [132,133,134,135,136,137,138,139,140,141,142,143], "next": "011", "frequency": 20 },
        "012": { "frames": [144,145,146,147,148,149,150,151,152,153,154,155], "next": "012", "frequency": 20 },
        "013": { "frames": [156,157,158,159,160,161,162,163,164,165,166,167], "next": "013", "frequency": 20 },
      }
    }
  }
};

// 0パディング（NUM=値 LEN=桁数）
function zeroPadding(NUM, LEN) {
	return ( Array(LEN).join("0") + NUM ).slice( -LEN );
};

// プレイヤー値を初期化
function initOnlineSession() {
  console.log("main - initOnlineSessionログ：");
  ONLINE = {
    "sessionid": {
      "id": null,
      "timestamp": null,
      "roomno": null,
      "name": null,
      "birthday": null,
      "lifespan": null,
      "age": null,
      "period": null,
      "ghost": null,
      "baby": null,
      "toddlers": null,
      "teens": null,
      "adult": null,
      "seniors": null,
      "flower": null,
      "stressval": null,
      "x": null,
      "y": null,
      "targetX": null,
      "targetY": null,
      "itemNo": null,
      "itemX": null,
      "itemY": null,
    }
  };
  // Object.keys(ONLINE.sessionid).forEach(function(key) {
  //   ONLINE.sessionid[key] = null;
  //   console.log("main - ONLINE.sessionid[key]" + ONLINE.sessionid[key]);
  // });
}

/*
 * メイン処理
 */
phina.main(function() {
  console.log("main");

  // アプリケーションを生成
  var app = GameApp({
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    assets: ASSETS,
  });
  // fps表示
  //app.enableStats();
  // 実行
  app.replaceScene(SceneSequence());
  app.run();
});

// SceneSequenceクラス
phina.define("SceneSequence", {
  superClass: "phina.game.ManagerScene",

  // 初期化
  init: function() {
    console.log("SceneSequenceクラスinit");
    this.superInit({
      scenes: [
        { label: "Loading", className: "LoadingScene" },
        { label: "Room",    className: "RoomScene" },
        { label: "Name",    className: "NameScene" },
        { label: "Main",    className: "MainScene" },
        { label: "Exit",    className: "ExitScene" },
      ]
    });
  }
});
  
phina.define("LoadingScene", {
  superClass: "phina.game.LoadingScene",

  init: function(options) {
    console.log("LoadingSceneクラスinit");

    this.superInit({
      // アセット読み込み
      assets: ASSETS,
    });

    this.backgroundColor = "BLACK";

    // view
    var baseLayer = DisplayElement(options).addChildTo(this);

    // ラベル
    var label = Label({
      text: "NOW LOADING...",
    })
    .addChildTo(baseLayer)
    .setPosition(this.width*0.5, this.height*0.5)
    label.tweener.clear()
    .setLoop(1)
    .to({alpha:0}, 500)
    .to({alpha:1}, 500)
    ;
    label.fill = "white";
    label.fontSize = 40;

    this.exit("Room");
  }
});
