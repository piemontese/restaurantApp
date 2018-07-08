<?php

class MysqliQuery extends ApiBase {

    public function execute( array $params, $query ) {
        $data = array();
        $this->errorCode = 0;
        $this->msg = "";
        try {
            $mysqli = new mysqli($this->dbserver, $this->dbuser, $this->dbpass);
            if ($mysqli->connect_errno) {
                $this->errorCode = $mysqli->connect_errno;
                $this->msg = $mysqli->error;
                return $data;
            }
            if (!($stmt = $mysqli->prepare($query))) {
                $mysqli->close();
                $this->errorCode = 999;
                $this->msg = "prepare " . $mysqli->error;
                return $data;
            }        
          
            // Bind parameters. Types: s = string, i = integer, d = double,  b = blob
            $param_type = '';
            $bindParams = array();
            $count = 0;
            foreach ($params as $param) {
                switch( gettype($param) ) {
                    case "string":
                        $param_type .= 's';
                        break;
                    case "integer":
                        $param_type .= 'i';
                        break;
                    case "double":
                        $param_type .= 'd';
                        break;
                    case "blob":
                        $param_type .= 'b';
                        break;
                }
            }
            array_push($bindParams, $param_type);
            foreach ($params as $param) {
              array_push($bindParams, $param);
            }

            $tmp = array();
            foreach($bindParams as $key => $value) $tmp[$key] = &$bindParams[$key];
            call_user_func_array(array($stmt, 'bind_param'), $tmp);
          
            if (!$stmt->execute()) {
                $mysqli->close();
                $this->errorCode = 999;
                $this->msg = "execute " . $stmt->error;
                return $data;
            } else {
                $res = $stmt->get_result();
                while($row = $res->fetch_array(MYSQLI_ASSOC)) {
                    array_push($data, $row);
                }

            }   

            $stmt->close();
            $mysqli->close();
            
            if ( count($data) == 0 ) {
                $this->errorCode = 999;
                $this->msg = "Utente o password errati";
            }
        } catch (Exception $e) {
            $this->errorCode = 999;
            $this->msg = $e->getMessage();
        }

        return $data;
    }

}

?>