const staff_container = document.querySelector('.staff-container');

// Calculate Age depending on Date of birth (YYYY-MM-DD)
const yearInMs = 3.15576e+10;
const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / yearInMs)

// Get all staff members
const fetchStaff = async (method, endpoint, staff_container) => {
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
    users = await response.json();
    // Check for expired token to redirect to login page
    if (users.error) {
        verifyTokenExp();
    } else {
        console.log(users);

        users.forEach(user => {

            // Create card element to append
            function staffCardElement(parent, child, classname, value) {
                child.setAttribute('class', classname);
                parent.appendChild(child);
                child.innerHTML = value;
            }

            // Create Staff Card
            let staff_card = document.createElement('div');
            staffCardElement(staff_container, staff_card, 'staff-card', '');

            // Crate Staff Id
            let staff_id = document.createElement('div');
            staffCardElement(staff_card, staff_id, 'staff-id', user['user_id']);

            // Create Staff Header
            let staff_header = document.createElement('div');
            staffCardElement(staff_card, staff_header, 'card-header', '');

            // Create Staff Image Container            
            let staff_image_container = document.createElement('div');
            staff_image_container.setAttribute('class', 'card-image-container');
            staff_header.appendChild(staff_image_container);

            // Render Profile Image in the Image Container
            let staff_image = document.createElement('img');
            staff_image.setAttribute('class', 'card-image');
            staff_image.setAttribute('src', user['profile_img']);
            staff_image_container.appendChild(staff_image);

            // Create Staff Info
            let staff_info = document.createElement('div');
            staffCardElement(staff_header, staff_info, 'card-info', '');

            // Create Staff Fullname & Role
            let staff_name = document.createElement('div');
            staffCardElement(staff_info, staff_name, 'fullname', user['firstname'] + ' ' + user['lastname']);

            let staff_role = document.createElement('div');
            staffCardElement(staff_info, staff_role, 'role', user['role']);

            // Create Staff Status
            let staff_status = document.createElement('div');
            if (user['status'] == 'active') {
                staff_status.setAttribute('class', 'card-status status-active');
            } else {
                staff_status.setAttribute('class', 'card-status status-inactive');
            }
            staff_header.appendChild(staff_status);
            staff_status.innerHTML = '&#8226 ' + user['status'];

            // Create Staff Body
            let staff_body = document.createElement('div');
            staffCardElement(staff_card, staff_body, 'card-body', '');

            // Create Staff Details
            let staff_details = document.createElement('div');
            staffCardElement(staff_body, staff_details, 'details', '');

            // Create Staff Email
            let staff_email = document.createElement('div');
            staffCardElement(staff_details, staff_email, 'email', 'Email');

            // Create Staff Phone
            let staff_phone = document.createElement('div');
            staffCardElement(staff_details, staff_phone, 'phone', 'Phone');

            // Create Staff Age
            let staff_age = document.createElement('div');
            staffCardElement(staff_details, staff_age, 'age', 'Age');

            // Create Staff Date of birth
            let staff_dob = document.createElement('div');
            staffCardElement(staff_details, staff_dob, 'dob', 'Date of birth');

            // Create Staff Location
            let staff_loc = document.createElement('div');
            staffCardElement(staff_details, staff_loc, 'loc', 'Location');

            // Create Staff Join date
            let staff_joined = document.createElement('div');
            staffCardElement(staff_details, staff_joined, 'joined', 'Joined');

            // Create Staff Values
            let staff_values = document.createElement('div');
            staffCardElement(staff_body, staff_values, 'values', '');

            // Create Staff Email values
            let staff_email_value = document.createElement('div');
            staffCardElement(staff_values, staff_email_value, 'email-value', user['email']);

            // Create Staff Phone values
            let staff_phone_value = document.createElement('div');
            staffCardElement(staff_values, staff_phone_value, 'phone-value', '');

            let phone = user['phone'];
            placeholderData(phone, staff_phone_value, '(+___)-___-______');

            // Create Staff Age values
            let staff_age_value = document.createElement('div');
            staffCardElement(staff_values, staff_age_value, 'age-value', '');

            let age = user['birthdate'];
            if (age == null) {
                staff_age_value.style.opacity = '0.2';
                age = '--';
            } else {
                staff_age_value.style.opacity = '1';
                age = getAge(age);
            }
            staff_age_value.innerHTML = age;

            // Create Staff Date of birth values
            let staff_dob_value = document.createElement('div');
            staffCardElement(staff_values, staff_dob_value, 'dob-value', '');

            let dob = user['birthdate'];
            placeholderData(dob, staff_dob_value, '____-__-__');

            // Create Staff Location values
            let staff_loc_value = document.createElement('div');
            staffCardElement(staff_values, staff_loc_value, 'loc-value', '');

            // Create Staff Country Values
            let staff_country_value = document.createElement('span');
            staffCardElement(staff_loc_value, staff_country_value, 'country-value', '');

            let country = user['country'];
            placeholderData(country, staff_country_value, '_________');

            //? Create Staff Location Spacing
            let staff_loc_space = document.createElement('span');
            staff_loc_space.setAttribute('class', 'space-value');
            staff_loc_value.appendChild(staff_loc_space);
            staff_loc_space.style.opacity = '1';
            staff_loc_space.innerHTML = ', ';

            // Create Staff City Values
            let staff_city_value = document.createElement('span');
            staffCardElement(staff_loc_value, staff_city_value, 'city-value', '');

            let city = user['city'];
            placeholderData(city, staff_city_value, '_________');

            // Create Staff Join date values
            let staff_joined_value = document.createElement('div');
            staffCardElement(staff_values, staff_joined_value, 'joined-value', user['user_created_at']);
        });
    }
}

// Get all staff members on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchStaff('readAllUsers', '/user', staff_container);
})

const activate_form = document.querySelector('.activate-account-form');
const department = document.getElementById('department');
const jobtitle = document.getElementById('jobtitle');
const activate_button = document.querySelector('.activate-submit-button');
const delete_form = document.querySelector('.delete-account-form');
const delete_button = document.querySelector('.delete-submit-button');
const delete_image_button = document.getElementById('delete-profile-image-submit');

// Get unique staff member by his ID
const fetchUserById = async (method, endpoint, user_id) => {
    const data = {
        "method": method,
        "params": {
            "user_id": user_id
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
    user = await response.json();
    // Check for expired token to redirect to login page
    if (user.error) {
        verifyTokenExp();
    } else {

        console.log(user);

        if (user['status'] != 'active') {
            if (activate_button) activate_button.value = user['user_id'];
        } else {
            if (delete_button) delete_button.value = user['user_id'];
        }

        if (delete_image_button) delete_image_button.value = user['user_id'];

        // Department
        let user_department = user['department'];
        placeholderData(user_department, document.querySelector('.left-department-value'), '____________________');
        // Jobtitle
        let user_jobtitle = user['jobtitle'];
        placeholderData(user_jobtitle, document.querySelector('.left-jobtitle-value'), '____________________');
        // Date of birth
        let user_dob = user['birthdate'];
        placeholderData(user_dob, document.querySelector('.left-dob-value'), '____-__-__');
        // Age
        let user_age = user['birthdate'];
        if (user_age == null) {
            document.querySelector('.left-age-value').classList.add('placeholder-data')
            user_age = '--';
        } else {
            if (document.querySelector('.left-age-value').classList.contains('placeholder-data')) document.querySelector('.left-age-value').classList.remove('placeholder-data');
            user_age = getAge(user_age);
        }
        document.querySelector('.left-age-value').innerHTML = user_age;

        // Status
        if (document.querySelector('.activate-account')) {
            if (user['status'] == 'active') {
                document.querySelector('.activate-account').style.display = 'none';
                document.querySelector('.delete-account').style.display = 'unset';
            } else {
                document.querySelector('.activate-account').style.display = 'unset';
                document.querySelector('.delete-account').style.display = 'none';
            }
        }

        // Bio
        let user_bio = user['bio'];
        placeholderData(user_bio, document.querySelector('#bio'), '');

        // Phone
        let user_phone = user['phone'];
        placeholderData(user_phone, document.querySelector('.right-phone-value'), '(+___)-___-______');
        // Country
        let user_country = user['country'];
        placeholderData(user_country, document.querySelector('.right-country-value'), '_________');
        // City
        let user_city = user['city'];
        placeholderData(user_city, document.querySelector('.right-city-value'), '_________');
        // Gender
        let user_gender = user['gender'];
        placeholderData(user_gender, document.querySelector('.right-gender-value'), '_________');

        document.querySelector('.left-joined-value').innerHTML = user['user_created_at'];

        document.querySelector('.name-right').innerHTML = user['firstname'] + ' ' + user['lastname'];
        document.querySelector('.email-right').innerHTML = user['email'];
        document.querySelector('.role-right').innerHTML = user['role'];

        document.querySelector('.profile-image').setAttribute('src', user['profile_img']);

        // Chart
        if (user['role'] === 'Employee') fetchTicketsNumbersUser('readTicketsNumberUser', '/ticket', user['user_id']);
        if (user['role'] === 'Developer' || user['role'] === 'Technician') fetchAssignedNumbersUser('readAssignedNumberUser', '/ticket', user['firstname'] + ' ' + user['lastname']);

        // Hide Staff List and show Staff member selected
        document.querySelector('.staff-container').style.display = 'none';
        document.querySelector('.staff-details').style.display = 'grid';
    }
}

// Initialization of tickets priorities numbers
let n_high = 0, n_med = 0, n_low = 0;

// Get tickets created by user
const fetchTicketsNumbersUser = async (method, endpoint, user_id) => {
    const data = {
        "method": method,
        "params": {
            "user_id": user_id
        }
    };
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    tickets = await response.json();
    console.log(tickets);

    tickets.forEach(ticket => {
        switch (ticket.priority) {
            case 'High':
                n_high++;
                break;
            case 'Medium':
                n_med++;
                break;
            case 'Low':
                n_low++;
                break;
        }
    });

    // Create a canvas for profile chart
    let profileChart = document.createElement('canvas');
    profileChart.setAttribute('id', 'profileChart');
    document.querySelector('.right-chart').appendChild(profileChart);
    // Create a title with the total number of tickets created
    let titleChart = document.createElement('div');
    titleChart.setAttribute('id', 'titleChart');
    document.querySelector('.right-chart').appendChild(titleChart);
    titleChart.innerHTML = 'Tickets submitted: ' + tickets.length;
    // Render the chart
    if (window.innerWidth <= 768) chartJs('profileChart', 'High', 'Medium', 'Low', n_high, n_med, n_low, '#C94242', '#BEBE5F', '#5FBE6E', 13)
    if (window.innerWidth > 768) chartJs('profileChart', 'High', 'Medium', 'Low', n_high, n_med, n_low, '#C94242', '#BEBE5F', '#5FBE6E', 16)
    // Reseting the numbers
    n_high = 0, n_med = 0, n_low = 0;
}

// Initialization of tickets statuses numbers
let n_pend = 0, n_open = 0, n_resolv = 0;

// Get tickets assigned to user
const fetchAssignedNumbersUser = async (method, endpoint, fullname) => {
    const data = {
        "method": method,
        "params": {
            "assigned_to": fullname
        }
    };
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    tickets = await response.json();

    tickets.forEach(ticket => {
        switch (ticket.status) {
            case 'Pending':
                n_pend++;
                break;
            case 'Open':
                n_open++;
                break;
            case 'Resolved':
                n_resolv++;
                break;
        }
    });
    // Create a canvas for profile chart
    let profileChart = document.createElement('canvas');
    profileChart.setAttribute('id', 'profileChart');
    document.querySelector('.right-chart').appendChild(profileChart);
    // Create a title with the total number of tickets assigned to user
    let titleChart = document.createElement('div');
    titleChart.setAttribute('id', 'titleChart');
    document.querySelector('.right-chart').appendChild(titleChart);
    titleChart.innerHTML = 'Tickets assigned: ' + tickets.length;
    // Render the chart
    if (window.innerWidth <= 768) chartJs('profileChart', 'Pending', 'Open', 'Resolved', n_pend, n_open, n_resolv, '#2B777D', '#5FBEBC', '#5FBE6E', 13)
    if (window.innerWidth > 768) chartJs('profileChart', 'Pending', 'Open', 'Resolved', n_pend, n_open, n_resolv, '#2B777D', '#5FBEBC', '#5FBE6E', 16)
    // Reseting the numbers
    n_pend = 0, n_open = 0, n_resolv = 0;
}

// User account activation
const activateUser = async (method, endpoint) => {
    const data = {
        "method": method,
        "params": {
            "user_id": activate_button.value,
            "department": department.value,
            "jobtitle": jobtitle.value,
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

if (activate_form) {
    activate_form.addEventListener('submit', async function (e) {
        e.preventDefault();

        if (department.value === '' || jobtitle.value === '') {
            // activate_error.innerHTML = 'Please fill all the fields';
            console.log('Please fill all the fields');
        } else {
            activateUser('updateUserStatus', '/user');
            activate_form.reset();
            // Get the updated information of user selected
            fetchUserById('readUniqueUser', '/user', activate_button.value);
            // Emptying the staff container and get the updated list
            staff_container.innerHTML = '';
            fetchStaff('readAllUsers', '/user', staff_container);
            // Close the activate account modal
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                closeModal(modal);
            })
            // Capture all staff members
            setTimeout(() => { captureAllStaff(); }, 400);
        }
    })
}

// User account deletion
const deleteUser = async (method, endpoint) => {
    const data = {
        "method": method,
        "params": {
            "user_id": delete_button.value
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

        deleteUser('deleteUser', '/user');
        // Return to normal view with all staff members
        document.querySelector('.staff-details').style.display = 'none';
        document.querySelector('.staff-container').style.display = 'grid';
        // Emptying the staff container and get the updated list
        staff_container.innerHTML = '';
        fetchStaff('readAllUsers', '/user', staff_container);
        // Close the delete account modal
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        })
        // Capture all staff members
        setTimeout(() => { captureAllStaff(); }, 400);
    })
}

// Delete user profile image
async function deleteUserImage() {

    try {
        const response = await fetch('/deleteimg', {
            method: 'POST'
        });
        const result = await response.json();
        console.log(result);
        // Clear chart canvas
        document.querySelector('.right-chart').innerHTML = '';
        // Get the user informations with the newly uploaded image
        fetchUserById('readUniqueUser', '/user', user_selected_id);
        // Close the delete image modal
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        })
        // Emptying the staff container and get the updated list
        staff_container.innerHTML = '';
        fetchStaff('readAllUsers', '/user', staff_container);
        // Capture all staff members
        setTimeout(() => { captureAllStaff(); }, 400);
    } catch (e) {
        console.log(e);
    }
}

if (document.querySelector('.delete-profile-image-form')) {
    document.querySelector('.delete-profile-image-form').addEventListener('submit', function (e) {
        e.preventDefault();
        deleteUserImage();
    })
}

// Profile picture placement fix when user connected is not admin
if (!document.querySelector('.delete-profile-image')) {
    if (window.innerWidth <= 768) document.querySelector('.left-picture').style.gap = '18.4rem';
}

/* Search and Filters handling */
const search_input = document.querySelector('.search');

// Filter to show all staff cards
const show_all = document.getElementById('All');
let all_staff = document.querySelector(".staff-container").getElementsByTagName("div");
show_all.addEventListener('click', () => {
    for (i = 0; i < all_staff.length; i++) {
        all_staff[i].classList.remove('hidden-card');
    }
})

// Search through all staff cards depending on search option
search_input.addEventListener('keyup', () => {
    // Show all staff cards
    for (i = 0; i < all_staff.length; i++) {
        all_staff[i].classList.remove('hidden-card');
    }
    // Remove the current active filter
    let active_filter_button = document.querySelector('.active-filter');
    active_filter_button.classList.remove('active-filter');
    show_all.classList.add('active-filter');
    // Only search if all staff cards are shown
    if (show_all.classList.contains('active-filter') === true) {
        let search_value, cards, fullname, i, text_value;
        search_value = search_input.value.toUpperCase();
        cards = document.querySelectorAll('.staff-card');
        // Loop through all staff cards, and hide those who don't match the search
        for (i = 0; i < cards.length; i++) {
            fullname = cards[i].children[1].children[1].children[0];
                text_value = fullname.textContent || fullname.innerText;
                if (text_value.toUpperCase().indexOf(search_value) > -1) {
                    cards[i].classList.remove('hidden-card');
                } else {
                    cards[i].classList.add('hidden-card');
                }
        }
    }
})

let filter = 'All';
let filter_buttons = document.querySelectorAll('.filter-button');
const filter_input = document.querySelector('.filter');

// Filter buttons for: All, Role, Status
filter_buttons.forEach(filter_button => {

    filter_button.addEventListener('click', () => {
        // Reset the search value
        search_input.value = '';
        // Remove the current active filter
        let active_filter_button = document.querySelector('.active-filter');
        active_filter_button.classList.remove('active-filter');
        // Take the filter value from the button value and the name from it's id and make it the current active filter
        filter = filter_button.value;
        filter_input.value = filter_button.id;
        filter_button.classList.add('active-filter');
        // Define variables
        let filter_value, cards, filter_type, i, txtValue;
        filter_value = filter_input.value.toUpperCase();
        cards = document.querySelectorAll('.staff-card');
        // Loop through all staff, and hide those who don't match the filter
        switch (filter) {
            case 'Role':
                for (i = 0; i < cards.length; i++) {
                    filter_type = cards[i].children[1].children[1].children[1];
                    if (filter_type) {
                        txtValue = filter_type.textContent || filter_type.innerText;
                        if (txtValue.toUpperCase().indexOf(filter_value) > -1) {
                            cards[i].classList.remove('hidden-card');
                        } else {
                            cards[i].classList.add('hidden-card');
                        }
                    }
                }
                break;
            case 'Status':
                for (i = 0; i < cards.length; i++) {
                    filter_type = cards[i].children[1].children[2];
                    if (filter_type) {
                        txtValue = filter_type.textContent || filter_type.innerText;
                        if (txtValue.toUpperCase().indexOf(filter_value) > -1) {
                            cards[i].classList.remove('hidden-card');
                        } else {
                            cards[i].classList.add('hidden-card');
                        }
                    }
                }
                break;
        }
    })
});

// if (window.innerWidth <= 768) {
//     document.getElementById('Developer').innerHTML = 'Dev';
//     document.getElementById('Technician').innerHTML = 'Tech';
//     document.getElementById('Employee').innerHTML = 'Emp';
//     document.getElementById('Active').innerHTML = 'Act';
//     document.getElementById('Inactive').innerHTML = 'Inact';
// }

// window.addEventListener('resize', () => {
//     if (window.innerWidth <= 768) {
//         document.getElementById('Developer').innerHTML = 'Dev';
//         document.getElementById('Technician').innerHTML = 'Tech';
//         document.getElementById('Employee').innerHTML = 'Emp';
//         document.getElementById('Active').innerHTML = 'Act';
//         document.getElementById('Inactive').innerHTML = 'Inact';
//     } else {
//         document.getElementById('Developer').innerHTML = 'Developer';
//         document.getElementById('Technician').innerHTML = 'Technician';
//         document.getElementById('Employee').innerHTML = 'Employee';
//         document.getElementById('Active').innerHTML = 'Active';
//         document.getElementById('Inactive').innerHTML = 'Inactive';
//     }
// })