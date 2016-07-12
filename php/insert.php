<?php


$colors = array(
    '#000000'=>'fekete',
    '#FFFFFF'=>'fehér',
    '#999999'=>'szürke',
    '#808040'=>'olivazöld',
    '#FFFF00'=>'citromsárga',
    '#FFFF99'=>'halványsárga',
    '#FF9900'=>'naracssárga',
    '#FF99FF'=>'rózsaszín',
    '#CC0000'=>'vörösesbarna',
    '#FF0000'=>'piros',
    '#800080'=>'sötétlila',
    '#CC66FF'=>'világos lila',
    '#0033CC'=>'sötétkék',
    '#99CCFF'=>'világoskék',
    '#008000'=>'sötétzöld',
    '#00FF00'=>'világoszöld',
    '#663300'=>'sötétbarna',
    '#996633'=>'világosbarna'
);

try {
    $post = json_decode(file_get_contents("php://input"), true);

    if (!isset($post)) {
        throw new Exception("empty-data", 1);
    }

    session_start();

    require './rb.php';

    R::setup( 'mysql:host=192.168.56.154;dbname=c9hallhatoszinek', 'c9hallhatoszinek', 'justNow465' );

    // Should be uncommented in production
    //R::freeze();

    R::startLogging();
    
    $data = R::dispense('user')->setMeta("sys.buildcommand.unique", array(array('session')));

    $data['session'] = session_id();
    $data['sex'] = $post['sex'];
    $data['age'] = $post['age'];
    $data['experience'] = $post['level'];
    $data['harder'] = $post['harder'];
    $data['createDate'] = date("Y-m-d H:i:s");

    foreach ($post['sounds'] as $s) {
        $sound = R::dispense('sound');

        $sound['file'] = $s['file'];
        $sound['time'] = $s['time'];
        $sound['color'] = $s['color'];
        $sound['colorName'] = $colors[$s['color']];
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