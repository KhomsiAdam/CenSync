<?php

namespace App\Model;

use App\Config\Dbh;
use PDO;

class NoteModel {
    // * Declare your parameters here: 
    private $note_id;
    private $ticket_id;
    private $user_id;
    private $content;

    private $db_conn;

    // * Define setters and getters for your params:
    function setNoteId($note_id) { $this->note_id = $note_id; }
    function getNoteId() { return $this->note_id; }

    function setTicketId($ticket_id) { $this->ticket_id = $ticket_id; }
    function getTicketId() { return $this->ticket_id; }

    function setUserId($user_id) { $this->user_id = $user_id; }
    function getUserId() { return $this->user_id; }

    function setContent($content) { $this->content = $content; }
    function getContent() { return $this->content; }

    // Connect to database on object creation
    public function __construct() {
        $db = new Dbh();
        $this->db_conn = $db->connect();
    }

    // * Define your methods below

    public function create($table) {
    	$sql = "INSERT INTO $table (
        note_id,
        user_id,
        ticket_id,
        content)
        VALUES
        (:note_id,
        :user_id,
        :ticket_id,
        :content)";
    	$stmt = $this->db_conn->prepare($sql);
    	$stmt->bindParam(':note_id', $this->note_id);
    	$stmt->bindParam(':user_id', $this->user_id);
    	$stmt->bindParam(':ticket_id', $this->ticket_id);
    	$stmt->bindParam(':content', $this->content);
    	if($stmt->execute()) {
    		return true;
    	} else {
    		return false;
    	}
    }

    public function readAll($table) {
        $sql = "SELECT * FROM $table";
    	$stmt = $this->db_conn->prepare($sql);
        if($stmt->execute()) {
            $notes = $stmt->fetchAll(PDO::FETCH_ASSOC);
            header ("Content-Type: application/json");
            echo json_encode($notes,JSON_PRETTY_PRINT|JSON_NUMERIC_CHECK);
    		return true;
    	} else {
    		return false;
    	}
    }

    public function readUnique($table) {
        $sql = "SELECT * FROM $table WHERE (note_id = :note_id)";
    	$stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':note_id', $this->note_id);
        if($stmt->execute()) {
            $note = $stmt->fetch(PDO::FETCH_ASSOC);
            header ("Content-Type: application/json");
            echo json_encode($note,JSON_PRETTY_PRINT|JSON_NUMERIC_CHECK);
    		return true;
    	} else {
    		return false;
    	}
    }
    
    public function update($table) {
        $sql = "UPDATE $table SET content = :content, note_updated_at = CURRENT_TIMESTAMP
        WHERE note_id = :note_id";
    	$stmt = $this->db_conn->prepare($sql);
        $stmt->bindParam(':note_id', $this->note_id);
    	$stmt->bindParam(':content', $this->content);	
    	if($stmt->execute()) {
    		return true;
    	} else {
    		return false;
    	}
    }

    public function delete($table) {
        $sql = "DELETE FROM $table WHERE note_id = :note_id";
    	$stmt = $this->db_conn->prepare($sql);
    	$stmt->bindParam(':note_id', $this->note_id);
    	if($stmt->execute()) {
    		return true;
    	} else {
    		return false;
    	}
    }
}