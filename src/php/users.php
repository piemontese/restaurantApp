<?php

require_once('apiBase.php');

class Users extends ApiBase {
    
    public function getAdmins( $user, $password, $language, $userType )
    {
        switch($userTypeDescription) {
            case 'GLOBAL_ADMIN':
                break;
            case 'LOCAL_ADMIN':
                break;
            default:
                break;
        }
        $query = "select Users.* 
                  from restaurant.Users 
                  inner join auth.Users 
                  on auth.Users.user=? and 
                  auth.Users.password=? and 
                  auth.Users.userType=?";
    }
    
    public function getUsers( $user, $password, $language, $userType )
    {
        if( $userType === '' ) {
        }
        else {
        }
    }
    
}
  
?>