document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        let body = document.querySelector('.preload');
        body.classList.remove('preload');
    }, 200);
})