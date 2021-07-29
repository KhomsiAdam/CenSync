<?php

namespace App\Model;

use PDO;
use App\Config\Dbh;
use App\Controller\UploadController;

class UserModel
{
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
    function setUserId($user_id)
    {
        $this->user_id = $user_id;
    }
    function getUserId()
    {
        return $this->user_id;
    }

    function setRole($role)
    {
        $this->role = $role;
    }
    function getRole()
    {
        return $this->role;
    }

    function setFirstname($firstname)
    {
        $this->firstname = $firstname;
    }
    function getFirstname()
    {
        return $this->firstname;
    }

    function setLastname($lastname)
    {
        $this->lastname = $lastname;
    }
    function getLastname()
    {
        return $this->lastname;
    }

    function setEmail($email)
    {
        $this->email = $email;
    }
    function getEmail()
    {
        return $this->email;
    }

    function setPassword($password)
    {
        $this->password = $password;
    }
    function getPassword()
    {
        return $this->password;
    }

    function setDateOfBirth($dateofbirth)
    {
        $this->dateofbirth = $dateofbirth;
    }
    function getDateOfBirth()
    {
        return $this->dateofbirth;
    }

    // Data added on account activation by Admin
    function setDepartment($department)
    {
        $this->department = $department;
    }
    function getDepartment()
    {
        return $this->department;
    }

    function setJobtitle($jobtitle)
    {
        $this->jobtitle = $jobtitle;
    }
    function getJobtitle()
    {
        return $this->jobtitle;
    }

    function setStatus($status)
    {
        $this->status = $status;
    }
    function getStatus()
    {
        return $this->status;
    }

    // Data added optionally by User on profile
    function setPhone($phone)
    {
        $this->phone = $phone;
    }
    function getPhone()
    {
        return $this->phone;
    }

    function setCountry($country)
    {
        $this->country = $country;
    }
    function getCountry()
    {
        return $this->country;
    }

    function setCity($city)
    {
        $this->city = $city;
    }
    function getCity()
    {
        return $this->city;
    }

    function setGender($gender)
    {
        $this->gender = $gender;
    }
    function getGender()
    {
        return $this->gender;
    }

    function setBio($bio)
    {
        $this->bio = $bio;
    }
    function getBio()
    {
        return $this->bio;
    }

    // Connect to database on object creation
    public function __construct()
    {
        $db = new Dbh();
        $this->db_conn = $db->connect();
    }

    // * Define your methods below

    // User creation
    public function create($table)
    {
        $sql = "INSERT INTO $table (
        user_id,
        role,
        firstname,
        lastname,
        email,
        password,
        status)
        VALUES
        (:user_id,
        :role,
        :firstname,
        :lastname,
        :email,
        :password,
        :status)";
        $stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':role', $this->role);
        $stmt->bindParam(':firstname', $this->firstname);
        $stmt->bindParam(':lastname', $this->lastname);
        $stmt->bindParam(':email', $this->email);
        $stmt->bindParam(':password', $this->password);
        $stmt->bindParam(':status', $this->status);
        if ($stmt->execute()) {
            return true;
        } else {
            return false;
        }
    }

    // View all Users
    public function readAll($table)
    {
        $sql = "SELECT user_id, role, firstname, lastname, email, dateofbirth, jobtitle, phone, country, city, status, profile_img, user_created_at FROM $table WHERE NOT (user_id = :user_id) AND NOT (role = 'admin')";
        $stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':user_id', $this->user_id);
        if ($stmt->execute()) {
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            for ($i = 0; $i < count($users); $i++) {
                // Format date for all users to a readable format
                $users[$i]['user_created_at'] = (date("M d Y, H:m A", strtotime($users[$i]['user_created_at'])));
                if (!empty($users[$i]['profile_img'])) {
                    // Replace the image name for each user with the full real path to render it in the frontend
                    $users[$i]['profile_img'] = $this->renderProfileImage(dirname(__DIR__) . '/uploads/' . $users[$i]['profile_img']);
                } else {
                    // Show a default avatar image
                    $users[$i]['profile_img'] = $this->renderProfileImage(dirname(__DIR__) . '/uploads/' . 'Avatar.png');
                }
            }
            header("Content-Type: application/json");
            echo json_encode($users, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK);
            return true;
        } else {
            return false;
        }
    }

    // View all roles
    public function readAllRole($table)
    {
        $sql = "SELECT user_id, role, firstname, lastname FROM $table WHERE role = :role";
        $stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':role', $this->role);
        if ($stmt->execute()) {
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            header("Content-Type: application/json");
            echo json_encode($users, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK);
            return true;
        } else {
            return false;
        }
    }

    // View User and render his image profile if it exists, if not render a default avatar image
    public function readUnique($table)
    {
        $sql = "SELECT user_id, role, firstname, lastname, email, dateofbirth, department, jobtitle, phone, country, city, status, gender, bio, user_created_at, profile_img FROM $table WHERE (user_id = :user_id)";
        $stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':user_id', $this->user_id);
        if ($stmt->execute()) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            unset($user['password']);

            // For deleting selected user's profile image
            $_SESSION['USER_ID'] = $user['user_id'];
            $_SESSION['USER_FIRSTNAME'] = $user['firstname'];
            $_SESSION['USER_LASTNAME'] = $user['lastname'];

            // Format the date to a better readable format
            $user['user_created_at'] = (date("M d Y, H:m A", strtotime($user['user_created_at'])));
            header("Content-Type: application/json");
            // If no file path is found return a default avatar image path
            if (!empty($user['profile_img'])) {
                // Replace the image name with the full real path to render it in the frontend
                $user['profile_img'] = $this->renderProfileImage(dirname(__DIR__) . '/uploads/' . $user['profile_img']);
                echo json_encode($user, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK);
            } else {
                // Show a default avatar image
                $user['profile_img'] = $this->renderProfileImage(dirname(__DIR__) . '/uploads/' . 'Avatar.png');
                echo json_encode($user, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK);
            }
            return true;
        } else {
            return false;
        }
    }

    // Get the profile image of user by id for the header
    public function getProfileImage($table)
    {
        $sql = "SELECT profile_img FROM $table WHERE (user_id = :user_id)";
        $stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':user_id', $this->user_id);
        if ($stmt->execute()) {
            $image = $stmt->fetch(PDO::FETCH_ASSOC);
            header("Content-Type: application/json");
            // If no file path is found return a default avatar image path
            if (!empty($image['profile_img'])) {
                // Replace the image name with the full real path to render it in the frontend
                $image['profile_img'] = $this->renderProfileImage(dirname(__DIR__) . '/uploads/' . $image['profile_img']);
                echo json_encode($image, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK);
            } else {
                // Show a default avatar image
                $image['profile_img'] = $this->renderProfileImage(dirname(__DIR__) . '/uploads/' . 'Avatar.png');
                echo json_encode($image, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK);
            }
            return true;
        } else {
            return false;
        }
    }

    // Read image into a string an encode it
    public function renderProfileImage($filename)
    {
        $content = file_get_contents($filename);
        $base64   = base64_encode($content);
        return ('data:' . ';base64,' . $base64);
    }

    // Count how many users are they besides the admin
    public function readNumber($table)
    {
        $sql = "SELECT COUNT(role) FROM $table WHERE NOT (role = 'admin')";
        $stmt = $this->db_conn->prepare($sql);
        if ($stmt->execute()) {
            $users = $stmt->fetch(PDO::FETCH_OBJ);
            $number = 'COUNT(role)';
            header("Content-Type: application/json");
            echo json_encode($users->$number, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK);
            return true;
        } else {
            return false;
        }
    }

    // Get all roles for chart JS
    public function readRoles($table)
    {
        $sql = "SELECT role FROM $table WHERE NOT (role = 'admin')";
        $stmt = $this->db_conn->prepare($sql);
        if ($stmt->execute()) {
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            header("Content-Type: application/json");
            echo json_encode($users, JSON_PRETTY_PRINT | JSON_NUMERIC_CHECK);
            return true;
        } else {
            return false;
        }
    }

    // Account activation
    public function updateStatus($table)
    {
        $sql = "UPDATE $table SET department = :department, jobtitle = :jobtitle, status = :status, user_updated_at = CURRENT_TIMESTAMP
        WHERE user_id = :user_id";
        $stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':department', $this->department);
        $stmt->bindParam(':jobtitle', $this->jobtitle);
        $stmt->bindParam(':status', $this->status);
        if ($stmt->execute()) {
            echo json_encode('user status updated');
            return true;
        } else {
            return false;
        }
    }

    // Edit optional informations of user
    public function updateInfo($table)
    {
        $sql = "UPDATE $table SET phone = :phone, country = :country, city = :city, gender = :gender, bio = :bio, user_updated_at = CURRENT_TIMESTAMP
        WHERE user_id = :user_id";
        $stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':user_id', $this->user_id);
        $stmt->bindParam(':phone', $this->phone);
        $stmt->bindParam(':country', $this->country);
        $stmt->bindParam(':city', $this->city);
        $stmt->bindParam(':gender', $this->gender);
        $stmt->bindParam(':bio', $this->bio);
        if ($stmt->execute()) {
            echo json_encode('user info updated');
            return true;
        } else {
            return false;
        }
    }

    // Delete user account
    public function delete($table)
    {
        $sql = "DELETE FROM $table WHERE user_id = :user_id";
        $stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':user_id', $this->user_id);
        if ($stmt->execute()) {
            echo json_encode('user deleted successfully');
            return true;
        } else {
            return false;
        }
    }
}
