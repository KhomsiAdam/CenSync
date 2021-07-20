// Init
let ticket_selected_id;
let ticket;
let user_selected_id;
let user;
/* Colors */
// Main
const green = '#5FBE6E';
const darkblue = '#2B365A';
const blue = '#2B777D';
const lightblue = '#5FBEBC';
// Sub
const yellow = '#BEBE5F';
const red = '#C94242';
const purple = '#A35FBE';
// Basic
const black = '#262626';
const white = '#F9F9F9';
const gray = '#EBEBEB';

/* Font Weights */
const thin = 100;
const extralight = 200;
const light = 300;
const regular = 400;
const medium = 500;
const semibold = 600;
const bold = 700;
const extrabold = 800;
const blackbold = 900;

// Select all tickets rows and get id depending clicked on ticket row
function captureAllTickets() {
    let ticket_rows = document.querySelectorAll(".ticket_row");
    ticket_rows.forEach(ticket_row => {
        ticket_row.addEventListener('click', () => {
            ticket_selected_id = ticket_row.children[0].innerHTML;
            fetchTicketById('readUniqueTicket', '/ticket', ticket_selected_id);
        })
    });
}

// Select all staff cards and get user id depending card clicked on
function captureAllStaff() {
    let staff_cards = document.querySelectorAll(".staff-card");
    staff_cards.forEach(staff_card => {
        staff_card.addEventListener('click', () => {
            user_selected_id = staff_card.children[0].innerHTML;
            fetchUserById('readUniqueUser', '/user', user_selected_id);
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

// Clear Note innerHTML
function clearNoteHTML() {
    note_author.innerHTML = '';
    note_time.innerHTML = '';
    note_ticket_content.innerHTML = '';
    note_edit.value = '';
    note_delete.value = '';
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
                if (document.querySelector('.leave-note')) {
                    document.querySelector('.leave-note').classList.remove('ticket-button');
                    document.querySelector('.leave-note').classList.add('ticket-button-disabled');
                    document.querySelector('.leave-note').disabled = true;    
                }
                document.querySelector('.tickets').style.display = 'grid';
                document.querySelector('.ticket-details').style.display = 'none';
                document.querySelector('.ticket-note-container').style.display = 'none'
                clearNoteHTML();
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

        // Return to previous page from profile
        if (document.querySelector('.profile-return')) {
            document.querySelector('.profile-return').addEventListener('click', () => {
                window.history.back();
            });
        }

        // Removing the token from local storage
        if (document.getElementById('logout')) {
            document.getElementById('logout').addEventListener('click', function () {
                localStorage.removeItem('token');
                console.log('token removed');
            });
        }

        if(document.querySelector('.username')) user = document.querySelector('.username').innerHTML;
    }, 400);
})