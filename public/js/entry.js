let hero = document.getElementById('hero');
let logo = document.querySelector('.logo_icon');
let cen = document.querySelector('.cen');
let sync = document.querySelector('.sync');

let signin_section = document.querySelector('.signin_section');
let signup_section = document.querySelector('.signup_section');

let green = '#5FBE6E';
let blue = '#2B777D';

// Desktop Animation: Sliding the hero section right and left on top of login and register forms while rotating the logo
document.getElementById('signup_btn_desk').addEventListener('click', () => {
    hero.style.left = '50%';
    hero.style.right = '0%';
    cen.style.color = green;
    sync.style.color = blue;
    logo.style.transform = "rotate(-180deg)"
})
document.getElementById('signin_btn_desk').addEventListener('click', () => {
    hero.style.left = '0%';
    hero.style.right = '50%';
    cen.style.color = blue;
    sync.style.color = green;
    logo.style.transform = "rotate(0deg)"
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
    const arrow_up = document.querySelector('.arrow_up');
    const arrow_down = document.querySelector('.arrow_down');
    arrow_down.style.display = "none";
    arrow_up.style.display = "unset";
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
        arrow_up.style.display = "none";
        arrow_down.style.display = "unset";
        custom_dropdown.remove();
      });
      custom_dropdown.appendChild(custom_option);   
    });
    custom_select.appendChild(custom_dropdown);
    // Handling clicking out of the custom select
    document.addEventListener('click', (e) => {
      if(!custom_select.contains(e.target)) {
        custom_dropdown.remove();
        arrow_up.style.display = "none";
        arrow_down.style.display = "unset";
      }
    });
  }
});