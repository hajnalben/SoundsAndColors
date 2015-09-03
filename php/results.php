<?php

/* http://redbeanphp.com/quick_tour */
require './rb.php';

try {

    R::setup( 'mysql:host=192.168.56.154;dbname=c9hallhatoszinek', 'c9hallhatoszinek', 'justNow465' );

    $fileColorAggs = R::getAll("SELECT file, color, count(*) as count FROM sound GROUP BY file, color ORDER BY file, color");

    $count = R::count("user");

    echo json_encode(array(
        'count' => $count,
        'fileColorAggs' => $fileColorAggs
    ));
} catch (Exception $e) {
    echo json_encode(array(
        'error' => array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode(),
        ),
    ));
}