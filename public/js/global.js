// Init Ids
let ticket_selected_id;
let ticket;
let user_selected_id;

// Select all tickets rows and get id depending clicked on ticket row
function captureAllTickets() {
    let ticket_rows = document.querySelectorAll(".ticket_row");
    ticket_rows.forEach(ticket_row => {
        ticket_row.addEventListener('click', () => {
            ticket_selected_id = ticket_row.children[0].innerHTML;
            fetchTicketById('readUniqueTicket', 'http://localhost:8080/ticket', ticket_selected_id);
        })
    });
}

// Select all staff cards and get user id depending card clicked on
function captureAllStaff() {
    let staff_cards = document.querySelectorAll(".staff-card");
    staff_cards.forEach(staff_card => {
        staff_card.addEventListener('click', () => {
            user_selected_id = staff_card.children[0].innerHTML;
            fetchUserById('readUniqueUser', 'http://localhost:8080/user', user_selected_id);
        })
    });
}

// Handle null data for staff informations, render placeholders
function placeholderData(data, value, placeholder) {
    if (data == null) {
        value.style.opacity = '0.2';
        data = placeholder;
    } else {
        value.style.opacity = '1';
    }
    value.innerHTML = data;
}
// Handle empty string data for ticket informations, render placeholders
function placeholderAssignData(data, value, placeholder) {
    if (data == '') {
        value.style.opacity = '0.2';
        data = placeholder;
    } else {
        value.style.opacity = '1';
    }
    value.innerHTML = data;
}

// Check for expired token to redirect to login page
function verifyTokenExp() {
    console.log('expired token');
    localStorage.removeItem('token');
    console.log('token removed');
    location.replace('/logout');
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        // Chrome Bug Workaround: Select body tag and remove preload class to re enable animations after the page load
        let body = document.querySelector('.preload');
        body.classList.remove('preload');

        // Check if tickets body exists
        if (document.querySelector('.tbody')) {
            captureAllTickets();
        }

        // Return to the view of all tickets
        if (document.querySelector('.tickets-return')) {
            document.querySelector('.tickets-return').addEventListener('click', () => {
                if (document.querySelector('.assign-ticket')) {
                    document.querySelector('.assign-ticket').classList.remove('ticket-button-disabled');
                    document.querySelector('.assign-ticket').classList.remove('ticket-button');
                }
                document.querySelector('.tickets').style.display = 'grid';
                document.querySelector('.ticket-details').style.display = 'none';
            })
        }

        // Check if staff container exists
        if (document.querySelector('.staff-container')) {
            captureAllStaff();
        }

        // Return to the view of all staff members
        if (document.querySelector('.staff-return')) {
            document.querySelector('.staff-return').addEventListener('click', () => {
                document.querySelector('.staff-details').style.display = 'none';
                document.querySelector('.staff-container').style.display = 'grid';
                document.querySelector('.main').style.overflowY = 'overlay';
            });
        }

        // Removing the token from local storage
        if (document.getElementById('logout')) {
            document.getElementById('logout').addEventListener('click', function () {
                localStorage.removeItem('token');
                console.log('token removed');
            });
        }
    }, 400);
})