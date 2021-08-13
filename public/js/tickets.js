const ticket_body = document.querySelector('.tbody');

// Get all tickets with limited informations
const fetchTickets = async (method, endpoint, ticket_body) => {
    const data = {
        "method": method
    };
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    tickets = await response.json();
    // Check for expired token to redirect to login page
    if (tickets.error) {
        verifyTokenExp();
    } else {

        tickets.forEach(ticket => {
            // Create an ul row depending on how many rows are fetched
            let ticket_row = document.createElement('ul');
            ticket_row.setAttribute('class', 'ticket_row');
            ticket_body.appendChild(ticket_row);

            // Create an li element as a column and append it to the created ul row
            function createTicketCol(ticket_col, col_name, span) {
                ticket_col = document.createElement('li');
                ticket_col.innerHTML = ticket[col_name];

                if (ticket[col_name] === document.querySelector('.username').innerHTML) ticket_col.style.color = green;

                switch (ticket_col.innerHTML) {
                    case 'High':
                        ticket_col.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="29.154" viewBox="0 0 33.423 29.154"> <g id="High_Icon" data-name="High Icon" transform="translate(-886.461 -435.423)"> <path id="Icon_feather-triangle" data-name="Icon feather-triangle" d="M15.435,5.79,2.73,27A3,3,0,0,0,5.3,31.5H30.7A3,3,0,0,0,33.27,27L20.565,5.79a3,3,0,0,0-5.13,0Z" transform="translate(885.172 432.077)" fill="none" stroke="#2b777d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <text id="H" transform="translate(898 459)" fill="#2b777d" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">H</tspan></text> </g> </svg><span class="hidden-prio">High</span>';
                        break;
                    case 'Medium':
                        ticket_col.innerHTML = '<svg class="medium-icon" xmlns="http://www.w3.org/2000/svg" width="37.639" height="37.639" viewBox="0 0 37.639 37.639"> <g id="Medium_Icon" data-name="Medium Icon" transform="translate(-884.086 -505.103)"> <path id="Icon_awesome-square" data-name="Icon awesome-square" d="M21.981,2.25H2.638A2.638,2.638,0,0,0,0,4.888V24.231a2.638,2.638,0,0,0,2.638,2.638H21.981a2.638,2.638,0,0,0,2.638-2.638V4.888A2.638,2.638,0,0,0,21.981,2.25Z" transform="matrix(0.719, 0.695, -0.695, 0.719, 904.165, 504.899)" fill="none" stroke="#2b777d" stroke-width="2"/> <text id="M" transform="translate(896 529)" fill="#2b777d" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">M</tspan></text> </g> </svg><span class="hidden-prio">Medium</span>';
                        break;
                    case 'Low':
                        ticket_col.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="29.154" viewBox="0 0 33.423 29.154"> <g id="Low_Icon" data-name="Low Icon" transform="translate(-886.459 -585.5)"> <path id="Icon_feather-triangle" data-name="Icon feather-triangle" d="M15.435,5.79,2.73,27A3,3,0,0,0,5.3,31.5H30.7A3,3,0,0,0,33.27,27L20.565,5.79a3,3,0,0,0-5.13,0Z" transform="translate(921.172 618) rotate(180)" fill="none" stroke="#2b777d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <text id="L" transform="translate(899 602)" fill="#2b777d" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">L</tspan></text> </g> </svg><span class="hidden-prio">Low</span>';
                        break;
                }
                ticket_col.setAttribute('class', col_name);
                ticket_row.appendChild(ticket_col);

                ticket_span = document.createElement('span');
                ticket_span.setAttribute('class', 'mobile-span');
                ticket_col.prepend(ticket_span);
                ticket_span.innerHTML = span;
            }

            ticket_id = document.createElement('li');
            ticket_id.innerHTML = ticket['ticket_id'];
            ticket_id.setAttribute('class', 'ticket_id');
            ticket_row.appendChild(ticket_id);

            createTicketCol('ticket_category', 'category', 'Category');
            createTicketCol('ticket_priority', 'priority', 'Priority');
            createTicketCol('ticket_title', 'title', 'Title');
            createTicketCol('ticket_reported_by', 'reported_by', 'Employee');
            createTicketCol('ticket_created_at', 'ticket_created_at', 'Created');
            createTicketCol('ticket_status', 'status', 'Status');

            ticket_assigned_to = document.createElement('li');
            ticket_assigned_to.innerHTML = ticket['assigned_to'];
            ticket_assigned_to.setAttribute('class', 'hidden-col');
            ticket_assigned_to.setAttribute('id', ticket['assigned_to']);
            ticket_row.appendChild(ticket_assigned_to);
        });
    }
}

// Show all tickets after the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchTickets('readAllTickets', '/ticket', ticket_body);
})

// Get the last created ticket
const fetchLastTicket = async (method, endpoint, ticket_body) => {
    const data = {
        "method": method
    };
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    ticket = await response.json();
    // Check for expired token to redirect to login page
    if (ticket.error) {
        verifyTokenExp();
    } else {

        // Create an ul row depending on how many rows are fetched
        let ticket_row = document.createElement('ul');
        ticket_row.setAttribute('class', 'ticket_row');
        ticket_body.prepend(ticket_row);

        // Create an li element as a column and append it to the created ul row
        function createTicketCol(ticket_col, col_name, span) {
            ticket_col = document.createElement('li');
            ticket_col.innerHTML = ticket[col_name];
            switch (ticket_col.innerHTML) {
                case 'High':
                    ticket_col.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="29.154" viewBox="0 0 33.423 29.154"> <g id="High_Icon" data-name="High Icon" transform="translate(-886.461 -435.423)"> <path id="Icon_feather-triangle" data-name="Icon feather-triangle" d="M15.435,5.79,2.73,27A3,3,0,0,0,5.3,31.5H30.7A3,3,0,0,0,33.27,27L20.565,5.79a3,3,0,0,0-5.13,0Z" transform="translate(885.172 432.077)" fill="none" stroke="#2b777d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <text id="H" transform="translate(898 459)" fill="#2b777d" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">H</tspan></text> </g> </svg>';
                    break;
                case 'Medium':
                    ticket_col.innerHTML = '<svg class="medium-icon" xmlns="http://www.w3.org/2000/svg" width="37.639" height="37.639" viewBox="0 0 37.639 37.639"> <g id="Medium_Icon" data-name="Medium Icon" transform="translate(-884.086 -505.103)"> <path id="Icon_awesome-square" data-name="Icon awesome-square" d="M21.981,2.25H2.638A2.638,2.638,0,0,0,0,4.888V24.231a2.638,2.638,0,0,0,2.638,2.638H21.981a2.638,2.638,0,0,0,2.638-2.638V4.888A2.638,2.638,0,0,0,21.981,2.25Z" transform="matrix(0.719, 0.695, -0.695, 0.719, 904.165, 504.899)" fill="none" stroke="#2b777d" stroke-width="2"/> <text id="M" transform="translate(896 529)" fill="#2b777d" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">M</tspan></text> </g> </svg>';
                    break;
                case 'Low':
                    ticket_col.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="29.154" viewBox="0 0 33.423 29.154"> <g id="Low_Icon" data-name="Low Icon" transform="translate(-886.459 -585.5)"> <path id="Icon_feather-triangle" data-name="Icon feather-triangle" d="M15.435,5.79,2.73,27A3,3,0,0,0,5.3,31.5H30.7A3,3,0,0,0,33.27,27L20.565,5.79a3,3,0,0,0-5.13,0Z" transform="translate(921.172 618) rotate(180)" fill="none" stroke="#2b777d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <text id="L" transform="translate(899 602)" fill="#2b777d" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">L</tspan></text> </g> </svg>';
                    break;
            }
            ticket_col.setAttribute('class', col_name);
            ticket_row.appendChild(ticket_col);

            ticket_span = document.createElement('span');
            ticket_span.setAttribute('class', 'mobile-span');
            ticket_col.prepend(ticket_span);
            ticket_span.innerHTML = span;
        }

        ticket_id = document.createElement('li');
        ticket_id.innerHTML = ticket['ticket_id'];
        ticket_id.setAttribute('class', 'ticket_id');
        ticket_row.appendChild(ticket_id);

        createTicketCol('ticket_category', 'category', 'Category');
        createTicketCol('ticket_priority', 'priority', 'Priority');
        createTicketCol('ticket_title', 'title', 'Title');
        createTicketCol('ticket_reported_by', 'reported_by', 'Employee');
        createTicketCol('ticket_created_at', 'ticket_created_at', 'Created');
        createTicketCol('ticket_status', 'status', 'Status');
        captureAllTickets();
    }
}

// Get individual ticket with all it's informations
const fetchTicketById = async (method, endpoint, ticket_id) => {
    const data = {
        "method": method,
        "params": {
            "ticket_id": ticket_id
        }
    }
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    ticket = await response.json();
    // Check for expired token to redirect to login page
    if (ticket.error) {
        verifyTokenExp();
    } else {

        // Assign ticket id to the buttons if they exist
        if (assign_button) assign_button.value = ticket['ticket_id'];
        if (delete_button) delete_button.value = ticket['ticket_id'];
        if (resolve_button) {
            if (ticket['status'] !== 'Open' || ticket['assigned_to'] != username) {
                document.querySelector('.ticket-button').style.display = 'none';
                resolve_button.value = '';
            } else {
                document.querySelector('.ticket-button').style.display = 'unset';
                resolve_button.value = ticket['ticket_id'];
            }
        }
        if (note_button) note_button.value = ticket['ticket_id'];

        // Fetch users depending on ticket category by role match: software = developer & hardware = technician
        if (assign_form) {
            if (ticket['category'] === 'Hardware') {
                assign_form.innerHTML = '';
                fetchUserByRole('readAllUsersRole', '/user', 'Technician');
            } else if (ticket['category'] === 'Software') {
                assign_form.innerHTML = '';
                fetchUserByRole('readAllUsersRole', '/user', 'Developer');
            } else if (ticket['category'] === 'Service') {
                assign_form.innerHTML = '';
                fetchUserByRole('readAllUsersRole', '/user', 'Technician');
                fetchUserByRole('readAllUsersRole', '/user', 'Developer');
            }
        }

        document.querySelector('.ticket-reported-by-value').innerHTML = ticket['reported_by'];

        // Style the reported by value with green if it matches the user connected
        if (document.querySelector('.ticket-reported-by-value').innerHTML === username) {
            document.querySelector('.ticket-reported-by-value').style.color = green;
        } else {
            document.querySelector('.ticket-reported-by-value').style.color = blue;
        }

        let assigned_to = ticket['assigned_to'];
        placeholderAssignData(assigned_to, document.querySelector('.ticket-assigned-to-value'), '_________ _________');

        // Style the assigned to value with green if it matches the user connected
        if (document.querySelector('.ticket-assigned-to-value').innerHTML === username) {
            document.querySelector('.ticket-assigned-to-value').style.color = green;
        } else {
            document.querySelector('.ticket-assigned-to-value').style.color = blue;
        }

        let assigned_by = ticket['assigned_by'];
        placeholderAssignData(assigned_by, document.querySelector('.ticket-assigned-by-value'), '_________ _________');

        // Style the assigned by value with green if it matches the user connected
        if (document.querySelector('.ticket-assigned-by-value').innerHTML === username) {
            document.querySelector('.ticket-assigned-by-value').style.color = green;
        } else {
            document.querySelector('.ticket-assigned-by-value').style.color = blue;
        }

        // Handling the datetime format from database
        let ticket_assigned_at = ticket['ticket_assigned_at'];
        if (ticket_assigned_at == 'Nov 30 -0001, 00:11 AM') {
            ticket_assigned_at = '___ __ ____, __:__ __';
            document.querySelector('.ticket-assigned-value').style.opacity = '0.2';
            if (document.querySelector('.assign-ticket')) {
                document.querySelector('.assign-ticket').classList.add('ticket-button');
                document.querySelector('.assign-ticket').disabled = false;
            }
        } else if (ticket_assigned_at != 'Nov 30 -0001, 00:11 AM') {
            document.querySelector('.ticket-assigned-value').style.opacity = '1';
            if (document.querySelector('.assign-ticket')) {
                document.querySelector('.assign-ticket').classList.add('ticket-button-disabled');
                document.querySelector('.assign-ticket').disabled = true;
            }
        };

        let ticket_resolved_at = ticket['ticket_resolved_at'];
        if (ticket_resolved_at == 'Nov 30 -0001, 00:11 AM') {
            document.querySelector('.ticket-resolved-value').style.opacity = '0.2';
            ticket_resolved_at = '___ __ ____, __:__ __';
        } else {
            document.querySelector('.ticket-resolved-value').style.opacity = '1';
        }

        // Status icon depending on Status value
        document.querySelector('.status-text').innerHTML = ticket['status'];
        switch (document.querySelector('.status-text').innerHTML) {
            case 'Pending':
                document.querySelector('.status-text').parentElement.style.background = blue;
                document.querySelector('.status-text').nextElementSibling.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 33 33"> <g id="Icon_feather-clock" data-name="Icon feather-clock" transform="translate(-1.5 -1.5)"> <path id="Path_13" data-name="Path 13" d="M33,18A15,15,0,1,1,18,3,15,15,0,0,1,33,18Z" fill="none" stroke="#F9F9F9" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/> <path id="Path_14" data-name="Path 14" d="M18,9v9l6,3" fill="none" stroke="#F9F9F9" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/> </g> </svg>';
                break;
            case 'Open':
                document.querySelector('.status-text').parentElement.style.background = lightblue;
                document.querySelector('.status-text').nextElementSibling.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20.228" height="15.084" viewBox="0 0 40.5 27"> <path id="Icon_awesome-folder-open" data-name="Icon awesome-folder-open" d="M40.268,20.538l-5.092,8.73A4.5,4.5,0,0,1,31.288,31.5H3.166a1.688,1.688,0,0,1-1.458-2.538L6.8,20.233A4.5,4.5,0,0,1,10.688,18H38.81a1.687,1.687,0,0,1,1.458,2.538ZM10.688,15.75H33.75V12.375A3.375,3.375,0,0,0,30.375,9H19.125l-4.5-4.5H3.375A3.375,3.375,0,0,0,0,7.875v19.55L4.857,19.1A6.773,6.773,0,0,1,10.688,15.75Z" transform="translate(0 -4.5)" fill="#F9F9F9"/> </svg>';
                break;
            case 'Resolved':
                document.querySelector('.status-text').parentElement.style.background = green;
                document.querySelector('.status-text').nextElementSibling.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20.228" height="15.084" viewBox="0 0 20.228 15.084"> <path id="Icon_awesome-check" data-name="Icon awesome-check" d="M6.87,19.365.3,12.791a1.011,1.011,0,0,1,0-1.43l1.43-1.43a1.011,1.011,0,0,1,1.43,0l4.429,4.428,9.485-9.485a1.011,1.011,0,0,1,1.43,0l1.43,1.43a1.011,1.011,0,0,1,0,1.43L8.3,19.365A1.011,1.011,0,0,1,6.87,19.365Z" transform="translate(0 -4.577)" fill="#F9F9F9"/> </svg>';
                break;
        }

        document.querySelector('.ticket-priority-value').innerHTML = ticket['priority'];
        document.querySelector('.ticket-type-value').innerHTML = ticket['category'];

        document.querySelector('.ticket-created-value').innerHTML = ticket['ticket_created_at'];

        document.querySelector('.ticket-assigned-value').innerHTML = ticket_assigned_at;
        document.querySelector('.ticket-resolved-value').innerHTML = ticket_resolved_at;

        document.querySelector('.ticket-title').innerHTML = ticket['title'];
        document.querySelector('.ticket-content').innerHTML = ticket['content'];

        // Ticket priority icon depending on priority value
        switch (document.querySelector('.ticket-priority-value').innerHTML) {
            case 'High':
                document.querySelector('.ticket-priority-value').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="29.154" viewBox="0 0 33.423 29.154"> <g id="High_Icon" data-name="High Icon" transform="translate(-886.461 -435.423)"> <path id="Icon_feather-triangle" data-name="Icon feather-triangle" d="M15.435,5.79,2.73,27A3,3,0,0,0,5.3,31.5H30.7A3,3,0,0,0,33.27,27L20.565,5.79a3,3,0,0,0-5.13,0Z" transform="translate(885.172 432.077)" fill="#C94242" stroke="#C94242" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <text id="H" transform="translate(898 459)" fill="#F9F9F9" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">H</tspan></text> </g> </svg><span> High</span>';
                break;
            case 'Medium':
                document.querySelector('.ticket-priority-value').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="37.639" height="37.639" viewBox="0 0 37.639 37.639"> <g id="Medium_Icon" data-name="Medium Icon" transform="translate(-884.086 -505.103)"> <path id="Icon_awesome-square" data-name="Icon awesome-square" d="M21.981,2.25H2.638A2.638,2.638,0,0,0,0,4.888V24.231a2.638,2.638,0,0,0,2.638,2.638H21.981a2.638,2.638,0,0,0,2.638-2.638V4.888A2.638,2.638,0,0,0,21.981,2.25Z" transform="matrix(0.719, 0.695, -0.695, 0.719, 904.165, 504.899)" fill="#BEBE5F" stroke="#BEBE5F" stroke-width="2"/> <text id="M" transform="translate(896 529)" fill="#F9F9F9" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">M</tspan></text> </g> </svg><span> Medium</span>';
                break;
            case 'Low':
                document.querySelector('.ticket-priority-value').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="29.154" viewBox="0 0 33.423 29.154"> <g id="Low_Icon" data-name="Low Icon" transform="translate(-886.459 -585.5)"> <path id="Icon_feather-triangle" data-name="Icon feather-triangle" d="M15.435,5.79,2.73,27A3,3,0,0,0,5.3,31.5H30.7A3,3,0,0,0,33.27,27L20.565,5.79a3,3,0,0,0-5.13,0Z" transform="translate(921.172 618) rotate(180)" fill="#5FBE6E" stroke="#5FBE6E" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <text id="L" transform="translate(899 602)" fill="#F9F9F9" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">L</tspan></text> </g> </svg><span> Low</span>';
                break;
        }

        // Get note
        fetchNoteByTicketId('readUniqueNote', '/note', ticket_selected_id);

        // Render the Leave Note button if there's no note
        if (document.querySelector('.note-author')) {
            setTimeout(() => {
                if (document.querySelector('.note-author').innerHTML === '') {
                    if (document.querySelector('.leave-note')) {
                        document.querySelector('.leave-note').classList.remove('ticket-button-disabled');
                        document.querySelector('.leave-note').classList.add('ticket-button');
                        document.querySelector('.leave-note').disabled = false;
                    }
                } else {
                    if (document.querySelector('.leave-note')) {
                        document.querySelector('.leave-note').classList.remove('ticket-button');
                        document.querySelector('.leave-note').classList.add('ticket-button-disabled');
                        document.querySelector('.leave-note').disabled = true;
                    }
                }
            }, 300);
        }

        document.querySelector('.tickets').style.display = "none";
        document.querySelector('.ticket-details').style.display = "grid";
    }
}

const assign_form = document.querySelector('.assign-ticket-form');
const assign_button = document.querySelector('.assign-submit-button');

const delete_form = document.querySelector('.delete-ticket-form');
const delete_button = document.querySelector('.delete-submit-button');

const resolve_form = document.querySelector('.resolve-ticket-form');
const resolve_button = document.querySelector('.resolve-submit-button');

const note_form = document.querySelector('.note-ticket-form');
const note_button = document.querySelector('.note-submit-button');
const note_content = document.querySelector('#note');
const edit_note_form = document.querySelector('.edit-note-ticket-form');
const edit_note_button = document.querySelector('.edit-note-submit-button');
const edit_note_content = document.querySelector('#edit-note');
const delete_note_form = document.querySelector('.delete-note-ticket-form');
const delete_note_button = document.querySelector('.delete-note-submit-button');

// Ticket deletion
const deleteTicket = async (method, endpoint) => {
    const data = {
        "method": method,
        "params": {
            "ticket_id": delete_button.value
        }
    }
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    deletion = await response.json();
    // Check for expired token to redirect to login page
    if (deletion.error) {
        verifyTokenExp();
    }
}
if (delete_form) {
    delete_form.addEventListener('submit', async function (e) {
        e.preventDefault();

        deleteTicket('deleteTicket', '/ticket');
        // Remove state classes from the assign button
        if (document.querySelector('.assign-ticket')) {
            document.querySelector('.assign-ticket').classList.remove('ticket-button-disabled');
            document.querySelector('.assign-ticket').classList.remove('ticket-button');
        }
        // Back to normal view of all tickets
        document.querySelector('.tickets').style.display = 'grid';
        document.querySelector('.ticket-details').style.display = 'none';
        // Emptying the ticket body then getting the updated list
        ticket_body.innerHTML = '';
        fetchTickets('readAllTickets', '/ticket', ticket_body);
        // Close the delete ticket modal
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        })
        // Capture all tickets
        setTimeout(() => { captureAllTickets(); }, 400);
    })
}

// Get users by role for the assign ticket form
const fetchUserByRole = async (method, endpoint, role) => {
    const data = {
        "method": method,
        "params": {
            "role": role
        }
    }
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    users = await response.json();
    // Check for expired token to redirect to login page
    if (users.error) {
        verifyTokenExp();
    } else {

        console.log(users);
        users.forEach(user => {
            let label = document.createElement('label');
            label.setAttribute('for', user['role'] + ' ' + user['firstname'] + ' ' + user['lastname']);
            assign_form.prepend(label);

            let assigned_image = document.createElement('span');
            assigned_image.setAttribute('class', 'assigned-image');
            label.appendChild(assigned_image);
            assigned_image.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 34.875 34.875"> <path id="Icon_awesome-user-circle" data-name="Icon awesome-user-circle" d="M17.438.563A17.438,17.438,0,1,0,34.875,18,17.434,17.434,0,0,0,17.438.563Zm0,6.75A6.188,6.188,0,1,1,11.25,13.5,6.188,6.188,0,0,1,17.438,7.313Zm0,24.188a13.474,13.474,0,0,1-10.3-4.8,7.839,7.839,0,0,1,6.926-4.2,1.72,1.72,0,0,1,.5.077,9.309,9.309,0,0,0,2.876.485,9.274,9.274,0,0,0,2.876-.485,1.72,1.72,0,0,1,.5-.077,7.839,7.839,0,0,1,6.926,4.2A13.474,13.474,0,0,1,17.438,31.5Z" transform="translate(0 -0.563)"/> </svg>';

            let assigned_name = document.createElement('span');
            assigned_name.setAttribute('class', 'assigned-name');
            label.appendChild(assigned_name);
            assigned_name.innerHTML = user['firstname'] + ' ' + user['lastname'];

            let assigned_role = document.createElement('span');
            assigned_role.setAttribute('class', 'assigned-role');
            label.appendChild(assigned_role);
            assigned_role.innerHTML = user['role'];

            let radio = document.createElement('input');
            radio.setAttribute('class', 'custom-radio');
            radio.setAttribute('type', 'radio');
            radio.setAttribute('name', 'assigned_to');
            radio.setAttribute('id', user['role'] + ' ' + user['firstname'] + ' ' + user['lastname']);
            radio.setAttribute('value', user['firstname'] + ' ' + user['lastname']);
            label.appendChild(radio);

            let custom_radio = document.createElement('span');
            custom_radio.setAttribute('class', 'custom-radio-span')
            label.appendChild(custom_radio);
            custom_radio.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20.228 15.084"> <path id="Icon_awesome-check" data-name="Icon awesome-check" d="M6.87,19.365.3,12.791a1.011,1.011,0,0,1,0-1.43l1.43-1.43a1.011,1.011,0,0,1,1.43,0l4.429,4.428,9.485-9.485a1.011,1.011,0,0,1,1.43,0l1.43,1.43a1.011,1.011,0,0,1,0,1.43L8.3,19.365A1.011,1.011,0,0,1,6.87,19.365Z" transform="translate(0 -4.577)" fill="#F9F9F9"/> </svg>'
        });
    }
}

// Ticket assignement
const assignTicket = async (method, endpoint) => {
    const data = {
        "method": method,
        "params": {
            "ticket_id": assign_button.value,
            "assigned_to": document.querySelector('input[name="assigned_to"]:checked').value
        }
    }
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    update = await response.json();
    // Check for expired token to redirect to login page
    if (update.error) {
        verifyTokenExp();
    }
}

if (assign_button) {
    assign_button.addEventListener('click', async function (e) {
        e.preventDefault();

        if (!document.querySelector('input[name="assigned_to"]:checked')) {
            // assign_error.innerHTML = 'Please select a staff member';
            console.log('Please select a staff member');
        } else {
            assignTicket('updateTicketAssigned', '/ticket');
            assign_form.reset();
            // Get the updated ticket informations
            fetchTicketById('readUniqueTicket', '/ticket', ticket_selected_id);
            // Disable the assign button
            document.querySelector('.assign-ticket').classList.remove('ticket-button');
            // Emptying the ticket body and get the updated list
            ticket_body.innerHTML = '';
            fetchTickets('readAllTickets', '/ticket', ticket_body);
            // Close the assign ticket modal
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                closeModal(modal);
            })
            // Capture all tickets
            setTimeout(() => { captureAllTickets(); }, 400);
        }
    });
}

// Ticket resolution
const resolveTicket = async (method, endpoint) => {
    const data = {
        "method": method,
        "params": {
            "ticket_id": resolve_button.value
        }
    }
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    update = await response.json();
    // Check for expired token to redirect to login page
    if (update.error) {
        verifyTokenExp();
    }
}

if (resolve_form) {
    resolve_form.addEventListener('submit', async function (e) {
        e.preventDefault();

        resolveTicket('updateTicketResolved', '/ticket');
        // Get ticket updated informations
        fetchTicketById('readUniqueTicket', '/ticket', ticket_selected_id);
        // Emptying the ticket body and get the updated list
        ticket_body.innerHTML = '';
        fetchTickets('readAllTickets', '/ticket', ticket_body);
        // Close the resolve ticket modal
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        })
        // Capture all tickets
        setTimeout(() => { captureAllTickets(); }, 400);
    });
}

// Note creation
const leaveNote = async (method, endpoint) => {
    const data = {
        "method": method,
        "params": {
            "ticket_id": note_button.value,
            "content": note_content.value
        }
    }
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    note = await response.json();
    // Check for expired token to redirect to login page
    if (note.error) {
        verifyTokenExp();
    }
}

if (note_form) {
    note_form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (note_content.value === '') {
            // note_error.innerHTML = 'Please fill all the fields';
            console.log('Please fill all the fields');
        } else {
            leaveNote('createNote', '/note');
            // Get the updated ticket informations
            fetchTicketById('readUniqueTicket', '/ticket', ticket_selected_id);
            // Emptying the ticket body and get the updated list
            ticket_body.innerHTML = '';
            fetchTickets('readAllTickets', '/ticket', ticket_body);
            // Close the note creation modal
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                closeModal(modal);
            })
            // Capture all tickets
            setTimeout(() => { captureAllTickets(); }, 400);
        }
    });
}

// Note update
const editNote = async (method, endpoint) => {
    const data = {
        "method": method,
        "params": {
            "note_id": edit_note_button.value,
            "content": edit_note_content.value
        }
    }
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    note = await response.json();
    // Check for expired token to redirect to login page
    if (note.error) {
        verifyTokenExp();
    }
}

if (edit_note_form) {
    edit_note_form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (edit_note_content.value === '') {
            // edit_note_error.innerHTML = 'Please fill all the fields';
            console.log('Please fill all the fields');
        } else {
            editNote('updateNote', '/note');
            // Get the updated ticket informations
            fetchTicketById('readUniqueTicket', '/ticket', ticket_selected_id);
            // Emptying the ticket body and get the updated list
            ticket_body.innerHTML = '';
            fetchTickets('readAllTickets', '/ticket', ticket_body);
            // Close the note update modal
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                closeModal(modal);
            })
            // Capture all tickets
            setTimeout(() => { captureAllTickets(); }, 400);
        }
    });
}

// Note deletion
const deleteNote = async (method, endpoint) => {
    const data = {
        "method": method,
        "params": {
            "note_id": delete_note_button.value
        }
    }
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    note = await response.json();
    // Check for expired token to redirect to login page
    if (note.error) {
        verifyTokenExp();
    }
}

if (delete_note_form) {
    delete_note_form.addEventListener('submit', async function (e) {
        e.preventDefault();
        deleteNote('deleteNote', '/note');
        // Get the updated ticket informations
        fetchTicketById('readUniqueTicket', '/ticket', ticket_selected_id);
        // Emptying the ticket body and get the updated list
        ticket_body.innerHTML = '';
        fetchTickets('readAllTickets', '/ticket', ticket_body);
        // Close the note creation modal
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        })
        // Capture all tickets
        setTimeout(() => { captureAllTickets(); }, 400);
    });
}

const note_container = document.querySelector('.ticket-note-container');
const note_author = document.querySelector('.note-author');
const note_time = document.querySelector('.note-time');
const note_ticket_content = document.querySelector('.note-content');
const note_edit = document.querySelector('.note-edit')
const note_delete = document.querySelector('.note-delete')

// Transfer note content to the note edit form
if (note_edit) {
    note_edit.addEventListener('click', () => {
        edit_note_content.value = note_ticket_content.innerHTML;
    })
}

// Get note related to specific ticket
const fetchNoteByTicketId = async (method, endpoint, ticket_id) => {
    const data = {
        "method": method,
        "params": {
            "ticket_id": ticket_id,
        }
    }
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    note = await response.json();
    // Check for expired token to redirect to login page
    if (note.error) {
        verifyTokenExp();
        // if a note exists
    } else if (note['note_id']) {
        // If the note buttons exists, assign the note ID to them
        if (edit_note_button) edit_note_button.value = note['note_id'];
        if (delete_note_button) delete_note_button.value = note['note_id'];
        // Reveal the edit and delete buttons if they were hidden
        if (note_edit) note_edit.style.display = 'unset';
        if (note_delete) note_delete.style.display = 'unset';
        // Reseting the note elements
        clearNoteHTML();
        // Assign the fetched informations to note elements
        note_author.innerHTML = note['firstname'] + ' ' + note['lastname'];
        note_time.innerHTML = note['note_updated_at'];
        note_ticket_content.innerHTML = note['content'];
        // Displaying the note
        note_container.style.display = 'grid'
        setTimeout(() => { note_container.style.opacity = '1'; }, 200);
        // Assign the note id to the edit and delete buttons
        if (note_container) {
            if (note_edit) note_edit.value = note['note_id'];
            if (note_delete) note_delete.value = note['note_id'];
        }
        // If there's no note related to the ticket
    } else {
        if (note_container) {
            // Hide the container and buttons if they exist
            note_container.style.display = 'none'
            note_container.style.opacity = '0';
            if (note_edit) note_edit.style.display = 'none';
            if (note_delete) note_delete.style.display = 'none';
            // Clear the note elements
            clearNoteHTML();
        }
    }
}

/* Search and Filters handling */
let search = 3;
let search_buttons = document.querySelectorAll('.search-button');
const search_input = document.querySelector('.search');

// Define the search option: Title (default), Employee, Date
search_buttons.forEach(search_button => {
    search_button.addEventListener('click', () => {
        let active_search_button = document.querySelector('.active-search');
        active_search_button.classList.remove('active-search');
        search = search_button.value;
        console.log(search);
        search_button.classList.add('active-search');
        switch (search) {
            case '3':
                search_input.placeholder = 'Search by Title..';
                search_input.focus();
                break;
            case '4':
                search_input.placeholder = 'Search by Employee..';
                search_input.focus();
                break;
            case '5':
                search_input.placeholder = 'Search by Date..';
                search_input.focus();
                break;
        }
    })
});

// Filter to show all tickets
const show_all = document.getElementById('All');
let all_tickets = document.querySelector(".tbody").getElementsByTagName("ul");
show_all.addEventListener('click', () => {
    for (i = 0; i < all_tickets.length; i++) {
        all_tickets[i].classList.remove('hidden-row');
    }
})

// Search through all tickets depending on search option
search_input.addEventListener('keyup', () => {
    // Show all tickets
    for (i = 0; i < all_tickets.length; i++) {
        all_tickets[i].classList.remove('hidden-row');
    }
    // Remove the current active filter
    let active_filter_button = document.querySelector('.active-filter');
    active_filter_button.classList.remove('active-filter');
    show_all.classList.add('active-filter');
    // Only search if all tickets are shown
    if (show_all.classList.contains('active-filter') === true) {
        let search_value, tickets, row, col, i, txtValue;
        search_value = search_input.value.toUpperCase();
        tickets = document.querySelector(".tbody");
        row = tickets.getElementsByTagName("ul");
        // Loop through all tickets, and hide those who don't match the search
        for (i = 0; i < row.length; i++) {
            col = row[i].getElementsByTagName("li")[search];
            if (col) {
                txtValue = col.textContent || col.innerText;
                if (txtValue.toUpperCase().indexOf(search_value) > -1) {
                    row[i].classList.remove('hidden-row');
                } else {
                    row[i].classList.add('hidden-row');
                }
            }
        }
        roundCorners();
    }
})

let filter = -1;
let filter_buttons = document.querySelectorAll('.filter-button');
const filter_input = document.querySelector('.filter');

// Filter buttons for: All, Assigned (if Developer or Technician), Reported (if Employee), Category, Priority, Status
filter_buttons.forEach(filter_button => {
    
    filter_button.addEventListener('click', () => {
        // Reset the search value
        search_input.value = '';
        // Remove the current active filter
        let active_filter_button = document.querySelector('.active-filter');
        active_filter_button.classList.remove('active-filter');
        // Take the filter number from the button value and the name from it's id and make it the current active filter
        filter = filter_button.value;
        filter_input.value = filter_button.id;
        filter_button.classList.add('active-filter');
        // Define variables
        let filter_value, tickets, row, col, i, txtValue;
        filter_value = filter_input.value.toUpperCase();
        tickets = document.querySelector(".tbody");
        row = tickets.getElementsByTagName("ul");
        // Loop through all tickets, and hide those who don't match the filter
        for (i = 0; i < row.length; i++) {
            col = row[i].getElementsByTagName("li")[filter];
            if (col) {
                txtValue = col.textContent || col.innerText;
                if (txtValue.toUpperCase().indexOf(filter_value) > -1) {
                    row[i].classList.remove('hidden-row');
                } else {
                    row[i].classList.add('hidden-row');
                }
            }
        }
        roundCorners();
    })
});