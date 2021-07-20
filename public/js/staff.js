const staff_container = document.querySelector('.staff-container');

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

            // Create Staff Image
            let staff_image = document.createElement('div');
            staffCardElement(staff_header, staff_image, 'card-image', '<svg class="card-profile" xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 34.875 34.875"> <path id="Icon_awesome-user-circle" data-name="Icon awesome-user-circle" d="M17.438.563A17.438,17.438,0,1,0,34.875,18,17.434,17.434,0,0,0,17.438.563Zm0,6.75A6.188,6.188,0,1,1,11.25,13.5,6.188,6.188,0,0,1,17.438,7.313Zm0,24.188a13.474,13.474,0,0,1-10.3-4.8,7.839,7.839,0,0,1,6.926-4.2,1.72,1.72,0,0,1,.5.077,9.309,9.309,0,0,0,2.876.485,9.274,9.274,0,0,0,2.876-.485,1.72,1.72,0,0,1,.5-.077,7.839,7.839,0,0,1,6.926,4.2A13.474,13.474,0,0,1,17.438,31.5Z" transform="translate(0 -0.563)"/> </svg>');

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

            let age = user['dateofbirth'];
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

            let dob = user['dateofbirth'];
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

// Calculate Age depending on Date of birth (YYYY-MM-DD)
const yearInMs = 3.15576e+10;
const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / yearInMs)

const activate_form = document.querySelector('.activate-account-form');
const department = document.getElementById('department');
const jobtitle = document.getElementById('jobtitle');
const activate_button = document.querySelector('.activate-submit-button');
const delete_form = document.querySelector('.delete-account-form');
const delete_button = document.querySelector('.delete-submit-button');

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
            if(activate_button) activate_button.value = user['user_id'];
        } else {
            if(delete_button) delete_button.value = user['user_id'];
        }

        // Department
        let user_department = user['department'];
        placeholderData(user_department, document.querySelector('.left-department-value'), '____________________');
        // Jobtitle
        let user_jobtitle = user['jobtitle'];
        placeholderData(user_jobtitle, document.querySelector('.left-jobtitle-value'), '____________________');
        // Date of birth
        let user_dob = user['dateofbirth'];
        placeholderData(user_dob, document.querySelector('.left-dob-value'), '____-__-__');
        // Age
        let user_age = user['dateofbirth'];
        if (user_age == null) {
            document.querySelector('.left-age-value').style.opacity = '0.2';
            user_age = '--';
        } else {
            document.querySelector('.left-age-value').style.opacity = '1';
            user_age = getAge(user_age);
        }
        document.querySelector('.left-age-value').innerHTML = user_age;

        // Status
        if (document.querySelector('.activate-account')) {
            if (user['status'] == 'active') {
                document.querySelector('.activate-account').style.display = 'none';
                document.querySelector('.delete-account').style.display = 'block';
            } else {
                document.querySelector('.activate-account').style.display = 'block';
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

        // Hide Staff List and show Staff member selected
        document.querySelector('.staff-container').style.display = 'none';
        document.querySelector('.staff-details').style.display = 'grid';
        document.querySelector('.main').style.overflowY = 'hidden';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchStaff('readAllUsers', '/user', staff_container);
})


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
            fetchUserById('readUniqueUser', '/user', activate_button.value);
            staff_container.innerHTML = '';
            fetchStaff('readAllUsers', '/user', staff_container);
            const modals = document.querySelectorAll('.modal.active');
            modals.forEach(modal => {
                closeModal(modal);
            })
            setTimeout(() => { captureAllStaff(); }, 400);
        }
    })
}

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
        document.querySelector('.staff-details').style.display = 'none';
        document.querySelector('.staff-container').style.display = 'grid';
        document.querySelector('.main').style.overflowY = 'overlay';
        staff_container.innerHTML = '';
        fetchStaff('readAllUsers', '/user', staff_container);
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        })
        setTimeout(() => { captureAllStaff(); }, 400);
    })
}