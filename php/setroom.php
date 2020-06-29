<?php
    session_start();
    header("Content-Type: application/json; charset=UTF-8");
    // LOGファイル
    $log = "./debug.log";
    // POST値をJSONデコード
    $post_ary = json_decode(file_get_contents('php://input'), true);
    // JSONファイル
    $url = "./dat.json";
    if (!file_exists($url) || filesize($url) == 0) {
        copy($url."_template", $url);
    }
    $response_ary = array();
    if (file_exists($url) && filesize($url) > 0) {
        // JSONファイル全読込
        $json = file_get_contents($url);
        $response_ary = json_decode($json, true);
        // 部屋番号とタイムスタンプ書き換え
        if (!isset($response_ary[session_id()])) {
            $response_ary += array(session_id()=>$post_ary["sessionid"]);
            $response_ary[session_id()]["timestamp"] = time();
            $response_ary[session_id()]["roomno"] = $post_ary["sessionid"]["roomno"];
            $response_ary[session_id()]["id"] = session_id();
        } else {
            $response_ary[session_id()]["roomno"] = $post_ary["sessionid"]["roomno"];
        };
    } else {
        $response_ary += array(session_id()=>$post_ary["sessionid"]);
        $response_ary[session_id()]["timestamp"] = time();
        $response_ary[session_id()]["roomno"] = $post_ary["sessionid"]["roomno"];
        $response_ary[session_id()]["id"] = session_id();
    };
    // JSONファイル全書込
    file_put_contents($url, json_encode($response_ary));
    // レスポンス情報
    echo json_encode($response_ary[session_id()]);
