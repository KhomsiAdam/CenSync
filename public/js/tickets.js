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
            //TODO: uncomment for token use
            // 'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    tickets = await response.json();

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
            //TODO: uncomment for token use
            // 'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    ticket = await response.json();

    let assigned_to = ticket['assigned_to'];
    if (assigned_to == '') assigned_to = "-----------------------";

    let assigned_by = ticket['assigned_by'];
    if (assigned_by == '') assigned_by = "-----------------------";

    let ticket_assigned_at = ticket['ticket_assigned_at'];
    if (ticket_assigned_at == 'Nov 30 -0001, 00:11 AM') {
        ticket_assigned_at = "-----------------------";
        if (document.querySelector('.assign-ticket')) {
            document.querySelector('.assign-ticket').classList.add('ticket-button');
            document.querySelector('.assign-ticket').disabled = false;
        }
    } else if (ticket_assigned_at != 'Nov 30 -0001, 00:11 AM') {
        if (document.querySelector('.assign-ticket')) {
            document.querySelector('.assign-ticket').classList.add('ticket-button-disabled');
            document.querySelector('.assign-ticket').disabled = true;
        }
    };

    let ticket_resolved_at = ticket['ticket_resolved_at'];
    if (ticket_resolved_at == 'Nov 30 -0001, 00:11 AM') ticket_resolved_at = "-----------------------";

    document.querySelector('.status-text').innerHTML = ticket['status'];

    switch (document.querySelector('.status-text').innerHTML) {
        case 'Pending':
            document.querySelector('.status-text').parentElement.style.background = "#A35FBE";
            document.querySelector('.status-text').nextElementSibling.innerHTML = "🕗";
            break;
        case 'Open':
            document.querySelector('.status-text').parentElement.style.background = "#5FBEBC";
            document.querySelector('.status-text').nextElementSibling.innerHTML = "📂";
            break;
        case 'Resolved':
            document.querySelector('.status-text').parentElement.style.background = "#5FBE6E";
            document.querySelector('.status-text').nextElementSibling.innerHTML = "✔";
            break;
    }

    document.querySelector('.ticket-priority-value').innerHTML = ticket['priority'];
    document.querySelector('.ticket-type-value').innerHTML = ticket['category'];
    document.querySelector('.ticket-reported-by-value').innerHTML = ticket['reported_by'];
    document.querySelector('.ticket-created-value').innerHTML = ticket['ticket_created_at'];

    document.querySelector('.ticket-assigned-to-value').innerHTML = assigned_to;
    document.querySelector('.ticket-assigned-by-value').innerHTML = assigned_by;
    document.querySelector('.ticket-assigned-value').innerHTML = ticket_assigned_at;
    document.querySelector('.ticket-resolved-value').innerHTML = ticket_resolved_at;

    document.querySelector('.ticket-title').innerHTML = ticket['title'];
    document.querySelector('.ticket-content').innerHTML = ticket['content'];

    switch (document.querySelector('.ticket-priority-value').innerHTML) {
        case 'High':
            document.querySelector('.ticket-priority-value').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="29.154" viewBox="0 0 33.423 29.154"> <g id="High_Icon" data-name="High Icon" transform="translate(-886.461 -435.423)"> <path id="Icon_feather-triangle" data-name="Icon feather-triangle" d="M15.435,5.79,2.73,27A3,3,0,0,0,5.3,31.5H30.7A3,3,0,0,0,33.27,27L20.565,5.79a3,3,0,0,0-5.13,0Z" transform="translate(885.172 432.077)" fill="#C94242" stroke="#C94242" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <text id="H" transform="translate(898 459)" fill="#F9F9F9" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">H</tspan></text> </g> </svg><span> High</span>';
            break;
        case 'Medium':
            document.querySelector('.ticket-priority-value').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="37.639" height="37.639" viewBox="0 0 37.639 37.639"> <g id="Medium_Icon" data-name="Medium Icon" transform="translate(-884.086 -505.103)"> <path id="Icon_awesome-square" data-name="Icon awesome-square" d="M21.981,2.25H2.638A2.638,2.638,0,0,0,0,4.888V24.231a2.638,2.638,0,0,0,2.638,2.638H21.981a2.638,2.638,0,0,0,2.638-2.638V4.888A2.638,2.638,0,0,0,21.981,2.25Z" transform="matrix(0.719, 0.695, -0.695, 0.719, 904.165, 504.899)" fill="BEBE5F" stroke="#BEBE5F" stroke-width="2"/> <text id="M" transform="translate(896 529)" fill="#F9F9F9" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">M</tspan></text> </g> </svg>';
            break;
        case 'Low':
            document.querySelector('.ticket-priority-value').innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="29.154" viewBox="0 0 33.423 29.154"> <g id="Low_Icon" data-name="Low Icon" transform="translate(-886.459 -585.5)"> <path id="Icon_feather-triangle" data-name="Icon feather-triangle" d="M15.435,5.79,2.73,27A3,3,0,0,0,5.3,31.5H30.7A3,3,0,0,0,33.27,27L20.565,5.79a3,3,0,0,0-5.13,0Z" transform="translate(921.172 618) rotate(180)" fill="5FBE6E" stroke="#5FBE6E" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <text id="L" transform="translate(899 602)" fill="#F9F9F9" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">L</tspan></text> </g> </svg>';
            break;
    }

    document.querySelector('.tickets').style.display = "none";
    document.querySelector('.ticket-details').style.display = "grid";
}

document.addEventListener('DOMContentLoaded', () => {
    fetchTickets('readAllTickets', 'http://localhost:8080/ticket', ticket_body);
})