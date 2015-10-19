<?php

require './rb.php';

R::setup( 'mysql:host=192.168.56.154;dbname=c9hallhatoszinek', 'c9hallhatoszinek', 'justNow465' );
R::wipe("user");
R::wipe("sound");
