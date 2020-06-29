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
    if (isset($post_ary["sessionid"]["roomno"])) {
        $room = $post_ary["sessionid"]["roomno"];
    };
    // JSONファイル全読込
    $json = file_get_contents($url);
    $json_ary = json_decode($json, true);
    // レスポンス情報
    $response_ary = array();
    $response_ary = array_filter($json_ary, "sameroom");
    function sameroom($value) {
        global $room;
        return $value["id"] != session_id() && $value["roomno"] == $room;
    };
    echo json_encode($response_ary);

