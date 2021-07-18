// Calculate Age depending on Date of birth (YYYY-MM-DD)
const yearInMs = 3.15576e+10;
const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / yearInMs)

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

        document.querySelector('.main').style.overflowY = 'hidden';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchUserProfile('readProfileUser', 'http://localhost:8080/user');
})