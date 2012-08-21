<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

$i = 0;
if($i == 0) {
    sendNumber();
    $i = 1;
}
//generate random number for demonstration
function sendnumber() {
    $new_data = rand(0, 1000);
    //echo the new number
    echo "data: $new_data\n\n";
    flush();
}

?>