<?php

require_once('mysqliQuery.php');

class ApiBase {
    protected $dbserver = "localhost";
    protected $dbuser = "root";
    protected $dbpass = "root";
//    private $dbdatabase = "restaurant";
//    private $authDatabase = "auth";
    protected $errorCode = 0;
    protected $msg = "";

    public function getErrorCode()
    {
        return $this->errorCode;
    }

    public function getMsg()
    {
        return $this->msg;
    }
}

?>