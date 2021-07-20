const ticket_body = document.querySelector('.tbody');

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
            function createTicketCol(ticket_col, col_name) {
                ticket_col = document.createElement('li');
                ticket_col.innerHTML = ticket[col_name];
                switch (ticket_col.innerHTML) {
                    case 'High':
                        ticket_col.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="29.154" viewBox="0 0 33.423 29.154"> <g id="High_Icon" data-name="High Icon" transform="translate(-886.461 -435.423)"> <path id="Icon_feather-triangle" data-name="Icon feather-triangle" d="M15.435,5.79,2.73,27A3,3,0,0,0,5.3,31.5H30.7A3,3,0,0,0,33.27,27L20.565,5.79a3,3,0,0,0-5.13,0Z" transform="translate(885.172 432.077)" fill="none" stroke="#2b777d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <text id="H" transform="translate(898 459)" fill="#2b777d" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">H</tspan></text> </g> </svg>';
                        break;
                    case 'Medium':
                        ticket_col.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="37.639" height="37.639" viewBox="0 0 37.639 37.639"> <g id="Medium_Icon" data-name="Medium Icon" transform="translate(-884.086 -505.103)"> <path id="Icon_awesome-square" data-name="Icon awesome-square" d="M21.981,2.25H2.638A2.638,2.638,0,0,0,0,4.888V24.231a2.638,2.638,0,0,0,2.638,2.638H21.981a2.638,2.638,0,0,0,2.638-2.638V4.888A2.638,2.638,0,0,0,21.981,2.25Z" transform="matrix(0.719, 0.695, -0.695, 0.719, 904.165, 504.899)" fill="none" stroke="#2b777d" stroke-width="2"/> <text id="M" transform="translate(896 529)" fill="#2b777d" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">M</tspan></text> </g> </svg>';
                        break;
                    case 'Low':
                        ticket_col.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="29.154" viewBox="0 0 33.423 29.154"> <g id="Low_Icon" data-name="Low Icon" transform="translate(-886.459 -585.5)"> <path id="Icon_feather-triangle" data-name="Icon feather-triangle" d="M15.435,5.79,2.73,27A3,3,0,0,0,5.3,31.5H30.7A3,3,0,0,0,33.27,27L20.565,5.79a3,3,0,0,0-5.13,0Z" transform="translate(921.172 618) rotate(180)" fill="none" stroke="#2b777d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <text id="L" transform="translate(899 602)" fill="#2b777d" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">L</tspan></text> </g> </svg>';
                        break;
                }
                ticket_col.setAttribute('class', col_name);
                ticket_row.appendChild(ticket_col);
            }
            createTicketCol('ticket_id', 'ticket_id');
            createTicketCol('ticket_category', 'category');
            createTicketCol('ticket_priority', 'priority');
            createTicketCol('ticket_title', 'title');
            createTicketCol('ticket_reported_by', 'reported_by');
            createTicketCol('ticket_created_at', 'ticket_created_at');
            createTicketCol('ticket_status', 'status');
        });
    }
}

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
        function createTicketCol(ticket_col, col_name) {
            ticket_col = document.createElement('li');
            ticket_col.innerHTML = ticket[col_name];
            switch (ticket_col.innerHTML) {
                case 'High':
                    ticket_col.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="29.154" viewBox="0 0 33.423 29.154"> <g id="High_Icon" data-name="High Icon" transform="translate(-886.461 -435.423)"> <path id="Icon_feather-triangle" data-name="Icon feather-triangle" d="M15.435,5.79,2.73,27A3,3,0,0,0,5.3,31.5H30.7A3,3,0,0,0,33.27,27L20.565,5.79a3,3,0,0,0-5.13,0Z" transform="translate(885.172 432.077)" fill="none" stroke="#2b777d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <text id="H" transform="translate(898 459)" fill="#2b777d" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">H</tspan></text> </g> </svg>';
                    break;
                case 'Medium':
                    ticket_col.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="37.639" height="37.639" viewBox="0 0 37.639 37.639"> <g id="Medium_Icon" data-name="Medium Icon" transform="translate(-884.086 -505.103)"> <path id="Icon_awesome-square" data-name="Icon awesome-square" d="M21.981,2.25H2.638A2.638,2.638,0,0,0,0,4.888V24.231a2.638,2.638,0,0,0,2.638,2.638H21.981a2.638,2.638,0,0,0,2.638-2.638V4.888A2.638,2.638,0,0,0,21.981,2.25Z" transform="matrix(0.719, 0.695, -0.695, 0.719, 904.165, 504.899)" fill="none" stroke="#2b777d" stroke-width="2"/> <text id="M" transform="translate(896 529)" fill="#2b777d" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">M</tspan></text> </g> </svg>';
                    break;
                case 'Low':
                    ticket_col.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="29.154" viewBox="0 0 33.423 29.154"> <g id="Low_Icon" data-name="Low Icon" transform="translate(-886.459 -585.5)"> <path id="Icon_feather-triangle" data-name="Icon feather-triangle" d="M15.435,5.79,2.73,27A3,3,0,0,0,5.3,31.5H30.7A3,3,0,0,0,33.27,27L20.565,5.79a3,3,0,0,0-5.13,0Z" transform="translate(921.172 618) rotate(180)" fill="none" stroke="#2b777d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <text id="L" transform="translate(899 602)" fill="#2b777d" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">L</tspan></text> </g> </svg>';
                    break;
            }
            ticket_col.setAttribute('class', col_name);
            ticket_row.appendChild(ticket_col);
        }
        createTicketCol('ticket_id', 'ticket_id');
        createTicketCol('ticket_category', 'category');
        createTicketCol('ticket_priority', 'priority');
        createTicketCol('ticket_title', 'title');
        createTicketCol('ticket_reported_by', 'reported_by');
        createTicketCol('ticket_created_at', 'ticket_created_at');
        createTicketCol('ticket_status', 'status');
        captureAllTickets();
    }
}

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


        // Assign user id to the buttons
        if (assign_button) assign_button.value = ticket['ticket_id'];
        if (delete_button) delete_button.value = ticket['ticket_id'];
        if (resolve_button) {
            if (ticket['status'] !== 'Open' || ticket['assigned_to'] != user) {
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

        let assigned_to = ticket['assigned_to'];
        placeholderAssignData(assigned_to, document.querySelector('.ticket-assigned-to-value'), '_________ _________');

        if (document.querySelector('.ticket-assigned-to-value').innerHTML === user) {
            document.querySelector('.ticket-assigned-to-value').style.color = green;
        } else {
            document.querySelector('.ticket-assigned-to-value').style.color = blue;
        }

        let assigned_by = ticket['assigned_by'];
        placeholderAssignData(assigned_by, document.querySelector('.ticket-assigned-by-value'), '_________ _________');

        if (document.querySelector('.ticket-assigned-by-value').innerHTML === user) {
            document.querySelector('.ticket-assigned-by-value').style.color = green;
        } else {
            document.querySelector('.ticket-assigned-by-value').style.color = blue;
        }

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

        document.querySelector('.status-text').innerHTML = ticket['status'];

        switch (document.querySelector('.status-text').innerHTML) {
            case 'Pending':
                document.querySelector('.status-text').parentElement.style.background = blue;
                document.querySelector('.status-text').nextElementSibling.innerHTML = "🕗";
                break;
            case 'Open':
                document.querySelector('.status-text').parentElement.style.background = lightblue;
                document.querySelector('.status-text').nextElementSibling.innerHTML = "📂";
                break;
            case 'Resolved':
                document.querySelector('.status-text').parentElement.style.background = green;
                document.querySelector('.status-text').nextElementSibling.innerHTML = "✔";
                break;
        }

        document.querySelector('.ticket-priority-value').innerHTML = ticket['priority'];
        document.querySelector('.ticket-type-value').innerHTML = ticket['category'];
        document.querySelector('.ticket-reported-by-value').innerHTML = ticket['reported_by'];

        if (document.querySelector('.ticket-reported-by-value').innerHTML === user) {
            document.querySelector('.ticket-reported-by-value').style.color = green;
        } else {
            document.querySelector('.ticket-reported-by-value').style.color = blue;
        }

        document.querySelector('.ticket-created-value').innerHTML = ticket['ticket_created_at'];

        document.querySelector('.ticket-assigned-value').innerHTML = ticket_assigned_at;
        document.querySelector('.ticket-resolved-value').innerHTML = ticket_resolved_at;

        document.querySelector('.ticket-title').innerHTML = ticket['title'];
        document.querySelector('.ticket-content').innerHTML = ticket['content'];

        switch (document.querySelector('.ticket-priority-value').innerHTML) {
            case 'High':
                document.querySelector('.ticket-priority-value').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="29.154" viewBox="0 0 33.423 29.154"> <g id="High_Icon" data-name="High Icon" transform="translate(-886.461 -435.423)"> <path id="Icon_feather-triangle" data-name="Icon feather-triangle" d="M15.435,5.79,2.73,27A3,3,0,0,0,5.3,31.5H30.7A3,3,0,0,0,33.27,27L20.565,5.79a3,3,0,0,0-5.13,0Z" transform="translate(885.172 432.077)" fill="#C94242" stroke="#C94242" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <text id="H" transform="translate(898 459)" fill="#F9F9F9" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">H</tspan></text> </g> </svg><span> High</span>';
                break;
            case 'Medium':
                document.querySelector('.ticket-priority-value').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="37.639" height="37.639" viewBox="0 0 37.639 37.639"> <g id="Medium_Icon" data-name="Medium Icon" transform="translate(-884.086 -505.103)"> <path id="Icon_awesome-square" data-name="Icon awesome-square" d="M21.981,2.25H2.638A2.638,2.638,0,0,0,0,4.888V24.231a2.638,2.638,0,0,0,2.638,2.638H21.981a2.638,2.638,0,0,0,2.638-2.638V4.888A2.638,2.638,0,0,0,21.981,2.25Z" transform="matrix(0.719, 0.695, -0.695, 0.719, 904.165, 504.899)" fill="#BEBE5F" stroke="#BEBE5F" stroke-width="2"/> <text id="M" transform="translate(896 529)" fill="#F9F9F9" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">M</tspan></text> </g> </svg>';
                break;
            case 'Low':
                document.querySelector('.ticket-priority-value').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="29.154" viewBox="0 0 33.423 29.154"> <g id="Low_Icon" data-name="Low Icon" transform="translate(-886.459 -585.5)"> <path id="Icon_feather-triangle" data-name="Icon feather-triangle" d="M15.435,5.79,2.73,27A3,3,0,0,0,5.3,31.5H30.7A3,3,0,0,0,33.27,27L20.565,5.79a3,3,0,0,0-5.13,0Z" transform="translate(921.172 618) rotate(180)" fill="#5FBE6E" stroke="#5FBE6E" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <text id="L" transform="translate(899 602)" fill="#F9F9F9" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">L</tspan></text> </g> </svg>';
                break;
        }

        // Get note
        fetchNoteByTicketId('readUniqueNote', '/note', ticket_selected_id);
        
        setTimeout(() => {
            if (document.querySelector('.note-author').innerHTML === '') {
                document.querySelector('.leave-note').classList.remove('ticket-button-disabled');
                document.querySelector('.leave-note').classList.add('ticket-button');
                document.querySelector('.leave-note').disabled = false;
            } else {
                document.querySelector('.leave-note').classList.remove('ticket-button');
                document.querySelector('.leave-note').classList.add('ticket-button-disabled');
                document.querySelector('.leave-note').disabled = true;            
            }
        }, 300);

        document.querySelector('.tickets').style.display = "none";
        document.querySelector('.ticket-details').style.display = "grid";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchTickets('readAllTickets', '/ticket', ticket_body);
})

const assign_form = document.querySelector('.assign-ticket-form');
const assign_button = document.querySelector('.assign-submit-button');
const delete_form = document.querySelector('.delete-ticket-form');
const delete_button = document.querySelector('.delete-submit-button');
const resolve_form = document.querySelector('.resolve-ticket-form');
const resolve_button = document.querySelector('.resolve-submit-button');
const note_form = document.querySelector('.note-ticket-form');
const note_button = document.querySelector('.note-submit-button');
const note_content = document.querySelector('#note');

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
        if (document.querySelector('.assign-ticket')) {
            document.querySelector('.assign-ticket').classList.remove('ticket-button-disabled');
            document.querySelector('.assign-ticket').classList.remove('ticket-button');
        }
        document.querySelector('.tickets').style.display = 'grid';
        document.querySelector('.ticket-details').style.display = 'none';

        ticket_body.innerHTML = '';
        fetchTickets('readAllTickets', '/ticket', ticket_body);
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        })
        setTimeout(() => { captureAllTickets(); }, 400);
    })
}

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
            label.setAttribute('for', user['firstname'] + ' ' + user['lastname']);
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
            radio.setAttribute('id', user['firstname'] + ' ' + user['lastname']);
            radio.setAttribute('value', user['firstname'] + ' ' + user['lastname']);
            label.appendChild(radio);

            let custom_radio = document.createElement('span');
            custom_radio.setAttribute('class', 'custom-radio-span')
            label.appendChild(custom_radio);
            custom_radio.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20.228 15.084"> <path id="Icon_awesome-check" data-name="Icon awesome-check" d="M6.87,19.365.3,12.791a1.011,1.011,0,0,1,0-1.43l1.43-1.43a1.011,1.011,0,0,1,1.43,0l4.429,4.428,9.485-9.485a1.011,1.011,0,0,1,1.43,0l1.43,1.43a1.011,1.011,0,0,1,0,1.43L8.3,19.365A1.011,1.011,0,0,1,6.87,19.365Z" transform="translate(0 -4.577)" fill="#F9F9F9"/> </svg>'
        });
    }
}

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
            fetchTicketById('readUniqueTicket', '/ticket', ticket_selected_id);
            document.querySelector('.assign-ticket').classList.remove('ticket-button');
            ticket_body.innerHTML = '';
            fetchTickets('readAllTickets', '/ticket', ticket_body);
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                closeModal(modal);
            })
            setTimeout(() => { captureAllTickets(); }, 400);
        }
    });
}

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
        fetchTicketById('readUniqueTicket', '/ticket', ticket_selected_id);
        ticket_body.innerHTML = '';
        fetchTickets('readAllTickets', '/ticket', ticket_body);
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        })
        setTimeout(() => { captureAllTickets(); }, 400);
    });
}

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
            fetchTicketById('readUniqueTicket', '/ticket', ticket_selected_id);
            ticket_body.innerHTML = '';
            fetchTickets('readAllTickets', '/ticket', ticket_body);
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                closeModal(modal);
            })
            setTimeout(() => { captureAllTickets(); }, 400);
        }
    });
}

const note_container = document.querySelector('.ticket-note-container');
const note_author = document.querySelector('.note-author');
const note_time = document.querySelector('.note-time');
const note_ticket_content = document.querySelector('.note-content');
const note_edit = document.querySelector('.note-edit')
const note_delete = document.querySelector('.note-delete')

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
    } else if (note['note_id']) {

        note_edit.style.display = 'unset';
        note_delete.style.display = 'unset';
        clearNoteHTML();

        note_author.innerHTML = note['firstname'] + ' ' + note['lastname'];
        note_time.innerHTML = note['note_updated_at'];
        note_ticket_content.innerHTML = note['content'];

        note_container.style.display = 'grid'

        setTimeout(() => { note_container.style.opacity = '1'; }, 200);

        if (note_container) {
            note_edit.value = note['note_id'];
            note_delete.value = note['note_id'];
        }

    } else {
        note_container.style.display = 'none'
        note_container.style.opacity = '0';
        note_edit.style.display = 'none';
        note_delete.style.display = 'none';
        clearNoteHTML();
    }
}

// function radioCheck() {
//     let radio_buttons = document.querySelectorAll('.custom-radio');
//     for (let i = 0; i < radio_buttons.length; i++) {
//         if(radio_buttons[i].checked === true) radio_button[i].parentElement.style.color = '#5FBE6E';
//     }

    // document.querySelectorAll('.custom-radio').forEach(radio_button => {
    //     if (radio_button.checked === true) radio_button.parentElement.style.color = '#5FBE6E';
    // });
// }

// assign_form.getElementsByTagName('label').forEach(label => {
//     label.addEventListener('click', radioCheck);
// });

// let labels = assign_form.getElementsByTagName('label');
// for (let i = 0; i < labels.length; i++) {
//     labels[i].addEventListener('click', radioCheck);
// }