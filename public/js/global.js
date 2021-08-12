// Init
let ticket_selected_id;
let ticket;
let user_selected_id;
let username;
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

/* Global functions */

// Select all tickets rows and get id depending clicked on ticket row
function captureAllTickets() {
    let ticket_rows = document.querySelectorAll(".ticket_row");
    ticket_rows.forEach(ticket_row => {
        ticket_row.addEventListener('click', () => {
            ticket_selected_id = ticket_row.children[0].innerHTML;
            fetchTicketById('readUniqueTicket', '/ticket', ticket_selected_id);
            if (window.innerWidth <= 768) document.querySelector('.main').scroll(0, 0);
        })
    });
}

// Round the top corners of the first ticket and the bottom of the last
function roundCorners() {
    // Array to store all the tickets that are not hidden
    let tickets_shown = [];
    let ticket_rows = document.querySelectorAll(".ticket_row");
    ticket_rows.forEach(ticket_row => {
        if (ticket_row.classList.contains('hidden-row') === false) tickets_shown.push(ticket_row);
    })
    console.log(tickets_shown);
    if (tickets_shown.length > 1) {
        tickets_shown[0].style.borderRadius = '10px 10px 0px 0px';
        tickets_shown[tickets_shown.length - 1].style.borderRadius = '0px 0px 10px 10px';
        tickets_shown = [];
    } else if (tickets_shown.length === 1) {
        tickets_shown[0].style.borderRadius = '10px';
        tickets_shown = [];
    } else if (tickets_shown.length === 0) {
        tickets_shown = [];
    }
}

// Select all staff cards and get user id depending card clicked on
function captureAllStaff() {
    let staff_cards = document.querySelectorAll(".staff-card");
    staff_cards.forEach(staff_card => {
        staff_card.addEventListener('click', () => {
            user_selected_id = staff_card.children[0].innerHTML;
            fetchUserById('readUniqueUser', '/user', user_selected_id);
            if (window.innerWidth <= 768) document.querySelector('.main').scroll(0, 0);
            document.querySelector('.main').style.overflowY = 'auto';
            let filter_buttons = document.querySelectorAll('.filter-button');
            filter_buttons.forEach(filter_button => {
                filter_button.classList.add('inactive-filter');
                filter_button.disabled = true;
                filter_button.style.pointerEvents = 'none';
            });
        })
    });
}

// Handle null data for staff informations, render placeholders
function placeholderData(data, value, placeholder) {
    if (data == null) {
        value.classList.add('placeholder-data');
        data = placeholder;
    } else {
        if (value.classList.contains('placeholder-data')) value.classList.remove('placeholder-data');
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
    if (note_edit) note_edit.value = '';
    if (note_delete) note_delete.value = '';
}

// Chart creation
function chartJs(chart, label1, label2, label3, data1, data2, data3, color1, color2, color3, font_size) {
    let ctx = document.getElementById(chart).getContext('2d');
    let labels = [label1, label2, label3];
    let colors = [color1, color2, color3];
    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            datasets: [{
                data: [data1, data2, data3],
                backgroundColor: colors
            }],
            labels: labels
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'rectRounded',
                        pointRadius: 10,
                        font: {
                            size: font_size,
                            family: "'Raleway', sans-serif",
                            weight: 600
                        }
                    }
                }
            }
        }
    })
}

// Get unique staff member image by his ID
const fetchImageById = async (method, endpoint) => {
    const data = {
        "method": method
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
    user = await response.json();
    // Check for expired token to redirect to login page
    if (user.error) {
        verifyTokenExp();
    } else {
        console.log(user);
        document.querySelector('.header-image').setAttribute('src', user['profile_img']);
        document.querySelector('.nav-image').setAttribute('src', user['profile_img']);
    }
}

// Handle content after the page loads completely
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        // Chrome Bug Workaround: Select body tag and remove preload class to re enable animations after the page load
        let body = document.querySelector('.preload');
        body.classList.remove('preload');

        // Check if tickets body exists
        if (document.querySelector('.tbody')) {
            captureAllTickets();
            roundCorners();
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
                document.querySelector('.main').removeAttribute('style');
                document.querySelector('.right-chart').innerHTML = '';
                let filter_buttons = document.querySelectorAll('.filter-button');
                filter_buttons.forEach(filter_button => {
                    filter_button.classList.remove('inactive-filter');
                    filter_button.disabled = false;
                    filter_button.removeAttribute('style');
                });
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

        // Get the username
        if (document.querySelector('.username')) username = document.querySelector('.username').innerHTML;

        // Assign username as id of tickets filter
        if (document.querySelector('.my-tickets')) document.querySelector('.my-tickets').setAttribute('id', username);
        if (document.querySelector('.assigned-tickets')) document.querySelector('.assigned-tickets').setAttribute('id', username);

    }, 300);
})