<?php
namespace App\Controller;

use App\Config\Middleware;
use App\Model\UserModel;

require_once __DIR__ . '../../../composer_vendor/autoload.php';

class UserApiController extends Middleware
{

    public function __construct()
    {
        parent::__construct();
    }

    // * Add : '$this->validateToken();' as your first line in your method if it requires a token
    
    // Generate random unique ID based on role with a relevant prefix :
    // Admin
    public function generateAdminId($lenght = 13)
    {
        $bytes = random_bytes(ceil($lenght / 2));
        $admin_id = 'ADM'.substr(bin2hex($bytes), 0, $lenght);
        return $admin_id;
    }
    // Developer
    public function generateDevId($lenght = 13)
    {
        $bytes = random_bytes(ceil($lenght / 2));
        $dev_id = 'DEV'.substr(bin2hex($bytes), 0, $lenght);
        return $dev_id;
    }
    // Technician
    public function generateTechId($lenght = 13)
    {
        $bytes = random_bytes(ceil($lenght / 2));
        $tech_id = 'TCH'.substr(bin2hex($bytes), 0, $lenght);
        return $tech_id;
    }
    // Employee
    public function generateEmpId($lenght = 13)
    {
        $bytes = random_bytes(ceil($lenght / 2));
        $emp_id = 'EMP'.substr(bin2hex($bytes), 0, $lenght);
        return $emp_id;
    }

    // User register
    public function createUser() {
        $role = $this->validateParams('role', $this->param['role'], STRING);
        // By default, any account other than admin should be inactive on account creation
        switch ($role) {
            case 'Admin':
                $user_id = $this->generateAdminId();
                $status = 'active';
                break;
            case 'Developer':
                $user_id = $this->generateDevId();
                $status = 'inactive';
                break;
            case 'Technician':
                $user_id = $this->generateTechId();
                $status = 'inactive';
                break;
            case 'Employee':
                $user_id = $this->generateEmpId();
                $status = 'inactive';
                break;
            default:
                // $user_id = $this->generateEmpId();
                // $status = 'inactive';
                break;
        }
        $firstname = $this->validateParams('firstname', $this->param['firstname'], STRING);
        $lastname = $this->validateParams('lastname', $this->param['lastname'], STRING);
        $email = $this->validateParams('email', $this->param['email'], STRING);

        //* if you are hashing a password for account creation
        $password = $this->validateParams('password', $this->param['password'], STRING);
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);

        $data = new UserModel;
        $data->setUserId($user_id);
        $data->setRole($role);
        $data->setFirstname($firstname);
        $data->setLastname($lastname);
        $data->setEmail($email);

        //* setter for your hashed password
        $data->setPassword($hashed_password);

        $data->setStatus($status);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->create($_ENV['ACCOUNTS_TABLE']) != true) {
                $message = 'Failed to create User.';
            } else {
                $message = "User created successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->create($_ENV['ACCOUNTS_TABLE']);
        }
    }

    // Get all users except Admin and User currently connected
    public function readAllUsers() {
        $this->validateToken();
        $user_id = $this->validateParams('role', $this->user_id, STRING);
        $data = new UserModel;
        $data->setUserId($user_id);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->readAll($_ENV['ACCOUNTS_TABLE']) != true) {
                $message = 'Failed to fetch all Users.';
            } else {
                $message = "All Users fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readAll($_ENV['ACCOUNTS_TABLE']);            
        }
    }

    // Get all users by role except admin
    public function readAllUsersRole() {
        $this->validateToken();
        $role = $this->validateParams('role', $this->param['role'], STRING);
        $data = new UserModel;
        $data->setRole($role);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->readAllRole($_ENV['ACCOUNTS_TABLE']) != true) {
                $message = 'Failed to fetch all Users.';
            } else {
                $message = "All Users fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readAllRole($_ENV['ACCOUNTS_TABLE']);            
        }
    }

    // Get unique user for their profiles
    public function readUniqueUser() {
        $this->validateToken();
        $user_id = $this->validateParams('user_id', $this->param['user_id'], STRING);
        $data = new UserModel;
        $data->setUserId($user_id);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->readUnique($_ENV['ACCOUNTS_TABLE']) != true) {
                $message = 'Failed to fetch unique User.';
            } else {
                $message = "Unique User fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readUnique($_ENV['ACCOUNTS_TABLE']);
        }
    }

    // For user's own profile
    public function readProfileUser() {
        $this->validateToken();
        $user_id = $this->validateParams('user_id', $this->user_id, STRING);
        $data = new UserModel;
        $data->setUserId($user_id);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->readUnique($_ENV['ACCOUNTS_TABLE']) != true) {
                $message = 'Failed to fetch unique User.';
            } else {
                $message = "Unique User fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readUnique($_ENV['ACCOUNTS_TABLE']);
        }
    }

    // Get total users number
    public function readUsersNumber() {
        $data = new UserModel;
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->readNumber($_ENV['ACCOUNTS_TABLE']) != true) {
                $message = 'Failed to fetch all Users number.';
            } else {
                $message = "All Users number fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readNumber($_ENV['ACCOUNTS_TABLE']);            
        }
    }
    // Get total numbers of each role
    public function readRolesNumber() {
        $data = new UserModel;
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->readRoles($_ENV['ACCOUNTS_TABLE']) != true) {
                $message = 'Failed to fetch all Users number.';
            } else {
                $message = "All Roles number fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readRoles($_ENV['ACCOUNTS_TABLE']);            
        }
    }

    // Activate user account
    public function updateUserStatus() {
        $this->validateToken();
        $user_id = $this->validateParams('user_id', $this->param['user_id'], STRING);
        $department = $this->validateParams('department', $this->param['department'], STRING);
        $jobtitle = $this->validateParams('jobtitle', $this->param['jobtitle'], STRING);
        $status = $this->validateParams('status', 'active', STRING);
        $data = new UserModel;
        $data->setUserId($user_id);
        $data->setDepartment($department);
        $data->setJobtitle($jobtitle);
        $data->setStatus($status);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->updateStatus($_ENV['ACCOUNTS_TABLE']) != true) {
                $message = 'Failed to update User status.';
            } else {
                $message = "User status updated successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->updateStatus($_ENV['ACCOUNTS_TABLE']);
        }
    }

    // User optional informations edit
    public function updateUserInfo() {
        $this->validateToken();
        $user_id = $this->validateParams('user_id', $this->param['user_id'], STRING);
        $phone = $this->validateParams('phone', $this->param['phone'], STRING);
        $country = $this->validateParams('country', $this->param['country'], STRING);
        $city = $this->validateParams('city', $this->param['city'], STRING);
        $gender = $this->validateParams('gender', $this->param['gender'], STRING);
        $bio = $this->validateParams('bio', $this->param['bio'], STRING);
        $data = new UserModel;
        $data->setUserId($user_id);
        $data->setPhone($phone);
        $data->setCountry($country);
        $data->setCity($city);
        $data->setGender($gender);
        $data->setBio($bio);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->updateInfo($_ENV['ACCOUNTS_TABLE']) != true) {
                $message = 'Failed to update User informations.';
            } else {
                $message = "User informations updated successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->updateInfo($_ENV['ACCOUNTS_TABLE']);            
        }
    }

    // Account deletion
    public function deleteUser() {
        $this->validateToken();
        $user_id = $this->validateParams('user_id', $this->param['user_id'], STRING);
        $data = new UserModel;
        $data->setUserId($user_id);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->delete($_ENV['ACCOUNTS_TABLE']) != true) {
                $message = 'Failed to delete User.';
            } else {
                $message = "User deleted successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->delete($_ENV['ACCOUNTS_TABLE']);            
        }
    }
}