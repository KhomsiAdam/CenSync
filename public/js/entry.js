let hero = document.getElementById('hero');
let logo = document.querySelector('.logo_icon');
let cen = document.querySelector('.cen');
let sync = document.querySelector('.sync');

let signin_section = document.querySelector('.signin_section');
let signup_section = document.querySelector('.signup_section');

let green = '#5FBE6E';
let blue = '#2B777D';

// Desktop Animation: Sliding the hero section right and left on top of login and register forms while rotating the logo
function slideLeft() {
    hero.style.left = '50%';
    hero.style.right = '0%';
    cen.style.color = green;
    sync.style.color = blue;
    logo.style.transform = "rotate(-180deg)"
    signin_form.reset();
}
function slideRight() {
    hero.style.left = '0%';
    hero.style.right = '50%';
    cen.style.color = blue;
    sync.style.color = green;
    logo.style.transform = "rotate(0deg)"
    signup_form.reset();
}
document.getElementById('signup_btn_desk').addEventListener('click', () => {
    slideLeft();
})
document.getElementById('signin_btn_desk').addEventListener('click', () => {
    slideRight();
})

// Mobile Animation: Toggling between login and register forms while rotating the logo
document.getElementById('signup_btn_mob').addEventListener('click', () => {
    cen.style.color = green;
    sync.style.color = blue;
    logo.style.transform = "rotate(-180deg)"

    signin_section.style.display = "none";
    signup_section.style.display = "unset";
    signup_section.style.opacity = "0";

    if (signup_section.style.opacity === "0") {
        setTimeout( () => {
            signup_section.style.opacity = "1";
        }, 100);
    }
})
document.getElementById('signin_btn_mob').addEventListener('click', () => {
    cen.style.color = blue;
    sync.style.color = green;
    logo.style.transform = "rotate(0deg)"

    signup_section.style.display = "none";
    signin_section.style.display = "unset";
    signin_section.style.opacity = "0";

    if (signin_section.style.opacity === "0") {
        setTimeout( () => {
            signin_section.style.opacity = "1";
        }, 100);
    }
})

// Handling Custom Select/Options
const custom_select = document.querySelector('.custom_select');

custom_select.addEventListener('mousedown', e => {
  if(window.innerWidth >= 420) {
    // Preventing the selecting from opening the default HTML dropdown menu
    e.preventDefault();
    // Changing Arrow Icon to upwards
    custom_select.children[1].style.transform = 'rotate(180deg)';

    // Selecting the default HTML select element and creating a custom dropdown
    const default_select = custom_select.children[0];
    const custom_dropdown = document.createElement('ul');
    custom_dropdown.className = "custom-options";
    // Spreading the options of the default select and foreach one create a list element for our custom ul dropdown
    [...default_select.children].forEach(option => {
      const custom_option = document.createElement('li');
      // Transfer content from the default options to the custom one
      custom_option.textContent = option.textContent;
      // Transfering the selected content to the default select value
      custom_option.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        default_select.value = option.value;
        default_select.dispatchEvent(new Event('change'));

        // Restoring the Arrow to Downwards and deleting the custom dropdown menu
        custom_select.children[1].style.transform = 'rotate(0deg)';
        custom_dropdown.remove();
      });
      custom_dropdown.appendChild(custom_option);   
    });
    custom_select.appendChild(custom_dropdown);
    // Handling clicking out of the custom select
    document.addEventListener('click', (e) => {
      if(!custom_select.contains(e.target)) {
        custom_dropdown.remove();
        custom_select.children[1].style.transform = 'rotate(0deg)';
    }
    });
  }
});

// User endpoint
let user = 'http://localhost:8080/user';

const signup_form = document.querySelector('.signup_form');
const role = document.getElementById('role');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const email_up = document.getElementById('email_up');
const password_up = document.getElementById('password_up');
const signup_error = document.getElementById('signup_error');

// Sign in, generating a token and storing it in localstorage
const register = async () => {
    let data = {
        "method": "createUser",
        "params": {
            "role": role.value,
            "firstname": firstname.value,
            "lastname": lastname.value,
            "email": email_up.value,
            "password": password_up.value
        }
    };
    const response = await fetch(user, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    })
    if (response.status !== 200) {
        throw new Error('cannot insert data');
    } else {
        slideRight();
    }
}

signup_form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (role.value === '' || firstname.value === '' || lastname.value === '' || email_up.value === '' || password_up.value === '') {
        // signup_error.innerHTML = 'Please fill all the fields';
        console.log('Please fill all the fields');
    } else {
        register();
        console.log('user registered');
    }
})

// Token holder
let jwt = '';
// Authentication endpoint
let auth = 'http://localhost:8080/auth';

const signin_form = document.querySelector('.signin_form');
const email_in = document.getElementById('email_in');
const password_in = document.getElementById('password_in');
const signin_error = document.getElementById('signin_error');

// Sign in, generating a token and storing it in localstorage
const login = async () => {
    let data = {
        "method": "login",
        "params": {
            "account_email": email_in.value,
            "account_password": password_in.value
        }
    };
    const response = await fetch(auth, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(data)
    })
    if (response.status !== 200) {
        throw new Error('cannot get JWT token');
    }
    jwt = await response.json();
    if(typeof jwt === 'object') {
        console.log('wrong username password');
    } else {
        localStorage.setItem("token", jwt);
        console.log(jwt);
        location.replace('/dashboard');
    }
}

signin_form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (email_in.value === '' || password_in.value === '') {
        // signin_error.innerHTML = 'Please fill all the fields';
        console.log('Please fill all the fields');
    } else {
        login();
    }
})
