/* Modals Handling */
const open_modal_buttons = document.querySelectorAll('[data-modal-target');
const close_modal_buttons = document.querySelectorAll('[data-close-button');
const overlay = document.getElementById('overlay');

// Modals functions
function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('active');
    // Clear all forms in modals upon closing
    let modal_bodies = document.querySelectorAll('.modal-body');
    modal_bodies.forEach(modal_body => {
        modal_body.children[0].reset();
    });
    // Uncheck Radio buttons
    document.querySelectorAll('.custom-radio').forEach(radio_button => {
        radio_button.checked = false;
    });
}

// Opening and Closing Modals
open_modal_buttons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget);
        openModal(modal);
        // Hide the scrollbars behind the modal
        if (document.querySelector('.filter-by')) {
            document.querySelector('.filter-by').style.overflow = 'hidden';
        }
    })
})

close_modal_buttons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal');
        closeModal(modal);
        // Reactivate the scrollbars
        if (document.querySelector('.filter-by')) {
            document.querySelector('.filter-by').style.overflow = 'auto';
        }
    })
})

// Closing when clicking outside the modal
overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active');
    modals.forEach(modal => {
        closeModal(modal);
        // Reactivate the scrollbars
        if (document.querySelector('.filter-by')) {
            document.querySelector('.filter-by').style.overflow = 'auto';
        }
    })
})

/* Handling Custom Select/Options */
const custom_select = document.querySelectorAll('.custom_select');

custom_select.forEach(select => {
    select.addEventListener('mousedown', e => {
        if (window.innerWidth >= 420) {
            // Preventing the selecting from opening the default HTML dropdown menu
            e.preventDefault();
            // Changing Arrow Icon to upwards
            select.children[1].style.transform = 'rotate(180deg)';
            // Selecting the default HTML select element and creating a custom dropdown
            const default_select = select.children[0];
            const custom_dropdown = document.createElement('ul');
            custom_dropdown.className = 'custom-options';
            // Spreading the options of the default select and foreach one create a list element for our custom ul dropdown
            [...default_select.children].forEach(option => {
                const custom_option = document.createElement('li');
                // Transfer content from the default options to the custom one
                custom_option.textContent = option.textContent;
                // Transfering the selected content to the default select value
                custom_option.addEventListener('mousedown', (e) => {
                    e.stopPropagation();
                    default_select.value = option.value;
                    default_select.dispatchEvent(new Event('change'));

                    // Restoring the Arrow to Downwards and deleting the custom dropdown menu
                    select.children[1].style.transform = 'rotate(0deg)';
                    custom_dropdown.remove();
                });

                custom_dropdown.appendChild(custom_option);
                // Handling the priority text and icon styling on hover

                switch (custom_option.innerText) {
                    case 'High':
                        priorityCustomSelect(custom_option, red, white, semibold, blue, white, regular);
                        custom_option.insertAdjacentHTML('beforeend', '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="25.154" viewBox="0 0 33.423 29.154"> <g id="High_Icon" data-name="High Icon" transform="translate(-886.461 -435.423)"> <path id="high-icon" data-name="Icon feather-triangle" d="M15.435,5.79,2.73,27A3,3,0,0,0,5.3,31.5H30.7A3,3,0,0,0,33.27,27L20.565,5.79a3,3,0,0,0-5.13,0Z" transform="translate(885.172 432.077)" fill="none" stroke="#2b777d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <text id="H" transform="translate(898 459)" fill="#2b777d" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">H</tspan></text> </g> </svg>');
                        break;
                    case 'Medium':
                        priorityCustomSelect(custom_option, yellow, white, semibold, blue, white, regular);
                        custom_option.insertAdjacentHTML('beforeend', '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="33.423" viewBox="0 0 37.639 37.639"> <g id="Medium_Icon" data-name="Medium Icon" transform="translate(-884.086 -505.103)"> <path id="medium-icon" data-name="Icon awesome-square" d="M21.981,2.25H2.638A2.638,2.638,0,0,0,0,4.888V24.231a2.638,2.638,0,0,0,2.638,2.638H21.981a2.638,2.638,0,0,0,2.638-2.638V4.888A2.638,2.638,0,0,0,21.981,2.25Z" transform="matrix(0.719, 0.695, -0.695, 0.719, 904.165, 504.899)" fill="none" stroke="#2b777d" stroke-width="2"/> <text id="M" transform="translate(896 529)" fill="#2b777d" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">M</tspan></text> </g> </svg>');
                        break;
                    case 'Low':
                        priorityCustomSelect(custom_option, green, white, semibold, blue, white, regular);
                        custom_option.insertAdjacentHTML('beforeend', '<svg xmlns="http://www.w3.org/2000/svg" width="33.423" height="25.154" viewBox="0 0 33.423 29.154"> <g id="Low_Icon" data-name="Low Icon" transform="translate(-886.459 -585.5)"> <path id="low-icon" data-name="Icon feather-triangle" d="M15.435,5.79,2.73,27A3,3,0,0,0,5.3,31.5H30.7A3,3,0,0,0,33.27,27L20.565,5.79a3,3,0,0,0-5.13,0Z" transform="translate(921.172 618) rotate(180)" fill="none" stroke="#2b777d" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/> <text id="L" transform="translate(899 602)" fill="#2b777d" font-size="15" font-family="Raleway-SemiBold, Raleway" font-weight="600"><tspan x="0" y="0">L</tspan></text> </g> </svg>');
                        break;
                    default:
                        break;
                }
            });
            select.appendChild(custom_dropdown);
            // z-index for the icon to be on top of the custom dropdown menu and the latter to be on top on the select
            select.children[1].style.zIndex = '3';
            select.children[2].style.zIndex = '2';
            // Handling clicking out of the custom select
            document.addEventListener('click', (e) => {
                if (!select.contains(e.target)) {
                    custom_dropdown.remove();
                    select.children[1].style.transform = 'rotate(0deg)';
                }
            });
        }
    })
});

// Function that handles the styling on hover for the priority custom select options
function priorityCustomSelect(custom_option, over_color, over_back, over_weight, out_color, out_back, out_weight) {
    custom_option.addEventListener("mouseover", () => {
        custom_option.style.color = over_color;
        custom_option.style.background = over_back;
        custom_option.style.fontWeight = over_weight;
    });
    custom_option.addEventListener("mouseout", () => {
        custom_option.style.color = out_color;
        custom_option.style.background = out_back;
        custom_option.style.fontWeight = out_weight;
    });
}

// Create a ticket
let token = localStorage.getItem('token');

const ticket_form = document.querySelector('.create-ticket-form');
const category = document.getElementById('category');
const priority = document.getElementById('priority');
const title = document.getElementById('title');
const content = document.getElementById('content');

const createTicket = async (method, endpoint) => {
    const data = {
        "method": method,
        "params": {
            "category": category.value,
            "priority": priority.value,
            "title": title.value,
            "content": content.value
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
        throw new Error('cannot insert data');
    }
    ticket = await response.json();
    // Check for expired token to redirect to login page
    if (ticket.error) {
        verifyTokenExp();
    }
}

ticket_form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (category.value === '' || priority.value === '' || title.value === '' || content.value === '') {
        // ticket_error.innerHTML = 'Please fill all the fields';
        console.log('Please fill all the fields');
    } else {
        createTicket('createTicket', '/ticket');
        ticket_form.reset();
        // If the current page is the tickets page
        if (document.querySelector('.tbody')) {
            // Get the last inserted ticket and show it
            fetchLastTicket('readLastTicket', '/ticket', document.querySelector('.tbody'));
        }
        // If the current page is the dashboard page
        if (document.querySelector('.stats')) {
            // Get the updated number of tickets
            fetchNumbers('readTicketsNumber', '/ticket', tickets_number);
            // Clear charts sections from canvas
            document.querySelector('.inc-chart').innerHTML = '';
            document.querySelector('.tickets-chart').innerHTML = '';
            // Generating new charts with updated informations
            fetchStatusNumbers('readStatusNumber', '/ticket');
            fetchPriorityNumbers('readPriorityNumber', '/ticket');
        }
        // If the current page is the Staff page
        if (document.querySelector('.staff-return')) {
            // Clear profile chart from canvas
            document.querySelector('.right-chart').innerHTML = '';
            // Get the user informations and update the chart
            fetchUserById('readUniqueUser', '/user', user_selected_id);
        }
        // If the current page is the Profile page
        if (document.querySelector('.profile-return')) {
            // Clear profile chart from canvas
            document.querySelector('.right-chart').innerHTML = '';
            // Get the user informations and update the chart
            fetchUserProfile('readProfileUser', '/user');
        }
        // Closing the create ticket modal
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        })
    }
})

// Get the profile image for the header
setTimeout(() => {
    fetchImageById('readProfileImage', '/user');
}, 75);