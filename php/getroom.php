<?php
    session_start();
    header("Content-Type: application/json; charset=UTF-8");
    // LOGファイル
    $log = "./debug.log";
    // JSONファイル
    $url = "./dat.json";
    if (!file_exists($url) || filesize($url) == 0) {
        copy($url."_template", $url);
    }
    // JSONファイル全読込
    $json = file_get_contents($url);
    $response_ary = array();
    $response_ary = json_decode($json, true);
    // レスポンス情報
    if (isset($response_ary[session_id()])) {
        // レスポンス情報
        $response_ary[session_id()]["timestamp"] = time();
        echo json_encode($response_ary[session_id()]);
        // JSONファイル全書込
        file_put_contents($url, json_encode($response_ary));
    };