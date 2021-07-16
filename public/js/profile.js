// Calculate Age depending on Date of birth (YYYY-MM-DD)
const yearInMs = 3.15576e+10;
const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / yearInMs)

let token = localStorage.getItem('token');

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
    if(user.error) {
        console.log('expired token');
        localStorage.removeItem('token');
        console.log('token removed');
        location.replace('/logout');
    } else {
        console.log(user);
    }
    
    let user_department = user['department'];
    if (user_department == null) user_department = "--------------------";

    let user_jobtitle = user['jobtitle'];
    if (user_jobtitle == null) user_jobtitle = "--------------------";

    let user_bio = user['bio'];
    if (user_bio == null) user_bio = '';

    let user_phone = user['phone'];
    if (user_phone == null) user_phone = "--------------------";

    let user_country = user['country'];
    if (user_country == null) user_country = "---------";

    let user_city = user['city'];
    if (user_city == null) user_city = "---------";
    
    let user_gender = user['city'];
    if (user_gender == null) user_gender = "---------";

    let user_dob = user['dateofbirth'];
    if (user_dob == null) user_dob = "---------";

    let user_age = user['dateofbirth'];
    if (user_age == null) {
        user_age = "---------";
    } else {
        user_age = getAge(user_age);
    }

    document.querySelector('.left-department-value').innerHTML = user_department;
    document.querySelector('.left-jobtitle-value').innerHTML = user_jobtitle;

    document.querySelector('.left-age-value').innerHTML = user_age;
    document.querySelector('.left-dob-value').innerHTML = user_dob;
    document.querySelector('.left-joined-value').innerHTML = user['user_created_at'];

    document.querySelector('.name-right').innerHTML = user['firstname'] + ' ' + user['lastname'];
    document.querySelector('.email-right').innerHTML = user['email'];
    document.querySelector('.role-right').innerHTML = user['role'];

    document.querySelector('#bio').value = user_bio;
    
    document.querySelector('.right-phone-value').innerHTML = user_phone;
    document.querySelector('.right-country-value').innerHTML = user_country;
    document.querySelector('.right-city-value').innerHTML = user_city;
    document.querySelector('.right-gender-value').innerHTML = user_gender;

    document.querySelector('.main').style.overflowY = 'hidden';
}

document.addEventListener('DOMContentLoaded', () => {
    fetchUserProfile('readProfileUser', 'http://localhost:8080/user');
})