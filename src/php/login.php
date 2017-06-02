<?php

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

    public function adminLogin( $user, $password, $language )
    {
        $auth = array();
        $this->errorCode = 0;
        $this->msg = "";
        try {
            $mysqli = new mysqli($this->dbserver, $this->dbuser, $this->dbpass);
            if ($mysqli->connect_errno) {
                $this->errorCode = $mysqli->connect_errno;
                $this->msg = $mysqli->error;
                return $auth;
            }
            $query = "select auth.Users.user, auth.Users.userType, auth.Users.firstName, auth.Users.lastName,     auth.Users.email, auth.UserTypeDescription.description as userTypeDescription 
            from auth.Users 
            left join auth.UserTypeDescription on auth.UserTypeDescription.type = auth.Users.userType 
            where auth.Users.user=? 
            and auth.Users.password=? 
            and auth.UserTypeDescription.language=?";
            
            if (!($stmt = $mysqli->prepare($query))) {
                $mysqli->close();
                $this->errorCode = 999;
                $this->msg = "prepare " . $mysqli->error;
                return $auth;
            }        
          
            $stmt->bind_param('sss', $user, $password, $language);
          
            if (!$stmt->execute()) {
                $mysqli->close();
                $this->errorCode = 999;
                $this->msg = "execute " . $stmt->error;
                return $auth;
            } else {
                $stmt->bind_result($user, $userType, $firstName, $lastName, $email, $userTypeDescription);
                while ($stmt->fetch()) {
                    array_push($auth, array("user"=>$user, "userType"=>$userType, "firstName"=>$firstName, "lastName"=>$lastName, "email"=>$email, "userTypeDescription"=>$userTypeDescription));
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

    public function userLogin( $user, $password, $language )
    {
        $auth = array();
        try {
            $mysqli = new mysqli($this->dbserver, $this->dbuser, $this->dbpass);
            if ($mysqli->connect_errno) {
                $this->errorCode = $mysqli->connect_errno;
                $this->msg = $mysqli->error;
                return $auth;
            }
            $query = "select restaurant.Users.user, restaurant.Users.userType, restaurant.Users.firstName, restaurant.Users.lastName, restaurant.Users.email, restaurant.Users.isLogged, restaurant.UserTypeDescription.description as userTypeDescription 
            from restaurant.Users 
            left join restaurant.UserTypeDescription on restaurant.UserTypeDescription.type = restaurant.Users.userType 
            where restaurant.Users.user=? 
            and restaurant.Users.password=? 
            and restaurant.UserTypeDescription.language=?";
            
            if (!($stmt = $mysqli->prepare($query))) {
                $mysqli->close();
                $this->errorCode = 999;
                $this->msg = "prepare " . $mysqli->error;
                return $auth;
            }        
          
            $stmt->bind_param('sss', $user, $password, $language);
          
            if (!$stmt->execute()) {
                $mysqli->close();
                $this->errorCode = 999;
                $this->msg = "execute " . $stmt->error;
                return $auth;
            } else {
                $stmt->bind_result($user, $userType, $firstName, $lastName, $email, $isLogged, $userTypeDescription);
                while ($stmt->fetch()) {
                    array_push($auth, array("user"=>$user, "userType"=>$userType, "firstName"=>$firstName, "lastName"=>$lastName, "email"=>$email, "isLogged"=>$isLogged, "userTypeDescription"=>$userTypeDescription));
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
