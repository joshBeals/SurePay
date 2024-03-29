<?php

    // 'user' model
    class User{
    
        // database connection and table name
        private $conn;
        private $table_name = "users";
    
        // model properties
        public $id;
        public $fullname;
        public $email;
        public $password;
    
        // constructor
        public function __construct($db){
            $this->conn = $db;
        }
    
        // create new user record
        function create(){
        
            if(!$this->emailExists()){

                // insert query
                $query = "INSERT INTO " . $this->table_name . "
                SET
                    fullname = :fullname,
                    email = :email,
                    password = :password";

                // prepare the query
                $stmt = $this->conn->prepare($query);

                // sanitize
                $this->lastname=htmlspecialchars(strip_tags($this->fullname));
                $this->email=htmlspecialchars(strip_tags($this->email));
                $this->password=htmlspecialchars(strip_tags($this->password));

                // bind the values
                $stmt->bindParam(':fullname', $this->fullname);
                $stmt->bindParam(':email', $this->email);

                // hash the password before saving to database
                $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
                $stmt->bindParam(':password', $password_hash);

                // execute the query, also check if query was successful
                if($stmt->execute()){
                    return json_encode(array("status"=>"1", "message" => "user created successfully."));
                }

                return json_encode(array("status"=>"0", "message" => "Email already exists."));

            }

            return json_encode(array("status"=>"0", "message" => "user not created."));
        }

        // check if given email exist in the database
        function emailExists(){
        
            // query to check if email exists
            $query = "SELECT id, fullname, email, password
                    FROM " . $this->table_name . "
                    WHERE email = ?
                    LIMIT 0,1";
        
            // prepare the query
            $stmt = $this->conn->prepare( $query );
        
            // sanitize
            $this->email=htmlspecialchars(strip_tags($this->email));
        
            // bind given email value
            $stmt->bindParam(1, $this->email);
        
            // execute the query
            $stmt->execute();
        
            // get number of rows
            $num = $stmt->rowCount();
        
            // if email exists, assign values to object properties for easy access and use for php sessions
            if($num>0){       

                // get record details / values
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
                // assign values to object properties
                $this->id = $row['id'];
                $this->fullname = $row['fullname'];
                $this->password = $row['password'];

                // return true because email exists in the database
                return true;
            }
        
            // return false if email does not exist in the database
            return false;
        }

        // update a user record
        public function update(){
        
            // if password needs to be updated
            $password_set=!empty($this->password) ? ", password = :password" : "";
        
            // if no posted password, do not update the password
            $query = "UPDATE " . $this->table_name . "
                    SET
                        fullname = :fullname,
                        email = :email
                        {$password_set}
                    WHERE id = :id";
        
            // prepare the query
            $stmt = $this->conn->prepare($query);
        
            // sanitize
            $this->firstname=htmlspecialchars(strip_tags($this->fullname));
            $this->email=htmlspecialchars(strip_tags($this->email));
        
            // bind the values from the form
            $stmt->bindParam(':fullname', $this->fullname);
            $stmt->bindParam(':email', $this->email);
        
            // hash the password before saving to database
            if(!empty($this->password)){
                $this->password=htmlspecialchars(strip_tags($this->password));
                $password_hash = password_hash($this->password, PASSWORD_BCRYPT);
                $stmt->bindParam(':password', $password_hash);
            }
        
            // unique ID of record to be edited
            $stmt->bindParam(':id', $this->id);
        
            // execute the query
            if($stmt->execute()){
                return true;
            }
        
            return false;
        }

        public function usernum(){
            $query = "SELECT * FROM ".$this->table_name;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt;
        }

    }

?>