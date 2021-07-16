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
    number = await response.json();
    data_number.innerHTML = number;
    return number;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchNumbers('readUsersNumber', 'http://localhost:8080/user', staff_number);
    fetchNumbers('readTicketsNumber', 'http://localhost:8080/ticket', tickets_number);
    fetchNumbers('readTicketsResolved', 'http://localhost:8080/ticket', tickets_resolved_number);
})