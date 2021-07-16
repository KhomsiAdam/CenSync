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
            //TODO: uncomment for token use
            // 'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    users = await response.json();

    users.forEach(user => {
        // Create Staff Card
        let staff_card = document.createElement('div');
        staff_card.setAttribute('class', 'staff-card');
        staff_container.appendChild(staff_card);

        // Crate Staff Id
        let staff_id = document.createElement('div');
        staff_id.setAttribute('class', 'staff-id');
        staff_card.appendChild(staff_id);
        staff_id.innerHTML = user['user_id'];

        // Create Staff Header
        let staff_header = document.createElement('div');
        staff_header.setAttribute('class', 'card-header');
        staff_card.appendChild(staff_header);

        // Create Staff Fullname & Role
        let staff_name = document.createElement('div');
        staff_name.setAttribute('class', 'fullname');
        staff_header.appendChild(staff_name);
        staff_name.innerHTML = user['firstname'] + ' ' + user['lastname'];

        let staff_role = document.createElement('div');
        staff_role.setAttribute('class', 'role');
        staff_header.appendChild(staff_role);
        staff_role.innerHTML = user['role'];

        // Create Staff Body
        let staff_body = document.createElement('div');
        staff_body.setAttribute('class', 'card-body');
        staff_card.appendChild(staff_body);

        // Create Staff Details
        let staff_details = document.createElement('div');
        staff_details.setAttribute('class', 'details');
        staff_body.appendChild(staff_details);

        // Create Staff Email
        let staff_email = document.createElement('div');
        staff_email.setAttribute('class', 'email');
        staff_details.appendChild(staff_email);
        staff_email.innerHTML = 'Email';
        // Create Staff Phone
        let staff_phone = document.createElement('div');
        staff_phone.setAttribute('class', 'phone');
        staff_details.appendChild(staff_phone);
        staff_phone.innerHTML = 'Phone';
        // Create Staff Age
        let staff_age = document.createElement('div');
        staff_age.setAttribute('class', 'age');
        staff_details.appendChild(staff_age);
        staff_age.innerHTML = 'Age';
        // Create Staff Date of birth
        let staff_dob = document.createElement('div');
        staff_dob.setAttribute('class', 'dob');
        staff_details.appendChild(staff_dob);
        staff_dob.innerHTML = 'Date of birth';
        // Create Staff Location
        let staff_loc = document.createElement('div');
        staff_loc.setAttribute('class', 'loc');
        staff_details.appendChild(staff_loc);
        staff_loc.innerHTML = 'Location';
        // Create Staff Join date
        let staff_joined = document.createElement('div');
        staff_joined.setAttribute('class', 'joined');
        staff_details.appendChild(staff_joined);
        staff_joined.innerHTML = 'Joined';

        // Create Staff Values
        let staff_values = document.createElement('div');
        staff_values.setAttribute('class', 'values');
        staff_body.appendChild(staff_values);

        // Create Staff Email values
        let staff_email_value = document.createElement('div');
        staff_email_value.setAttribute('class', 'email-value');
        staff_values.appendChild(staff_email_value);
        staff_email_value.innerHTML = user['email'];
        // Create Staff Phone values
        let staff_phone_value = document.createElement('div');
        staff_phone_value.setAttribute('class', 'phone-value');
        staff_values.appendChild(staff_phone_value);
        let phone = user['phone'];
        if (phone == null) phone = "--------------------";
        staff_phone_value.innerHTML = phone;
        // Create Staff Age values
        let staff_age_value = document.createElement('div');
        staff_age_value.setAttribute('class', 'age-value');
        staff_values.appendChild(staff_age_value);
        age = getAge(user['dateofbirth']);
        staff_age_value.innerHTML = age;
        // Create Staff Date of birth values
        let staff_dob_value = document.createElement('div');
        staff_dob_value.setAttribute('class', 'dob-value');
        staff_values.appendChild(staff_dob_value);
        staff_dob_value.innerHTML = user['dateofbirth'];
        // Create Staff Location values
        let staff_loc_value = document.createElement('div');
        staff_loc_value.setAttribute('class', 'loc-value');
        staff_values.appendChild(staff_loc_value);

        let country = user['country'];
        if (country == null) country = "----------";

        let city = user['city'];
        if (city == null) city = "---------";

        let location = country + ', ' + city;
        staff_loc_value.innerHTML = location;
        // Create Staff Join date values
        let staff_joined_value = document.createElement('div');
        staff_joined_value.setAttribute('class', 'joined-value');
        staff_values.appendChild(staff_joined_value);
        staff_joined_value.innerHTML = user['user_created_at'];

    });
}

// Calculate Age depending on Date of birth (YYYY-MM-DD)
const yearInMs = 3.15576e+10;
const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / yearInMs)

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
            //TODO: uncomment for token use
            // 'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    });
    // Custom error message in case the status is not 200 : OK (ex:problem with ressource url)
    if (response.status !== 200) {
        throw new Error('cannot fetch data');
    }
    user = await response.json();
    console.log(user);
    
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
    
    let user_gender = user['gender'];
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

    // Hide Staff List and show Staff member selected
    document.querySelector('.staff-container').style.display = 'none';
    document.querySelector('.staff-details').style.display = 'grid';
    document.querySelector('.main').style.overflowY = 'hidden';
}

document.addEventListener('DOMContentLoaded', () => {
    fetchStaff('readAllUsers', 'http://localhost:8080/user', staff_container);
})