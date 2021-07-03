<?php
namespace App\Controller;

use App\Config\Middleware;
use App\Model\NoteModel;

require_once __DIR__ . '../../../composer_vendor/autoload.php';


class NoteApiController extends Middleware
{

    public function __construct()
    {
        parent::__construct();
    }

    // * Add : '$this->validateToken();' as your first line in your method if it requires a token

    public function generateNoteId($lenght = 7)
    {
        $bytes = random_bytes(ceil($lenght / 2));
        $note_id = 'NTE'.substr(bin2hex($bytes), 0, $lenght);
        return $note_id;
    }

    public function createNote() {
        $this->validateToken();
        $note_id = $this->generateNoteId();
        $user_id = $this->validateParams('user_id', $this->param['user_id'], STRING);
        $ticket_id = $this->validateParams('ticket_id', $this->param['ticket_id'], STRING);
        $content = $this->validateParams('content', $this->param['content'], STRING);
        $data = new NoteModel;
        $data->setNoteId($note_id);
        $data->setUserId($user_id);
        $data->setTicketId($ticket_id);
        $data->setContent($content);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->create($_ENV['NOTES_TABLE']) != true) {
                $message = 'Failed to create Note.';
            } else {
                $message = "Note created successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->create($_ENV['NOTES_TABLE']);
        }
    }

    public function readAllNotes() {
        $this->validateToken();
        $data = new NoteModel;
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->readAll($_ENV['NOTES_TABLE']) != true) {
                $message = 'Failed to fetch all Notes.';
            } else {
                $message = "All Notes fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readAll($_ENV['NOTES_TABLE']);            
        }
    }

    public function readUniqueNote() {
        $this->validateToken();
        $note_id = $this->validateParams('note_id', $this->param['note_id'], STRING);
        $data = new NoteModel;
        $data->setNoteId($note_id);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->readUnique($_ENV['NOTES_TABLE']) != true) {
                $message = 'Failed to fetch unique Note.';
            } else {
                $message = "Unique Note fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readUnique($_ENV['NOTES_TABLE']);
        }
    }

    public function updateNote() {
        $this->validateToken();
        $note_id = $this->validateParams('note_id', $this->param['note_id'], STRING);
        $content = $this->validateParams('content', $this->param['content'], STRING);
        $data = new NoteModel;
        $data->setNoteId($note_id);
        $data->setContent($content);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->update($_ENV['NOTES_TABLE']) != true) {
                $message = 'Failed to update Note.';
            } else {
                $message = "Note updated successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->update($_ENV['NOTES_TABLE']);
        }
    }

    public function deleteNote() {
        $this->validateToken();
        $note_id = $this->validateParams('note_id', $this->param['note_id'], STRING);
        $data = new NoteModel;
        $data->setNoteId($note_id);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->delete($_ENV['NOTES_TABLE']) != true) {
                $message = 'Failed to delete Note.';
            } else {
                $message = "Note deleted successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->delete($_ENV['NOTES_TABLE']);
        }
    }
}