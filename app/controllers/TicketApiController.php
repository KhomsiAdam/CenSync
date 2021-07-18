<?php
namespace App\Controller;

use App\Config\Middleware;
use App\Model\TicketModel;

require_once __DIR__ . '../../../composer_vendor/autoload.php';


class TicketApiController extends Middleware
{

    public function __construct()
    {
        parent::__construct();
    }

    // * Add : '$this->validateToken();' as your first line in your method if it requires a token

    public function generateTicketId($lenght = 7)
    {
        $bytes = random_bytes(ceil($lenght / 2));
        $ticket_id = 'TKT'.substr(bin2hex($bytes), 0, $lenght);
        return $ticket_id;
    }

    public function createTicket() {
        $this->validateToken();
        $ticket_id = $this->generateTicketId();
        $user_id = $this->validateParams('user_id', $this->user_id, STRING);
        $category = $this->validateParams('category', $this->param['category'], STRING);
        $priority = $this->validateParams('priority', $this->param['priority'], STRING);
        $title = $this->validateParams('title', $this->param['title'], STRING);
        $content = $this->validateParams('content', $this->param['content'], STRING);
        $status = $this->validateParams('status', 'pending', STRING);
        $reported_by = $this->validateParams('reported_by', $this->firstname . ' ' . $this->lastname, STRING);
        $data = new TicketModel;
        $data->setTicketId($ticket_id);
        $data->setUserId($user_id);
        $data->setCategory($category);
        $data->setPriority($priority);
        $data->setTitle($title);
        $data->setContent($content);
        $data->setStatus($status);
        $data->setReported_by($reported_by);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->create($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to create Ticket.';
            } else {
                $message = "Ticket created successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->create($_ENV['AUDIENCE_TABLE']);
        }
    }

    public function readAllTickets() {
        $this->validateToken();
        $data = new TicketModel;
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->readAll($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to fetch all Tickets.';
            } else {
                $message = "All Tickets fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readAll($_ENV['AUDIENCE_TABLE']);            
        }
    }

    public function readLastTicket() {
        $this->validateToken();
        $data = new TicketModel;
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->readLast($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to fetch all Tickets.';
            } else {
                $message = "All Tickets fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readLast($_ENV['AUDIENCE_TABLE']);            
        }
    }

    public function readTicketsNumber() {
        $data = new TicketModel;
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->readNumber($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to fetch all Tickets number.';
            } else {
                $message = "All Tickets number fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readNumber($_ENV['AUDIENCE_TABLE']);            
        }
    }

    public function readTicketsResolved() {
        $data = new TicketModel;
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->readResolved($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to fetch all resolved Tickets.';
            } else {
                $message = "All resolved Tickets fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readResolved($_ENV['AUDIENCE_TABLE']);            
        }
    }

    public function readUniqueTicket() {
        $this->validateToken();
        $ticket_id = $this->validateParams('ticket_id', $this->param['ticket_id'], STRING);
        $data = new TicketModel;
        $data->setTicketId($ticket_id);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->readUnique($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to fetch unique Ticket.';
            } else {
                $message = "Unique Ticket fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readUnique($_ENV['AUDIENCE_TABLE']);
        }
    }

    public function updateTicketAssigned() {
        $this->validateToken();
        $ticket_id = $this->validateParams('ticket_id', $this->param['ticket_id'], STRING);
        $status = $this->validateParams('status', 'Open', STRING);
        $assigned_by = $this->validateParams('assigned_by', $this->param['assigned_by'], STRING);
        $assigned_to = $this->validateParams('assigned_to', $this->param['assigned_to'], STRING);
        $data = new TicketModel;
        $data->setTicketId($ticket_id);
        $data->setStatus($status);
        $data->setAssigned_by($assigned_by);
        $data->setAssigned_to($assigned_to);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->updateAssigned($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to assign Ticket.';
            } else {
                $message = "Ticket assigned successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->updateAssigned($_ENV['AUDIENCE_TABLE']);
        }

    }

    public function updateTicketResolved() {
        $this->validateToken();
        $ticket_id = $this->validateParams('ticket_id', $this->param['ticket_id'], STRING);
        $status = $this->validateParams('status', 'Resolved', STRING);
        $data = new TicketModel;
        $data->setTicketId($ticket_id);
        $data->setStatus($status);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->updateResolved($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to resolve Ticket.';
            } else {
                $message = "Ticket resolved successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->updateResolved($_ENV['AUDIENCE_TABLE']);
        }
    }

    public function deleteTicket() {
        $this->validateToken();
        $ticket_id = $this->validateParams('ticket_id', $this->param['ticket_id'], STRING);
        $data = new TicketModel;
        $data->setTicketId($ticket_id);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if($data->delete($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to delete Ticket.';
            } else {
                $message = "Ticket deleted successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->delete($_ENV['AUDIENCE_TABLE']);
        }
    }
}