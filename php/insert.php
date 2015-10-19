<?php

try {
    $post = json_decode(file_get_contents("php://input"), true);

    if (!isset($post)) {
        throw new Exception("empty-data", 1);
    }

    session_start();

    /* http://redbeanphp.com/quick_tour */
    require './rb.php';

    R::setup( 'mysql:host=192.168.56.154;dbname=c9hallhatoszinek', 'c9hallhatoszinek', 'justNow465' );

    // Should be uncommented in production
    //R::freeze();

    R::startLogging();
    
    $data = R::dispense('user')->setMeta("sys.buildcommand.unique", array(array('session')));

    $data['sex'] = $post['sex'];
    $data['age'] = $post['age'];
    $data['level'] = $post['level'];
    $data['harder'] = $post['harder'];
    $data['session'] = session_id();

    foreach ($post['sounds'] as $s) {
        $sound = R::dispense('sound');

        $sound['file'] = $s['file'];
        $sound['time'] = $s['time'];
        $sound['color'] = $s['color'];
        $sound['side'] = $s['side'];

        $data->ownSoundList[] = $sound;
    }

    $id = R::store($data);

    echo json_encode(array(
        'success' => array(
            'msg' => "yeaah",
            'id' => 'id',
            'logs' => R::getLogs()
        ),
    ));
} catch (Exception $e) {
    echo json_encode(array(
        'error' => array(
            'msg' => $e->getMessage(),
            'code' => $e->getCode(),
            'logs' => R::getLogs()
        ),
    ));
}