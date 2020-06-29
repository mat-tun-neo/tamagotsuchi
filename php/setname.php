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
    // POST値をJSONデコード
    $post_ary = json_decode(file_get_contents('php://input'), true);
    // JSONファイル全読込
    $json = file_get_contents($url);
    $response_ary = array();
    $response_ary = json_decode($json, true);
    // 名前とタイムスタンプ書き換え
    if (isset($response_ary[session_id()])) {
        // 名前とタイムスタンプ
        $response_ary[session_id()]["timestamp"] = time();
        $response_ary[session_id()]["name"] = $post_ary["sessionid"]["name"];
        // 誕生日・寿命・成長タイプ（baby/toddlers/teens/adult/seniors）・ストレス値　≪初回のみ設定≫
        if ($response_ary[session_id()]["birthday"] == null) {
            $response_ary[session_id()]["birthday"] = time();
            $response_ary[session_id()]["lifespan"] = 50; // 仮
            $response_ary[session_id()]["period"] = "baby"; // 仮
            $response_ary[session_id()]["ghost"] = ""; // 仮
            $response_ary[session_id()]["baby"] = $post_ary["sessionid"]["baby"]; // 仮
            $response_ary[session_id()]["toddlers"] = $post_ary["sessionid"]["toddlers"]; // 仮
            $response_ary[session_id()]["teens"] = $post_ary["sessionid"]["teens"]; // 仮
            $response_ary[session_id()]["adult"] = $post_ary["sessionid"]["adult"]; // 仮
            $response_ary[session_id()]["seniors"] = $post_ary["sessionid"]["seniors"]; // 仮
            $response_ary[session_id()]["flower"] = $post_ary["sessionid"]["flower"]; // 仮
            $response_ary[session_id()]["stressval"] = 50; // 仮
        }
        // JSONファイル全書込
        file_put_contents($url, json_encode($response_ary));
    };
    // レスポンス情報
    echo json_encode($response_ary[session_id()]);
