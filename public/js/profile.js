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
        let user_dob = user['birthdate'];
        placeholderData(user_dob, document.querySelector('.left-dob-value'), '____-__-__');
        // Age
        let user_age = user['birthdate'];
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
        placeholderData(user_bio, document.querySelector('.bio'), '');

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

        document.querySelector('.profile-image').setAttribute('src', user['profile_img']);

        // Clear chart canvas
        document.querySelector('.right-chart').innerHTML = '';
        // Chart depending on role
        if (user['role'] === 'Employee') fetchTicketsNumbersUser('readTicketsNumberUser', '/ticket', user['user_id']);
        if (user['role'] === 'Developer' || user['role'] === 'Technician') fetchAssignedNumbersUser('readAssignedNumberUser', '/ticket', user['firstname'] + ' ' + user['lastname']);
    }
}

// Get the profile after the page load
document.addEventListener('DOMContentLoaded', () => {
    fetchUserProfile('readProfileUser', '/user');
})

/* Edit Profile informations */
const fetchInformations = async (method, endpoint, info, value) => {
    const data = {
        "method": method,
        "params": {
        }
    }
    data.params[info] = value;
    console.log(data);
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
    }
}

let edit_icons = document.querySelectorAll('.edit-info');
let hidden_inputs = document.querySelectorAll('.hidden-input');

// If an edit icon is clicked reveal the edit input
edit_icons.forEach(edit_icon => {
    edit_icon.addEventListener('click', () => {
        let edit_input = edit_icon.parentElement.children[1].children[0];
        let edit_info = edit_icon.parentElement.children[0];
        edit_info.style.opacity = '0';
        edit_input.style.visibility = 'visible';
        edit_input.style.opacity = '1';
        edit_input.focus();
        if (!edit_info.classList.contains('placeholder-data')) {
            edit_input.value = edit_info.innerHTML;
        }
    })
});

// Hide the edit input if it looses focus
hidden_inputs.forEach(hidden_input => {
    hidden_input.addEventListener('blur', () => {
        let info = hidden_input.parentElement.parentElement.children[0];
        hidden_input.style.opacity = '0';
        setTimeout(() => {
            hidden_input.style.visibility = 'hidden';
        }, 300);
        if (info.classList.contains('placeholder-data')) {
            info.style.opacity = '0.2';
        } else {
            info.style.opacity = '1';
        }
    })
});

let phone_form = document.querySelector('.phone-form');
let phone_input = document.getElementById('phone-input');

let country_form = document.querySelector('.country-form');
let country_input = document.getElementById('country-input');

let city_form = document.querySelector('.city-form');
let city_input = document.getElementById('city-input');

let gender_form = document.querySelector('.gender-form');
let gender_input = document.getElementById('gender-input');

// To hide inputs after submitting
function hideInput(form, input) {
    setTimeout(() => {
        input.style.opacity = '0';
    }, 300);
    setTimeout(() => {
        input.style.visibility = 'hidden';
        form.reset();
    }, 600);
}

// Phone
phone_form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (phone_input.value === '') {
        console.log('Please enter a phone number');
    } else {
        fetchInformations('updateUserPhone', '/user', 'phone', phone_input.value);
        fetchUserProfile('readProfileUser', '/user');
        hideInput(phone_form, phone_input);
    }
})

// Country
country_form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (country_input.value === '') {
        console.log('Please enter a country');
    } else {
        fetchInformations('updateUserCountry', '/user', 'country', country_input.value);
        fetchUserProfile('readProfileUser', '/user');
        hideInput(country_form, country_input);
    }
})

// City
city_form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (city_input.value === '') {
        console.log('Please enter a city');
    } else {
        fetchInformations('updateUserCity', '/user', 'city', city_input.value);
        fetchUserProfile('readProfileUser', '/user');
        hideInput(city_form, city_input);
    }
})

// Gender
gender_form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (gender_input.value === '') {
        console.log('Please enter a gender');
    } else {
        fetchInformations('updateUserGender', '/user', 'gender', gender_input.value);
        fetchUserProfile('readProfileUser', '/user');
        hideInput(gender_form, gender_input);
    }
})

// Bio
let bio_edit = document.querySelector('.edit-bio');
let bio_form = document.querySelector('.bio-form');
let bio_input = document.querySelector('#bio');

// If the edit icon is clicked reveal the textarea
bio_edit.addEventListener('click', () => {
    bio_input.value = document.querySelector('.bio').innerHTML;
    bio_input.style.visibility = 'visible';
    bio_input.style.opacity = '1';
    bio_input.focus();
})

// Hide the edit input if it looses focus
bio_input.addEventListener('blur', () => {
    bio_input.style.opacity = '0';
    setTimeout(() => {
        bio_input.style.visibility = 'hidden';
    }, 300);
})

// Handle the bio textarea to submit the form on key press Enter, you can use shift+Enter to add another line
bio_input.addEventListener('keypress', (e) => {
    if(e.which === 13 && !e.shiftKey){
        e.preventDefault();
        event.target.form.dispatchEvent(new Event('submit', {cancelable: true}));
    }
});

// Submit the bio form
bio_form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (bio_input.value === '') {
        console.log('Please enter a bio');
    } else {
        fetchInformations('updateUserBio', '/user', 'bio', bio_input.value);
        fetchUserProfile('readProfileUser', '/user');
        hideInput(bio_form, bio_input);
    }
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
    if (window.innerWidth <= 768) chartJs('profileChart', 'High', 'Medium', 'Low', n_high, n_med, n_low, '#C94242', '#BEBE5F', '#5FBE6E', 13)
    if (window.innerWidth > 768) chartJs('profileChart', 'High', 'Medium', 'Low', n_high, n_med, n_low, '#C94242', '#BEBE5F', '#5FBE6E', 16)
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
    if (window.innerWidth <= 768) chartJs('profileChart', 'Pending', 'Open', 'Resolved', n_pend, n_open, n_resolv, '#2B777D', '#5FBEBC', '#5FBE6E', 13)
    if (window.innerWidth > 768) chartJs('profileChart', 'Pending', 'Open', 'Resolved', n_pend, n_open, n_resolv, '#2B777D', '#5FBEBC', '#5FBE6E', 16)
    // Reseting the numbers
    n_tickets = 0, n_pend = 0, n_open = 0, n_resolv = 0;
}

// Handle the state of the upload image button
let image_input = document.getElementById('profile_image_input');
let image_submit = document.getElementById('profile_image_submit');
let image_preview = document.querySelector('.profile-image');

// Image preview of selected image
image_input.addEventListener('change', () => {

    let image_file = image_input.files[0];
    let image_reader = new FileReader();

    // Load the preview image and view it
    image_reader.addEventListener('load', (e) => {
        image_preview.src = e.target.result;
    });
    if (image_file) {
        image_reader.readAsDataURL(image_file);
    }

    // Enable or Disable the upload image button
    if (image_input.value !== null) {
        image_submit.classList.remove('disabled-image-submit');
        image_submit.classList.add('profile-image-submit');
        image_submit.disabled = false;
    } else {
        image_submit.classList.remove('profile-image-submit');
        image_submit.classList.add('disabled-image-submit');
        image_submit.disabled = true;
    }
})

// Upload profile image
async function uploadImage() {

    const formData = new FormData();
    formData.append('profile_image', (image_input.files[0]));

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        console.log(result);
        // Get the profile informations with the newly uploaded image
        fetchUserProfile('readProfileUser', '/user');
        // Get the uploaded image in the header
        fetchImageById('readProfileImage', '/user');
        // Clear the input file and disable the upload button
        image_input.value = null;
        image_submit.classList.remove('profile-image-submit');
        image_submit.classList.add('disabled-image-submit');
        image_submit.disabled = true;
    } catch (e) {
        console.log(e);
    }
}

image_submit.addEventListener('click', function (e) {
    e.preventDefault();

    if (image_input.value === '') {
        console.log('Please select an image to upload');
    } else {
        console.log(image_input.value);
        uploadImage();
    }
})

// Delete profile image
async function deleteImage() {

    try {
        const response = await fetch('/delete', {
            method: 'POST'
        });
        const result = await response.json();
        console.log(result);
        // Get the profile informations with the newly uploaded image
        fetchUserProfile('readProfileUser', '/user');
        // Get the uploaded image in the header
        fetchImageById('readProfileImage', '/user');
        // Close the delete image modal
        const modals = document.querySelectorAll('.modal.active');
        modals.forEach(modal => {
            closeModal(modal);
        })
        // Clear the input file and disable the upload button
        image_input.value = null;
        image_submit.classList.remove('profile-image-submit');
        image_submit.classList.add('disabled-image-submit');
        image_submit.disabled = true;
    } catch (e) {
        console.log(e);
    }
}

document.querySelector('.delete-profile-image-form').addEventListener('submit', function (e) {
    e.preventDefault();
    deleteImage();
})