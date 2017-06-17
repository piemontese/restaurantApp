<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');

require_once('users.php');
require_once('login.php');

$data = file_get_contents('php://input');
$json = json_decode($data);
$method = $json->{'method'};
$language = $json->{'language'};

if(isset($method)) {

    switch($method) {
        case "userLogin":
            $user = base64_decode($json->{'data'}[0]);
            $password = base64_decode($json->{'data'}[1]);
            $password = hash("sha512", $password);
      
            $obj = new Authentication();
            $table = -1;

            $table = $obj->adminLogin($user, $password, $language);
            if ( $obj->getErrorCode() === 0 ) 
                $resp = array('table' => $table, 'errCode' => $obj->getErrorCode(), 'errMsg' => $obj->getMsg());
            else {
                $obj1 = new Authentication();
                $table2 = $obj1->userLogin($user, $password, $language);
                $resp = array('table' => $table2, 'errCode' => $obj1->getErrorCode(), 'errMsg' => $obj1->getMsg());
            }

            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST');
            echo json_encode($resp);
            break;

        case "userRegister":

            $id = $json->{'data.id'};
            $name = $json->{'data'}->{'name'};
            $price = $json->{'data'}->{'price'};

            $obj = new Authentication();
            $table = -1;
            // insert new product
            $table = $obj->userRegister($name,$price);
            $resp = array('table' => $table, 'errCode' => $obj->getErrorCode(), 'errMsg' => $obj->getMsg());

            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST');
            echo json_encode($resp);
            break;

        case "userUpdate":

            $id = $json->{'data.id'};
            $name = $json->{'data'}->{'name'};
            $price = $json->{'data'}->{'price'};

            $obj = new Authentication();
            $table = -1;
            // insert new product
            $table = $obj->userUpdate($name,$price);
            $resp = array('table' => $table, 'errCode' => $obj->getErrorCode(), 'errMsg' => $obj->getMsg());

            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST');
            echo json_encode($resp);
            break;

        case "userDelete":

            $id = $json->{'id'};

            $obj = new Authentication();
            $table = $obj->deleteUser($id);
            $resp = array('table' => $table, 'errCode' => $obj->getErrorCode(), 'errMsg' => $obj->getMsg());

            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST');
            echo json_encode($resp);
            break;

        case "getAdmins":

            $user = base64_decode($json->{'data'}[0]);
            $password = base64_decode($json->{'data'}[1]);
            $password = hash("sha512", $password);
      
            $obj = new Users();
            $table = -1;

            $table = $obj->getAdmins($user, $password, $language, $userType);
            if ( $obj->getErrorCode() === 0 ) 
                $resp = array('table' => $table, 'errCode' => $obj->getErrorCode(), 'errMsg' => $obj->getMsg());
            else {
                $obj1 = new Authentication();
                $table2 = $obj1->userLogin($user, $password, $language);
                $resp = array('table' => $table2, 'errCode' => $obj1->getErrorCode(), 'errMsg' => $obj1->getMsg());
            }

            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST');
            echo json_encode($resp);
            break;

        case "getUsers":

            $user = base64_decode($json->{'data'}[0]);
            $password = base64_decode($json->{'data'}[1]);
            $password = hash("sha512", $password);
      
            $obj = new Users();
            $table = -1;

            $table = $obj->getUsers($user, $password, $language, $userType);
            if ( $obj->getErrorCode() === 0 ) 
                $resp = array('table' => $table, 'errCode' => $obj->getErrorCode(), 'errMsg' => $obj->getMsg());
            else {
                $obj1 = new Authentication();
                $table2 = $obj1->userLogin($user, $password, $language);
                $resp = array('table' => $table2, 'errCode' => $obj1->getErrorCode(), 'errMsg' => $obj1->getMsg());
            }

            header('Content-Type: application/json');
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST');
            echo json_encode($resp);
            break;

        default:
            $ret = -999;
            $resp = array('table' => "", 'errCode' => $obj->getErrorCode(), 'errMsg' => 'invalid method');
            echo json_encode($resp);
            break;
    }
} else {
    $ret = -999;
//    $resp = array('table' => $ret, 'errMsg' => 'invalid method');
    $resp = array('table' => "", 'errCode' => $obj->getErrorCode(), 'errMsg' => 'invalid method');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: *');
    echo json_encode($resp);
//    echo 'JSON_CALLBACK([' . json_encode($resp) . '])';

}