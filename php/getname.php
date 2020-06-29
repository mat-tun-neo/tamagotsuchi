<?php
    header("Content-Type: application/json; charset=UTF-8");
    // LOGファイル
    $log = "./debug.log";
    // 名前ファイル
    $url = "./names.json";
    // JSONファイル全読込
    $json = file_get_contents($url);
    $response_ary = json_decode($json, true);
    // レスポンス情報
    echo json_encode($response_ary);
