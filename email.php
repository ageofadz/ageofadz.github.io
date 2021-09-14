<?php

if($_POST["message"]) {

mail("sam@samrobertson.dev", "Here is the subject line",

$_POST["insert your message here"]. "From: an@email.address");

}

?>