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

    // Generate random unique ID with a relevant prefix :
    public function generateTicketId($lenght = 7)
    {
        $bytes = random_bytes(ceil($lenght / 2));
        $ticket_id = 'TKT' . substr(bin2hex($bytes), 0, $lenght);
        return $ticket_id;
    }


    // Ticket creation
    public function createTicket()
    {
        $this->validateToken();
        $ticket_id = $this->generateTicketId();
        $user_id = $this->validateParams('user_id', $this->user_id, STRING);
        $category = $this->validateParams('category', $this->param['category'], STRING);
        $priority = $this->validateParams('priority', $this->param['priority'], STRING);
        $title = $this->validateParams('title', $this->param['title'], STRING);
        $content = $this->validateParams('content', $this->param['content'], STRING);
        $status = $this->validateParams('status', 'Pending', STRING);
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
            if ($data->create($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to create Ticket.';
            } else {
                $message = "Ticket created successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->create($_ENV['AUDIENCE_TABLE']);
        }
    }

    // Show all tickets
    public function readAllTickets()
    {
        $this->validateToken();
        $data = new TicketModel;
        if ($_ENV['DEV_MODE'] === 'ON') {
            if ($data->readAll($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to fetch all Tickets.';
            } else {
                $message = "All Tickets fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readAll($_ENV['AUDIENCE_TABLE']);
        }
    }

    // Get the last created ticket
    public function readLastTicket()
    {
        $this->validateToken();
        $data = new TicketModel;
        if ($_ENV['DEV_MODE'] === 'ON') {
            if ($data->readLast($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to fetch all Tickets.';
            } else {
                $message = "All Tickets fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readLast($_ENV['AUDIENCE_TABLE']);
        }
    }

    // Get total number of tickets
    public function readTicketsNumber()
    {
        $data = new TicketModel;
        if ($_ENV['DEV_MODE'] === 'ON') {
            if ($data->readNumber($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to fetch all Tickets number.';
            } else {
                $message = "All Tickets number fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readNumber($_ENV['AUDIENCE_TABLE']);
        }
    }
    // Get created tickets by user
    public function readTicketsNumberUser()
    {
        $user_id = $this->validateParams('user_id', $this->param['user_id'], STRING);
        $data = new TicketModel;
        $data->setUserId($user_id);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if ($data->readNumberUser($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to fetch all Tickets number by User.';
            } else {
                $message = "All Tickets number by User fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readNumberUser($_ENV['AUDIENCE_TABLE']);
        }
    }
    // Get assigned tickets to user
    public function readAssignedNumberUser()
    {
        $assigned_to = $this->validateParams('user_id', $this->param['assigned_to'], STRING);
        $data = new TicketModel;
        $data->setAssigned_to($assigned_to);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if ($data->readAssignedUser($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to fetch all Tickets Assigned to User.';
            } else {
                $message = "All Tickets Assigned to User fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readAssignedUser($_ENV['AUDIENCE_TABLE']);
        }
    }
    // Get tickets by status
    public function readStatusNumber()
    {
        $data = new TicketModel;
        if ($_ENV['DEV_MODE'] === 'ON') {
            if ($data->readStatus($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to fetch all Statuses number.';
            } else {
                $message = "All Statuses number fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readStatus($_ENV['AUDIENCE_TABLE']);
        }
    }
    // Get tickets by priority
    public function readPriorityNumber()
    {
        $data = new TicketModel;
        if ($_ENV['DEV_MODE'] === 'ON') {
            if ($data->readPriority($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to fetch all Priorities number.';
            } else {
                $message = "All Priorities number fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readPriority($_ENV['AUDIENCE_TABLE']);
        }
    }

    // Get tickets resolved
    public function readTicketsResolved()
    {
        $data = new TicketModel;
        if ($_ENV['DEV_MODE'] === 'ON') {
            if ($data->readResolved($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to fetch all resolved Tickets.';
            } else {
                $message = "All resolved Tickets fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readResolved($_ENV['AUDIENCE_TABLE']);
        }
    }

    // Get unique ticket informations
    public function readUniqueTicket()
    {
        $this->validateToken();
        $ticket_id = $this->validateParams('ticket_id', $this->param['ticket_id'], STRING);
        $data = new TicketModel;
        $data->setTicketId($ticket_id);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if ($data->readUnique($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to fetch unique Ticket.';
            } else {
                $message = "Unique Ticket fetched successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->readUnique($_ENV['AUDIENCE_TABLE']);
        }
    }

    // Assign a ticket
    public function updateTicketAssigned()
    {
        $this->validateToken();
        $ticket_id = $this->validateParams('ticket_id', $this->param['ticket_id'], STRING);
        $status = $this->validateParams('status', 'Open', STRING);
        $assigned_by = $this->validateParams('assigned_by', $this->firstname . ' ' . $this->lastname, STRING);
        $assigned_to = $this->validateParams('assigned_to', $this->param['assigned_to'], STRING);
        $data = new TicketModel;
        $data->setTicketId($ticket_id);
        $data->setStatus($status);
        $data->setAssigned_by($assigned_by);
        $data->setAssigned_to($assigned_to);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if ($data->updateAssigned($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to assign Ticket.';
            } else {
                $message = "Ticket assigned successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->updateAssigned($_ENV['AUDIENCE_TABLE']);
        }
    }

    // Resolve a ticket
    public function updateTicketResolved()
    {
        $this->validateToken();
        $ticket_id = $this->validateParams('ticket_id', $this->param['ticket_id'], STRING);
        $status = $this->validateParams('status', 'Resolved', STRING);
        $data = new TicketModel;
        $data->setTicketId($ticket_id);
        $data->setStatus($status);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if ($data->updateResolved($_ENV['AUDIENCE_TABLE']) != true) {
                $message = 'Failed to resolve Ticket.';
            } else {
                $message = "Ticket resolved successfully.";
            }
            $this->returnResponse(RESPONSE_MESSAGE, $message);
        } else {
            $data->updateResolved($_ENV['AUDIENCE_TABLE']);
        }
    }

    // Delete a ticket
    public function deleteTicket()
    {
        $this->validateToken();
        $ticket_id = $this->validateParams('ticket_id', $this->param['ticket_id'], STRING);
        $data = new TicketModel;
        $data->setTicketId($ticket_id);
        if ($_ENV['DEV_MODE'] === 'ON') {
            if ($data->delete($_ENV['AUDIENCE_TABLE']) != true) {
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