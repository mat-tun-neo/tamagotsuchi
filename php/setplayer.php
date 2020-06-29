<?php
    session_start();
    header("Content-Type: application/json; charset=UTF-8");
    // レスポンス値
    $result = null;
    // LOGファイル
    $log = "./debug.log";
    // JSONファイル
    $url = "./dat.json";
    if (!file_exists($url) || filesize($url) == 0) {
        copy($url."_template", $url);
    }
    // セッションID
    $this_session_id = session_id();
    // POST値をJSONデコード
    $post_ary = json_decode(file_get_contents('php://input'), true);
    // JSONファイル全読込
    $json = file_get_contents($url);
    $response_ary = array();
    $response_ary = json_decode($json, true);
    // 名前とタイムスタンプ書き換え
    if (isset($response_ary[$this_session_id])) {
        // タイムスタンプ
        $response_ary[$this_session_id]["timestamp"] = time();
        // 座標
        $response_ary[$this_session_id]["x"] = floor($post_ary["sessionid"]["x"]);
        $response_ary[$this_session_id]["y"] = floor($post_ary["sessionid"]["y"]);
        $response_ary[$this_session_id]["targetX"] = floor($post_ary["sessionid"]["targetX"]);
        $response_ary[$this_session_id]["targetY"] = floor($post_ary["sessionid"]["targetY"]);
    };
    foreach ($response_ary as $session_id => $data) {
        if (strlen($session_id) == 26 || strlen($session_id) == 32) {
            // 年齢・成長
            $age = floor((time() - $response_ary[$session_id]["birthday"]) / 600); // 仮
            file_put_contents($log, $age); 
            if ($response_ary[$session_id]["period"] != "flower") {
                $response_ary[$session_id]["age"] = $age;
            };
            if ($age < 5) {
                $response_ary[$session_id]["period"] = "baby";
            } else if ($age < 10) {
                $response_ary[$session_id]["period"] = "toddlers";
            } else if ($age < 20) {
                $response_ary[$session_id]["period"] = "teens";
            } else if ($age < 40) {
                $response_ary[$session_id]["period"] = "adult";
            } else if ($age < 50) {
                $response_ary[$session_id]["period"] = "seniors";
            } else if ($age > $response_ary[$session_id]["lifespan"]) {
                $response_ary[$session_id]["period"] = "flower";
            };
            $response_ary[$session_id]["ghost"] = ""; // 仮
        };
    };
    // JSONファイル全書込
    file_put_contents($url, json_encode($response_ary));
    // レスポンス情報
    $result = $response_ary[$this_session_id];
    echo json_encode($result);
    // キャラが花になったらセッション管理から外す
    if ($response_ary[$this_session_id]["period"] == "flower") {
        // クッキー削除
        if (isset($_COOKIE[session_name()])) {
            setcookie(session_name(), '', time() - 42000, '/');
        }
        // セッション削除
        session_destroy();
    };
