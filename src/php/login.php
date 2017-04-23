<?php
/*
    header('Content-Type: application/json');
    $user = $_POST["user"] || $_GET["user"]; 
    $password = $_POST["password"] || $_GET["password"]; 

        // set up the connection variables
    $dbName  = 'ecommerce';
    $dbHost = '127.0.0.1';
    $dbUser = "root";
    $dbPassword = "root";
//$user = "vendor";
//$password ="vendor";
//echo $user;
//echo $password;

        // connect to the database
    $dbh = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUser, $dbPassword);

        // a query get all the records from the users table
    $sql = "SELECT user, user_type, email FROM ecom_users WHERE user='$user' AND password='$password'";

        // use prepared statements, even if not strictly required is good practice
    $stmt = $dbh->prepare( $sql );

        // execute the query
    $stmt->execute();

        // fetch the results into an array
    $result = $stmt->fetchAll( PDO::FETCH_ASSOC );

        // convert to json
    $json = json_encode( $result );

        // echo the json string
    echo $json;
*/

class Authentication {
    private $dbserver = "localhost";
    private $dbuser = "root";
    private $dbpass = "root";
    private $dbdatabase = "restaurant";
    private $authDatabase = "auth";
    private $errorCode = 0;
    private $msg = "";

    public function getErrorCode()
    {
        return $this->errorCode;
    }

    public function getMsg()
    {
        return $this->msg;
    }

    public function userLogin($user, $password)
    {
        $auth = array();
        try {
            $mysqli = new mysqli($this->dbserver, $this->dbuser, $this->dbpass, $this->authDatabase);
            if ($mysqli->connect_errno) {
                $this->errorCode = $mysqli->connect_errno;
                $this->msg = $mysqli->error;
                return $auth;
            }
            $query = "select user,userType,firstName,lastName,email from Users where user=? and password=?";
//            $query = "select user,user_type,email from ecom_users where user=? and user_type=? and password=?";
            
            if (!($stmt = $mysqli->prepare($query))) {
                $mysqli->close();
                $this->errorCode = 999;
                $this->msg = "prepare " . $mysqli->error;
                return $auth;
            }           
            //$values = array($user, $userType, $password);
            //call_user_func_array(array($stmt,'bind_param'), $values);
            $stmt->bind_param('ss', $user, $password);
          
            if (!$stmt->execute()) {
                $mysqli->close();
                $this->errorCode = 999;
                $this->msg = "execute " . $stmt->error;
                return $auth;
            } else {
                $stmt->bind_result($user,$user_type,$firstName,$lastName,$email);
                while ($stmt->fetch()) {
//                    $price_string = number_format((float)$price, 2, '.', '');
                    array_push($auth, array("user"=>$user, "userType"=>$user_type, "firstName"=>$firstName, "lastName"=>$lastName, "email"=>$email));
                }

            }   

            $stmt->close();
            $mysqli->close();
            
            if (count($auth) == 0 ) {
                $this->errorCode = 999;
                $this->msg = "Utente o password errati";
            }
        } catch (Exception $e) {
            $this->errorCode = 999;
            $this->msg = $e->getMessage();
        }

        return $auth;
    }
    public function userRegister($name,$price)
    {
        $userRegister = -1;
        try {
            $mysqli = new mysqli($this->dbserver, $this->dbuser, $this->dbpass, $this->dbdatabase);
            if ($mysqli->connect_errno) {
                $this->errorCode = $mysqli->connect_errno;
                $this->msg = $mysqli->error;
                return $userRegister;
            }
            $query = "insert into product(name,price,created) values(?,?,now())";
            if (!($stmt = $mysqli->prepare($query))) {
                $mysqli->close();
                $this->msg = $mysqli->error;
                return $userRegister;
            }
            $newprice = floatval($price);
            $stmt->bind_param('sd', $name,$newprice);
            if (!$stmt->execute()) {
                $mysqli->close();
                $this->errorCode = 999;
                $this->msg = $stmt->error;
                return $userRegister;
            }
            $userRegister = 1;
            $this->msg = "";
            $stmt->close();
            $mysqli->close();

        } catch (Exception $e) {
            $this->errorCode = 999;
            $this->msg = $e->getMessage();
        }

        return $userRegister;
    }
    public function userUpdate($id,$name,$price)
    {
        $userUpdate = -1;
        try {
            $mysqli = new mysqli($this->dbserver, $this->dbuser, $this->dbpass, $this->dbdatabase);
            if ($mysqli->connect_errno) {
                $this->errorCode = $mysqli->connect_errno;
                $this->msg = $mysqli->error;
                return $userUpdate;
            }
            $query = "update product set name=?,price=? where idproduct=?";
            if (!($stmt = $mysqli->prepare($query))) {
                $mysqli->close();
                $this->errorCode = 999;
                $this->msg = $mysqli->error;
                return $userUpdate;
            }
            $newprice = floatval($price);
            $stmt->bind_param('sdd', $name,$newprice,$id);
            if (!$stmt->execute()) {
                $mysqli->close();
                $this->errorCode = 999;
                $this->msg = $stmt->error;
                return $userUpdate;
            }
            $userUpdate = 1;
            $this->msg = "";
            $stmt->close();
            $mysqli->close();

        } catch (Exception $e) {
            $this->errorCode = 999;
            $this->msg = $e->getMessage();
        }

        return $userUpdate;
    }
    public function userDelete($id)
    {
        $userDelete = -1;
        try {
            $mysqli = new mysqli($this->dbserver, $this->dbuser, $this->dbpass, $this->dbdatabase);
            if ($mysqli->connect_errno) {
                $this->errorCode = $mysqli->connect_errno;
                $this->msg = $mysqli->error;
                return $userDelete;
            }
            $query = "delete from product where idproduct=?";
            if (!($stmt = $mysqli->prepare($query))) {
                $mysqli->close();
                $this->errorCode = 999;
                $this->msg = $mysqli->error;
                return $userDelete;
            }
            $stmt->bind_param('d', $id);
            if (!$stmt->execute()) {
                $mysqli->close();
                $this->errorCode = 999;
                $this->msg = $stmt->error;
                return $product;
            }
            $userDelete = 1;
            $this->msg = "";
            $stmt->close();
            $mysqli->close();

        } catch (Exception $e) {
            $this->errorCode = 999;
            $this->msg = $e->getMessage();
        }

        return $userDelete;
    }
}

?>
