// Calculate Age depending on Date of birth (YYYY-MM-DD)
const yearInMs = 3.15576e+10;
const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / yearInMs)

// Get users informations for his profile
const fetchUserProfile = async (method, endpoint) => {
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

        document.querySelector('.name-right').innerHTML = user['firstname'] + ' ' + user['lastname'];
        document.querySelector('.email-right').innerHTML = user['email'];
        document.querySelector('.role-right').innerHTML = user['role'];
        document.querySelector('.left-joined-value').innerHTML = user['user_created_at'];

        // Chart depending on role
        if (user['role'] === 'Employee') fetchTicketsNumbersUser('readTicketsNumberUser', '/ticket', user['user_id']);
        if (user['role'] === 'Developer' || user['role'] === 'Technician') fetchAssignedNumbersUser('readAssignedNumberUser', '/ticket', user['firstname'] + ' ' + user['lastname']);
    }
}

// Get the profile after the page load
document.addEventListener('DOMContentLoaded', () => {
    fetchUserProfile('readProfileUser', '/user');
})

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
    chartJs('profileChart', 'High', 'Medium', 'Low', n_high, n_med, n_low, '#C94242', '#BEBE5F', '#5FBE6E', 16)
    // Reseting the numbers
    n_high = 0, n_med = 0, n_low = 0;
}

// Initialization of tickets statuses numbers
let n_tickets = 0, n_pend = 0, n_open = 0, n_resolv = 0;

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
    chartJs('profileChart', 'Pending', 'Open', 'Resolved', n_pend, n_open, n_resolv, '#2B777D', '#5FBEBC', '#5FBE6E', 16)
    // Reseting the numbers
    n_tickets = 0, n_pend = 0, n_open = 0, n_resolv = 0;
}
