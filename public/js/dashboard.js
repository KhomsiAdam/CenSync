const staff_number = document.querySelector('.staff-number');
const tickets_number = document.querySelector('.tickets-number');
const tickets_resolved_number = document.querySelector('.inc-number');

// Function to fetch any total number of entries
const fetchNumbers = async (method, endpoint, data_number) => {
    const data = {
        "method": method
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
    number = await response.json();
    data_number.innerHTML = number;
    return number;
}

// Initialization of Staff Roles, Tickets Statuses and priorities numbers
let n_emp = 0, n_dev = 0, n_tech = 0, n_pend = 0, n_open = 0, n_resolv = 0, n_high = 0, n_med = 0, n_low = 0;

// Get Staff Roles and Count the number of each role
const fetchRolesNumbers = async (method, endpoint) => {
    const data = {
        "method": method
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
    roles = await response.json();
    console.log(roles);

    roles.forEach(role => {
        switch (role.role) {
            case 'Employee':
                n_emp++;
                break;
            case 'Developer':
                n_dev++;
                break;
            case 'Technician':
                n_tech++;
                break;
        }
    });

    // Create a canvas for staff chart
    let staffChart = document.createElement('canvas');
    staffChart.setAttribute('id', 'staffChart');
    document.querySelector('.staff-chart').appendChild(staffChart);
    // Generate a chart
    if (window.innerWidth <= 768) chartJs('staffChart', 'Employee', 'Developer', 'Technician', n_emp, n_dev, n_tech, '#2B365A', '#2B777D', '#5FBEBC', 17)
    if (window.innerWidth > 768) chartJs('staffChart', 'Employee', 'Developer', 'Technician', n_emp, n_dev, n_tech, '#2B365A', '#2B777D', '#5FBEBC', 20)
    // Reset the numbers
    n_emp = 0, n_dev = 0, n_tech = 0;
}

// Get Tickets by prioriy and count the number of each priority
const fetchPriorityNumbers = async (method, endpoint) => {
    const data = {
        "method": method
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
    priorities = await response.json();
    console.log(priorities);

    priorities.forEach(priority => {
        switch (priority.priority) {
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

    // Create a canvas for tickets chart
    let ticketsChart = document.createElement('canvas');
    ticketsChart.setAttribute('id', 'ticketsChart');
    document.querySelector('.tickets-chart').appendChild(ticketsChart);
    // Generate a chart
    if (window.innerWidth <= 768) chartJs('ticketsChart', 'High', 'Medium', 'Low', n_high, n_med, n_low, '#C94242', '#BEBE5F', '#5FBE6E', 17)
    if (window.innerWidth > 768) chartJs('ticketsChart', 'High', 'Medium', 'Low', n_high, n_med, n_low, '#C94242', '#BEBE5F', '#5FBE6E', 20)
    // Reset the numbers
    n_high = 0, n_med = 0, n_low = 0;
}

// Get Tickets Statuses and count each status
const fetchStatusNumbers = async (method, endpoint) => {
    const data = {
        "method": method
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
    statuses = await response.json();
    console.log(statuses);

    statuses.forEach(status => {
        switch (status.status) {
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

    // Create a canvas for incidents chart
    let incChart = document.createElement('canvas');
    incChart.setAttribute('id', 'incChart');
    document.querySelector('.inc-chart').appendChild(incChart);
    // Generate a chart
    if (window.innerWidth <= 768) chartJs('incChart', 'Pending', 'Open', 'Resolved', n_pend, n_open, n_resolv, '#2B777D', '#5FBEBC', '#5FBE6E', 17)
    if (window.innerWidth > 768) chartJs('incChart', 'Pending', 'Open', 'Resolved', n_pend, n_open, n_resolv, '#2B777D', '#5FBEBC', '#5FBE6E', 20)
    // Reset the numbers
    n_pend = 0, n_open = 0, n_resolv = 0;
}

// Get all numbers and generate all charts when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchNumbers('readUsersNumber', '/user', staff_number);
    fetchNumbers('readTicketsNumber', '/ticket', tickets_number);
    fetchNumbers('readTicketsResolved', '/ticket', tickets_resolved_number);
    fetchRolesNumbers('readRolesNumber', '/user');
    fetchStatusNumbers('readStatusNumber', '/ticket');
    fetchPriorityNumbers('readPriorityNumber', '/ticket');
})