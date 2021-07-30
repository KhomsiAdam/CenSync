<?php

namespace App\Controller;

use App\Model\UploadModel;

class UploadController extends UploadModel
{
    // Upload image page for connected User
    public function postImage()
    {
        if (isset($_FILES['profile_image']) && !empty($_FILES['profile_image'])) {
            // Extract image name, size, tmp
            $img_name = $_FILES['profile_image']['name'];
            $img_size = $_FILES['profile_image']['size'];
            $tmp_name = $_FILES['profile_image']['tmp_name'];
            $error = $_FILES['profile_image']['error'];

            if ($error === 0) {
                if ($img_size > 4000000) {
                    $e = "Sorry, your file is too large!";
                    echo json_encode($e);
                } else {
                    // Get the uploaded image's file extension
                    $img_ext = strtolower(pathinfo($img_name, PATHINFO_EXTENSION));
                    // Define allowed image extensions
                    $allowed_ext = array('jpg', "jpeg", "png");
                    // Find if uploaded image extension matches the allowed ones
                    if (in_array($img_ext, $allowed_ext)) {
                        // Define the filename matching the username
                        $filename = $_SESSION['ACCOUNTS_FIRSTNAME'] . '_' . $_SESSION['ACCOUNTS_LASTNAME'];
                        // Finding any files matching the defined filename and deleting them
                        $files = glob('../app/uploads/' . $filename . '.*');
                        foreach ($files as $file) {
                            unlink($file);
                        }
                        // Define new image name and uploading it to server
                        $new_img_name = $filename . '.' . $img_ext;
                        $img_upload_path = '../app/uploads/' . $new_img_name;
                        move_uploaded_file($tmp_name, $img_upload_path);
                        // Insert file name in database
                        $this->uploadImage($new_img_name, $_SESSION['ACCOUNTS_ID']);
                        echo json_encode('Image uploaded successfully');
                    } else {
                        $e = "File type not allowed";
                        echo json_encode($e);
                    }
                }
            } else {
                $e = "Unknown error occured!";
                echo json_encode($e);
            }
        } else {
            $e = "No image found!";
            echo json_encode($e);
        }
    }

    // Delete profile picture
    public function deleteImage()
    {
        // Define the filename matching the username
        $filename = $_SESSION['ACCOUNTS_FIRSTNAME'] . '_' . $_SESSION['ACCOUNTS_LASTNAME'];
        // Finding any files matching the defined filename and deleting them
        $files = glob('../app/uploads/' . $filename . '.*');
        foreach ($files as $file) {
            unlink($file);
        }
        // Delete from database
        $this->deleteImageURL($_SESSION['ACCOUNTS_ID']);
        echo json_encode('Image Deleted');
    }

    // Delete user profile picture
    public function deleteUserImage()
    {
        // Define the filename matching the username
        $filename = $_SESSION['USER_FIRSTNAME'] . '_' . $_SESSION['USER_LASTNAME'];
        // Finding any files matching the defined filename and deleting them
        $files = glob('../app/uploads/' . $filename . '.*');
        foreach ($files as $file) {
            unlink($file);
        }
        // Delete from database
        $this->deleteImageURL($_SESSION['USER_ID']);
        echo json_encode('Image Deleted');
    }
}
