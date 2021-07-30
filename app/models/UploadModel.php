<?php

namespace App\Model;

use App\Config\Dbh;
use PDO;

class UploadModel extends Dbh
{
    // Insert profile image file path in database
    public function uploadImage($new_img_name, $user_id)
    {
        $sql = "UPDATE user SET profile_img = :new_img_name WHERE (user_id = :user_id)";
        $stmt = $this->connect()->prepare($sql);
        $stmt->bindParam(':new_img_name', $new_img_name);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
    }
    
    // Get the profile image file path from database
    public function selectProfileImage($user_id) {
        $sql = "SELECT profile_img FROM user WHERE (user_id = :user_id)";
        $stmt = $this->connect()->prepare($sql);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        $image = $stmt->fetch(PDO::FETCH_ASSOC);
        // If no file path is found return a default avatar image path
        if (!empty($image['profile_img'])) {
            return dirname(__DIR__) . '/uploads/' . $image['profile_img'];
        } else {
            return dirname(__DIR__) . '/uploads/' . 'Avatar.png';
        }
    }

    // Delete image filename from database
    public function deleteImageURL($user_id) {
        $sql = "UPDATE user SET profile_img = '' WHERE (user_id = :user_id)";
        $stmt = $this->connect()->prepare($sql);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
    }
}
