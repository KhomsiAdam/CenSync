<?php

namespace App\Model;

use App\Config\Dbh;
use PDO;

class TicketModel {
    // * Declare your parameters here: 
    private $ticket_id;
    private $user_id;
    private $category;
    private $priority;
    private $title;
    private $content;
    private $status;
    private $reported_by;
    private $assigned_by;
    private $assigned_to;

    private $db_conn;

    // * Define setters and getters for your params:
    function setTicketId($ticket_id) { $this->ticket_id = $ticket_id; }
    function getTicketId() { return $this->ticket_id; }

    function setUserId($user_id) { $this->user_id = $user_id; }
    function getUserId() { return $this->user_id; }

    function setCategory($category) { $this->category = $category; }
    function getCategory() { return $this->category; }

    function setPriority($priority) { $this->priority = $priority; }
    function getPriority() { return $this->priority; }

    function setTitle($title) { $this->title = $title; }
    function getTitle() { return $this->title; }

    function setContent($content) { $this->content = $content; }
    function getContent() { return $this->content; }

    function setStatus($status) { $this->status = $status; }
    function getStatus() { return $this->status; }

    function setReported_by($reported_by) { $this->reported_by = $reported_by; }
    function getReported_by() { return $this->reported_by; }

    function setAssigned_by($assigned_by) { $this->assigned_by = $assigned_by; }
    function getAssigned_by() { return $this->assigned_by; }

    function setAssigned_to($assigned_to) { $this->assigned_to = $assigned_to; }
    function getAssigned_to() { return $this->assigned_to; }

    // Connect to database on object creation
    public function __construct() {
        $db = new Dbh();
        $this->db_conn = $db->connect();
    }

    // * Define your methods below

    public function create($table) {
        // $sql = "SELECT * FROM $table WHERE title = :title AND content = :content AND reported_by = :reported_by";
        // $stmt = $this->db_conn->prepare($sql);
        // $stmt->bindParam(':title', $this->title);
        // $stmt->bindParam(':content', $this->content);
        // $stmt->bindParam(':reported_by', $this->reported_by);
        // $stmt->execute();

        // $appoint = $stmt->fetch(PDO::FETCH_ASSOC);

        // if (!is_array($appoint)) {

    	$sql = "INSERT INTO $table (
        ticket_id,
        user_id,
        category,
        priority,
        title,
        content,
        status,
        reported_by)
        VALUES
        (:ticket_id,
        :user_id,
        :category,
        :priority,
        :title,
        :content,
        :status,
        :reported_by)";
    	$stmt = $this->db_conn->prepare($sql);
    	$stmt->bindParam(':ticket_id', $this->ticket_id);
    	$stmt->bindParam(':user_id', $this->user_id);
    	$stmt->bindParam(':category', $this->category);
    	$stmt->bindParam(':priority', $this->priority);
    	$stmt->bindParam(':title', $this->title);
    	$stmt->bindParam(':content', $this->content);
    	$stmt->bindParam(':status', $this->status);
    	$stmt->bindParam(':reported_by', $this->reported_by);
    	if($stmt->execute()) {
    		return true;
    	} else {
    		return false;
    	}
    // } else {
    //     exit('There is already a ticket with the same title, content and author.');
    // }
    }

    public function readAll($table) {
        $sql = "SELECT ticket_id, category, priority, title, reported_by, ticket_created_at, status FROM $table";
    	$stmt = $this->db_conn->prepare($sql);
        if($stmt->execute()) {
            $tickets = $stmt->fetchAll(PDO::FETCH_ASSOC);
            for($i = 0; $i < count($tickets); $i ++) {
                $tickets[$i]['ticket_created_at'] = (date("M d Y", strtotime($tickets[$i]['ticket_created_at'])));
            }
            header ("Content-Type: application/json");
            echo json_encode($tickets,JSON_PRETTY_PRINT|JSON_NUMERIC_CHECK);
    		return true;
    	} else {
    		return false;
    	}
    }

    public function readNumber($table) {
        $sql = "SELECT * FROM $table";
        $stmt = $this->db_conn->prepare($sql);
        if ($stmt->execute()) {
            $users = $stmt->rowCount();
            echo $users;
            return true;
        } else {
            return false;
        }
    }

    public function readResolved($table) {
        $sql = "SELECT * FROM $table WHERE status = 'resolved'";
        $stmt = $this->db_conn->prepare($sql);
        if ($stmt->execute()) {
            $users = $stmt->rowCount();
            echo $users;
            return true;
        } else {
            return false;
        }
    }

    public function readUnique($table) {
        $sql = "SELECT * FROM $table WHERE (ticket_id = :ticket_id)";
    	$stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':ticket_id', $this->ticket_id);
        if($stmt->execute()) {
            $ticket = $stmt->fetch(PDO::FETCH_ASSOC);
            $ticket['ticket_created_at'] = (date("M d Y, H:m A", strtotime($ticket['ticket_created_at'])));
            $ticket['ticket_assigned_at'] = (date("M d Y, H:m A", strtotime($ticket['ticket_assigned_at'])));
            $ticket['ticket_resolved_at'] = (date("M d Y, H:m A", strtotime($ticket['ticket_resolved_at'])));
            header ("Content-Type: application/json");
            echo json_encode($ticket,JSON_PRETTY_PRINT|JSON_NUMERIC_CHECK);
    		return true;
    	} else {
    		return false;
    	}
    }

    public function updateAssigned($table) {
        $sql = "UPDATE $table SET status = :status, assigned_by = :assigned_by, assigned_to = :assigned_to, ticket_assigned_at = CURRENT_TIMESTAMP
        WHERE ticket_id = :ticket_id";
    	$stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':ticket_id', $this->ticket_id);
    	$stmt->bindParam(':status', $this->status);	
    	$stmt->bindParam(':assigned_by', $this->assigned_by);	
    	$stmt->bindParam(':assigned_to', $this->assigned_to);	
    	if($stmt->execute()) {
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public function updateResolved($table) {
        $sql = "UPDATE $table SET status = :status, ticket_resolved_at = CURRENT_TIMESTAMP
        WHERE ticket_id = :ticket_id";
    	$stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':ticket_id', $this->ticket_id);
    	$stmt->bindParam(':status', $this->status);	
    	if($stmt->execute()) {
    		return true;
    	} else {
    		return false;
    	}
    }

    public function delete($table) {
        $sql = "DELETE FROM $table WHERE ticket_id = :ticket_id";
    	$stmt = $this->db_conn->prepare($sql);
    	$stmt->bindParam(':ticket_id', $this->ticket_id);
    	if($stmt->execute()) {
    		return true;
    	} else {
    		return false;
    	}
    }
}