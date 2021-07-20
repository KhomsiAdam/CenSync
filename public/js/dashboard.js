const staff_number = document.querySelector('.staff-number');
const tickets_number = document.querySelector('.tickets-number');
const tickets_resolved_number = document.querySelector('.inc-number');

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

document.addEventListener('DOMContentLoaded', () => {
    fetchNumbers('readUsersNumber', '/user', staff_number);
    fetchNumbers('readTicketsNumber', '/ticket', tickets_number);
    fetchNumbers('readTicketsResolved', '/ticket', tickets_resolved_number);
})