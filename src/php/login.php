<?php

require_once('apiBase.php');
require_once('mysqliQuery.php');

//global $mysqliQuery = new MysqliQuery();

class Authentication extends ApiBase 
{

    static private function executeQuery( array $params, $query )
    {
//        if ( !isset($mysqliQuery)) $mysqliQuery = new MysqliQuery();
        $mysqliQuery = null;
        $mysqliQuery = new MysqliQuery();
        return $mysqliQuery->execute($params, $query);
    }  
      
    public function userLogin( $user, $password, $language )
    {
      
        $query = "select restaurant.Users.user, restaurant.Users.userType, restaurant.Users.firstName, 
                  restaurant.Users.lastName, restaurant.Users.email, restaurant.Users.isLogged, restaurant.UserTypeDescription.description as userTypeDescription 
                  from restaurant.Users 
                  left join restaurant.UserTypeDescription on restaurant.UserTypeDescription.type = restaurant.Users.userType 
                  where restaurant.Users.user=? 
                  and restaurant.Users.password=? 
                  and restaurant.UserTypeDescription.language=?";

//        return $this->executeQuery(array($user, $password, $language), $query);
        
        
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
                /*
                $stmt->bind_result($user, $userType, $firstName, $lastName, $email, $isLogged, $userTypeDescription);
                while ($stmt->fetch()) {
                    array_push($auth, array("user"=>$user, "userType"=>$userType, "firstName"=>$firstName, "lastName"=>$lastName, "email"=>$email, "isLogged"=>$isLogged, "userTypeDescription"=>$userTypeDescription));
                }
                */
                $res = $stmt->get_result();
                while($row = $res->fetch_array(MYSQLI_ASSOC)) {
                    array_push($auth, $row);
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
  
    public function adminLogin( $user, $password, $language )
    {
        $query = "select auth.Users.user, auth.Users.userType, auth.Users.firstName, auth.Users.lastName, 
                  auth.Users.email, auth.UserTypeDescription.description as userTypeDescription 
                  from auth.Users 
                  left join auth.UserTypeDescription on auth.UserTypeDescription.type = auth.Users.userType 
                  where auth.Users.user=? 
                  and auth.Users.password=? 
                  and auth.UserTypeDescription.language=?";
        
//        return $this->executeQuery(array($user, $password, $language), $query);
        
        
        $auth = array();
        $this->errorCode = 0;
        $this->msg = $php;  //"";
        try {
            $mysqli = new mysqli($this->dbserver, $this->dbuser, $this->dbpass);
            if ($mysqli->connect_errno) {
                $this->errorCode = $mysqli->connect_errno;
                $this->msg = $mysqli->error;
                return $auth;
            }
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
                $res = $stmt->get_result();
                while($row = $res->fetch_array(MYSQLI_ASSOC)) {
                    array_push($auth, $row);
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
    }
  
    public function userUpdate($id,$name,$price)
    {
    }

    public function userDelete($id)
    {
    }
}

?>
