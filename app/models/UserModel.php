<?php

namespace App\Model;

use App\Config\Dbh;
use PDO;

class UserModel {
    // * Declare your parameters here: 
    private $user_id;
    private $role;
    private $firstname;
    private $lastname;
    private $email;
    private $password;
    private $dateofbirth;
    // Data added on account activation by Admin
    private $department;
    private $jobtitle;
    private $status;
    // Data added optionally by User on profile
    private $phone;
    private $country;
    private $city;
    private $gender;
    private $bio;

    private $db_conn;

    // * Define setters and getters for your params:
    function setUserId($user_id) { $this->user_id = $user_id; }
    function getUserId() { return $this->user_id; }

    function setRole($role) { $this->role = $role; }
    function getRole() { return $this->role; }

    function setFirstname($firstname) { $this->firstname = $firstname; }
    function getFirstname() { return $this->firstname; }

    function setLastname($lastname) { $this->lastname = $lastname; }
    function getLastname() { return $this->lastname; }

    function setEmail($email) { $this->email = $email; }
    function getEmail() { return $this->email; }

    function setPassword($password) { $this->password = $password; }
    function getPassword() { return $this->password; }

    function setDateOfBirth($dateofbirth) { $this->dateofbirth = $dateofbirth; }
    function getDateOfBirth() { return $this->dateofbirth; }

    // Data added on account activation by Admin
    function setDepartment($department) { $this->department = $department; }
    function getDepartment() { return $this->department; }

    function setJobtitle($jobtitle) { $this->jobtitle = $jobtitle; }
    function getJobtitle() { return $this->jobtitle; }

    function setStatus($status) { $this->status = $status; }
    function getStatus() { return $this->status; }
    
    // Data added optionally by User on profile
    function setPhone($phone) { $this->phone = $phone; }
    function getPhone() { return $this->phone; }

    function setCountry($country) { $this->country = $country; }
    function getCountry() { return $this->country; }

    function setCity($city) { $this->city = $city; }
    function getCity() { return $this->city; }

    function setGender($gender) { $this->gender = $gender; }
    function getGender() { return $this->gender; }

    function setBio($bio) { $this->bio = $bio; }
    function getBio() { return $this->bio; }

    // Connect to database on object creation
    public function __construct() {
        $db = new Dbh();
        $this->db_conn = $db->connect();
    }

    // * Define your methods below

    public function create($table) {
    	$sql = "INSERT INTO $table (
        user_id,
        role,
        firstname,
        lastname,
        email,
        password,
        dateofbirth,
        status)
        VALUES
        (:user_id,
        :role,
        :firstname,
        :lastname,
        :email,
        :password,
        :dateofbirth,
        :status)";
    	$stmt = $this->db_conn->prepare($sql);
    	$stmt->bindParam(':user_id', $this->user_id);
    	$stmt->bindParam(':role', $this->role);
    	$stmt->bindParam(':firstname', $this->firstname);
    	$stmt->bindParam(':lastname', $this->lastname);
    	$stmt->bindParam(':email', $this->email);
    	$stmt->bindParam(':password', $this->password);
    	$stmt->bindParam(':dateofbirth', $this->dateofbirth);
    	$stmt->bindParam(':status', $this->status);
    	if($stmt->execute()) {
    		return true;
    	} else {
    		return false;
    	}
    }

    public function readAll($table) {
        $sql = "SELECT role, firstname, lastname, email, dateofbirth, jobtitle, phone, country, city, user_created_at FROM $table WHERE NOT (role = 'admin')";
    	$stmt = $this->db_conn->prepare($sql);
        if($stmt->execute()) {
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            header ("Content-Type: application/json");
            echo json_encode($users,JSON_PRETTY_PRINT|JSON_NUMERIC_CHECK);    
    		return true;
    	} else {
    		return false;
    	}
    }

    public function readUnique($table) {
        $sql = "SELECT role, firstname, lastname, email, dateofbirth, department, jobtitle, phone, country, city, gender, bio, user_created_at FROM $table WHERE (user_id = :user_id)";
    	$stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':user_id', $this->user_id);
        if($stmt->execute()) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            unset($user['password']);
            header ("Content-Type: application/json");
            echo json_encode($user,JSON_PRETTY_PRINT|JSON_NUMERIC_CHECK);    
    		return true;
    	} else {
    		return false;
    	}
    }

    public function updateStatus($table) {
        $sql = "UPDATE $table SET department = :department, jobtitle = :jobtitle, status = :status, user_updated_at = CURRENT_TIMESTAMP
        WHERE user_id = :user_id";
    	$stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':user_id', $this->user_id);
    	$stmt->bindParam(':department', $this->department);	
    	$stmt->bindParam(':jobtitle', $this->jobtitle);	
    	$stmt->bindParam(':status', $this->status);	
    	if($stmt->execute()) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public function updateInfo($table) {
        $sql = "UPDATE $table SET phone = :phone, country = :country, city = :city, gender = :gender, bio = :bio, user_updated_at = CURRENT_TIMESTAMP
        WHERE user_id = :user_id";
    	$stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':user_id', $this->user_id);
    	$stmt->bindParam(':phone', $this->phone);	
    	$stmt->bindParam(':country', $this->country);	
    	$stmt->bindParam(':city', $this->city);	
    	$stmt->bindParam(':gender', $this->gender);	
    	$stmt->bindParam(':bio', $this->bio);	
    	if($stmt->execute()) {
    		return true;
    	} else {
    		return false;
    	}
    }

    public function delete($table) {
        $sql = "DELETE FROM $table WHERE user_id = :user_id";
    	$stmt = $this->db_conn->prepare($sql);
    	$stmt->bindParam(':user_id', $this->user_id);
    	if($stmt->execute()) {
    		return true;
    	} else {
    		return false;
    	}
    }
}